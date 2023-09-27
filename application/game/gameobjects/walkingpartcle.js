import * as Game from '../game.js'

export class WalkingParticle extends Game.GameParticle {
    initial_scale = 0
    spawn_time = 0
    colour = 0x949494
    initial_opacity = 0.9
    animation_length = 0
    speed = 0
    direction = { x: 0, y: 0, z: 0 }

    constructor() {
        super()
        let geometry = new Game.IcosahedronGeometry(1)
        let material = new Game.MeshPhongMaterial({ color: this.colour })
        material.transparent = true
        this.mesh = new Game.Mesh(geometry, material)
    }

    spawn(x, y, z, direction) {
        this.initial_scale = Game.get_random_number(1, 2) / 20
        this.mesh.scale.setScalar(this.initial_scale)
        this.x = x + 0.1 * direction
        this.y = y - 0.7
        this.z = z
        this.direction.x = direction
        this.direction.y = Game.get_random_number(0.1, 0.5)
        this.direction.z = Game.get_random_number(-0.1, 0.1)
        this.mesh.material.opacity = this.initial_opacity
        this.mesh.rotation.y = Math.PI * Game.get_random_number(1, 10)
        this.mesh.rotation.x = Math.PI * Game.get_random_number(1, 10)
        this.mesh.rotation.z = Math.PI * Game.get_random_number(1, 10)

        this.speed = Game.get_random_number(1, 10) / 10000
        this.spawn_time = Game.current_frame.time
        this.animation_length = Game.get_random_number(0.3, 0.4) * Game.SECOND

        this.add_to_scene()
        Game.particles.add(this)
    }

    animate() {
        if (Game.calculate_delta_time(this.spawn_time) >= this.animation_length) {
            Game.particles.delete(this)
            this.mesh.position.x = -Game.INFINITY
            this.destroy()
            return
        }

        this.x += (this.speed) * this.direction.x * Game.delta_time()
        this.y += (this.speed) * this.direction.y * Game.delta_time()
        this.z += (this.speed) * this.direction.z * Game.delta_time()

        this.mesh.material.opacity = Game.calculate_decay(this.initial_opacity, this.animation_length, Game.calculate_delta_time(this.spawn_time))
        this.initial_scale += 0.0002 * Game.delta_time()
        this.mesh.scale.setScalar(this.initial_scale)
    }
}
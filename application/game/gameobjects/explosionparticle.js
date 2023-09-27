import * as Game from '../game.js'

export class ExplosionParticle extends Game.GameParticle {
    spawn_time = 0
    direction = { x: Game.LEFT, y: Game.LEFT, z: Game.LEFT }
    speed = 0.015
    initial_opacity = 0.9
    initial_scale = 1
    colour = 0xe27602
    animation_length = 0

    constructor() {
        super()

        let geometry = new Game.IcosahedronGeometry(1)
        let material = new Game.MeshPhongMaterial({ color: this.colour })
        material.transparent = true

        this.mesh = new Game.Mesh(geometry, material)
    }

    spawn(x, y, z) {
        this.initial_scale = Game.get_random_number(2, 3) / 10
        this.mesh.scale.setScalar(this.initial_scale)
        this.x = x + Game.get_random_number(-1, 1) / 10
        this.y = y + Game.get_random_number(-1, 1) / 10
        this.z = z + Game.get_random_number(-1, 1) / 10
        this.direction.x = Game.get_random_number(-1, 1)
        this.direction.y = Game.get_random_number(-1, 1)
        this.direction.z = Game.get_random_number(-1, 1)
        this.speed = Game.get_random_number(1, 10) / 3500
        this.mesh.material.opacity = this.initial_opacity
        this.spawn_time = Game.current_frame.time
        this.mesh.rotation.x = Math.PI * Game.get_random_number(1, 10)
        this.mesh.rotation.y = Math.PI * Game.get_random_number(1, 10)
        this.mesh.rotation.z = Math.PI * Game.get_random_number(1, 10)
        this.animation_length = Game.get_random_number(0.4, 0.7) * Game.SECOND
        this.add_to_scene()
        Game.particles.add(this)
    }

    animate() {
        if (Game.calculate_delta_time(this.spawn_time) >= this.animation_length) {
            Game.particles.delete(this)
            this.destroy()
        } else {
            this.x += (this.speed) * this.direction.x * Game.delta_time()
            this.y += (this.speed) * this.direction.y * Game.delta_time()
            this.z += (this.speed) * this.direction.z * Game.delta_time()

            this.mesh.material.opacity = Game.calculate_decay(this.initial_opacity, this.animation_length, Game.calculate_delta_time(this.spawn_time))
            this.mesh.material.color.offsetHSL(0, 0, -0.0008 * Game.delta_time())
            this.initial_scale += 0.0002 * Game.delta_time()
            this.mesh.scale.setScalar(this.initial_scale)
        }
    }
}
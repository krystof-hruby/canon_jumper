import * as Game from '../game.js'

export class CanonFireParticle extends Game.GameParticle {
    spawn_time = 0
    direction = { x: Game.LEFT, y: Game.LEFT, z: Game.LEFT }
    speed = 0.015
    initial_opacity = 0.9
    initial_scale = 1

    constructor() {
        super()

        let geometry = new Game.BoxGeometry(1, 1, 1, Game.MESH_QUALITY, Game.MESH_QUALITY)
        let material = new Game.MeshPhongMaterial({ color: 0xe27602 })
        material.transparent = true

        this.mesh = new Game.Mesh(geometry, material)
    }

    spawn(x, y, z, direction, speed) {
        this.initial_scale = Game.get_random_number(2, 3) / 15
        this.mesh.scale.setScalar(this.initial_scale)
        this.x = x
        this.y = y + Game.get_random_number(-1, 1) / 10
        this.z = z + Game.get_random_number(-1, 1) / 10
        this.direction = direction
        this.speed = speed
        this.mesh.material.opacity = this.initial_opacity
        this.spawn_time = Game.current_frame.time
        this.mesh.rotation.x = Math.PI * Game.get_random_number(1, 10)
        this.mesh.rotation.y = Math.PI * Game.get_random_number(1, 10)
        this.mesh.rotation.z = Math.PI * Game.get_random_number(1, 10)
        this.add_to_scene()
        Game.particles.add(this)
    }

    animate() {
        if (Game.calculate_delta_time(this.spawn_time) >= Game.CANONFIRE_PARTICLE_ANIMATION_LENGTH) {
            if (Game.particles.has(this)) {
                this.mesh.position.x = -Game.INFINITY
                this.mesh.material.opacity = 0
                Game.particles.delete(this)
            }
        } else {
            this.x += (this.speed) * this.direction.x * Game.delta_time()

            this.mesh.material.opacity = Game.calculate_decay(this.initial_opacity, Game.CANONFIRE_PARTICLE_ANIMATION_LENGTH, Game.calculate_delta_time(this.spawn_time))
            this.initial_scale -= 0.0002 * Game.delta_time()
            this.mesh.scale.setScalar(this.initial_scale)
        }
    }
}
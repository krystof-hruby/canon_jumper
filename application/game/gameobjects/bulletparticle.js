import * as Game from '../game.js'

export class BulletParticle extends Game.GameParticle {
    spawn_interval = 0
    spawn_time = 0
    direction = { x: Game.LEFT, y: Game.LEFT, z: Game.LEFT }
    offset = { y: 0, z: 0 }
    colour = 0xe27602

    constructor() {
        super()

        let geometry = new Game.ConeGeometry(0.15, 1.2, 3, 3)
        let material = new Game.MeshPhongMaterial({ color: this.colour })
        material.transparent = true
        material.opacity = 0
        this.mesh = new Game.Mesh(geometry, material)
        this.add_to_scene()
    }

    spawn(rotation) {
        if (this.mesh == null) {
            return
        }

        let scale_length = Game.get_random_number(0.1, 1)
        let scale_radius = Game.get_random_number(0.1, 1)

        this.mesh.scale.set(scale_length, scale_radius, scale_radius)
        this.mesh.material.opacity = 1
        this.mesh.material.color.setHex(this.colour)
        this.mesh.rotation.z = rotation

        this.offset.y = Game.get_random_number(-1, 1) / 10
        this.offset.z = Game.get_random_number(-1, 1) / 10

        this.spawn_interval = Game.get_random_number(3, 10) / 10 * Game.SECOND
        this.spawn_time = Game.current_frame.time
        Game.particles.add(this)
    }

    animate() {
        this.mesh.material.opacity = Game.calculate_decay(1, this.spawn_interval, Game.calculate_delta_time(this.spawn_time))
    }
}
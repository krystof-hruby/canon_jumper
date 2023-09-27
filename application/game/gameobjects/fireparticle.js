import * as Game from '../game.js'

export class FireParticle extends Game.GameParticle {
    spawn_position = { x: 0, y: 0, z: 0 }
    spawn_time = 0
    direction = { x: Game.LEFT, y: Game.LEFT, z: Game.LEFT }
    speed = 0.015
    initial_opacity = 1
    initial_scale = 0.2
    scale = 0
    animation_length = 1
    colour = 0xe27602

    constructor(x, y, z, scale) {
        super()

        let geometry = new Game.IcosahedronGeometry(1)
        let material = new Game.MeshPhongMaterial({ color: this.colour })
        material.transparent = true

        this.initial_scale = scale

        this.mesh = new Game.Mesh(geometry, material)

        this.spawn_position.x = x + Game.get_random_number(-1, 1) * Game.get_random_number(1, 2) / 10
        this.spawn_position.y = y
        this.spawn_position.z = z + Game.get_random_number(-1, 1) * Game.get_random_number(1, 2) / 10
    }

    spawn() {
        this.x = this.spawn_position.x
        this.y = this.spawn_position.y
        this.z = this.spawn_position.z

        this.mesh.material.color.setHex(this.colour)
        this.scale = this.initial_scale + Game.get_random_number(1, 2) / 20
        this.mesh.scale.setScalar(this.initial_scale)
        this.animation_length = Game.get_random_number(1, 20) / 10 * Game.SECOND
        this.direction.x = Game.get_random_number(-1, 1)
        this.direction.z = Game.get_random_number(-1, 1)
        this.speed = Game.get_random_number(1, 2) / 20000
        this.mesh.material.opacity = this.initial_opacity
        this.spawn_time = Game.current_frame.time
        this.mesh.rotation.x = Math.PI * Game.get_random_number(1, 10)
        this.mesh.rotation.y = Math.PI * Game.get_random_number(1, 10)
        this.mesh.rotation.z = Math.PI * Game.get_random_number(1, 10)
        this.add_to_scene()
        Game.particles.add(this)
    }

    animate() {
        if (Game.calculate_delta_time(this.spawn_time) >= this.animation_length) {
            this.spawn()
        } else {
            this.x += (this.speed) * this.direction.x * Game.delta_time()
            this.y -= (this.speed * 10) * Game.delta_time()
            this.z += (this.speed) * this.direction.z * Game.delta_time()

            this.mesh.material.opacity = Game.calculate_decay(this.initial_opacity, this.animation_length, Game.calculate_delta_time(this.spawn_time))
            this.mesh.material.color.offsetHSL(0, 0, -0.0002 * Game.delta_time())
            this.scale += 0.0002 * Game.delta_time()
            this.mesh.scale.setScalar(this.scale)
        }
    }
}
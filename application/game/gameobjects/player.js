import * as Game from '../game.js'

export const NO_DIRECTION = 0
export const LEFT = -1
export const RIGHT = 1

export class Player extends Game.GameObject {
    id = 0
    colour = 0xffffff

    hands_mesh = null
    canon_mesh = null
    canon_black_material = new Game.MeshPhongMaterial({ color: 0x000000 }) // I hate this but it works

    control_scheme = { left: "", right: "", jump: "", drop: "", shoot: "" }
    input = { left: false, right: false, jump: false, drop: "", shoot: false }

    health = Game.MAX_HEALTH

    dead = false
    invincible = false
    grounded = false
    dropping = false
    jumping = false
    shooting = false

    facing = LEFT

    movement_direction = NO_DIRECTION
    last_movement_direction = LEFT
    both_movement_keys_pressed = false
    was_moving_last_frame = false

    knockback_direction = NO_DIRECTION
    recoil_direction = NO_DIRECTION
    bump_direction = NO_DIRECTION

    action_times = { invincibility: -Game.INFINITY, fall: 0, jump: -Game.INFINITY, reload: -Game.INFINITY, knockback: -Game.INFINITY, slide: -Game.INFINITY, coyote_time: -Game.INFINITY, recoil: -Game.INFINITY, bump: -Game.INFINITY } // easiest with large -inf as initial values

    constructor(id) {
        super()
        this.id = id

        this.length = 0.7
        this.height = 1.5
        this.depth = 1

        this.colour = create_player_colour(id)
        let material = new Game.MeshPhongMaterial({ color: this.colour })
        this.mesh = create_player_mesh(material)
        this.hands_mesh = create_player_hands(material)
        this.canon_mesh = create_player_canon(material, this.canon_black_material)

        this.add_to_scene()
    }

    bob_value = 1
    recoil_value = 0
    was_facing = Game.NO_DIRECTION
    bob = 1
    update_mesh() {
        if (this.mesh != null) {
            this.mesh.position.x = this.x
            this.mesh.position.y = this.y
            this.mesh.position.z = this.z
        }
        if (this.hands_mesh != null) {
            this.hands_mesh.position.x = this.x
            this.hands_mesh.position.y = (this.y - 0.5) + this.bob
            this.hands_mesh.position.z = this.z
        }
        if (this.canon_mesh != null) {
            this.canon_mesh.position.x = this.x + (0.3 * this.facing) + (this.recoil_value)
            this.canon_mesh.position.y = (this.y + 0.5) + this.bob
            this.canon_mesh.position.z = this.z
        }
    }

    add_to_scene() {
        if (this.mesh != null) {
            this.update_mesh()
            Game.scene.add(this.mesh)
        }
        if (this.hands_mesh != null) {
            Game.scene.add(this.hands_mesh)
        }
        if (this.canon_mesh != null) {
            Game.scene.add(this.canon_mesh)
        }
    }

    spawn() {
        this.x = Game.get_random_number(Game.PLAYER_SPANWPOS.X_BOUNDS.LEFT, Game.PLAYER_SPANWPOS.X_BOUNDS.RIGHT)
        this.y = Game.PLAYER_SPANWPOS.Y
        this.z = Game.PLAYER_SPANWPOS.Z

        this.mesh.material.opacity = 0.2

        // Initialize facing direction
        if (this.x > (Game.RIGHT - Game.LEFT)) {
            this.facing = RIGHT
        } else {
            this.facing = LEFT
        }

        this.invincible = true
        this.grounded = false
        this.dropping = false
        this.jumping = false
        this.shooting = false

        this.action_times.invincibility = Game.current_frame.time
        this.action_times.slide = -Game.INFINITY
        this.action_times.fall = Game.current_frame.time
        this.action_times.jump = -Game.INFINITY
        this.action_times.coyote_time = -Game.INFINITY
        this.action_times.knockback = -Game.INFINITY
        this.action_times.reload = -Game.INFINITY
        this.action_times.recoil = -Game.INFINITY
        this.action_times.bump = -Game.INFINITY
    }

    canonparticles =
        [
            new Game.CanonParticle(),
            new Game.CanonParticle(),
            new Game.CanonParticle(),
            new Game.CanonParticle(),
            new Game.CanonParticle(),
            new Game.CanonParticle(),
            new Game.CanonParticle(),
            new Game.CanonFireParticle(),
            new Game.CanonFireParticle(),
            new Game.CanonFireParticle(),
            new Game.CanonFireParticle(),
            new Game.CanonFireParticle(),
        ]
    spawn_canonparticles() {
        for (let canonparticle of this.canonparticles) {
            let x = this.x + 1 * this.facing
            let y = this.y + 0.5
            let z = this.z
            let direction =
            {
                x: this.facing,
                y: Game.get_random_number(-1, 1),
                z: Game.get_random_number(-1, 1),
            }
            let speed = Game.get_random_number(1, 5) / 3000
            canonparticle.spawn(x, y, z, direction, speed)
        }
    }

    spawn_frequency = 0.4 * Game.SECOND
    last_spawned_walking_particle = Game.current_frame.time
    spawn_walkingparticle(direction) {
        if (Game.calculate_delta_time(this.last_spawned_walking_particle) >= this.spawn_frequency) {
            let particle = new Game.WalkingParticle()
            particle.spawn(this.x, this.y, this.z, direction)
            this.last_spawned_walking_particle = Game.current_frame.time
            this.spawn_frequency = Game.get_random_number(0.2, 0.4) * Game.SECOND
        }
    }

    jumping_particles =
        [
            new Game.JumpingParticle(),
            new Game.JumpingParticle(),
            new Game.JumpingParticle(),
            new Game.JumpingParticle(),
            new Game.JumpingParticle(),
            new Game.JumpingParticle(),
            new Game.JumpingParticle(),
        ]

    was_in_the_air_last_frame = true
    jp_spawned = Game.current_frame.time
    spawn_jumping_particles() {
        if (Game.calculate_delta_time(this.jp_spawned) >= 0.1 * Game.SECOND) {
            for (let particle of this.jumping_particles) {
                particle.spawn(this.x, this.y, this.z)
            }
            this.jp_spawned = Game.current_frame.time
        }
    }
}

function create_player_colour(id) {
    switch (id) {
        case 0:
            return 0xff0000
        case 1:
            return 0x0000ff
        case 2:
            return 0x00ff00
        case 3:
            return 0xffff00
        case 4:
            return 0xff00ff
        case 5:
            return 0x00ffff
    }

}

function create_player_canon(material, black_material) {
    let canon_material = new Game.MeshPhongMaterial({ color: 0x444444 })
    canon_material.transparent = true
    let canon = new Game.Mesh(new Game.CylinderGeometry(0.5, 0.3, 0.7, Game.MESH_QUALITY, Game.MESH_QUALITY), canon_material)
    canon.castShadow = true
    canon.receiveShadow = true

    let canon_mid = new Game.Mesh(new Game.CylinderGeometry(0.5, 0.5, 0.2, Game.MESH_QUALITY, Game.MESH_QUALITY), canon_material)
    canon_mid.castShadow = true
    canon_mid.receiveShadow = true
    canon_mid.position.set(0, 0.43, 0)

    let canon_back = new Game.Mesh(new Game.SphereGeometry(0.5, Game.MESH_QUALITY, Game.MESH_QUALITY, 0, Math.PI), canon_material)
    canon_back.castShadow = true
    canon_back.receiveShadow = true
    canon_back.rotation.x = Math.PI + Math.PI / 2
    canon_back.position.set(0, 0.52, 0)

    let canon_tip = new Game.Mesh(new Game.CylinderGeometry(0.3, 0.3, 0.4, Game.MESH_QUALITY, Game.MESH_QUALITY), canon_material)
    canon_tip.castShadow = true
    canon_tip.receiveShadow = true
    canon_tip.position.set(0, -0.4, 0)

    let canon_tiptip = new Game.Mesh(new Game.CylinderGeometry(0.35, 0.35, 0.15, Game.MESH_QUALITY, Game.MESH_QUALITY), canon_material)
    canon_tiptip.castShadow = true
    canon_tiptip.receiveShadow = true
    canon_tiptip.position.set(0, -0.65, 0)

    let canon_strip = new Game.Mesh(new Game.CylinderGeometry(0.2, 0.2, 0.4, 3, Game.MESH_QUALITY), material)
    canon_strip.castShadow = true
    canon_strip.receiveShadow = true
    canon_strip.rotation.x = Math.PI / 2
    canon_strip.rotation.y = Math.PI * 2
    canon_strip.position.set(0.4, 0.3, 0)

    let canon_black = new Game.Mesh(new Game.CylinderGeometry(0.25, 0.25, 0.1, Game.MESH_QUALITY, Game.MESH_QUALITY), black_material)
    canon_black.castShadow = true
    canon_black.receiveShadow = true
    canon_black.position.set(0, -0.68, 0)
    canon_black.material.transparent = true

    canon.add(canon_back)
    canon.add(canon_mid)
    canon.add(canon_tip)
    canon.add(canon_tiptip)
    canon.add(canon_strip)
    canon.add(canon_black)
    canon.rotation.z = Math.PI / 2
    canon.scale.setScalar(0.9)

    return canon
}

function create_player_hands(material) {
    let hands = new Game.Mesh(new Game.CubeGeometry(0.001, 0.001, 0.001, 1, 1), material)

    let hand1 = new Game.Mesh(new Game.CylinderGeometry(0.07, 0.07, 0.7, Game.MESH_QUALITY, Game.MESH_QUALITY), material)
    hand1.castShadow = true
    hand1.receiveShadow = true
    hand1.rotation.x = Math.PI / 7
    hand1.position.set(0, 0.5, 0.28)

    let hand2 = new Game.Mesh(new Game.CylinderGeometry(0.07, 0.07, 0.7, Game.MESH_QUALITY, Game.MESH_QUALITY), material)
    hand2.castShadow = true
    hand2.receiveShadow = true
    hand2.rotation.x = -Math.PI / 7
    hand2.position.set(0, 0.5, -0.28)

    hands.add(hand1)
    hands.add(hand2)
    return hands
}

function create_player_mesh(material) {
    let mesh = new Game.Mesh(new Game.CubeGeometry(0.1, 0.1, 0.1, 1, 1), material)

    let body = new Game.Mesh(new Game.CylinderGeometry(0.1, 0.1, 0.4, Game.MESH_QUALITY, Game.MESH_QUALITY), material)
    body.castShadow = true
    body.receiveShadow = true

    let head = new Game.Mesh(new Game.IcosahedronGeometry(0.3), material)
    head.castShadow = true
    head.receiveShadow = true
    head.position.set(0, 0.35, 0)

    body.add(head)
    body.position.set(0, -0.55, 0)

    mesh.add(body)

    mesh.material.transparent = true
    return mesh
}
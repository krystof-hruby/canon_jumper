import * as Game from '../game.js'

export class Bullet extends Game.GameObject {
    length = Game.BULLET_SIZE.LENGTH
    height = Game.BULLET_SIZE.HEIGHT
    depth = Game.BULLET_SIZE.DEPTH

    direction
    belongs_to

    spawn(x, y, colour) {
        let strip_length = 0.1
        this.mesh = new Game.Mesh(new Game.CylinderGeometry(Game.BULLET_SIZE.HEIGHT, Game.BULLET_SIZE.HEIGHT, Game.BULLET_SIZE.LENGTH, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: 0x777777 }))
        this.mesh.rotation.z = Math.PI / 2

        let strip = new Game.Mesh(new Game.CylinderGeometry(Game.BULLET_SIZE.HEIGHT + 0.0001, Game.BULLET_SIZE.HEIGHT + 0.0001, strip_length, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: colour }))
        strip.castShadow = true
        strip.receiveShadow = true
        strip.position.set(0, -0.05, 0)
        this.mesh.add(strip)

        let tip = new Game.Mesh(new Game.SphereGeometry(Game.BULLET_SIZE.HEIGHT, Game.MESH_QUALITY, Game.MESH_QUALITY, 0, Math.PI), new Game.MeshPhongMaterial({ color: 0x777777 }))
        tip.castShadow = true
        tip.receiveShadow = true
        tip.position.set(0, -Game.BULLET_SIZE.LENGTH + 0.3, 0)
        this.mesh.add(tip)

        this.mesh.castShadow = true
        this.mesh.receiveShadow = true

        if (this.direction == Game.LEFT) {
            this.mesh.rotation.z = -Math.PI / 2
        }

        this.x = x + 0.3 * this.direction
        this.y = y + 0.45
        this.z = Game.GROUND_Z / 2

        this.add_to_scene()
    }

    destroy() {
        for (let particle of this.bulletparticles) {
            Game.particles.delete(particle)
            particle.destroy()
        }

        this.remove_from_scene()
        this.mesh = null
    }

    bulletparticles =
        [
            new Game.BulletParticle(),
            new Game.BulletParticle(),
            new Game.BulletParticle(),
            new Game.BulletParticle(),
            new Game.BulletParticle(),
        ]
    spawn_bulletparticles() {
        for (let particle of this.bulletparticles) {
            if (Game.calculate_delta_time(particle.spawn_time) >= particle.spawn_interval) {
                particle.spawn(this.direction * Math.PI / 2)
            }
            particle.x = this.x - (0.4 * this.direction)
            particle.y = this.y + particle.offset.y
            particle.z = this.z + particle.offset.z
        }
    }

    explosionparticles =
        [
            new Game.ExplosionParticle(),
            new Game.ExplosionParticle(),
            new Game.ExplosionParticle(),
            new Game.ExplosionParticle(),
            new Game.ExplosionParticle(),
            new Game.ExplosionParticle(),
            new Game.ExplosionParticle(),
            new Game.ExplosionParticle(),
            new Game.ExplosionParticle(),
            new Game.ExplosionParticle(),
        ]
    explode() {
        for (let particle of this.explosionparticles) {
            particle.spawn(this.x, this.y, this.z)
        }

        Game.camera_shake.last_shake_time = Game.current_frame.time
        Game.camera_shake.strength = 20
        Game.camera_shake.speed = 1
        Game.camera_shake.length = 0.7
    }
}
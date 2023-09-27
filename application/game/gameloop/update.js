import * as Game from '../game.js'

class Frame { time = Game.elapsed_time() } // cannot edit values in other files otherwise
export let last_frame = new Frame()
export let current_frame = new Frame()
// Calculates game state and physics
export function update() {
    for (let player of Game.players) {
        if (player.dead) {
            continue
        }

        // Game state:
        Game.respawn_player(player)
        Game.disable_invincibility(player)
        Game.spawn_bullets(player)

        Game.enable_and_disable_platforms(player)

        // Physics:
        Game.move_player(player)
        Game.jump_player(player)
        Game.knockback_player(player)
        Game.recoil_player(player)
        Game.bump_player(player)
        Game.apply_gravity(player)

        // Collisions:
        Game.check_platform_collisions(player)
        Game.check_bullet_collisions(player)
        Game.check_player_collisions(player)

        // HUD:
        Game.update_hud(player)

        // Particles:
        Game.spawn_player_particles(player)
        Game.update_player_animation(player)

        // TESTING: visualize hitboxes
        if (Game.VISUALIZE_HITBOXES) {
            Game.draw_hitbox(player.x - player.length / 2, player.y - player.height / 2, player.length, player.height, player.id)
        }
    }

    // Bullets
    for (let bullet of Game.bullets) {
        Game.move_bullet(bullet)
        Game.destroy_bullet(bullet)
        bullet.spawn_bulletparticles()
    }

    // Particles
    for (let particle of Game.particles) {
        particle.animate()
    }

    // Camera movement
    if (!Game.ORBIT_CONTROLS) {
        Game.move_camera()
        Game.shake_camera()
    }

    // HUD update
    for (let hud of Game.player_huds) {
        hud.animate()
    }

    if (Game.winnerhud.is_spawned) {
        Game.winnerhud.animate()
        Game.resethud.animate()
    }

    // Check if a player is the last surviving
    Game.check_winner()

    // Delta timing - DO NOT TOUCH!
    last_frame.time = current_frame.time
    current_frame.time = Game.elapsed_time()
}
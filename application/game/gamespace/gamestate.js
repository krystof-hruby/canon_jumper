import * as Game from '../game.js'

// Check if a player won the game
export let number_of_players_alive = Game.NUMBER_OF_PLAYERS
export function check_winner() {
    if (number_of_players_alive <= 1) {
        if (number_of_players_alive < 1 && !Game.winnerhud.is_spawned) {
            Game.winnerhud.spawn(Game.players[0])
            Game.resethud.spawn(Game.players[0])
        } else {
            for (let player of Game.players) {
                if (!player.dead && !Game.winnerhud.is_spawned) {
                    Game.winnerhud.spawn(player)
                    Game.resethud.spawn(player)
                    break
                }
            }
        }

        if (Game.reset.reset) {
            window.location.reload() // Reloads the page - restarts the game
        }
    }
}

// Respawns dead players
export function respawn_player(player) {
    if (player.y < Game.DEATH_ZONE) {
        player.health--
        Game.camera_shake.last_shake_time = Game.current_frame.time
        Game.camera_shake.strength = 40
        Game.camera_shake.speed = 1
        Game.camera_shake.length = 0.6
        if (player.health <= 0) {
            player.dead = true
            player.y = Game.INFINITY // Move away from the DEATH_ZONE
            player.remove_from_scene()
            number_of_players_alive--
        } else {
            player.spawn()
            player.action_times.invincibility = Game.current_frame.time
            player.action_times.fall = Game.current_frame.time
        }
        Game.player_huds[player.id].remove_heart(player.health)
    }
}

// Disables player invincibility after set time
export function disable_invincibility(player) {
    if (Game.calculate_delta_time(player.action_times.invincibility) >= Game.INVINCIBILITY_LENGTH) {
        player.mesh.material.opacity = 1
        player.hands_mesh.material.opacity = 1
        player.canon_mesh.material.opacity = 1
        player.canon_black_material.opacity = 1
        player.invincible = false
    } else {
        player.mesh.material.opacity = 0.35 + Math.sin(Game.current_frame.time / 100) / 40 * Game.delta_time()
        player.hands_mesh.material.opacity = 0.35 + Math.sin(Game.current_frame.time / 100) / 40 * Game.delta_time()
        player.canon_mesh.material.opacity = 0.35 + Math.sin(Game.current_frame.time / 100) / 40 * Game.delta_time()
        player.canon_black_material.opacity = 0.35 + Math.sin(Game.current_frame.time / 100) / 40 * Game.delta_time()
    }
}

// Spawns bullets if a player is shooting
export function spawn_bullets(player) {
    if (player.shooting) {
        if (Game.calculate_delta_time(player.action_times.reload) >= Game.RELOAD_TIME) {
            let bullet = new Game.Bullet()
            bullet.belongs_to = player.id
            bullet.direction = player.facing
            bullet.spawn(player.x + Game.BULLET_SPAWNPOS * bullet.direction, player.y, player.colour)
            Game.bullets.add(bullet)

            player.action_times.reload = Game.current_frame.time
            player.action_times.recoil = Game.current_frame.time
            player.recoil_direction = bullet.direction * -1
            player.was_facing = player.facing

            player.spawn_canonparticles()

            // Camera shake
            Game.camera_shake.last_shake_time = Game.current_frame.time
            Game.camera_shake.strength = 10
            Game.camera_shake.speed = 1
            Game.camera_shake.length = 0.5
        }
    }
}

// Animate player mesh
export function update_player_animation(player) {
    // Bobbing animation
    player.bob = Math.sin(Game.current_frame.time / (100 * player.bob_value)) / (200) * Game.delta_time()

    if (player.movement_direction == Game.NO_DIRECTION) {
        if (player.bob_value < 2) {
            player.bob_value += 0.01
        } else {
        }
        player.bob_value = 1
    } else {
        if (player.bob_value > 1) {
            player.bob_value -= 0.01
        } else {
        }
        player.bob_value = 1
    }

    // Canon recoil animation
    if (Game.calculate_delta_time(player.action_times.recoil) <= Game.CANON_RECOIL_LENGTH) {
        player.recoil_value -= Game.CANON_RECOIL_STRENGTH / 10000 * player.was_facing * Game.delta_time()
    } else if (Game.calculate_delta_time(player.action_times.recoil) <= Game.CANON_RECOIL_LENGTH * 2) {
        player.recoil_value += Game.CANON_RECOIL_STRENGTH / 10000 * player.was_facing * Game.delta_time()
    } else {
        player.recoil_value = 0
    }
}
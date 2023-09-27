import * as Game from '../game.js'

// One-way collision platforms -> if player is above the platform, enable it, otherwise disable it
// MUST be called before apply_gravity()!!
export function enable_and_disable_platforms(player) {
    for (let platform of Game.platforms.platforms) {
        if (player.y - player.height / 2 >= platform.y + platform.height) {
            Game.platforms.enabled_platforms[player.id].add(platform)
        } else {
            Game.platforms.enabled_platforms[player.id].delete(platform)
        }
    }
}

// Checks if a player is colliding with a platform
export function check_platform_collisions(player) {
    let collision = false

    // Do not check collisions if a player is dropping
    if (!player.dropping) {
        for (let platform of Game.platforms.enabled_platforms[player.id]) {
            collision = Game.are_colliding(
                { x: player.x - player.length / 2, y: player.y - player.height / 2, length: player.length, height: player.height },
                { x: platform.x, y: platform.y, length: platform.length, height: platform.height }
            )

            if (collision) {
                if (!player.grounded) {
                    // Set player exactly on the ground (could be slightly offset due to increased gravity step size)
                    player.y = (platform.y + platform.height) + player.height / 2
                }
                player.grounded = true
                player.action_times.jump = -Game.INFINITY // Removes weird "jumpy" behaviour
                break
            }
        }
    }

    if (!collision) {
        if (player.grounded) {
            player.action_times.fall = Game.current_frame.time
            player.action_times.coyote_time = Game.current_frame.time
        }
        player.grounded = false
        player.was_in_the_air_last_frame = true
    }
}

// Moves bullet
export function move_bullet(bullet) {
    bullet.x += (Game.BULLET_SPEED / 1000) * bullet.direction * Game.delta_time()

    // Slight bobbing
    bullet.y += Math.sin(Game.current_frame.time / 90) / 800 * Game.delta_time()
    bullet.z += Math.sin(Game.current_frame.time / 90) / 800 * Game.delta_time()
}

// Destroys any bullet that is out of bounds
export function destroy_bullet(bullet) {
    if (bullet.x <= Game.BULLET_BOUNDS.LEFT || bullet.x >= Game.BULLET_BOUNDS.RIGHT) {
        Game.bullets.delete(bullet)
        bullet.destroy()
    } else {
        for (let platform of Game.platforms.platforms) {
            if (Game.are_colliding({ x: bullet.x - bullet.length / 2, y: bullet.y - bullet.height / 2, length: bullet.length, height: bullet.height }, { x: platform.x, y: platform.y, length: platform.length, height: platform.height })) {
                bullet.explode()
                Game.bullets.delete(bullet)
                bullet.destroy()
            }
        }
    }
}

// Checks if a bullet is colliding with a player
export function check_bullet_collisions(player) {
    for (let bullet of Game.bullets) {
        let collision = Game.are_colliding(
            { x: bullet.x, y: bullet.y, length: bullet.length, height: bullet.height },
            { x: player.x - player.length / 2, y: player.y - player.height / 2, length: player.length, height: player.height }
        )

        if (collision && player.id != bullet.belongs_to && !player.invincible) {
            player.knockback_direction = bullet.direction
            player.action_times.knockback = Game.current_frame.time

            bullet.explode()
            Game.bullets.delete(bullet)
            bullet.destroy()
        }
    }
}

// Check if two players are colliding 
export function check_player_collisions(player) {
    for (let other_player of Game.players) {
        if (player == other_player) {
            continue
        }

        if (Game.are_colliding(
            { x: player.x, y: player.y, length: player.length, height: player.height },
            { x: other_player.x, y: other_player.y, length: other_player.length, height: other_player.height }
        )) {
            let middle_point = (player.x + other_player.x) / 2

            player.bump_direction = Game.LEFT

            if (player.x > middle_point) {
                player.bump_direction = Game.RIGHT
            }

            player.action_times.bump = Game.current_frame.time
        }
    }
}
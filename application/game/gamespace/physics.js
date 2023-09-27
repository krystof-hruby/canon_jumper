import * as Game from '../game.js'

// PHYSICS FORMULAS

// Calculates gravity force over time
export function calculate_gravity(time) {
    return -(Game.calculate_delta_time(time) * Game.GRAVITY_STRENGTH / 10000000)
}

// Calculates slide; goes from movement speed to 0 (0 == end of slide)
export function calculate_slide(time) {
    return Game.calculate_decay(Game.MOVEMENT_SPEED / 1000, Game.SLIDE_LENGTH, Game.calculate_delta_time(time))
}

// Calculates jump force; goes from jump strength to 0 (0 == end of jump)
export function calculate_jump(time) {
    return Game.calculate_decay(Game.JUMP_STRENGTH / 1000, Game.JUMP_LENGTH, Game.calculate_delta_time(time))
}

// Calculate knockback force; goes from knockback strength to 0 (0 == end of knockback)
export function calculate_knockback(time) {
    return Game.calculate_decay(Game.KNOCKBACK_STRENGTH / 1000, Game.KNOCKBACK_LENGTH, Game.calculate_delta_time(time))
}

// Calculate recoil force
export function calculate_recoil(time) {
    return Game.calculate_decay(Game.RECOIL_STRENGTH / 1000, Game.RECOIL_LENGTH, Game.calculate_delta_time(time))
}

// Calculate bump force
export function calculate_bump(time) {
    return Game.calculate_decay(Game.BUMP_STRENGTH / 1000, Game.BUMP_LENGTH, Game.calculate_delta_time(time))
}

//==================================================================================

// MUST be called before check_platform_collisions()
export function apply_gravity(player) {
    if (!player.grounded) {
        player.y += Game.calculate_gravity(player.action_times.fall) * Game.delta_time()
    }
}

// L-R movement and sliding
export function move_player(player) {
    if (player.movement_direction == Game.NO_DIRECTION) {
        // Slide player
        if (player.was_moving_last_frame) {
            player.action_times.slide = Game.elapsed_time()
        }
        if (Game.calculate_delta_time(player.action_times.slide) <= Game.SLIDE_LENGTH) {
            player.x += Game.calculate_slide(player.action_times.slide) * Game.delta_time() * player.facing // player.facing is the last direction the player moved in
        }
        player.was_moving_last_frame = false
    } else {
        player.x += (Game.MOVEMENT_SPEED / 1000) * player.movement_direction * Game.delta_time()
        player.was_moving_last_frame = true
    }
}

// Handles jumping
export function jump_player(player) {
    if (player.jumping) {
        // If player is grounded (or in coyote time) -> can jump
        if (player.grounded || (Game.calculate_delta_time(player.action_times.coyote_time) <= Game.COYOTE_TIME_LENGTH)) {
            player.action_times.jump = Game.current_frame.time
            player.action_times.coyote_time = -Game.INFINITY
            player.spawn_jumping_particles()
        }
    }

    if (Game.calculate_delta_time(player.action_times.jump) <= Game.JUMP_LENGTH) {
        player.y += Game.calculate_jump(player.action_times.jump) * Game.delta_time()
    }
}

// Apply knockback force when hit by bullet
export function knockback_player(player) {
    player.x += Game.calculate_knockback(player.action_times.knockback) * player.knockback_direction * Game.delta_time()

    if (Game.calculate_delta_time(player.action_times.knockback) >= Game.KNOCKBACK_LENGTH) {
        player.knockback_direction = Game.NO_DIRECTION
    }
}

// Apply recoil force when shooting a bullet
export function recoil_player(player) {
    player.x += Game.calculate_recoil(player.action_times.recoil) * player.recoil_direction * Game.delta_time()

    if (Game.calculate_delta_time(player.action_times.recoil) >= Game.RECOIL_LENGTH) {
        player.recoil_direction = Game.NO_DIRECTION
    }
}

// Apply bump when players collide
export function bump_player(player) {
    player.x += Game.calculate_bump(player.action_times.bump) * player.bump_direction * Game.delta_time()

    if (Game.calculate_delta_time(player.action_times.bump) >= Game.BUMP_LENGTH) {
        player.bump_direction = Game.NO_DIRECTION
    }
}

// Spawns particles for player actions
export function spawn_player_particles(player) {
    if (player.grounded) {
        if (player.movement_direction != Game.NO_DIRECTION) {
            player.spawn_walkingparticle(player.movement_direction * -1)
        } else if (player.recoil_direction != Game.NO_DIRECTION) {
            player.spawn_walkingparticle(player.recoil_direction)
        } else if (player.knockback_direction != Game.NO_DIRECTION) {
            player.spawn_walkingparticle(player.knockback_direction)
        }

        if (player.was_in_the_air_last_frame) {
            player.spawn_jumping_particles()
            player.was_in_the_air_last_frame = false
        }
    }
}
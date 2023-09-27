import * as Game from '../game.js'

// Updates player states based on current input
export function check_input() {
    for (let player of Game.players) {
        // L-R movement
        if (!player.input.left && !player.input.right) {
            player.movement_direction = Game.NO_DIRECTION
            player.both_movement_keys_pressed = false
        } else {
            if (player.input.left && player.input.right) {
                // Move player according to the last key pressed, even when they hold two keys at the same time
                if (!player.both_movement_keys_pressed) {
                    if (player.last_movement_direction == Game.LEFT) {
                        player.last_movement_direction = Game.RIGHT
                    } else {
                        player.last_movement_direction = Game.LEFT
                    }

                    player.both_movement_keys_pressed = true
                }
            } else if (player.input.left) {
                player.last_movement_direction = Game.LEFT
                player.both_movement_keys_pressed = false
            } else if (player.input.right) {
                player.last_movement_direction = Game.RIGHT
                player.both_movement_keys_pressed = false
            }

            player.movement_direction = player.last_movement_direction
            player.facing = player.last_movement_direction
        }


        // Dropping
        player.dropping = player.input.drop

        // Jumping
        player.jumping = player.input.jump

        // Shooting
        player.shooting = player.input.shoot
    }
}
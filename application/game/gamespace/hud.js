import * as Game from '../game.js'

// Updates position-chevrons according to player position
export function update_hud(player) {
    // Position markers
    let chevron = Game.player_huds[player.id].position_chevron

    if (player.dead) {
        chevron.x = Game.INFINITY
    } else if (player.y > Game.CHEVRON_SPAWNING_BOUNDS.TOP) {
        chevron.change_facing_direction(Game.UP)
        chevron.y = Game.CHEVRON_POSITION.TOP
        chevron.x = player.x - player.length / 2
        correct_position(chevron)
    } else if (player.y < Game.CHEVRON_SPAWNING_BOUNDS.BOTTOM) {
        chevron.change_facing_direction(Game.DOWN)
        chevron.y = Game.CHEVRON_POSITION.BOTTOM
        chevron.x = player.x + player.length / 2
        correct_position(chevron)
    }
    else if (player.x > Game.CHEVRON_SPAWNING_BOUNDS.RIGHT) {
        chevron.change_facing_direction(Game.RIGHT)
        chevron.x = Game.CHEVRON_POSITION.RIGHT
        chevron.y = player.y + player.height / 2
        correct_position(chevron)
    } else if (player.x < Game.CHEVRON_SPAWNING_BOUNDS.LEFT) {
        chevron.change_facing_direction(Game.LEFT)
        chevron.x = Game.CHEVRON_POSITION.LEFT
        chevron.y = player.y - player.height / 2
        correct_position(chevron)
    } else {
        // Player is inside screen bounds
        chevron.x = Game.INFINITY
    }
}

function correct_position(chevron) {
    if (chevron.x > Game.CHEVRON_POSITION.RIGHT) {
        chevron.x = Game.CHEVRON_POSITION.RIGHT
    } else if (chevron.x < Game.CHEVRON_POSITION.LEFT) {
        chevron.x = Game.CHEVRON_POSITION.LEFT
    } else if (chevron.y > Game.CHEVRON_POSITION.TOP) {
        chevron.y = Game.CHEVRON_POSITION.TOP
    } else if (chevron.y < Game.CHEVRON_POSITION.BOTTOM) {
        chevron.y = Game.CHEVRON_POSITION.BOTTOM
    }
}
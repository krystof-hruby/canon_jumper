import * as Game from '../game.js'

// Dynamically creates event listeners for input keys
// Has to detect keydown and keyup to allow for multiple keys pressed at the same time
export function create_input_events(players) {
    for (let player of players) {
        for (let keycode of Object.keys(player.control_scheme)) {
            document.addEventListener('keydown', function (event) {
                if (event.code == player.control_scheme[keycode]) {
                    player.input[keycode] = true
                }
            })

            document.addEventListener('keyup', function (event) {
                if (event.code == player.control_scheme[keycode]) {
                    player.input[keycode] = false
                }
            })
        }
    }

    document.addEventListener('keydown', function (event) {
        if (event.code == Game.RESET_KEY) {
            reset.reset = true
        }
    })

    document.addEventListener('keyup', function (event) {
        if (event.code == Game.RESET_KEY) {
            reset.reset = false
        }
    })
}

class Reset { reset = false }
export let reset = new Reset()
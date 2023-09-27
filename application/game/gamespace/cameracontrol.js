import * as Game from '../game.js'

// Dynamically moves and zooms the camera depending on players' positions
export function move_camera() {
    if (Game.number_of_players_alive < 1) {
        return // Would break camera movement if there are no players alive
    }

    let rightest_x = -Game.INFINITY
    let leftest_x = Game.INFINITY
    let topest_y = -Game.INFINITY
    let bottomest_y = Game.INFINITY

    for (let player of Game.players) {
        if (!player.dead) {
            if (player.x > rightest_x) {
                rightest_x = player.x
            }
            if (player.x < leftest_x) {
                leftest_x = player.x
            }
            if (player.y > topest_y) {
                topest_y = player.y
            }
            if (player.y < bottomest_y) {
                bottomest_y = player.y
            }
        }
    }

    // Zooming
    let distance_x = rightest_x - leftest_x
    Game.perspective_camera.position.z = distance_x / 4 + 20

    // Movement
    let camera_x = Game.perspective_camera.position.x
    let center_x = (rightest_x + leftest_x) / 2

    if (center_x > Game.CAMERA_BOUNDS.RIGHT) {
        center_x = Game.CAMERA_BOUNDS.RIGHT
    } else if (center_x < Game.CAMERA_BOUNDS.LEFT) {
        center_x = Game.CAMERA_BOUNDS.LEFT
    }

    let movement_x = 0
    if (camera_x > center_x) {
        movement_x = (camera_x - center_x) * Game.LEFT * (Game.CAMERA_SPEED.X / 10000)
    } else if (camera_x < center_x) {
        movement_x = (center_x - camera_x) * Game.RIGHT * (Game.CAMERA_SPEED.X / 10000)
    }

    Game.perspective_camera.position.x += movement_x * Game.delta_time()


    let camera_y = Game.perspective_camera.position.y
    let center_y = (topest_y + bottomest_y) / 2 + 9

    if (center_y > Game.CAMERA_BOUNDS.TOP) {
        center_y = Game.CAMERA_BOUNDS.TOP
    } else if (center_y < Game.CAMERA_BOUNDS.BOTTOM) {
        center_y = Game.CAMERA_BOUNDS.BOTTOM
    }

    let movement_y = 0
    if (camera_y > center_y) {
        movement_y = (camera_y - center_y) * Game.LEFT * (Game.CAMERA_SPEED.Y / 10000)
    } else if (camera_y < center_y) {
        movement_y = (center_y - camera_y) * Game.RIGHT * (Game.CAMERA_SPEED.Y / 10000)
    }

    Game.perspective_camera.position.y += movement_y * Game.delta_time()
}

// Performs a camera shake effect
export class CameraShake {
    last_shake_time = -Game.INFINITY
    strength = 50
    speed = 1 // percent
    length = 1
}
export let camera_shake = new CameraShake()

export function shake_camera() {
    if (Game.calculate_delta_time(camera_shake.last_shake_time) <= Game.camera_shake.length * Game.SECOND) {
        Game.perspective_camera.position.x += Math.sin(Game.current_frame.time * Game.camera_shake.speed) * (Game.camera_shake.strength / 10000) * Game.delta_time()
        Game.perspective_camera.position.y += Math.sin(Game.current_frame.time * Game.camera_shake.speed) * (Game.camera_shake.strength / 10000) * Game.delta_time()
    }
}
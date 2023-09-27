import * as Game from '../game.js'

export class HUD_Heart extends Game.HUDObject {
    remove_time = 0
    done_animating = false

    constructor(colour) {
        super()
        this.mesh = create_hud_heart_mesh(colour)
    }

    animate() {
        if (Game.calculate_delta_time(this.remove_time) <= Game.HEART_ANIMATION_LENGTH) {
            this.mesh.material.opacity = (Game.calculate_decay(1, Game.HEART_ANIMATION_LENGTH, Game.calculate_delta_time(this.remove_time)))
        } else if (this.remove_time != 0) {
            this.done_animating = true
        }
    }
}

function create_hud_heart_mesh(colour) {
    // Shape design from three.js website
    let heart_shape = new Game.Shape()
    let x = 0
    let y = 0
    heart_shape.moveTo(x + 5, y + 5)
    heart_shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y)
    heart_shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7)
    heart_shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19)
    heart_shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7)
    heart_shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y)
    heart_shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5)
    let geometry = new Game.ShapeGeometry(heart_shape, 15)

    let material = new Game.MeshBasicMaterial({ color: colour })
    material.transparent = true

    let mesh = new Game.Mesh(geometry, material)

    mesh.scale.setScalar(0.05)
    mesh.rotation.z = Math.PI

    return mesh
}
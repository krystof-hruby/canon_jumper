import * as Game from '../game.js'

export class ResetHUD extends Game.HUDObject {
    geometry = null
    spawn_time_delay = 1 * Game.SECOND

    constructor() {
        super()

        this.x = Game.RESET_HUD_POSITION.X
        this.y = Game.RESET_HUD_POSITION.Y
        this.z = Game.RESET_HUD_POSITION.Z

        let loader = new Game.FontLoader()
        loader.load('../../fonts/bauhaus93regular.json', function (font) {
            // Loads asynchronously - cannot access with "this"
            Game.resethud.geometry = new Game.TextGeometry('PRESS SPACE TO RESET', {
                font: font,
                size: 0.5,
                height: 0.1,
                curveSegments: 12,
            })
        })
    }

    spawn(player) {
        let material = new Game.MeshBasicMaterial({ color: player.colour })
        material.transparent = true
        material.opacity = 0
        let geometry = this.geometry
        this.mesh = new Game.Mesh(geometry, material)
        this.add_to_scene()
    }

    animate() {
        if (Game.calculate_delta_time(Game.winnerhud.spawn_time + this.spawn_time_delay) <= Game.WINNER_HUD_ANIMATION_LENGTH) {
            this.mesh.material.opacity = 1 - (Game.calculate_decay(1, Game.WINNER_HUD_ANIMATION_LENGTH, Game.calculate_delta_time(Game.winnerhud.spawn_time + this.spawn_time_delay)))
        } else {
            this.mesh.material.opacity = 1
        }
    }

    delete() {
        this.remove_from_scene()
        this.mesh = null
    }
}
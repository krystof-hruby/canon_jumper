import * as Game from '../game.js'

export class WinnerHUD extends Game.HUDObject {
    geometries = []
    is_spawned = false
    spawn_time = 1

    constructor() {
        super()

        this.x = Game.WINNER_HUD_POSITION.X
        this.y = Game.WINNER_HUD_POSITION.Y
        this.z = Game.WINNER_HUD_POSITION.Z

        let loader = new Game.FontLoader()
        loader.load('../../fonts/bauhaus93regular.json', function (font) {
            // Loads asynchronously - cannot access with "this"
            Game.winnerhud.geometries.push(new Game.TextGeometry('PLAYER 1 WINS', {
                font: font,
                size: 2,
                height: 1,
                curveSegments: 12,
            }))
            Game.winnerhud.geometries.push(new Game.TextGeometry('PLAYER 2 WINS', {
                font: font,
                size: 2,
                height: 1,
                curveSegments: 12,
            }))
            Game.winnerhud.geometries.push(new Game.TextGeometry('PLAYER 3 WINS', {
                font: font,
                size: 2,
                height: 1,
                curveSegments: 12,
            }))
            Game.winnerhud.geometries.push(new Game.TextGeometry('PLAYER 4 WINS', {
                font: font,
                size: 2,
                height: 1,
                curveSegments: 12,
            }))
        })
    }

    spawn(player) {
        let material = new Game.MeshBasicMaterial({ color: player.colour })
        material.transparent = true
        material.opacity = 0
        let geometry = this.geometries[player.id]
        this.mesh = new Game.Mesh(geometry, material)
        this.is_spawned = true
        this.spawn_time = Game.current_frame.time
        this.add_to_scene()
    }

    delete() {
        this.remove_from_scene()
        this.mesh = null
    }

    animate() {
        if (Game.calculate_delta_time(this.spawn_time) <= Game.WINNER_HUD_ANIMATION_LENGTH) {
            this.mesh.material.opacity = 1 - (Game.calculate_decay(1, Game.WINNER_HUD_ANIMATION_LENGTH, Game.calculate_delta_time(this.spawn_time)))
        } else {
            this.mesh.material.opacity = 1
        }
    }
}
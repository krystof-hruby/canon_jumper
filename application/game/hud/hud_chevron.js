import * as Game from '../game.js'

export const UP = 2
export const DOWN = 3

export class HUD_Chevron extends Game.GameObject {
    facing = Game.UP

    constructor(player) {
        super()
        this.x = Game.INFINITY // Puts outside of the screen
        this.z = Game.GROUND_Z + ((player.id + 1) / 100)
        this.mesh = create_hud_chevron_mesh(player.colour)
        this.change_facing_direction(this.facing)
    }

    change_facing_direction(direction) {
        switch (direction) {
            case Game.LEFT:
                this.mesh.rotation.z = Math.PI / 4
                break
            case Game.RIGHT:
                this.mesh.rotation.z = Math.PI + Math.PI / 4
                break
            case Game.UP:
                this.mesh.rotation.z = -Math.PI / 4
                break
            case Game.DOWN:
                this.mesh.rotation.z = Math.PI - Math.PI / 4
                break
        }
    }
}

function create_hud_chevron_mesh(colour) {
    let chevron_shape = new Game.Shape()
    let x = 0
    let y = 0
    chevron_shape.lineTo(x + 1, y + 1)
    chevron_shape.lineTo(x, y + 1)

    let geometry = new Game.ShapeGeometry(chevron_shape, 15)
    let material = new Game.MeshBasicMaterial({ color: colour })
    let mesh = new Game.Mesh(geometry, material)
    mesh.scale.setScalar(1)
    return mesh
}
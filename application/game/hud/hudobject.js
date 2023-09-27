import * as Game from '../game.js'

export class HUDObject {
    x = 0
    y = 0
    z = 0

    length = 0
    height = 0
    depth = 0

    mesh = null

    add_to_scene() {
        if (this.mesh != null) {
            this.update_mesh()
            Game.scene_hud.add(this.mesh)
        }
    }
    remove_from_scene() {
        if (this.mesh != null) {
            Game.scene_hud.remove(this.mesh)
        }
    }

    update_mesh() {
        if (this.mesh != null) {
            this.mesh.position.x = this.x
            this.mesh.position.y = this.y
            this.mesh.position.z = this.z
        }
    }
}
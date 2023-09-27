import * as Game from '../game.js'

// Renders objects on screen according to their positions
export function render() {
    update_meshes()

    Game.renderer.clear()
    Game.renderer.render(Game.scene, Game.perspective_camera);
    Game.renderer.render(Game.scene_hud, Game.orthographic_camera);
}

function update_meshes() {
    for (let player of Game.players) {
        player.update_mesh()
        // Change player mesh rotation
        if (player.facing == Game.RIGHT) {
            player.mesh.rotation.y = 2 * Math.PI
            player.canon_mesh.rotation.y = 2 * Math.PI
        } else {
            player.mesh.rotation.y = Math.PI
            player.canon_mesh.rotation.y = Math.PI
        }
    }

    for (let bullet of Game.bullets) {
        bullet.update_mesh()
    }

    for (let particle of Game.particles) {
        particle.update_mesh()
    }

    for (let hud of Game.player_huds) {
        hud.position_chevron.update_mesh()
    }

    for (let platform of Game.environment) {
        platform.update_mesh()
    }
}
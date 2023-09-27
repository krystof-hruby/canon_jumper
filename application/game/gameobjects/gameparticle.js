import * as Game from '../game.js'

export class GameParticle extends Game.GameObject {
    animate(time) { }

    destroy() {
        this.remove_from_scene()
        this.mesh = null
    }
}
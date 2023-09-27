import * as Game from '../game.js'

export class PlayerHUD {
    belongs_to = null

    hearts = []
    position_chevron = null

    constructor(player) {
        this.belongs_to = player

        for (let i = 0; i < player.health; i++) {
            let heart = new Game.HUD_Heart(player.colour)
            this.hearts.push(heart)
            heart.x = Game.HUD_POSITION[player.id].X + (i * Game.HEART_SPREAD)
            heart.y = Game.HUD_POSITION[player.id].Y
            heart.z = Game.HUD_POSITION[player.id].Z
            heart.add_to_scene()
        }

        this.position_chevron = new Game.HUD_Chevron(player)
        this.position_chevron.add_to_scene()
    }

    remove_heart(number) {
        this.hearts[number].remove_time = Game.current_frame.time
    }

    animate() {
        for (let heart of this.hearts) {
            if (heart.done_animating) {
                this.hearts.pop()
            } else {
                heart.animate()
            }
        }
    }
}
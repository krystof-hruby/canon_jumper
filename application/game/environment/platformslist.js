import * as Game from '../game.js'

// Manages hitbox platforms
export class PlatformsList {
    // List since we only iterate - O(n)
    platforms =
        [
            new Platform(-5, 4, 6, 0.5),
            new Platform(-7, -5, 14, 0.5),
            new Platform(7, -3, 5, 0.5),
            new Platform(14, 0, 4, 0.5),
            new Platform(5.5, 2.5, 5, 0.5),
        ]

    enabled_platforms = []

    constructor() {
        for (let i = 0; i < Game.NUMBER_OF_PLAYERS; i++) {
            // Sets since we check for items - O(1)
            this.enabled_platforms.push(new Set())
        }
    }
}

class Platform {
    x = 0
    y = 0
    length = 0
    height = 0

    constructor(x, y, length, height) {
        // Because the three.js puts coordinates in the middle instead of left-down corner
        this.x = x - (length / 2)
        this.y = y - (height / 2)

        this.length = length
        this.height = height
    }
}
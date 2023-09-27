import * as Game from '../game.js'

export const lights =
    [
        // Main front light
        { x: 0, y: 15, z: 5, light: new Game.SpotLight(0xffffff, 0.5, 0, Math.PI / 2, 0.1), spotlight: true }, // idk why but does not cast player shadows
        { x: 0, y: 15, z: 10, light: new Game.PointLight(0xffffff, 0.5), spotlight: false },
    ]
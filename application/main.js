import * as Game from './game/game.js'

// GAMELOOP
Game.initialize()

function gameloop() {
    requestAnimationFrame(gameloop);
    Game.check_input()
    Game.update()
    Game.render()

    Game.calculate_fps()
} gameloop();
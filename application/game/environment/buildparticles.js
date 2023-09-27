import * as Game from '../game.js'

export function build_particles() {
    for (let particle of fireparticles) {
        particle.spawn()
    }
}

let fireparticles =
    [
        // Platform top
        new Game.FireParticle(-5, 1.7, -2.5, 0.1),
        new Game.FireParticle(-5, 1.7, -2.5, 0.1),
        new Game.FireParticle(-5, 1.7, -2.5, 0.1),
        new Game.FireParticle(-5, 1.7, -2.5, 0.1),
        new Game.FireParticle(-5, 1.7, -2.5, 0.1),
        new Game.FireParticle(-5, 1.7, -2.5, 0.1),
        new Game.FireParticle(-5, 1.7, -2.5, 0.1),

        // Platform bottom
        new Game.FireParticle(-14, -6.8, -3, 0.2),
        new Game.FireParticle(-14, -6.8, -3, 0.2),
        new Game.FireParticle(-14, -6.8, -3, 0.2),
        new Game.FireParticle(-14, -6.8, -3, 0.2),
        new Game.FireParticle(-14, -6.8, -3, 0.2),

        new Game.FireParticle(-14, -6.8, 3, 0.2),
        new Game.FireParticle(-14, -6.8, 3, 0.2),
        new Game.FireParticle(-14, -6.8, 3, 0.2),
        new Game.FireParticle(-14, -6.8, 3, 0.2),
        new Game.FireParticle(-14, -6.8, 3, 0.2),

        new Game.FireParticle(0, -6.8, -3, 0.2),
        new Game.FireParticle(0, -6.8, -3, 0.2),
        new Game.FireParticle(0, -6.8, -3, 0.2),
        new Game.FireParticle(0, -6.8, -3, 0.2),
        new Game.FireParticle(0, -6.8, -3, 0.2),

        new Game.FireParticle(0, -6.8, 3, 0.2),
        new Game.FireParticle(0, -6.8, 3, 0.2),
        new Game.FireParticle(0, -6.8, 3, 0.2),
        new Game.FireParticle(0, -6.8, 3, 0.2),
        new Game.FireParticle(0, -6.8, 3, 0.2),

        // Platforms right
        new Game.FireParticle(11, -12.9, -5.9, 0.2),
        new Game.FireParticle(11, -12.9, -5.9, 0.2),
        new Game.FireParticle(11, -12.9, -5.9, 0.2),
        new Game.FireParticle(11, -12.9, -5.9, 0.2),
        new Game.FireParticle(11, -12.9, -5.9, 0.2),
        new Game.FireParticle(11, -12.9, -5.9, 0.2),
        new Game.FireParticle(11, -12.9, -5.9, 0.2),
    ]
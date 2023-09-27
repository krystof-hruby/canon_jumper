// General
export const SECOND = 1000 // milliseconds; do not modify
export const INFINITY = 100000 // do not modify

// Game
export const RESET_KEY = "Space"
export const MESH_QUALITY = 20

// Testing - set all to false when not debugging
export const VISUALIZE_HITBOXES = false
export const ORBIT_CONTROLS = false // also disables camera movement

// Environment
export const SCREEN_CENTRE = { X: 0, Y: 0 }
export const GROUND_Z = 0
export const DEATH_ZONE = -50

// Camera
export const CAMERA_SPAWNPOS = { X: 0, Y: 9, Z: 26 }
export const CAMERA_LOOKAT = { X: 0, Y: 0, Z: 0 }
export const CAMERA_SPEED = { X: 20, Y: 5 }
export const CAMERA_BOUNDS = { LEFT: -10, RIGHT: 10, TOP: 15, BOTTOM: 5 }

// Players
export const NUMBER_OF_PLAYERS = 4
export const CONTROL_SCHEMES =
    [
        // Player 1
        {
            left: "KeyA",
            right: "KeyD",
            jump: "KeyW",
            drop: "KeyS",
            shoot: "KeyR",
        },
        // Player 2
        {
            left: "KeyJ",
            right: "KeyL",
            jump: "KeyI",
            drop: "KeyK",
            shoot: "KeyP",
        },
        // Player 3
        {
            left: "KeyF",
            right: "KeyH",
            jump: "KeyT",
            drop: "KeyG",
            shoot: "KeyU",
        },
        // Player 4
        {
            left: "ArrowLeft",
            right: "ArrowRight",
            jump: "ArrowUp",
            drop: "ArrowDown",
            shoot: "KeyN",
        },
    ]
export const PLAYER_SPANWPOS = { X_BOUNDS: { LEFT: -10, RIGHT: 10 }, Y: 30, Z: GROUND_Z }
export const INVINCIBILITY_LENGTH = 5 * SECOND
export const MAX_HEALTH = 3

// Physics
export const GRAVITY_STRENGTH = 150
export const MOVEMENT_SPEED = 7
export const SLIDE_LENGTH = 0.25 * SECOND
export const BUMP_LENGTH = 0.01 * SECOND
export const BUMP_STRENGTH = 10
export const JUMP_STRENGTH = 15
export const JUMP_LENGTH = 0.8 * SECOND
export const MIN_JUMP_LENGTH = 0.2 * SECOND
export const HOVER_LENGTH = 0.1 * SECOND
export const COYOTE_TIME_LENGTH = 0.1 * SECOND

// Bullets
export const BULLET_BOUNDS = { LEFT: -30, RIGHT: 30 }
export const BULLET_SIZE = { LENGTH: 0.45, HEIGHT: 0.3, DEPTH: 0.3 }
export const BULLET_SPAWNPOS = 0.7 // in relation to player
export const BULLET_SPEED = 17
export const RELOAD_TIME = 0.5 * SECOND
export const KNOCKBACK_LENGTH = 0.7 * SECOND
export const KNOCKBACK_STRENGTH = 45
export const RECOIL_LENGTH = 0.5 * SECOND
export const RECOIL_STRENGTH = 10
export const CANON_RECOIL_LENGTH = 0.2 * SECOND
export const CANON_RECOIL_STRENGTH = 10

// Particles
export const BULLET_PARTICLE_FREQUENCY = 0.1 * SECOND
export const BULLET_PARTICLE_ANIMATION_LENGTH = 0.6 * SECOND

export const CANON_PARTICLE_ANIMATION_LENGTH = 0.5 * SECOND
export const CANONFIRE_PARTICLE_ANIMATION_LENGTH = 0.2 * SECOND

// HUD
export const HUD_Z = 4
export const HUD_POSITION =
    [
        // Player 1
        { X: -12, Y: -7, Z: HUD_Z },
        // Player 2
        { X: 9, Y: -7, Z: HUD_Z },
        // Player 3
        { X: -5, Y: -7, Z: HUD_Z },
        // Player 4
        { X: 2, Y: -7, Z: HUD_Z },
    ]
export const HEART_SPREAD = 1.5
export const HEART_ANIMATION_LENGTH = 0.3 * SECOND
export const CHEVRON_POSITION = { LEFT: -30, RIGHT: 30, TOP: 8, BOTTOM: -6 }
export const CHEVRON_SPAWNING_BOUNDS = { LEFT: -40, RIGHT: 40, TOP: 15, BOTTOM: -20 }
export const WINNER_HUD_POSITION = { X: -8.8, Y: 0, Z: 0 }
export const RESET_HUD_POSITION = { X: -3.2, Y: -1.1, Z: 0 }
export const WINNER_HUD_ANIMATION_LENGTH = 1 * SECOND
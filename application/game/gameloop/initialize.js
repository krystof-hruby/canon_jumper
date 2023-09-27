import * as Game from '../game.js'

export let scene = new Game.Scene()
export let scene_hud = new Game.Scene()

// The environment uses perspective camera, the HUD uses an orthographic camera 
let aspect_ratio = window.innerWidth / window.innerHeight
export let perspective_camera = new Game.PerspectiveCamera(45, aspect_ratio, 1, 1000) // FOV, aspect ratio, near plane, far plane
let view_size = 18
export let orthographic_camera = new Game.OrthographicCamera(-aspect_ratio * view_size / 2, aspect_ratio * view_size / 2, view_size / 2, -view_size / 2, 1, 1000)

export let renderer = new Game.WebGLRenderer()

export let ambient_light = new Game.AmbientLight(0x666666)

export let players = []
export let bullets = new Set()
export let particles = new Set()
export let player_huds = []
export let winnerhud = new Game.WinnerHUD()
export let resethud = new Game.ResetHUD()

export let platforms = new Game.PlatformsList()

// Initializes the game
export function initialize() {
    // Initialize camera
    perspective_camera.position.set(Game.CAMERA_SPAWNPOS.X, Game.CAMERA_SPAWNPOS.Y, Game.CAMERA_SPAWNPOS.Z)
    perspective_camera.lookAt(Game.CAMERA_LOOKAT.X, Game.CAMERA_LOOKAT.Y, Game.CAMERA_LOOKAT.Z)
    scene.add(perspective_camera)

    orthographic_camera.position.set(0, 0, 100)
    orthographic_camera.lookAt(Game.CAMERA_LOOKAT.X, Game.CAMERA_LOOKAT.Y, Game.CAMERA_LOOKAT.Z)
    scene_hud.add(orthographic_camera)

    // Initialize renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    renderer.shadowMap.enabled = true
    renderer.autoClear = false

    // Add ambient light
    scene_hud.add(ambient_light)
    scene.add(ambient_light)

    // Build environment
    Game.build_environment()

    // Add lights
    Game.build_lights(Game.lights)

    // Add particles
    Game.build_particles(Game.particles)

    // Create and spawn players
    if (Game.NUMBER_OF_PLAYERS <= 1) {
        console.log("Less than 2 players (min number is 2)! The game will now break.")
    }

    for (let id = 0; id < Game.NUMBER_OF_PLAYERS; id++) {
        if (id >= 4) {
            console.log("Too many players (max number is 4)! Removing players above 4.")
            break // Too many players
        }
        let player = new Game.Player(id)
        player.control_scheme = Game.CONTROL_SCHEMES[id]

        players.push(player)
    }

    // Create events for accepting key input
    Game.create_input_events(players)

    // Build HUD
    for (let player of players) {
        let hud = new Game.PlayerHUD(player)
        player_huds.push(hud)
    }

    // Spawn players after everything is loaded
    for (let player of players) {
        player.spawn()
    }

    // Visualize platform hitboxes
    if (Game.VISUALIZE_HITBOXES) {
        for (let platform of platforms.platforms) {
            Game.draw_hitbox(platform.x, platform.y, platform.length, platform.height, -1)
        }

        let center_width = 0.5
        Game.draw_hitbox(Game.SCREEN_CENTRE.X - center_width / 2, Game.SCREEN_CENTRE.Y - center_width / 2, center_width, center_width)
    }

    // Orbit controls
    if (Game.ORBIT_CONTROLS) {
        var controls = new Game.OrbitControls(Game.perspective_camera, Game.renderer.domElement);
        controls.target.set(0, 0, 0);
        controls.update();
    }
}
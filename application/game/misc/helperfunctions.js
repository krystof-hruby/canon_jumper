import * as Game from '../game.js'

// Returns current time (in milliseconds)
export function elapsed_time() {
    return Date.now()
}

// Returns delta time
export function calculate_delta_time(start_time) {
    return Game.current_frame.time - start_time
}

export function delta_time() {
    return Game.current_frame.time - Game.last_frame.time
}

// Returns a random number between bounds (both sides inclusive)
export function get_random_number(min, max) {
    return Math.random() * (max - min) + min
}

// Returns true if objectA and objectB are colliding
export function are_colliding(objectA, objectB) {
    if (objectA.x + objectA.length >= objectB.x && objectA.x <= objectB.x + objectB.length) {
        if (objectA.y + objectA.length >= objectB.y && objectA.y <= objectB.y + objectB.height) {
            return true
        }
    }
    return false
}

// Decays value to zero over time
export function calculate_decay(value, length, time) {
    if (time <= length) {
        return value - (value * (time / length))
    } else {
        return 0
    }
}


// Calculates frames per second
let frames = 0
let last_second_time = Game.elapsed_time()
export function calculate_fps() {
    if (Game.elapsed_time() - last_second_time >= Game.SECOND) {
        console.log("FPS: " + frames)
        frames = 0
        last_second_time = Game.elapsed_time()
    }
    frames++
}

// Loads texture from a texture folder
const textures = '../../textures/'
export function load_texture(texture_filename) {
    let map_filename = textures + texture_filename + '/' + texture_filename + '.png'
    let map = new Game.TextureLoader().load(map_filename)
    return map


    // let material = []
    // for (let i = 0; i < 6; i++) {
    //     let map_filename = textures + texture_filename + '/' + texture_filename + '.png'
    //     let normal_filename = textures + texture_filename + '/' + texture_filename + '_normal.png'

    //     let map = new Game.TextureLoader().load(map_filename)
    //     let normal = new Game.TextureLoader().load(normal_filename)

    //     let side_material = new Game.MeshPhongMaterial({ map: map, normalMap: normal })
    //     material.push(side_material)
    // }
    // return material
}

// Draws hitboxes around objects
let lines = {}
const z = 0
export function draw_hitbox(x, y, length, height, player_id) {
    x = x + 0.005
    y = y + 0.005
    length = length + 0.005
    height = height + 0.005

    let material = new Game.LineBasicMaterial({ color: 0xff0000 })
    let points = []
    points.push(new Game.Vector3(x, y, z))
    points.push(new Game.Vector3(x, y + height, z))
    points.push(new Game.Vector3(x + length, y + height, z))
    points.push(new Game.Vector3(x + length, y, z))
    points.push(new Game.Vector3(x, y, z))
    let geometry = new Game.BufferGeometry().setFromPoints(points)

    let line = new Game.Line(geometry, material)
    Game.scene.add(line)

    if (player_id >= 0) {
        if (player_id in lines) {
            Game.scene.remove(lines[player_id])
        }
        lines[player_id] = line
    }
}
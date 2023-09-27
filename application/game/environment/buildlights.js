import * as Game from '../game.js'

export function build_lights() {
    for (let light_data of Game.lights) {
        let light = light_data.light
        light.position.x = light_data.x
        light.position.y = light_data.y
        light.position.z = light_data.z
        light.castShadow = true
        Game.scene.add(light)

        if (light_data.spotlight) {
            light.shadow.mapSize.height = 800
            light.shadow.camera.far = 800
        }
    }
}
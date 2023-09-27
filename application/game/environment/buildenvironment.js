import * as Game from '../game.js'

export const PLATFORM_LEFT = 0
export const PLATFORM_BOTTOM = 1
export const PLATFORMS = 2

export let environment = []

export function build_environment() {
    let environment_data =
        [
            { id: PLATFORM_LEFT, x: -5, y: 4, z: 0 },
            { id: PLATFORM_BOTTOM, x: -7, y: -5, z: 0 },
            { id: PLATFORMS, x: 11, y: -2, z: -6 },
        ]

    for (let object_data of environment_data) {
        let object = new Game.GameObject()

        object.mesh = create_environment_object_mesh(object_data.id)
        object.mesh.castShadow = true
        object.mesh.receiveShadow = true

        object.x = object_data.x
        object.y = object_data.y
        object.z = object_data.z

        object.add_to_scene()
        environment.push(object)
    }

    // Randomized low-poly background
    let background = new Game.GameObject()
    background.mesh = create_background_mesh()
    background.x = 0
    background.y = -50
    background.z = -150
    background.add_to_scene()
}

let environment_colour = 0xc0c0c0
function create_environment_object_mesh(id) {
    let mesh = null

    switch (id) {
        case Game.PLATFORM_LEFT:
            mesh = new Game.Mesh(new Game.BoxGeometry(6, 0.5, 3, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))

            let backside = new Game.Mesh(new Game.CylinderGeometry(3, 3, 0.5, Game.MESH_QUALITY, Game.MESH_QUALITY, false, Math.PI / 2, Math.PI), new Game.MeshPhongMaterial({ color: environment_colour }))
            backside.castShadow = true
            backside.receiveShadow = true
            backside.position.set(0, 0, -1.5)

            let thruster = new Game.Mesh(new Game.CylinderGeometry(1, 0.5, 1.5, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
            thruster.castShadow = true
            thruster.receiveShadow = true

            let bottom = new Game.Mesh(new Game.CylinderGeometry(0.5, 0.5, 0.25, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
            bottom.castShadow = true
            bottom.receiveShadow = true
            bottom.position.set(0, -0.8, 0)

            let mid = new Game.Mesh(new Game.CylinderGeometry(1, 1, 1, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
            mid.castShadow = true
            mid.receiveShadow = true
            mid.position.set(0, 1.25, 0)

            let top = new Game.Mesh(new Game.SphereGeometry(1, Game.MESH_QUALITY, Game.MESH_QUALITY, 0, Math.PI), new Game.MeshPhongMaterial({ color: environment_colour }))
            top.castShadow = true
            top.receiveShadow = true
            top.rotation.x = Math.PI + Math.PI / 2
            top.position.set(0, 1.75, 0)

            let side1 = new Game.Mesh(new Game.BoxGeometry(1.2, 1.2, 0.5, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
            side1.castShadow = true
            side1.receiveShadow = true
            side1.rotation.z = Math.PI / 4
            side1.position.set(-0.9, 1.3, 0)

            let side2 = new Game.Mesh(new Game.BoxGeometry(1.2, 1.2, 0.5, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
            side2.castShadow = true
            side2.receiveShadow = true
            side2.rotation.z = Math.PI / 4
            side2.position.set(0.9, 1.3, 0)

            let side3 = new Game.Mesh(new Game.BoxGeometry(1.2, 1.2, 0.5, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
            side3.castShadow = true
            side3.receiveShadow = true
            side3.rotation.z = Math.PI / 4
            side3.rotation.y = Math.PI / 2
            side3.position.set(0, 1.3, -0.9)

            let side4 = new Game.Mesh(new Game.BoxGeometry(1.2, 1.2, 0.5, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
            side4.castShadow = true
            side4.receiveShadow = true
            side4.rotation.z = Math.PI / 4
            side4.rotation.y = Math.PI / 2
            side4.position.set(0, 1.3, 0.9)

            thruster.add(bottom)
            thruster.add(top)
            thruster.add(mid)
            thruster.add(side1)
            thruster.add(side2)
            thruster.add(side3)
            thruster.add(side4)
            thruster.rotation.y = Math.PI / 4
            thruster.position.set(0, -1.25, -2.7)

            mesh.add(backside)
            mesh.add(thruster)
            break
        case Game.PLATFORM_BOTTOM:
            mesh = new Game.Mesh(new Game.BoxGeometry(14, 0.5, 5, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))

            let thruster1 = create_thruster_mesh()
            thruster1.rotation.y = -Math.PI / 3.25
            thruster1.position.set(-7, 0, -3)
            let thruster2 = create_thruster_mesh()
            thruster2.rotation.y = Math.PI / 3.25
            thruster2.position.set(-7, 0, 3)
            let thruster3 = create_thruster_mesh()
            thruster3.rotation.y = Math.PI + Math.PI / 3.25
            thruster3.position.set(7, 0, -3)
            let thruster4 = create_thruster_mesh()
            thruster4.rotation.y = -Math.PI - Math.PI / 3.25
            thruster4.position.set(7, 0, 3)

            mesh.add(thruster1)
            mesh.add(thruster2)
            mesh.add(thruster3)
            mesh.add(thruster4)
            break
        case Game.PLATFORMS:
            mesh = new Game.Mesh(new Game.CylinderGeometry(0.3, 0.3, 15, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))

            let cap = new Game.Mesh(new Game.SphereGeometry(0.3, Game.MESH_QUALITY, Game.MESH_QUALITY, 0, Math.PI), new Game.MeshPhongMaterial({ color: environment_colour }))
            cap.castShadow = true
            cap.receiveShadow = true
            cap.position.set(0, 7.5, 0)
            cap.rotation.x = Math.PI + Math.PI / 2

            let thruster_body = new Game.Mesh(new Game.CylinderGeometry(0.75, 0.75, 2, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
            thruster_body.castShadow = true
            thruster_body.receiveShadow = true

            let thruster_top = new Game.Mesh(new Game.CylinderGeometry(0.75, 0.3, 0.75, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
            thruster_top.castShadow = true
            thruster_top.receiveShadow = true
            thruster_top.rotation.x = Math.PI
            thruster_top.position.set(0, 1.38, 0)

            let thruster_bottom = new Game.Mesh(new Game.CylinderGeometry(0.75, 0.3, 0.75, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
            thruster_bottom.castShadow = true
            thruster_bottom.receiveShadow = true
            thruster_bottom.position.set(0, -1.38, 0)

            thruster_body.add(thruster_top)
            thruster_body.add(thruster_bottom)
            thruster_body.position.set(0, -9, 0)

            let platform1 = new Game.Mesh(new Game.BoxGeometry(5, 0.5, 3, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
            platform1.castShadow = true
            platform1.receiveShadow = true
            platform1.position.set(-4, -1, 6)
            let ring1 = create_ring_mesh()
            ring1.position.set(4, 0, -6)
            let ball1 = create_ball_mesh()
            ball1.position.set(0, 0, -1.7)
            let arm1 = create_arm_mesh(6)
            arm1.position.set(2, 0, -4)
            arm1.rotation.y = Math.PI / 4
            platform1.add(ring1)
            platform1.add(ball1)
            platform1.add(arm1)

            let platform2 = new Game.Mesh(new Game.BoxGeometry(5, 0.5, 3, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
            platform2.castShadow = true
            platform2.receiveShadow = true
            platform2.position.set(-5.5, 4.5, 6)
            let ring2 = create_ring_mesh()
            ring2.position.set(5.5, 0, -6)
            let ball2 = create_ball_mesh()
            ball2.position.set(0, 0, -1.7)
            let arm2 = create_arm_mesh(7)
            arm2.position.set(3, 0, -4)
            arm2.rotation.y = Math.PI / 4.8
            platform2.add(ring2)
            platform2.add(ball2)
            platform2.add(arm2)

            let platform3 = new Game.Mesh(new Game.BoxGeometry(4, 0.5, 3, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
            platform3.castShadow = true
            platform3.receiveShadow = true
            platform3.position.set(3, 2, 6)
            let ring3 = create_ring_mesh()
            ring3.position.set(-3, 0, -6)
            let ball3 = create_ball_mesh()
            ball3.position.set(0, 0, -1.7)
            let arm3 = create_arm_mesh(5.5)
            arm3.position.set(-1.5, 0, -4)
            arm3.rotation.y = - Math.PI / 3.2
            platform3.add(ring3)
            platform3.add(ball3)
            platform3.add(arm3)

            mesh.add(cap)
            mesh.add(thruster_body)
            mesh.add(platform1)
            mesh.add(platform2)
            mesh.add(platform3)

            break
    }

    return mesh
}

function create_ring_mesh() {
    let ring = new Game.Mesh(new Game.CylinderGeometry(0.5, 0.5, 0.5, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
    ring.castShadow = true
    ring.receiveShadow = true
    return ring
}

function create_ball_mesh() {
    let ball = new Game.Mesh(new Game.SphereGeometry(0.7, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
    ball.castShadow = true
    ball.receiveShadow = true
    return ball
}

function create_arm_mesh(length) {
    let arm = new Game.Mesh(new Game.BoxGeometry(length, 0.5, 0.5, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
    arm.castShadow = true
    arm.receiveShadow = true
    return arm
}

function create_thruster_mesh() {
    let thruster_height = 1.5
    let thruster = new Game.Mesh(new Game.CylinderGeometry(1, 1, thruster_height, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
    thruster.castShadow = true
    thruster.receiveShadow = true
    let cap = new Game.Mesh(new Game.SphereGeometry(1, Game.MESH_QUALITY, Game.MESH_QUALITY, 0, Math.PI), new Game.MeshPhongMaterial({ color: environment_colour }))
    cap.castShadow = true
    cap.receiveShadow = true
    cap.position.set(0, thruster_height / 2, 0)
    cap.rotation.x = Math.PI + Math.PI / 2
    let bottom_height = 1
    let bottom = new Game.Mesh(new Game.CylinderGeometry(1, 0.5, bottom_height, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
    bottom.position.set(0, -thruster_height / 2 - bottom_height / 2, 0)
    bottom.castShadow = true
    bottom.receiveShadow = true

    let side = new Game.Mesh(new Game.BoxGeometry(1.2, 1.2, 0.7, Game.MESH_QUALITY, Game.MESH_QUALITY), new Game.MeshPhongMaterial({ color: environment_colour }))
    side.castShadow = true
    side.receiveShadow = true
    side.rotation.z = Math.PI / 4
    side.position.set(0.9, 0, 0)

    thruster.add(bottom)
    thruster.add(cap)
    thruster.add(side)
    return thruster
}

let background_opacity = 0.1
let background_colour = 0x222222
function create_background_mesh() {
    let material = new Game.MeshPhongMaterial({ color: background_colour })
    material.transparent = true
    material.opacity = background_opacity
    let mesh = new Game.Mesh(new Game.PlaneGeometry(300, 150, 20, 20), material)

    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 16; j++) {
            let random_mesh = create_random_poly_mesh((i - 15) * 30, (j - 8) * 30, 0)
            mesh.add(random_mesh)
        }
    }

    return mesh
}

function create_random_poly_mesh(x, y, z) {
    let material = new Game.MeshPhongMaterial({ color: background_colour })
    material.transparent = true
    material.opacity = background_opacity

    let geometry = null
    let radius = Game.get_random_number(15, 30)
    let detail = 0

    let geometry_seed = Game.get_random_number(-1, 1)
    if (geometry_seed > 0) {
        geometry = new Game.IcosahedronGeometry(radius, detail)
    } else {
        geometry = new Game.DodecahedronGeometry(radius, detail)
    }

    let mesh = new Game.Mesh(geometry, material)

    mesh.rotation.x = Math.PI * Game.get_random_number(1, 5)
    mesh.rotation.y = Math.PI * Game.get_random_number(1, 5)
    mesh.rotation.z = Math.PI * Game.get_random_number(1, 5)

    mesh.position.set(x, y, z)

    return mesh
}
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export function Machine3DViewer({ machineId }) {
  const containerRef = useRef(null)
  const [activeHotspot, setActiveHotspot] = useState(null)
  const [isHoloMode, setIsHoloMode] = useState(false)
  const sceneRef = useRef(null)
  const modelGroupRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    let width = container.clientWidth || 600
    let height = container.clientHeight || 450
    if (height < 250) height = 450

    // 1. Scene & Camera
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 1.4, 5.2)
    camera.lookAt(0, 0.1, 0)

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)

    // 3. Lighting (Vibrant space studio lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xfff8ee, 3.6)
    sunLight.position.set(6, 8, 5)
    scene.add(sunLight)

    const fillLight = new THREE.DirectionalLight(0x7eebff, 1.8)
    fillLight.position.set(-6, -2, -4)
    scene.add(fillLight)

    const topLight = new THREE.DirectionalLight(0xffffff, 1.6)
    topLight.position.set(0, 8, 0)
    scene.add(topLight)

    // Cosmic Ground Grid Platform
    const gridHelper = new THREE.GridHelper(8, 16, 0x00f0ff, 0x1e3a5f)
    gridHelper.position.y = -1.15
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach(m => { m.transparent = true; m.opacity = 0.4 })
    } else {
      gridHelper.material.transparent = true
      gridHelper.material.opacity = 0.4
    }
    scene.add(gridHelper)

    // 4. Build 3D Model Group
    const modelGroup = new THREE.Group()
    modelGroupRef.current = modelGroup

    if (machineId === 'apollo-15-lrv') {
      buildApollo15Rover(modelGroup, isHoloMode)
    } else if (machineId === 'sojourner') {
      buildSojournerRover(modelGroup, isHoloMode)
    } else if (machineId === 'opportunity') {
      buildOpportunityRover(modelGroup, isHoloMode)
    } else {
      buildSurveyor3Lander(modelGroup, isHoloMode)
    }

    scene.add(modelGroup)

    // 5. Interactive Orbit & Drag Rotation
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    let targetRotationX = 0.2
    let targetRotationY = 0.6
    let currentRotationX = 0.2
    let currentRotationY = 0.6

    const onPointerDown = (e) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onPointerMove = (e) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevMouseX
      const deltaY = e.clientY - prevMouseY
      targetRotationY += deltaX * 0.008
      targetRotationX += deltaY * 0.008
      targetRotationX = Math.max(-0.6, Math.min(0.9, targetRotationX))
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onPointerUp = () => {
      isDragging = false
    }

    const domEl = renderer.domElement
    domEl.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    // ResizeObserver for reliable container sizing
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer || !camera) return
      const w = container.clientWidth
      const h = container.clientHeight
      if (w > 0 && h > 0) {
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
    })
    resizeObserver.observe(container)

    // 6. Animation Loop
    let animationFrameId
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      // Auto gentle spin when not dragging
      if (!isDragging) {
        targetRotationY += 0.004
      }

      currentRotationX += (targetRotationX - currentRotationX) * 0.08
      currentRotationY += (targetRotationY - currentRotationY) * 0.08

      modelGroup.rotation.x = currentRotationX
      modelGroup.rotation.y = currentRotationY

      // Gentle floating bob
      modelGroup.position.y = Math.sin(Date.now() * 0.0018) * 0.035

      camera.lookAt(0, 0.1, 0)
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      domEl.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      if (domEl.parentNode) domEl.parentNode.removeChild(domEl)
      renderer.dispose()
    }
  }, [machineId, isHoloMode])

  // Helper: Apollo 15 Rover 3D Model — Highly Detailed
  function buildApollo15Rover(group, holo) {
    const mk = (color, metalness = 0.8, roughness = 0.3, emissive = 0x000000) =>
      holo
        ? new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true })
        : new THREE.MeshStandardMaterial({ color, metalness, roughness, emissive })

    const goldFoil  = mk(0xe8a900, 0.92, 0.18)        // thermal gold blanket
    const aluminum  = mk(0xc8d6e8, 0.88, 0.22)        // machined aluminium
    const darkFrame = mk(0x1e2d40, 0.85, 0.42)        // anodized frame
    const tireMat   = mk(0xb0bec5, 0.75, 0.55)        // zinc piano wire
    const hubMat    = mk(0x455a64, 0.9, 0.3)          // steel hub
    const seatFoam  = mk(0xf5f5dc, 0.05, 0.85)        // fibreglass seat
    const lensGlass = mk(0x0d47a1, 0.3, 0.05, 0x001233) // camera lens glass

    // ── CHASSIS ──────────────────────────────────────────────────────────────
    // Main lower frame platform (thin, wide)
    const chassisGeo = new THREE.BoxGeometry(3.1, 0.14, 1.72)
    const chassis = new THREE.Mesh(chassisGeo, goldFoil)
    chassis.position.y = -0.28
    group.add(chassis)

    // Frame rails along each long edge (four aluminium tubes)
    const railPositions = [
      { x: 0, z:  0.86 }, { x: 0, z: -0.86 },
    ]
    railPositions.forEach(({ x, z }) => {
      const railGeo = new THREE.CylinderGeometry(0.055, 0.055, 3.1, 10)
      const rail = new THREE.Mesh(railGeo, aluminum)
      rail.rotation.z = Math.PI / 2
      rail.position.set(x, -0.19, z)
      group.add(rail)
    })
    // Cross members (3 ribs)
    for (let xi = -0.95; xi <= 0.95; xi += 0.95) {
      const ribGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.72, 8)
      const rib = new THREE.Mesh(ribGeo, aluminum)
      rib.rotation.x = Math.PI / 2
      rib.position.set(xi, -0.19, 0)
      group.add(rib)
    }

    // Equipment deck surface (thin box on top of frame)
    const deckGeo = new THREE.BoxGeometry(1.6, 0.06, 1.68)
    const deck = new THREE.Mesh(deckGeo, goldFoil)
    deck.position.set(0.1, -0.19, 0)
    group.add(deck)

    // ── WHEELS ───────────────────────────────────────────────────────────────
    const wheelPositions = [
      { x: -1.42, y: -0.6, z:  0.96 },
      { x:  1.42, y: -0.6, z:  0.96 },
      { x: -1.42, y: -0.6, z: -0.96 },
      { x:  1.42, y: -0.6, z: -0.96 },
    ]

    wheelPositions.forEach(pos => {
      const wg = new THREE.Group()
      wg.position.set(pos.x, pos.y, pos.z)

      // Outer wire rim cylinder
      const rimGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.25, 32)
      const rim = new THREE.Mesh(rimGeo, tireMat)
      rim.rotation.x = Math.PI / 2
      wg.add(rim)

      // 8 wire spokes from hub to rim
      for (let s = 0; s < 8; s++) {
        const a = (s / 8) * Math.PI * 2
        const spokeGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.42, 6)
        const spoke = new THREE.Mesh(spokeGeo, tireMat)
        spoke.position.set(Math.cos(a) * 0.21, 0, Math.sin(a) * 0.21)
        spoke.rotation.z = Math.PI / 2 - a
        spoke.rotation.x = Math.PI / 2
        wg.add(spoke)
      }

      // 2nd inner ring (rib ring)
      const innerRimGeo = new THREE.TorusGeometry(0.26, 0.022, 8, 24)
      const innerRim = new THREE.Mesh(innerRimGeo, tireMat)
      wg.add(innerRim)

      // 12 chevron tread bumps around outer rim
      for (let t = 0; t < 12; t++) {
        const ta = (t / 12) * Math.PI * 2
        const treadGeo = new THREE.BoxGeometry(0.07, 0.08, 0.26)
        const tread = new THREE.Mesh(treadGeo, aluminum)
        tread.position.set(Math.cos(ta) * 0.5, 0, Math.sin(ta) * 0.5)
        tread.rotation.y = ta + Math.PI / 12
        tread.rotation.x = Math.PI / 2
        wg.add(tread)
      }

      // Center hub disc
      const hubGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.28, 16)
      const hub = new THREE.Mesh(hubGeo, hubMat)
      hub.rotation.x = Math.PI / 2
      wg.add(hub)

      // Fender (half-cylinder arc over wheel)
      const fenderGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.27, 20, 1, false, 0, Math.PI)
      const fender = new THREE.Mesh(fenderGeo, darkFrame)
      fender.rotation.x = Math.PI / 2
      fender.rotation.z = Math.PI
      fender.position.y = 0.08
      wg.add(fender)

      // Suspension arm (connecting wheel to chassis)
      const suspGeo = new THREE.BoxGeometry(0.18, 0.08, 0.3)
      const susp = new THREE.Mesh(suspGeo, aluminum)
      susp.position.set(0, 0.42, 0)
      wg.add(susp)

      group.add(wg)
    })

    // ── SEATS ────────────────────────────────────────────────────────────────
    // Two side-by-side astronaut seats
    const seatOffsets = [0.42, -0.42]
    seatOffsets.forEach(zOffset => {
      const sg = new THREE.Group()
      sg.position.set(-0.2, -0.08, zOffset)

      // Seat pan
      const panGeo = new THREE.BoxGeometry(0.52, 0.05, 0.46)
      sg.add(new THREE.Mesh(panGeo, seatFoam))

      // Seat back (angled slightly back)
      const backGeo = new THREE.BoxGeometry(0.52, 0.72, 0.05)
      const back = new THREE.Mesh(backGeo, seatFoam)
      back.position.set(-0.26, 0.42, 0)
      back.rotation.z = 0.18
      sg.add(back)

      // Armrests
      const armGeo = new THREE.BoxGeometry(0.08, 0.05, 0.46)
      ;[-0.22, 0.22].forEach(xa => {
        const arm = new THREE.Mesh(armGeo, darkFrame)
        arm.position.set(xa, 0.14, 0)
        sg.add(arm)
      })

      group.add(sg)
    })

    // ── CENTRE CONSOLE ───────────────────────────────────────────────────────
    const consoleGeo = new THREE.BoxGeometry(0.3, 0.46, 0.34)
    const consoleBox = new THREE.Mesh(consoleGeo, darkFrame)
    consoleBox.position.set(0.18, 0.08, 0)
    group.add(consoleBox)

    // T-Bar joystick
    const stemGeo = new THREE.CylinderGeometry(0.028, 0.028, 0.38, 10)
    const stem = new THREE.Mesh(stemGeo, aluminum)
    stem.position.set(0.18, 0.44, 0)
    group.add(stem)
    const barGeo = new THREE.CylinderGeometry(0.034, 0.034, 0.26, 10)
    const bar = new THREE.Mesh(barGeo, goldFoil)
    bar.rotation.z = Math.PI / 2
    bar.position.set(0.18, 0.62, 0)
    group.add(bar)

    // ── ANTENNA MAST ─────────────────────────────────────────────────────────
    // 2-segment telescoping mast
    const mast1Geo = new THREE.CylinderGeometry(0.038, 0.048, 0.8, 10)
    const mast1 = new THREE.Mesh(mast1Geo, aluminum)
    mast1.position.set(0.95, 0.24, 0.52)
    group.add(mast1)

    const mast2Geo = new THREE.CylinderGeometry(0.028, 0.038, 0.72, 10)
    const mast2 = new THREE.Mesh(mast2Geo, aluminum)
    mast2.position.set(0.95, 0.96, 0.52)
    group.add(mast2)

    // Dish: concave sphere segment (high-gain parabolic)
    const dishGeo = new THREE.SphereGeometry(0.5, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2.4)
    const dish = new THREE.Mesh(dishGeo, goldFoil)
    dish.position.set(0.95, 1.4, 0.52)
    dish.rotation.x = -Math.PI / 3
    group.add(dish)

    // Dish rim ring
    const dishRimGeo = new THREE.TorusGeometry(0.5, 0.025, 8, 32)
    const dishRim = new THREE.Mesh(dishRimGeo, aluminum)
    dishRim.position.set(0.95, 1.4, 0.52)
    dishRim.rotation.x = -Math.PI / 3
    group.add(dishRim)

    // ── RCA COLOR TV CAMERA ──────────────────────────────────────────────────
    const camTurret = new THREE.Group()
    camTurret.position.set(1.5, -0.08, -0.52)

    const camBodyGeo = new THREE.BoxGeometry(0.42, 0.3, 0.26)
    camTurret.add(new THREE.Mesh(camBodyGeo, darkFrame))

    // Lens barrel (3 rings getting smaller forward)
    ;[0.0, 0.1, 0.19].forEach((xo, i) => {
      const r = 0.1 - i * 0.015
      const lGeo = new THREE.CylinderGeometry(r, r, 0.1, 16)
      const lMesh = new THREE.Mesh(lGeo, i === 2 ? lensGlass : aluminum)
      lMesh.rotation.z = Math.PI / 2
      lMesh.position.set(0.21 + xo, 0, 0)
      camTurret.add(lMesh)
    })

    group.add(camTurret)

    // ── FRONT BUMPER BAR ─────────────────────────────────────────────────────
    const bumperGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.0, 10)
    const bumper = new THREE.Mesh(bumperGeo, aluminum)
    bumper.rotation.z = Math.PI / 2
    bumper.position.set(1.6, -0.28, 0)
    group.add(bumper)

    // ── REAR SCIENCE PALLET ──────────────────────────────────────────────────
    const palletGeo = new THREE.BoxGeometry(0.9, 0.44, 1.5)
    const pallet = new THREE.Mesh(palletGeo, goldFoil)
    pallet.position.set(-1.1, -0.1, 0)
    group.add(pallet)

    // Science pallet detail strips
    for (let si = -0.5; si <= 0.5; si += 0.5) {
      const stripGeo = new THREE.BoxGeometry(0.88, 0.03, 0.04)
      const strip = new THREE.Mesh(stripGeo, aluminum)
      strip.position.set(-1.1, 0.14, si)
      group.add(strip)
    }

    // ── COMMUNICATIONS ANTENNA (Low-gain) ────────────────────────────────────
    const lgaGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.1, 8)
    const lga = new THREE.Mesh(lgaGeo, aluminum)
    lga.position.set(-1.0, 0.56, -0.65)
    lga.rotation.z = 0.35
    group.add(lga)

    const lgaBallGeo = new THREE.SphereGeometry(0.07, 10, 10)
    const lgaBall = new THREE.Mesh(lgaBallGeo, aluminum)
    lgaBall.position.set(-1.18, 1.1, -0.65)
    group.add(lgaBall)
  }

  // Helper: Surveyor 3 Lander 3D Model
  function buildSurveyor3Lander(group, holo) {
    const silverMetal = holo
      ? new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true })
      : new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.9, roughness: 0.2 })

    const darkCore = holo
      ? new THREE.MeshBasicMaterial({ color: 0x7eebff, wireframe: true })
      : new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.45 })

    const solarCell = holo
      ? new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true })
      : new THREE.MeshStandardMaterial({ color: 0x0369a1, metalness: 0.6, roughness: 0.2, emissive: 0x082f49 })

    // 1. Triangular Center Core Body
    const coreGeo = new THREE.CylinderGeometry(0.45, 0.75, 1.25, 3)
    const core = new THREE.Mesh(coreGeo, darkCore)
    core.position.y = 0.2
    group.add(core)

    // 2. Three Shock-Absorbing Landing Legs
    for (let i = 0; i < 3; i += 1) {
      const angle = (i * 2 * Math.PI) / 3
      const legGroup = new THREE.Group()

      // Strut
      const strutGeo = new THREE.CylinderGeometry(0.045, 0.045, 2.3)
      const strut = new THREE.Mesh(strutGeo, silverMetal)
      strut.position.set(Math.cos(angle) * 1.05, -0.42, Math.sin(angle) * 1.05)
      strut.rotation.x = Math.sin(angle) * 0.72
      strut.rotation.z = -Math.cos(angle) * 0.72
      legGroup.add(strut)

      // Wide Circular Footpad
      const footGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.08, 16)
      const foot = new THREE.Mesh(footGeo, silverMetal)
      foot.position.set(Math.cos(angle) * 1.95, -1.1, Math.sin(angle) * 1.95)
      legGroup.add(foot)

      group.add(legGroup)
    }

    // 3. Central Vertical Mast
    const mastGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.7)
    const mast = new THREE.Mesh(mastGeo, silverMetal)
    mast.position.y = 1.35
    group.add(mast)

    // 4. Solar Array Panel on Top
    const panelGeo = new THREE.BoxGeometry(0.95, 0.04, 0.65)
    const panel = new THREE.Mesh(panelGeo, solarCell)
    panel.position.set(0.12, 2.15, 0)
    panel.rotation.z = 0.38
    group.add(panel)

    // High-gain planar antenna
    const antennaGeo = new THREE.BoxGeometry(0.55, 0.55, 0.03)
    const antenna = new THREE.Mesh(antennaGeo, silverMetal)
    antenna.position.set(-0.25, 2.1, 0.2)
    antenna.rotation.y = 0.5
    group.add(antenna)

    // 5. Steerable Television Camera Head
    const camGroup = new THREE.Group()
    camGroup.position.set(0.38, 0.75, 0.32)

    const camHousingGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.55, 16)
    const camHousing = new THREE.Mesh(camHousingGeo, silverMetal)
    camGroup.add(camHousing)

    const mirrorGeo = new THREE.BoxGeometry(0.15, 0.2, 0.03)
    const mirror = new THREE.Mesh(mirrorGeo, darkCore)
    mirror.position.set(0, 0.35, 0.07)
    mirror.rotation.x = 0.45
    camGroup.add(mirror)

    group.add(camGroup)

    // 6. Motorized Soil Sampler Pantograph Arm (Extending Out)
    const armGroup = new THREE.Group()
    armGroup.position.set(-0.2, 0.1, -0.3)

    const armGeo = new THREE.BoxGeometry(0.06, 0.06, 1.45)
    const arm = new THREE.Mesh(armGeo, silverMetal)
    arm.position.set(-0.48, -0.32, -0.65)
    arm.rotation.y = -0.5
    arm.rotation.x = -0.32
    armGroup.add(arm)

    // Scoop Bucket with Teeth
    const scoopGeo = new THREE.BoxGeometry(0.2, 0.15, 0.18)
    const scoop = new THREE.Mesh(scoopGeo, darkCore)
    scoop.position.set(-0.9, -0.72, -1.15)
    armGroup.add(scoop)

    group.add(armGroup)

    // 7. Helium Pressure Spheres
    for (let k = 0; k < 2; k += 1) {
      const sphereGeo = new THREE.SphereGeometry(0.2, 16, 16)
      const tank = new THREE.Mesh(sphereGeo, silverMetal)
      tank.position.set(k === 0 ? 0.38 : -0.38, -0.22, 0.32)
      group.add(tank)
    }
  }

  // Helper: Sojourner Rover 3D Model
  function buildSojournerRover(group, holo) {
    const mk = (color, metalness = 0.8, roughness = 0.3, emissive = 0x000000) =>
      holo
        ? new THREE.MeshBasicMaterial({ color: 0xff6b4a, wireframe: true })
        : new THREE.MeshStandardMaterial({ color, metalness, roughness, emissive })

    const goldFoil = mk(0xe5a300, 0.9, 0.22)
    const solarCell = mk(0x0c274c, 0.55, 0.2, 0x031024)
    const aluminium = mk(0xc5d0dc, 0.85, 0.25)
    const darkMetal = mk(0x1f2937, 0.85, 0.45)
    const wheelMat = mk(0x374151, 0.8, 0.4)
    const lensBlue = mk(0x0284c7, 0.2, 0.1, 0x002847)

    // 1. Warm Electronics Box (WEB) — central gold-wrapped body
    const bodyGeo = new THREE.BoxGeometry(1.6, 0.42, 1.1)
    const body = new THREE.Mesh(bodyGeo, goldFoil)
    body.position.y = -0.05
    group.add(body)

    // 2. Solar Array Roof (Flat top deck)
    const roofGeo = new THREE.BoxGeometry(1.68, 0.04, 1.16)
    const roof = new THREE.Mesh(roofGeo, solarCell)
    roof.position.y = 0.18
    group.add(roof)

    // Solar panel frame border
    const frameGeo = new THREE.BoxGeometry(1.72, 0.02, 1.2)
    const frame = new THREE.Mesh(frameGeo, aluminium)
    frame.position.y = 0.16
    group.add(frame)

    // 3. Six Rocker-Bogie Cleated Wheels
    // 3 on Left (Z = 0.78), 3 on Right (Z = -0.78)
    const wheelOffsets = [
      { x: 0.88, y: -0.42, z: 0.78 },
      { x: 0.0, y: -0.42, z: 0.84 },
      { x: -0.88, y: -0.42, z: 0.78 },
      { x: 0.88, y: -0.42, z: -0.78 },
      { x: 0.0, y: -0.42, z: -0.84 },
      { x: -0.88, y: -0.42, z: -0.78 },
    ]

    wheelOffsets.forEach((pos) => {
      const wg = new THREE.Group()
      wg.position.set(pos.x, pos.y, pos.z)

      // Outer cylinder tire with cleats
      const tireGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.18, 20)
      const tire = new THREE.Mesh(tireGeo, wheelMat)
      tire.rotation.x = Math.PI / 2
      wg.add(tire)

      // Center Hub
      const hubGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.22, 12)
      const hub = new THREE.Mesh(hubGeo, goldFoil)
      hub.rotation.x = Math.PI / 2
      wg.add(hub)

      // Cleats along circumference
      for (let c = 0; c < 8; c++) {
        const ca = (c / 8) * Math.PI * 2
        const cleatGeo = new THREE.BoxGeometry(0.04, 0.03, 0.19)
        const cleat = new THREE.Mesh(cleatGeo, aluminium)
        cleat.position.set(Math.cos(ca) * 0.24, Math.sin(ca) * 0.24, 0)
        cleat.rotation.z = ca
        wg.add(cleat)
      }

      group.add(wg)
    })

    // Rocker-Bogie side struts connecting wheels
    ;[-0.72, 0.72].forEach((zSide) => {
      // Main Rocker bar (slanted from front wheel back to pivot)
      const rockerGeo = new THREE.BoxGeometry(1.2, 0.05, 0.05)
      const rocker = new THREE.Mesh(rockerGeo, aluminium)
      rocker.position.set(0.4, -0.22, zSide)
      rocker.rotation.z = -0.18
      group.add(rocker)

      // Bogie bar (connecting middle and rear wheels)
      const bogieGeo = new THREE.BoxGeometry(1.0, 0.04, 0.04)
      const bogie = new THREE.Mesh(bogieGeo, aluminium)
      bogie.position.set(-0.45, -0.32, zSide)
      bogie.rotation.z = 0.08
      group.add(bogie)
    })

    // 4. Forward Stereoscopic Camera Eyes
    const camMastGeo = new THREE.BoxGeometry(0.06, 0.35, 0.06)
    const camMast = new THREE.Mesh(camMastGeo, aluminium)
    camMast.position.set(0.8, 0.32, 0)
    group.add(camMast)

    const camBarGeo = new THREE.BoxGeometry(0.08, 0.08, 0.38)
    const camBar = new THREE.Mesh(camBarGeo, darkMetal)
    camBar.position.set(0.82, 0.48, 0)
    group.add(camBar)

    // Two stereo camera eye lenses
    ;[-0.14, 0.14].forEach((zl) => {
      const lensGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.08, 12)
      const lens = new THREE.Mesh(lensGeo, lensBlue)
      lens.rotation.z = Math.PI / 2
      lens.position.set(0.88, 0.48, zl)
      group.add(lens)
    })

    // 5. APXS Instrument Deployer on Rear
    const apxsArmGeo = new THREE.BoxGeometry(0.45, 0.05, 0.05)
    const apxsArm = new THREE.Mesh(apxsArmGeo, aluminium)
    apxsArm.position.set(-0.95, -0.15, 0)
    apxsArm.rotation.z = -0.35
    group.add(apxsArm)

    const apxsSensorGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.14, 16)
    const apxsSensor = new THREE.Mesh(apxsSensorGeo, goldFoil)
    apxsSensor.position.set(-1.18, -0.32, 0)
    group.add(apxsSensor)

    // 6. Corner UHF Antenna Rod
    const whipGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.85, 8)
    const whip = new THREE.Mesh(whipGeo, aluminium)
    whip.position.set(-0.72, 0.58, 0.48)
    group.add(whip)
  }

  // Helper: Opportunity Rover (MER-B) 3D Model
  function buildOpportunityRover(group, holo) {
    const mk = (color, metalness = 0.8, roughness = 0.3, emissive = 0x000000) =>
      holo
        ? new THREE.MeshBasicMaterial({ color: 0xff6b4a, wireframe: true })
        : new THREE.MeshStandardMaterial({ color, metalness, roughness, emissive })

    const solarCell = mk(0x0a2244, 0.55, 0.22, 0x020d1c)
    const goldFoil = mk(0xe5a300, 0.92, 0.18)
    const aluminium = mk(0xcad4e0, 0.85, 0.22)
    const darkFrame = mk(0x1f2937, 0.88, 0.4)
    const lensGlass = mk(0x0284c7, 0.3, 0.1, 0x00223d)

    // 1. Triangular / Hexagonal Chassis Underbody
    const chassisGeo = new THREE.BoxGeometry(1.8, 0.38, 1.3)
    const chassis = new THREE.Mesh(chassisGeo, goldFoil)
    chassis.position.y = -0.15
    group.add(chassis)

    // 2. Wide Bat-Wing Solar Panel Deck
    // Central deck
    const deckGeo = new THREE.BoxGeometry(1.88, 0.04, 1.38)
    const deck = new THREE.Mesh(deckGeo, solarCell)
    deck.position.y = 0.06
    group.add(deck)

    // Left solar wing extension
    const leftWingGeo = new THREE.BoxGeometry(1.3, 0.03, 0.85)
    const leftWing = new THREE.Mesh(leftWingGeo, solarCell)
    leftWing.position.set(-0.05, 0.07, 1.05)
    group.add(leftWing)

    // Right solar wing extension
    const rightWingGeo = new THREE.BoxGeometry(1.3, 0.03, 0.85)
    const rightWing = new THREE.Mesh(rightWingGeo, solarCell)
    rightWing.position.set(-0.05, 0.07, -1.05)
    group.add(rightWing)

    // Solar panel frame rim
    const frameGeo = new THREE.BoxGeometry(1.94, 0.02, 1.44)
    const frame = new THREE.Mesh(frameGeo, aluminium)
    frame.position.y = 0.04
    group.add(frame)

    // 3. Six Rocker-Bogie Cleated Drive Wheels
    const wheelPositions = [
      { x: 1.15, y: -0.62, z: 1.15 },
      { x: 0.0, y: -0.62, z: 1.32 },
      { x: -1.15, y: -0.62, z: 1.15 },
      { x: 1.15, y: -0.62, z: -1.15 },
      { x: 0.0, y: -0.62, z: -1.32 },
      { x: -1.15, y: -0.62, z: -1.15 },
    ]

    wheelPositions.forEach((pos) => {
      const wg = new THREE.Group()
      wg.position.set(pos.x, pos.y, pos.z)

      // Wheel cylinder
      const tireGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.22, 24)
      const tire = new THREE.Mesh(tireGeo, darkFrame)
      tire.rotation.x = Math.PI / 2
      wg.add(tire)

      // Center disc
      const discGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.26, 16)
      const disc = new THREE.Mesh(discGeo, aluminium)
      disc.rotation.x = Math.PI / 2
      wg.add(disc)

      // Spiral cleats around rim
      for (let c = 0; c < 10; c++) {
        const ca = (c / 10) * Math.PI * 2
        const cleatGeo = new THREE.BoxGeometry(0.06, 0.04, 0.24)
        const cleat = new THREE.Mesh(cleatGeo, aluminium)
        cleat.position.set(Math.cos(ca) * 0.32, Math.sin(ca) * 0.32, 0)
        cleat.rotation.z = ca
        wg.add(cleat)
      }

      group.add(wg)
    })

    // Rocker-Bogie suspension articulated tubes
    ;[-1.0, 1.0].forEach((zSide) => {
      const tubeGeo = new THREE.CylinderGeometry(0.038, 0.038, 2.1, 10)
      const tube = new THREE.Mesh(tubeGeo, aluminium)
      tube.rotation.z = Math.PI / 2
      tube.position.set(0, -0.38, zSide)
      group.add(tube)
    })

    // 4. Pancam Mast Assembly (1.5-meter tall camera tower)
    const mastGroup = new THREE.Group()
    mastGroup.position.set(0.68, 0.1, 0.45)

    const mastGeo = new THREE.CylinderGeometry(0.045, 0.045, 1.45, 12)
    const mast = new THREE.Mesh(mastGeo, aluminium)
    mast.position.y = 0.72
    mastGroup.add(mast)

    // Camera head bar
    const camHeadGeo = new THREE.BoxGeometry(0.18, 0.14, 0.48)
    const camHead = new THREE.Mesh(camHeadGeo, darkFrame)
    camHead.position.set(0.05, 1.48, 0)
    mastGroup.add(camHead)

    // Stereo Pancam eye lenses
    ;[-0.15, 0.15].forEach((zl) => {
      const lensGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.14, 16)
      const lens = new THREE.Mesh(lensGeo, lensGlass)
      lens.rotation.z = Math.PI / 2
      lens.position.set(0.16, 1.48, zl)
      mastGroup.add(lens)
    })

    // Miniature sun sensor on top
    const sunSensorGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.12, 8)
    const sunSensor = new THREE.Mesh(sunSensorGeo, goldFoil)
    sunSensor.position.set(0, 1.6, 0)
    mastGroup.add(sunSensor)

    group.add(mastGroup)

    // 5. Articulated Robotic Arm (IDD) on Front
    const armGroup = new THREE.Group()
    armGroup.position.set(0.95, -0.12, -0.25)

    const arm1Geo = new THREE.BoxGeometry(0.5, 0.06, 0.06)
    const arm1 = new THREE.Mesh(arm1Geo, aluminium)
    arm1.position.set(0.24, -0.1, 0)
    arm1.rotation.z = -0.38
    armGroup.add(arm1)

    const arm2Geo = new THREE.BoxGeometry(0.48, 0.05, 0.05)
    const arm2 = new THREE.Mesh(arm2Geo, aluminium)
    arm2.position.set(0.62, -0.28, 0)
    arm2.rotation.z = 0.2
    armGroup.add(arm2)

    // Turret tool head (RAT drill + spectrometers)
    const turretGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.18, 16)
    const turret = new THREE.Mesh(turretGeo, darkFrame)
    turret.rotation.x = Math.PI / 2
    turret.position.set(0.88, -0.32, 0)
    armGroup.add(turret)

    group.add(armGroup)

    // 6. High-Gain Parabolic Dish Antenna (Rear Deck)
    const dishGeo = new THREE.SphereGeometry(0.38, 18, 18, 0, Math.PI * 2, 0, Math.PI / 2.5)
    const dish = new THREE.Mesh(dishGeo, goldFoil)
    dish.position.set(-0.62, 0.42, -0.38)
    dish.rotation.x = -Math.PI / 3.2
    group.add(dish)

    const dishMastGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.35, 8)
    const dishMast = new THREE.Mesh(dishMastGeo, aluminium)
    dishMast.position.set(-0.62, 0.22, -0.38)
    group.add(dishMast)

    // 7. Low-Gain Antenna Mast
    const lgaGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.95, 8)
    const lga = new THREE.Mesh(lgaGeo, aluminium)
    lga.position.set(-0.75, 0.52, 0.45)
    group.add(lga)

    // 8. MarsDial (Miniature Photometric Calibration Sundial)
    const dialBaseGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 16)
    const dialBase = new THREE.Mesh(dialBaseGeo, aluminium)
    dialBase.position.set(0.2, 0.1, -0.35)
    group.add(dialBase)

    const gnomonGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.12, 8)
    const gnomon = new THREE.Mesh(gnomonGeo, darkFrame)
    gnomon.position.set(0.2, 0.16, -0.35)
    group.add(gnomon)
  }

  const hotspots =
    machineId === 'apollo-15-lrv'
      ? [
          { id: 'wheels', label: '🛞 Piano-Wire Wheels' },
          { id: 'joystick', label: '🕹️ T-Bar Joystick' },
          { id: 'antenna', label: '📡 High-Gain Dish' },
          { id: 'camera', label: '📹 Color TV Turret' },
        ]
      : machineId === 'surveyor-3'
      ? [
          { id: 'scoop', label: '🦾 Soil Sampler Scoop' },
          { id: 'camera', label: '📷 Steerable Camera' },
          { id: 'solar', label: '☀️ 89W Solar Panel' },
          { id: 'legs', label: '🦶 Shock-Absorbing Legs' },
        ]
      : machineId === 'sojourner'
      ? [
          { id: 'rocker-bogie', label: '🛞 Rocker-Bogie 6-Wheel' },
          { id: 'solar', label: '☀️ 16W Solar Roof' },
          { id: 'apxs', label: '🔬 APXS Rock Sensor' },
          { id: 'eyes', label: '👀 Stereo 3D Cameras' },
        ]
      : [
          { id: 'pancam', label: '📷 5-Foot Pancam Mast' },
          { id: 'solar-wings', label: '☀️ Bat-Wing Solar Array' },
          { id: 'arm', label: '🦾 Robotic Arm & RAT Drill' },
          { id: 'wheels', label: '🛞 6 Cleated Drive Wheels' },
        ]

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#02050e] via-[#040816] to-[#02050e] border border-cyan-500/30 shadow-[0_0_60px_rgba(0,240,255,0.08)] flex flex-col justify-between">
      {/* 3D Canvas Mount */}
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing w-full h-full" />

      {/* Top HUD Controls */}
      <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="px-3 py-1 rounded-full bg-black/75 border border-cyan-400/40 text-[10px] font-mono tracking-widest text-cyan-300 uppercase backdrop-blur-md shadow-md">
            REAL-TIME 3D ARTIFACT SCANNER
          </span>
        </div>

        <button
          onClick={() => setIsHoloMode(!isHoloMode)}
          className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-cyan-500/25 border border-cyan-400/50 text-[10px] font-mono tracking-wider text-cyan-300 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md shadow-md"
        >
          <span>{isHoloMode ? '⚡ REALISTIC MATERIAL' : '🔮 HOLOGRAPHIC BLUEPRINT'}</span>
        </button>
      </div>

      {/* Bottom Subsystem Hotspots */}
      <div className="relative z-10 p-3 sm:p-4 flex flex-col items-center gap-2 pointer-events-auto">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {hotspots.map((hs) => (
            <button
              key={hs.id}
              onClick={() => setActiveHotspot(hs.id)}
              className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all backdrop-blur-md border cursor-pointer ${
                activeHotspot === hs.id
                  ? 'bg-cyan-500/30 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-black/60 border-white/15 text-slate-300 hover:text-white hover:border-white/35'
              }`}
            >
              {hs.label}
            </button>
          ))}
        </div>

        <span className="text-[9px] font-mono text-cyan-300/60 tracking-[0.25em] uppercase">
          CLICK & DRAG TO ROTATE 360° • AUTO-SPIN ACTIVE
        </span>
      </div>
    </div>
  )
}

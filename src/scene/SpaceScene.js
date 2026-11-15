import * as THREE from 'three'
import { loadCachedTexture, createMoonFallback, createMarsFallback } from './textures.js'

// Helper to generate ultra-crisp pinpoint star textures (natural optical point spread)
function generateStarTexture(size = 32) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const center = size / 2

  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center * 0.85)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.18, 'rgba(255, 255, 255, 0.95)')
  gradient.addColorStop(0.42, 'rgba(235, 245, 255, 0.55)')
  gradient.addColorStop(0.72, 'rgba(180, 220, 255, 0.12)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Helper to generate sparkling stars with crisp micro-diffraction spikes
function generateFlareStarTexture(size = 64) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const center = size / 2

  // Central bright star core
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center * 0.45)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.25, 'rgba(240, 250, 255, 0.88)')
  gradient.addColorStop(0.55, 'rgba(160, 220, 255, 0.22)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  // Delicate needle-sharp diffraction spikes (horizontal & vertical)
  const spikeGradH = ctx.createLinearGradient(0, center, size, center)
  spikeGradH.addColorStop(0, 'rgba(255, 255, 255, 0)')
  spikeGradH.addColorStop(0.35, 'rgba(255, 255, 255, 0.18)')
  spikeGradH.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)')
  spikeGradH.addColorStop(0.65, 'rgba(255, 255, 255, 0.18)')
  spikeGradH.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = spikeGradH
  ctx.fillRect(0, center - 0.5, size, 1)

  const spikeGradV = ctx.createLinearGradient(center, 0, center, size)
  spikeGradV.addColorStop(0, 'rgba(255, 255, 255, 0)')
  spikeGradV.addColorStop(0.35, 'rgba(255, 255, 255, 0.18)')
  spikeGradV.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)')
  spikeGradV.addColorStop(0.65, 'rgba(255, 255, 255, 0.18)')
  spikeGradV.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = spikeGradV
  ctx.fillRect(center - 0.5, 0, 1, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Helper for soft multi-centered organic nebula cloud textures
function generateNebulaCloudTexture(size = 256) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, size, size)

  const clouds = [
    { x: 128, y: 128, r: 110, alpha: 0.4 },
    { x: 96, y: 110, r: 85, alpha: 0.28 },
    { x: 160, y: 144, r: 90, alpha: 0.25 },
    { x: 110, y: 160, r: 75, alpha: 0.2 },
  ]

  clouds.forEach((c) => {
    const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r)
    grad.addColorStop(0, `rgba(255, 255, 255, ${c.alpha})`)
    grad.addColorStop(0.45, `rgba(220, 240, 255, ${c.alpha * 0.4})`)
    grad.addColorStop(0.8, `rgba(180, 210, 255, ${c.alpha * 0.1})`)
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)
  })

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export class SpaceScene {
  constructor({ container, onHover, onClick, isMobile = false }) {
    this.container = container
    this.onHover = onHover
    this.onClick = onClick
    this.isMobile = isMobile

    this.animationFrameId = null
    this.clock = new THREE.Clock()
    this.rotationSpeedMultiplier = 1.4 // Default smooth celestial rotation speed (1.3x - 1.5x)

    this.mouse = new THREE.Vector2(-1000, -1000)
    this.normalizedMouse = new THREE.Vector2(0, 0)
    this.targetParallax = new THREE.Vector2(0, 0)
    this.currentParallax = new THREE.Vector2(0, 0)

    this.raycaster = new THREE.Raycaster()
    this.hoveredObject = null
    this.focusTarget = 'overview' // 'overview' | 'moon' | 'mars'

    // Responsive camera framing: celestial bodies positioned on the right half, leaving the left for content
    this.cameraTargets = {
      overview: { x: 0, y: 0, z: isMobile ? 18.0 : 13.0 },
      moon: { x: isMobile ? 0 : 2.8, y: isMobile ? 2.5 : 0.8, z: 7.4 },
      mars: { x: isMobile ? 0 : 5.0, y: isMobile ? -2.2 : -1.2, z: 7.0 },
    }

    this.init()
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth
    const height = this.container.clientHeight || window.innerHeight

    // 1. Scene with deep space exponential fog
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2(0x020409, 0.0014)

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 2500)
    const initCam = this.cameraTargets[this.focusTarget]
    this.camera.position.set(initCam.x, initCam.y, initCam.z)

    // 3. Renderer with high dynamic range tone mapping
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.18
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.container.appendChild(this.renderer.domElement)

    // 4. Lighting
    this.setupLighting()

    // 5. Deep Space Environment (Multi-layered realistic starfields + organic nebulas)
    this.createCosmicEnvironment()

    // 6. Realistic 3D Moon & Mars with refined spatial positions
    this.createMoon()
    this.createMars()

    // 7. Event Listeners
    this.boundOnPointerMove = this.onPointerMove.bind(this)
    this.boundOnClick = this.handleCanvasClick.bind(this)
    this.boundOnResize = this.onResize.bind(this)

    window.addEventListener('pointermove', this.boundOnPointerMove, { passive: true })
    this.renderer.domElement.addEventListener('click', this.boundOnClick)
    window.addEventListener('resize', this.boundOnResize)

    // 8. Start Loop
    this.animate()
  }

  setupLighting() {
    // True deep-space ambient light: extremely subtle to preserve pitch-black space contrast
    this.ambientLight = new THREE.AmbientLight(0x0a101d, 0.30) // Slightly dimmer ambient
    this.scene.add(this.ambientLight)

    // Primary Solar Directional Light:
    // Placed at a dramatic side-grazing celestial angle (right and slightly forward)
    // This creates an authentic terminator line showing crater bowls and mountain ridges in true 3D relief!
    this.sunLight = new THREE.DirectionalLight(0xfffbf2, 4.2) // Brighter sun for realistic terminator
    // Add subtle rim light to illuminate Moon’s night side
    this.rimLight = new THREE.DirectionalLight(0xffffff, 0.45);
    this.rimLight.position.set(-22, -6, -12);
    this.scene.add(this.rimLight);
    this.sunLight.position.set(22, 6, 12)
    this.scene.add(this.sunLight)

    // Faint celestial earthshine fill (subtle, authentic deep tone — NOT cyan!)
    this.fillLight = new THREE.DirectionalLight(0x182436, 0.22)
    this.fillLight.position.set(-16, -6, -8)
    this.scene.add(this.fillLight)
  }

  createCosmicEnvironment() {
    const starTex = generateStarTexture(32)
    const flareTex = generateFlareStarTexture(64)

    // Layer 1: Ultra-Distant Crisp Pinpoint Stars (10,000 points)
    const bgStarCount = 10000
    const bgGeometry = new THREE.BufferGeometry()
    const bgPositions = new Float32Array(bgStarCount * 3)
    const bgColors = new Float32Array(bgStarCount * 3)

    // Authentic astrophysical stellar temperature colors
    const spectralPalette = [
      new THREE.Color(0xffffff), // Class A: Brilliant white
      new THREE.Color(0xfff5ea), // Class F/G: Solar warm white
      new THREE.Color(0xbfe0ff), // Class B: Ice blue
      new THREE.Color(0xd6e8ff), // Class A: Blue-white
      new THREE.Color(0xffe8d1), // Class K: Soft amber
      new THREE.Color(0xffcbb2), // Class M: Faint reddish
    ]

    for (let i = 0; i < bgStarCount; i += 1) {
      const radius = 400 + Math.random() * 950
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)

      bgPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      bgPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      bgPositions[i * 3 + 2] = radius * Math.cos(phi)

      const color = spectralPalette[Math.floor(Math.random() * spectralPalette.length)]
      // Most stars are faint pinpoints, a few shine brightly
      const mag = Math.random()
      const brightness = mag > 0.92 ? 0.95 : mag > 0.7 ? 0.65 : 0.3 + mag * 0.3
      bgColors[i * 3] = color.r * brightness
      bgColors[i * 3 + 1] = color.g * brightness
      bgColors[i * 3 + 2] = color.b * brightness
    }

    bgGeometry.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3))
    bgGeometry.setAttribute('color', new THREE.BufferAttribute(bgColors, 3))

    this.bgStars = new THREE.Points(
      bgGeometry,
      new THREE.PointsMaterial({
        size: 1.15,
        map: starTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    )
    this.scene.add(this.bgStars)

    // Layer 2: Mid-Depth Sharp Stars (2,200 points)
    const midCount = 2200
    const midGeometry = new THREE.BufferGeometry()
    const midPositions = new Float32Array(midCount * 3)
    const midColors = new Float32Array(midCount * 3)

    for (let i = 0; i < midCount; i += 1) {
      const radius = 160 + Math.random() * 320
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)

      midPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      midPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      midPositions[i * 3 + 2] = radius * Math.cos(phi)

      const color = spectralPalette[Math.floor(Math.random() * spectralPalette.length)]
      const brightness = 0.45 + Math.random() * 0.55
      midColors[i * 3] = color.r * brightness
      midColors[i * 3 + 1] = color.g * brightness
      midColors[i * 3 + 2] = color.b * brightness
    }

    midGeometry.setAttribute('position', new THREE.BufferAttribute(midPositions, 3))
    midGeometry.setAttribute('color', new THREE.BufferAttribute(midColors, 3))

    this.midStars = new THREE.Points(
      midGeometry,
      new THREE.PointsMaterial({
        size: 1.6,
        map: starTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    )
    this.scene.add(this.midStars)

    // Layer 3: Prominent Sparkling Constellation Stars (350 points)
    const flareCount = 350
    const flareGeometry = new THREE.BufferGeometry()
    const flarePositions = new Float32Array(flareCount * 3)
    const flareColors = new Float32Array(flareCount * 3)

    for (let i = 0; i < flareCount; i += 1) {
      flarePositions[i * 3] = (Math.random() - 0.5) * 160
      flarePositions[i * 3 + 1] = (Math.random() - 0.5) * 110
      flarePositions[i * 3 + 2] = -25 - Math.random() * 120

      const color = spectralPalette[Math.floor(Math.random() * spectralPalette.length)]
      flareColors[i * 3] = color.r
      flareColors[i * 3 + 1] = color.g
      flareColors[i * 3 + 2] = color.b
    }
    flareGeometry.setAttribute('position', new THREE.BufferAttribute(flarePositions, 3))
    flareGeometry.setAttribute('color', new THREE.BufferAttribute(flareColors, 3))

    this.flareStars = new THREE.Points(
      flareGeometry,
      new THREE.PointsMaterial({
        size: 2.3,
        map: flareTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    )
    this.scene.add(this.flareStars)

    // Layer 4: Deep Cosmic Dust & Milky Way Haze (Photographic, ultra-subtle)
    this.nebulaGroup = new THREE.Group()
    const nebulaTex = generateNebulaCloudTexture(256)

    const nebulaNodes = [
      { color: 0x06142e, x: -60, y: 22, z: -320, scale: 220, opacity: 0.16 },
      { color: 0x140a28, x: 50, y: -20, z: -350, scale: 240, opacity: 0.14 },
      { color: 0x091b38, x: 25, y: 40, z: -300, scale: 190, opacity: 0.15 },
      { color: 0x180c22, x: -35, y: -35, z: -340, scale: 210, opacity: 0.13 },
      { color: 0x040e24, x: 0, y: 0, z: -400, scale: 300, opacity: 0.18 },
    ]

    nebulaNodes.forEach((node) => {
      const material = new THREE.SpriteMaterial({
        map: nebulaTex,
        color: node.color,
        transparent: true,
        opacity: node.opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const sprite = new THREE.Sprite(material)
      sprite.position.set(node.x, node.y, node.z)
      sprite.scale.set(node.scale, node.scale, 1)
      this.nebulaGroup.add(sprite)
    })

    this.scene.add(this.nebulaGroup)
  }

  createMoon() {
    this.moonGroup = new THREE.Group()
    this.moonRadius = 2.3

    // High tessellation sphere for ultra-smooth silhouette
    const geometry = new THREE.SphereGeometry(this.moonRadius, 128, 128)
    const material = new THREE.MeshStandardMaterial({
      roughness: 0.98,
      metalness: 0.0,
    })

    this.moonMesh = new THREE.Mesh(geometry, material)
    this.moonMesh.userData = { id: 'moon', name: 'The Moon' }

    // Load authentic NASA Moon maps with fallbacks
    loadCachedTexture('/textures/moon.jpg', 'color')
      .then((tex) => {
        material.map = tex
        material.needsUpdate = true
      })
      .catch(() => {
        material.map = createMoonFallback()
        material.needsUpdate = true
      })

    loadCachedTexture('/textures/moon-bump.jpg', 'bump')
      .then((bumpTex) => {
        material.bumpMap = bumpTex
        material.bumpScale = 0.082 // Realistic tactile crater ridges on terminator
        material.needsUpdate = true
      })
      .catch(() => {})

    this.moonGroup.add(this.moonMesh)

    // Accurate Moon axial inclination
    this.moonGroup.rotation.z = 0.11
    this.moonGroup.rotation.x = 0.05

    this.updateMoonPosition()
    this.scene.add(this.moonGroup)
  }

  updateMoonPosition() {
    if (this.isMobile) {
      this.moonGroup.position.set(0, 3.8, -3.0)
    } else {
      // Foreground celestial body: large, majestic, crater relief catching sunlight
      this.moonGroup.position.set(3.8, 1.0, 0.0)
    }
  }

  createMars() {
    this.marsGroup = new THREE.Group()
    this.marsRadius = 1.78

    const geometry = new THREE.SphereGeometry(this.marsRadius, 128, 128)
    const material = new THREE.MeshStandardMaterial({
      roughness: 0.75,
      metalness: 0.03,
    })

    this.marsMesh = new THREE.Mesh(geometry, material)
    this.marsMesh.userData = { id: 'mars', name: 'Mars' }

    // Load authentic NASA Mars map with fallback
    loadCachedTexture('/textures/mars.jpg', 'color')
      .then((tex) => {
        material.map = tex
        material.needsUpdate = true
      })
      .catch(() => {
        material.map = createMarsFallback()
        material.needsUpdate = true
      })

    // Surface bump map temporarily disabled – replace with proper Mars bump texture when available

    this.marsGroup.add(this.marsMesh)

    // Realistic Sunlit Martian Atmospheric Limb
    // Only visible where the Sun illuminates the limb along the crescent edge
    const atmosphereGeom = new THREE.SphereGeometry(this.marsRadius * 1.018, 64, 64)
    const atmosphereMat = new THREE.ShaderMaterial({
      uniforms: {
        uSunDir: { value: new THREE.Vector3(22, 6, 12).normalize() },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uSunDir;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float sunDot = max(0.0, dot(vNormal, uSunDir));
          float limb = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.4);
          float intensity = limb * (sunDot * 0.95 + 0.05);
          vec3 glowColor = vec3(0.96, 0.48, 0.24); // Warm Martian amber haze
          gl_FragColor = vec4(glowColor, intensity * 0.45);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    })
    this.marsAtmosphere = new THREE.Mesh(atmosphereGeom, atmosphereMat)
    this.marsGroup.add(this.marsAtmosphere)

    // Accurate Mars axial tilt (25.19°)
    this.marsGroup.rotation.z = 0.44
    this.marsGroup.rotation.x = 0.12

    this.updateMarsPosition()
    this.scene.add(this.marsGroup)
  }

  updateMarsPosition() {
    if (this.isMobile) {
      this.marsGroup.position.set(0, -4.0, -3.0)
    } else {
      // Deep space background position: separated from Moon with rich perspective depth (z = -3.8)
      this.marsGroup.position.set(8.0, -2.5, -4.0) // Move Mars farther back and right for separation
    }
  }

  onPointerMove(event) {
    const width = window.innerWidth
    const height = window.innerHeight

    this.mouse.x = (event.clientX / width) * 2 - 1
    this.mouse.y = -(event.clientY / height) * 2 + 1

    // Delicate, cinematic parallax response
    this.targetParallax.x = this.mouse.x * (this.isMobile ? 0.3 : 0.8)
    this.targetParallax.y = this.mouse.y * (this.isMobile ? 0.2 : 0.5)
  }

  handleCanvasClick() {
    if (this.hoveredObject) {
      const id = this.hoveredObject.userData?.id
      if (id && this.onClick) {
        this.onClick(id)
      }
    }
  }

  setFocus(target) {
    if (this.cameraTargets[target]) {
      this.focusTarget = target
    }
  }

  setRotationSpeed(speed) {
    this.rotationSpeedMultiplier = Math.max(0, Math.min(speed, 5))
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return
    const width = this.container.clientWidth || window.innerWidth
    const height = this.container.clientHeight || window.innerHeight

    this.isMobile = width < 768
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    this.cameraTargets.overview.z = this.isMobile ? 18.5 : 13.5
    this.updateMoonPosition()
    this.updateMarsPosition()
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this))

    const delta = this.clock.getDelta()
    const elapsedTime = this.clock.getElapsedTime()

    // 1. Slow, majestic planetary rotation
    const baseSpeed = 0.075 * this.rotationSpeedMultiplier
    if (this.moonMesh) {
      this.moonMesh.rotation.y += delta * baseSpeed * 0.72
    }
    if (this.marsMesh) {
      this.marsMesh.rotation.y += delta * baseSpeed * 1.05
    }

    // 2. Multi-layered cosmic motion
    if (this.bgStars) {
      this.bgStars.rotation.y = elapsedTime * 0.0018
    }
    if (this.midStars) {
      this.midStars.rotation.y = elapsedTime * 0.003
      this.midStars.rotation.x = Math.sin(elapsedTime * 0.0015) * 0.012
    }
    if (this.flareStars) {
      this.flareStars.material.opacity = 0.7 + Math.sin(elapsedTime * 2.4) * 0.22
    }
    if (this.nebulaGroup) {
      this.nebulaGroup.rotation.z = Math.sin(elapsedTime * 0.008) * 0.035
    }

    // 3. Harmonic zero-g orbital float
    if (this.moonGroup) {
      this.moonGroup.position.y += Math.sin(elapsedTime * 0.6) * 0.002
    }
    if (this.marsGroup) {
      this.marsGroup.position.y -= Math.sin(elapsedTime * 0.55) * 0.002
    }

    // 4. Silky Parallax Damping
    this.currentParallax.x += (this.targetParallax.x - this.currentParallax.x) * 0.038
    this.currentParallax.y += (this.targetParallax.y - this.currentParallax.y) * 0.038

    // 5. Camera Target Transition
    const targetCam = this.cameraTargets[this.focusTarget] || this.cameraTargets.overview
    const destX = targetCam.x + this.currentParallax.x
    const destY = targetCam.y + this.currentParallax.y
    const destZ = targetCam.z

    this.camera.position.x += (destX - this.camera.position.x) * 0.042
    this.camera.position.y += (destY - this.camera.position.y) * 0.042
    this.camera.position.z += (destZ - this.camera.position.z) * 0.042

    // Smooth focal aim
    if (this.focusTarget === 'moon' && this.moonGroup) {
      this.camera.lookAt(this.moonGroup.position.x * 0.75, this.moonGroup.position.y * 0.75, 0)
    } else if (this.focusTarget === 'mars' && this.marsGroup) {
      this.camera.lookAt(this.marsGroup.position.x * 0.75, this.marsGroup.position.y * 0.75, 0)
    } else {
      this.camera.lookAt(this.currentParallax.x * 0.25, this.currentParallax.y * 0.25, 0)
    }

    // 6. Pointer Raycasting for Planet Hover
    this.raycaster.setFromCamera(this.mouse, this.camera)
    const interactables = [this.moonMesh, this.marsMesh].filter(Boolean)
    const intersects = this.raycaster.intersectObjects(interactables, false)

    if (intersects.length > 0) {
      const hit = intersects[0].object
      if (this.hoveredObject !== hit) {
        this.hoveredObject = hit
        document.body.style.cursor = 'pointer'
        if (this.onHover) this.onHover(hit.userData?.id || null)
      }
    } else {
      if (this.hoveredObject !== null) {
        this.hoveredObject = null
        document.body.style.cursor = 'default'
        if (this.onHover) this.onHover(null)
      }
    }

    // Smooth hover scale bounce
    const moonTargetScale = this.hoveredObject === this.moonMesh ? 1.055 : 1.0
    const marsTargetScale = this.hoveredObject === this.marsMesh ? 1.055 : 1.0

    if (this.moonMesh) {
      this.moonMesh.scale.lerp(new THREE.Vector3(moonTargetScale, moonTargetScale, moonTargetScale), 0.1)
    }
    if (this.marsMesh) {
      this.marsMesh.scale.lerp(new THREE.Vector3(marsTargetScale, marsTargetScale, marsTargetScale), 0.1)
      if (this.marsAtmosphere) {
        this.marsAtmosphere.scale.lerp(new THREE.Vector3(marsTargetScale, marsTargetScale, marsTargetScale), 0.1)
      }
    }

    // 7. Render
    this.renderer.render(this.scene, this.camera)
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }

    window.removeEventListener('pointermove', this.boundOnPointerMove)
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.removeEventListener('click', this.boundOnClick)
    }
    window.removeEventListener('resize', this.boundOnResize)

    document.body.style.cursor = 'default'

    if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
    }

    if (this.renderer) {
      this.renderer.dispose()
    }
  }
}

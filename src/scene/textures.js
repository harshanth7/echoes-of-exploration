import * as THREE from 'three'

const cache = new Map()

function configure(texture, kind) {
  texture.colorSpace = kind === 'bump' ? THREE.NoColorSpace : THREE.SRGBColorSpace
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

export function loadCachedTexture(url, kind = 'color') {
  const key = `${kind}:${url}`
  if (!cache.has(key)) {
    const promise = new Promise((resolve, reject) => {
      new THREE.TextureLoader().load(
        url,
        (texture) => resolve(configure(texture, kind)),
        undefined,
        (error) => {
          cache.delete(key)
          reject(error)
        },
      )
    })
    cache.set(key, promise)
  }
  return cache.get(key)
}

function mulberry32(seed) {
  let value = seed >>> 0
  return () => {
    value += 0x6d2b79f5
    let t = value
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function createNoise(seed) {
  const random = mulberry32(seed)
  const values = new Float32Array(256)
  const perm = new Uint8Array(256)
  for (let i = 0; i < 256; i += 1) {
    values[i] = random()
    perm[i] = i
  }
  for (let i = 255; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    const swap = perm[i]
    perm[i] = perm[j]
    perm[j] = swap
  }
  const table = new Uint8Array(512)
  for (let i = 0; i < 512; i += 1) table[i] = perm[i & 255]

  const fade = (t) => t * t * (3 - 2 * t)
  const sample = (x, y) => values[table[(x & 255) + table[y & 255]]]

  const noise = (x, y) => {
    const x0 = Math.floor(x)
    const y0 = Math.floor(y)
    const u = fade(x - x0)
    const v = fade(y - y0)
    const n00 = sample(x0, y0)
    const n10 = sample(x0 + 1, y0)
    const n01 = sample(x0, y0 + 1)
    const n11 = sample(x0 + 1, y0 + 1)
    return n00 * (1 - u) * (1 - v) + n10 * u * (1 - v) + n01 * (1 - u) * v + n11 * u * v
  }

  const fbm = (x, y) => {
    let amplitude = 0.5
    let frequency = 1
    let sum = 0
    for (let octave = 0; octave < 5; octave += 1) {
      sum += amplitude * noise(x * frequency, y * frequency)
      frequency *= 2
      amplitude *= 0.5
    }
    return sum
  }

  return { random, fbm }
}

function canvasTexture(canvas, kind) {
  const texture = new THREE.CanvasTexture(canvas)
  return configure(texture, kind)
}

function paintCraters(image, craters, { rim, floor }) {
  const { width, height, data } = image
  craters.forEach((crater) => {
    const radius = crater.radius
    const left = Math.floor(crater.x - radius * 1.4)
    const right = Math.ceil(crater.x + radius * 1.4)
    const top = Math.max(0, Math.floor(crater.y - radius * 1.4))
    const bottom = Math.min(height - 1, Math.ceil(crater.y + radius * 1.4))

    for (let y = top; y <= bottom; y += 1) {
      for (let x = left; x <= right; x += 1) {
        const wrapped = ((x % width) + width) % width
        let dx = Math.abs(x - crater.x)
        if (dx > width / 2) dx = width - dx
        const dy = (y - crater.y) * (width / height)
        const distance = Math.hypot(dx, dy) / radius
        if (distance > 1.25) continue

        const index = (y * width + wrapped) * 4
        let shade = 1
        if (distance < 0.72) shade += floor * (1 - distance / 0.72)
        else if (distance < 1) shade += rim * (1 - Math.abs(distance - 0.86) / 0.14)
        data[index] = Math.min(255, data[index] * shade)
        data[index + 1] = Math.min(255, data[index + 1] * shade)
        data[index + 2] = Math.min(255, data[index + 2] * shade)
      }
    }
  })
}

export function createMoonFallback() {
  const width = 512
  const height = 256
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d', { willReadFrequently: true })
  const { random, fbm } = createNoise(11)
  const image = context.createImageData(width, height)

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const u = x / width
      const v = y / height
      const grain = fbm(u * 10, v * 5)
      const maria = fbm(u * 3.2 + 4, v * 2.2)
      let shade = 168 + grain * 46
      if (maria > 0.58) shade *= 0.72
      const index = (y * width + x) * 4
      image.data[index] = shade
      image.data[index + 1] = shade * 0.99
      image.data[index + 2] = shade * 0.96
      image.data[index + 3] = 255
    }
  }

  const craters = Array.from({ length: 48 }, () => ({
    x: random() * width,
    y: height * 0.08 + random() * height * 0.84,
    radius: 3 + random() * random() * 28,
  }))
  paintCraters(image, craters, { rim: 0.18, floor: -0.16 })
  context.putImageData(image, 0, 0)
  return canvasTexture(canvas, 'color')
}

export function createMarsFallback() {
  const width = 512
  const height = 256
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d', { willReadFrequently: true })
  const { random, fbm } = createNoise(29)
  const image = context.createImageData(width, height)

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const u = x / width
      const v = y / height
      const dune = fbm(u * 7, v * 4)
      const albedo = fbm(u * 2.4 + 8, v * 2)
      const pole = Math.min(v, 1 - v)
      let red = 176 + dune * 48
      let green = 78 + dune * 28
      let blue = 38 + dune * 16
      if (albedo < 0.42) {
        red *= 0.62
        green *= 0.58
        blue *= 0.55
      }
      if (pole < 0.07) {
        const ice = (0.07 - pole) / 0.07
        red = red * (1 - ice) + 214 * ice
        green = green * (1 - ice) + 206 * ice
        blue = blue * (1 - ice) + 198 * ice
      }
      const index = (y * width + x) * 4
      image.data[index] = red
      image.data[index + 1] = green
      image.data[index + 2] = blue
      image.data[index + 3] = 255
    }
  }

  const craters = Array.from({ length: 28 }, () => ({
    x: random() * width,
    y: height * 0.12 + random() * height * 0.76,
    radius: 4 + random() * 16,
  }))
  paintCraters(image, craters, { rim: 0.08, floor: -0.08 })
  context.putImageData(image, 0, 0)
  return canvasTexture(canvas, 'color')
}

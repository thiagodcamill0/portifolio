import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'

const COUNT = 10000
const PARAMS = { scale: 30.2, chaos: 0, flow: 0.216 }

export function initHero3D(container: HTMLElement): void {
  const rect = container.getBoundingClientRect()
  const w = rect.width || 600
  const h = rect.height || 740

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 2000)
  camera.position.set(0, 0, 75)

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  renderer.setClearColor(0x000000, 1)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(w, h)
  renderer.domElement.style.display = 'block'
  container.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enablePan = false
  controls.enableZoom = false

  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.4, 0.1, 0.8)
  composer.addPass(bloomPass)

  const dummy = new THREE.Object3D()
  const color = new THREE.Color()
  const target = new THREE.Vector3()

  const geometry = new THREE.TetrahedronGeometry(0.25)
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff })

  const mesh = new THREE.InstancedMesh(geometry, material, COUNT)
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  scene.add(mesh)

  const positions: THREE.Vector3[] = []
  for (let i = 0; i < COUNT; i++) {
    positions.push(new THREE.Vector3(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100
    ))
    mesh.setColorAt(i, color.setHex(0x00ff88))
  }

  const clock = new THREE.Clock()

  function animate() {
    requestAnimationFrame(animate)
    const time = clock.getElapsedTime()

    controls.update()

    const { scale, chaos, flow } = PARAMS
    const count = COUNT

    for (let i = 0; i < COUNT; i++) {
      const t = i / count
      const golden = 2.39996322972865332

      const theta = i * golden + time * flow * 0.5
      const phi = Math.acos(1 - 2 * t)
      const u = theta
      const v = phi * 2 + time * 0.4

      const cu = Math.cos(u)
      const su = Math.sin(u)
      const cv = Math.cos(v)
      const sv = Math.sin(v)

      const r1 = 1 + 0.2 * Math.sin(time * 0.5)
      const x4 = r1 * cu
      const y4 = r1 * su
      const z4 = cv
      const w4 = sv

      const d = 2 - w4
      const x = x4 / d
      const y = y4 / d
      const z = z4 / d

      const wave = Math.sin(x * 5 + time) * Math.cos(y * 5 - time * 0.7) * chaos

      target.set(
        x * scale + wave * 3,
        y * scale + wave * 3 * Math.sin(time * 0.3),
        z * scale * 0.8 + wave * Math.cos(time * 0.4)
      )

      const hue = 0.07 + t * 0.04
      color.setHSL(hue, 0.9, 0.2 + t * 0.1)

      positions[i].lerp(target, 0.1)
      dummy.position.copy(positions[i])
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      mesh.setColorAt(i, color)
    }

    mesh.instanceMatrix.needsUpdate = true
    mesh.instanceColor!.needsUpdate = true

    composer.render()
  }

  animate()

  window.addEventListener('resize', () => {
    const nw = container.clientWidth
    const nh = container.clientHeight
    camera.aspect = nw / nh
    camera.updateProjectionMatrix()
    renderer.setSize(nw, nh)
    composer.setSize(nw, nh)
  })
}

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Cloud, Stars } from '@react-three/drei'
import * as THREE from 'three'

// --- SHADERS ---
const MonetShader = {
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2() },
    uColor1: { value: new THREE.Color('#909fd4') }, // Sky Deep
    uColor2: { value: new THREE.Color('#eef2fb') }, // Sky Light
    uColor3: { value: new THREE.Color('#8BC34A') }, // Grass
    uColor4: { value: new THREE.Color('#FFC72C') }, // Yellow Flowers
    uColor5: { value: new THREE.Color('#B081C6') }, // Shadow/Detail
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;
    uniform vec3 uColor5;
    varying vec2 vUv;

    // Simplex Noise (Ashima Arts)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                          0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                         -0.577350269189626,  // -1.0 + 2.0 * C.x
                          0.024390243902439); // 1.0 / 41.0
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i); // Avoid truncation effects in permutation
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    // FBM (Fractal Brownian Motion)
    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 0.0;
      for (int i = 0; i < 5; i++) {
        value += amplitude * snoise(st);
        st *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    // Paint Stroke Distortion
    float paintStroke(vec2 uv, float scale, float time) {
        float n = fbm(uv * scale + vec2(time * 0.1, time * 0.05));
        return smoothstep(0.4, 0.6, n);
    }

    void main() {
      vec2 uv = vUv;
      float time = uTime * 0.2;

      // Brush Texture (High frequency noise)
      float brush = fbm(uv * 10.0 + time * 0.1);
      
      // Composition: Sky (Top) vs Grass (Bottom)
      // Soft transition around y=0.3
      float horizon = smoothstep(0.3, 0.4, uv.y + fbm(uv * 2.0) * 0.1);
      
      // Sky Colors
      vec3 skyColor = mix(uColor1, uColor2, uv.y + brush * 0.1);
      // Add clouds (white dabs)
      float clouds = smoothstep(0.4, 0.7, fbm(uv * 4.0 + vec2(time * 0.05, 0.0)));
      skyColor = mix(skyColor, vec3(1.0), clouds * 0.6); // Soft white clouds

      // Grass Colors
      vec3 grassBase = mix(uColor3, uColor5, brush); // Green mix
      // Add Yellow Flowers (High freq dabs)
      float flowers = step(0.65, fbm(uv * 25.0)); // Small dabs
      vec3 grassColor = mix(grassBase, uColor4, flowers);
      
      // Combine Sky/Grass
      // Invert Y because UV 0,0 is usually bottom-left in ShaderMaterial but plane geometry maps differently
      // Let's assume standard UV: 0,0 bottom-left
      float mask = smoothstep(0.4, 0.42, uv.y + fbm(uv * 3.0 + time * 0.1) * 0.1); // Wavy horizon
      
      // Actually, Monet's painting has sky TOP, grass BOTTOM.
      // If UV.y 0 is bottom, then mask -> 1 at top (sky), 0 at bottom (grass).
      
      vec3 finalColor = mix(grassColor, skyColor, mask);
      
      // Vignette / Canvas Grain
      float grain = fract(sin(dot(uv.xy ,vec2(12.9898,78.233))) * 43758.5453);
      finalColor += grain * 0.04;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
}

const Background = () => {
  const mesh = useRef()
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#7896C4') }, // Sky Deep
    uColor2: { value: new THREE.Color('#DCE6F5') }, // Sky Light
    uColor3: { value: new THREE.Color('#6DA34D') }, // Grass Deep
    uColor4: { value: new THREE.Color('#FFD54F') }, // Flowers
    uColor5: { value: new THREE.Color('#4A6F38') }, // Shadow
  }), [])

  useFrame((state) => {
    const { clock } = state
    mesh.current.material.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <mesh ref={mesh} scale={[20, 10, 1]} position={[0, 0, -5]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        attach="material"
        args={[MonetShader]}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Particle System: Floating "Pollen" / "Petals"
const Particles = () => {
  const count = 300
  const mesh = useRef()
  
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      
      // Update position
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <dodecahedronGeometry args={[0.08, 0]} /> {/* Small geometric shapes as pollen */}
      <meshPhongMaterial color="#FFD54F" emissive="#FFD54F" emissiveIntensity={0.5} />
    </instancedMesh>
  )
}

// Main Scene Component
export default function MonetScene() {
  return (
    <div className="monet-scene">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        {/* Environment Lighting */}
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#FFD54F" />
        
        {/* Background Shader (The Painting) */}
        <Background />

        {/* 3D Elements */}
        <Particles />
        
        {/* 3D Clouds for depth */}
        <Cloud opacity={0.5} speed={0.4} width={10} depth={1.5} segments={20} position={[0, 2, -3]} color="#ffffff" />
        <Cloud opacity={0.3} speed={0.2} width={10} depth={1.5} segments={20} position={[4, 1, -4]} color="#eef2fb" />

        {/* Fog for atmospheric depth */}
        <fog attach="fog" args={['#909fd4', 5, 20]} />
      </Canvas>
    </div>
  )
}

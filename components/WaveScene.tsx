'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type WaveConfig = {
  phase: number;
  amplitude: number;
  zOffset: number;
  radius: number;
  speed: number;
};

const GRADIENT_STOPS = [
  '#ff5f6d',
  '#ff7ac5',
  '#7d5bff',
  '#2dd4ff',
  '#3aedb7',
];

const wavePresets: WaveConfig[] = [
  { phase: 0, amplitude: 1.65, zOffset: 0, radius: 0.28, speed: 0.35 },
  { phase: Math.PI / 2.4, amplitude: 1.3, zOffset: -0.58, radius: 0.22, speed: 0.48 },
  { phase: -Math.PI / 1.8, amplitude: 1.14, zOffset: 0.62, radius: 0.2, speed: 0.42 },
];

export function WaveScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const { clientWidth, clientHeight } = container;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      clientWidth / clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.75);
    const directional = new THREE.DirectionalLight(0xffffff, 1.35);
    directional.position.set(6, 8, 6);
    scene.add(ambient, directional);

    const waveGroup = new THREE.Group();
    scene.add(waveGroup);

    const gradientColors = GRADIENT_STOPS.map((stop) => new THREE.Color(stop));

    const createGradientGeometry = (config: WaveConfig) => {
      const points: THREE.Vector3[] = [];
      const length = 12;
      const segments = 260;

      for (let i = 0; i <= segments; i += 1) {
        const t = i / segments;
        const x = (t - 0.5) * length;
        const y = Math.sin(t * Math.PI * 2 + config.phase) * config.amplitude;
        const z =
          Math.cos(t * Math.PI * 2 + config.phase) * 0.45 + config.zOffset;
        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.4);
      const geometry = new THREE.TubeGeometry(
        curve,
        segments * 4,
        config.radius,
        40,
        false
      );

      const colorAttribute = new Float32Array(
        geometry.attributes.position.count * 3
      );
      const color = new THREE.Color();
      const uv = geometry.attributes.uv as THREE.BufferAttribute;

      for (let i = 0; i < geometry.attributes.position.count; i += 1) {
        const t = uv.getY(i);
        const scaled = t * (gradientColors.length - 1);
        const idx = Math.floor(scaled);
        const frac = scaled - idx;
        const start = gradientColors[idx] ?? gradientColors[0];
        const end =
          gradientColors[Math.min(idx + 1, gradientColors.length - 1)] ??
          gradientColors[gradientColors.length - 1];
        color.copy(start).lerp(end, frac);
        colorAttribute[i * 3] = color.r;
        colorAttribute[i * 3 + 1] = color.g;
        colorAttribute[i * 3 + 2] = color.b;
      }

      geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colorAttribute, 3)
      );

      return geometry;
    };

    const waves: {
      mesh: THREE.Mesh<
        THREE.TubeGeometry,
        THREE.MeshStandardMaterial | THREE.MeshBasicMaterial
      >;
      glow: THREE.Mesh<
        THREE.TubeGeometry,
        THREE.MeshBasicMaterial
      >;
      geometry: THREE.TubeGeometry;
      glowGeometry: THREE.TubeGeometry;
      config: WaveConfig;
    }[] = [];

    wavePresets.forEach((config, index) => {
      const geometry = createGradientGeometry(config);
      const material = new THREE.MeshStandardMaterial({
        transparent: true,
        opacity: 0.92,
        metalness: 0.15,
        roughness: 0.35,
        side: THREE.DoubleSide,
        vertexColors: true,
        emissive: new THREE.Color(0x111111),
        emissiveIntensity: 0.35,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = index === 0 ? 0 : index * 0.08;
      waveGroup.add(mesh);

      const glowGeometry = geometry.clone();
      const glowMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.35,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      glowMesh.scale.multiplyScalar(1.035);
      waveGroup.add(glowMesh);

      waves.push({
        mesh,
        glow: glowMesh,
        geometry,
        glowGeometry,
        config,
      });
    });

    waveGroup.position.y = 0.2;
    waveGroup.scale.setScalar(1.08);

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      waveGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.08;
      waveGroup.rotation.y = Math.cos(elapsed * 0.12) * 0.05;
      waveGroup.position.y = Math.sin(elapsed * 0.4) * 0.12;

      waves.forEach(({ mesh, glow, config }, idx) => {
        const waveYOffset = Math.sin(
          elapsed * config.speed + config.phase * 1.2
        );
        mesh.position.y = waveYOffset * 0.18;
        glow.position.y = mesh.position.y;
        mesh.rotation.z = elapsed * 0.04 + idx * 0.1;
        glow.rotation.z = mesh.rotation.z;
      });

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      waves.forEach(({ mesh, glow, geometry, glowGeometry }) => {
        geometry.dispose();
        glowGeometry.dispose();
        mesh.material.dispose();
        glow.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[520px] w-full overflow-visible"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.08),transparent_55%)] blur-3xl" />
    </div>
  );
}


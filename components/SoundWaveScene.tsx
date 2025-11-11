'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const POINT_COUNT = 26;
const CURVE_SEGMENTS = 420;

export function SoundWaveScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const { clientWidth, clientHeight } = container;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      clientWidth / clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.8, 9);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    const keyLight = new THREE.DirectionalLight(0xdde7ff, 0.95);
    keyLight.position.set(4, 6, 6);
    const fillLight = new THREE.DirectionalLight(0x7dd3fc, 0.5);
    fillLight.position.set(-6, 4, -4);
    scene.add(ambient, keyLight, fillLight);

    const backdropMaterial = new THREE.MeshBasicMaterial({
      color: 0x0a101b,
      transparent: true,
      opacity: 0.85,
    });
    const backdrop = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 6),
      backdropMaterial
    );
    backdrop.position.set(0, 0, -2.2);
    scene.add(backdrop);

    const buildWaveGeometry = (points: THREE.Vector3[], radius: number) => {
      const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.45);
      return new THREE.TubeGeometry(curve, CURVE_SEGMENTS, radius, 32, false);
    };

    const basePoints: THREE.Vector3[] = [];
    for (let i = 0; i < POINT_COUNT; i += 1) {
      const t = i / (POINT_COUNT - 1);
      const x = (t - 0.5) * 10;
      basePoints.push(new THREE.Vector3(x, 0, 0));
    }

    const waveMaterial = new THREE.MeshStandardMaterial({
      color: 0xdde3f7,
      metalness: 0.55,
      roughness: 0.25,
      emissive: 0x1a2740,
      emissiveIntensity: 0.55,
    });
    let waveGeometry = buildWaveGeometry(basePoints, 0.23);
    const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
    scene.add(waveMesh);

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x8be9ff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    let glowGeometry = buildWaveGeometry(basePoints, 0.32);
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const guidePoints = basePoints.map((point) => point.clone());
    const guideGeometry = new THREE.BufferGeometry().setFromPoints(guidePoints);
    const guideLine = new THREE.Line(guideGeometry, lineMaterial);
    scene.add(guideLine);

    const clock = new THREE.Clock();

    const updateWave = (elapsed: number) => {
      const amplitude = 1.35;
      const wobble = 0.4;

      basePoints.forEach((point, index) => {
        const t = index / (POINT_COUNT - 1);
        const base =
          Math.sin(t * Math.PI * 3 + elapsed * 1.1) * amplitude +
          Math.sin(t * Math.PI * 6 + elapsed * 0.7) * wobble;
        point.y = base * 0.45;
        point.z = Math.sin(elapsed * 0.5 + t * Math.PI * 2) * 0.25;
      });

      waveGeometry.dispose();
      glowGeometry.dispose();

      waveGeometry = buildWaveGeometry(basePoints, 0.23);
      glowGeometry = buildWaveGeometry(basePoints, 0.32);

      waveMesh.geometry = waveGeometry;
      glowMesh.geometry = glowGeometry;

      guideGeometry.setFromPoints(basePoints);
      guideGeometry.attributes.position.needsUpdate = true;
    };

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      updateWave(elapsed);
      glowMaterial.opacity = 0.2 + (Math.sin(elapsed * 0.8) + 1) * 0.1;

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
      waveGeometry.dispose();
      glowGeometry.dispose();
      waveMaterial.dispose();
      glowMaterial.dispose();
      guideGeometry.dispose();
      lineMaterial.dispose();
      backdrop.geometry.dispose();
      backdropMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[520px] w-full overflow-hidden rounded-[56px] border border-slate-800/60 bg-gradient-to-br from-slate-950/85 via-slate-950/70 to-slate-900/85 backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(148,163,184,0.14),transparent_65%)]" />
    </div>
  );
}


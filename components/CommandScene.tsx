'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GRID_X = 26;
const GRID_Z = 14;

export function CommandScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const { clientWidth, clientHeight } = container;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      52,
      clientWidth / clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 6.5, 12);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const dir1 = new THREE.DirectionalLight(0xd4d4f7, 0.9);
    dir1.position.set(6, 10, 6);
    const dir2 = new THREE.DirectionalLight(0x9effff, 0.6);
    dir2.position.set(-5, 8, -3);
    scene.add(ambient, dir1, dir2);

    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x101019,
      metalness: 0.4,
      roughness: 0.2,
      transparent: true,
      opacity: 0.9,
    });

    const basePlate = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 10, 1, 1),
      baseMaterial
    );
    basePlate.rotation.x = -Math.PI / 2;
    basePlate.position.y = -1.6;
    scene.add(basePlate);

    const edgeMaterial = new THREE.MeshBasicMaterial({
      color: 0x90cdf4,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });

    const edgeFrame = new THREE.Mesh(
      new THREE.RingGeometry(5.2, 5.7, 80, 1, 0, Math.PI * 2),
      edgeMaterial
    );
    edgeFrame.rotation.x = -Math.PI / 2;
    edgeFrame.position.set(0, -1.5, 0);
    scene.add(edgeFrame);

    const capsuleMaterial = new THREE.MeshStandardMaterial({
      color: 0xd6e3ff,
      emissive: 0x234b6f,
      emissiveIntensity: 0.6,
      metalness: 0.6,
      roughness: 0.25,
    });

    const capsuleGeometry = new THREE.BoxGeometry(0.28, 1, 0.28);
    const capsuleMesh = new THREE.InstancedMesh(
      capsuleGeometry,
      capsuleMaterial,
      GRID_X * GRID_Z
    );
    capsuleMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(capsuleMesh);

    const dummy = new THREE.Object3D();

    const peakMaterial = new THREE.MeshBasicMaterial({
      color: 0x8be9ff,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const peakGeometry = new THREE.PlaneGeometry(18, 10);
    const peakGlow = new THREE.Mesh(peakGeometry, peakMaterial);
    peakGlow.rotation.x = -Math.PI / 2;
    peakGlow.position.y = 0.2;
    scene.add(peakGlow);

    const pulses: THREE.Mesh[] = [];
    const pulseGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.6, 16, 1, true);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < 5; i += 1) {
      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial.clone());
      pulse.position.set(-4 + i * 2.2, -1.2, 4.5);
      pulse.rotation.z = Math.PI / 2;
      scene.add(pulse);
      pulses.push(pulse);
    }

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      let index = 0;
      for (let x = 0; x < GRID_X; x += 1) {
        for (let z = 0; z < GRID_Z; z += 1) {
          const normalizedX = (x / GRID_X) * Math.PI * 4;
          const normalizedZ = (z / GRID_Z) * Math.PI * 3;

          const amplitude = Math.sin(elapsed * 0.9 + normalizedX) * 0.85;
          const secondary = Math.cos(
            elapsed * 0.6 + normalizedZ + normalizedX * 0.4
          );
          const height = 1.2 + amplitude * 1.1 + secondary * 0.4;

          dummy.position.set(
            (x - GRID_X / 2) * 0.7,
            height / 2 - 1.1,
            (z - GRID_Z / 2) * 0.7
          );
          dummy.scale.set(1, height, 1);
          dummy.updateMatrix();
          capsuleMesh.setMatrixAt(index, dummy.matrix);
          index += 1;
        }
      }
      capsuleMesh.instanceMatrix.needsUpdate = true;

      const glowIntensity = (Math.sin(elapsed * 0.8) + 1.2) / 2.2;
      peakMaterial.opacity = 0.15 + glowIntensity * 0.15;

      pulses.forEach((pulse, idx) => {
        const offset = elapsed * 0.8 + idx * 0.5;
        pulse.scale.x = 1 + Math.sin(offset) * 1.5;
        const pulseMaterialInstance = pulse.material as THREE.MeshBasicMaterial;
        pulseMaterialInstance.opacity =
          0.25 + (Math.sin(offset + Math.PI / 3) + 1) * 0.15;
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
      capsuleGeometry.dispose();
      capsuleMaterial.dispose();
      capsuleMesh.dispose();
      basePlate.geometry.dispose();
      baseMaterial.dispose();
      edgeFrame.geometry.dispose();
      edgeMaterial.dispose();
      peakGeometry.dispose();
      peakMaterial.dispose();
      pulses.forEach((pulse) => {
        (pulse.material as THREE.Material).dispose();
      });
      pulseGeometry.dispose();
      pulseMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[560px] w-full overflow-hidden rounded-[48px] border border-slate-800/40 bg-slate-950/60 backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(148,163,184,0.12),transparent_60%)]" />
    </div>
  );
}


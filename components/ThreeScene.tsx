'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 600;

type SceneVariant = 'default' | 'graphite' | 'onyx';

type VariantPalette = {
  core: THREE.ColorRepresentation;
  emissive: THREE.ColorRepresentation;
  ring: THREE.ColorRepresentation;
  ringEmissive: THREE.ColorRepresentation;
  particle: THREE.ColorRepresentation;
};

const VARIANT_PALETTE: Record<SceneVariant, VariantPalette> = {
  default: {
    core: 0xa3a3a3,
    emissive: 0x1a1a1a,
    ring: 0xf9fafb,
    ringEmissive: 0x6b7280,
    particle: 0xd1d5db,
  },
  graphite: {
    core: 0x8f9ba8,
    emissive: 0x0d1217,
    ring: 0xf5f5f5,
    ringEmissive: 0x94a3b8,
    particle: 0xbfc5d1,
  },
  onyx: {
    core: 0xbfbfbf,
    emissive: 0x151515,
    ring: 0xf7f7f7,
    ringEmissive: 0xd4d4d8,
    particle: 0xe5e7eb,
  },
};

const VARIANT_GLOW: Record<SceneVariant, string> = {
  default:
    'from-slate-300/25 via-slate-500/10 to-zinc-800/50',
  graphite:
    'from-slate-200/30 via-slate-500/20 to-gray-900/60',
  onyx:
    'from-zinc-200/40 via-zinc-500/25 to-black/60',
};

export function ThreeScene({
  variant = 'default',
  className,
  glowClassName,
}: {
  variant?: SceneVariant;
  className?: string;
  glowClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const disposeMaterial = (
      material: THREE.Material | THREE.Material[]
    ) => {
      if (Array.isArray(material)) {
        material.forEach((entry) => entry.dispose());
      } else {
        material.dispose();
      }
    };

    const palette = VARIANT_PALETTE[variant] ?? VARIANT_PALETTE.default;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    const directionalLightColor =
      variant === 'graphite'
        ? 0xd1d5db
        : variant === 'onyx'
          ? 0xf5f5f5
          : 0xe5e7eb;
    const directionalLight = new THREE.DirectionalLight(
      directionalLightColor,
      1.3
    );
    directionalLight.position.set(5, 3, 5);
    scene.add(ambientLight, directionalLight);

    const energyMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.core),
      emissive: new THREE.Color(palette.emissive),
      emissiveIntensity: 0.6,
      metalness: 0.4,
      roughness: 0.15,
      transparent: true,
      opacity: 0.9,
    });

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.ring),
      emissive: new THREE.Color(palette.ringEmissive),
      emissiveIntensity: 0.85,
      metalness: 0.7,
      roughness: 0.2,
    });

    let energyCore: THREE.Mesh;
    let ringOuter: THREE.Mesh | null = null;
    let ringInner: THREE.Mesh | null = null;
    const loopCollection: THREE.Mesh[] = [];
    const frameCollection: THREE.Mesh[] = [];

    if (variant === 'onyx') {
      energyCore = new THREE.Mesh(
        new THREE.SphereGeometry(0.68, 48, 48),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(palette.core),
          emissive: new THREE.Color(palette.emissive),
          emissiveIntensity: 0.9,
          transparent: true,
          opacity: 0.85,
          metalness: 0.3,
          roughness: 0.1,
        })
      );
      scene.add(energyCore);

      const loopMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(palette.ring),
        emissive: new THREE.Color(palette.ringEmissive),
        emissiveIntensity: 1.1,
        metalness: 0.65,
        roughness: 0.18,
      });

      const loopGeometry = new THREE.TorusGeometry(1.65, 0.22, 64, 320);
      const loopRotations = [
        new THREE.Euler(Math.PI / 2, 0, Math.PI / 6),
        new THREE.Euler(Math.PI / 2.1, Math.PI / 2.4, -Math.PI / 3),
        new THREE.Euler(0, Math.PI / 2, Math.PI / 3),
      ];

      loopRotations.forEach((rotation, index) => {
        const material = loopMaterial.clone();
        material.emissiveIntensity += index * 0.05;
        const loop = new THREE.Mesh(loopGeometry.clone(), material);
        loop.rotation.copy(rotation);
        scene.add(loop);
        loopCollection.push(loop);
      });

      ringInner = new THREE.Mesh(
        new THREE.RingGeometry(2.05, 2.45, 120, 1),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(palette.ring),
          emissive: new THREE.Color(palette.ringEmissive),
          emissiveIntensity: 0.6,
          transparent: true,
          opacity: 0.25,
          side: THREE.DoubleSide,
        })
      );
      ringInner.rotation.x = Math.PI / 2;
      scene.add(ringInner);
    } else if (variant === 'graphite') {
      energyCore = new THREE.Mesh(
        new THREE.DodecahedronGeometry(1.35),
        energyMaterial
      );
      scene.add(energyCore);

      const createSquareTube = (size: number, radius: number) => {
        const half = size / 2;
        const points = [
          new THREE.Vector3(-half, 0, -half),
          new THREE.Vector3(half, 0, -half),
          new THREE.Vector3(half, 0, half),
          new THREE.Vector3(-half, 0, half),
        ];
        const curve = new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0);
        return new THREE.TubeGeometry(curve, 320, radius, 24, true);
      };

      const squareOuterMaterial = ringMaterial.clone();
      squareOuterMaterial.emissiveIntensity = 0.85;
      const squareOuterGeometry = createSquareTube(3.2, 0.14);
      ringOuter = new THREE.Mesh(squareOuterGeometry, squareOuterMaterial);
      ringOuter.rotation.set(Math.PI / 4.2, Math.PI / 10, 0);
      scene.add(ringOuter);

      const squareInnerMaterial = ringMaterial.clone();
      squareInnerMaterial.emissiveIntensity = 0.95;
      const squareInnerGeometry = createSquareTube(2.5, 0.11);
      ringInner = new THREE.Mesh(squareInnerGeometry, squareInnerMaterial);
      ringInner.rotation.set(-Math.PI / 6, Math.PI / 3.4, Math.PI / 8);
      scene.add(ringInner);

      const verticalFrameMaterial = ringMaterial.clone();
      verticalFrameMaterial.emissiveIntensity = 0.75;
      const verticalCurvePoints = [
        new THREE.Vector3(0, -1.8, -1.4),
        new THREE.Vector3(0, 0, -1.8),
        new THREE.Vector3(0, 1.8, -1.4),
        new THREE.Vector3(0, 2.2, 0),
        new THREE.Vector3(0, 1.8, 1.4),
        new THREE.Vector3(0, 0, 1.8),
        new THREE.Vector3(0, -1.8, 1.4),
        new THREE.Vector3(0, -2.2, 0),
      ];
      const verticalCurve = new THREE.CatmullRomCurve3(
        verticalCurvePoints,
        true,
        'catmullrom',
        0.15
      );
      const verticalGeometry = new THREE.TubeGeometry(
        verticalCurve,
        280,
        0.1,
        18,
        true
      );
      const verticalFrame = new THREE.Mesh(
        verticalGeometry,
        verticalFrameMaterial
      );
      verticalFrame.rotation.y = Math.PI / 4;
      verticalFrame.userData.baseRotationY = verticalFrame.rotation.y;
      scene.add(verticalFrame);
      frameCollection.push(verticalFrame);
    } else {
      energyCore = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.4, 1),
        energyMaterial
      );
      scene.add(energyCore);

      const defaultOuterRadius = 2.1;
      const defaultOuterTube = 0.08;
      ringOuter = new THREE.Mesh(
        new THREE.TorusGeometry(defaultOuterRadius, defaultOuterTube, 18, 220),
        ringMaterial
      );
      ringOuter.rotation.x = Math.PI / 3;
      scene.add(ringOuter);

      const innerMaterial = ringMaterial.clone();
      innerMaterial.emissiveIntensity = 0.8;

      const defaultInnerRadius = 1.65;
      const defaultInnerTube = 0.05;
      ringInner = new THREE.Mesh(
        new THREE.TorusGeometry(defaultInnerRadius, defaultInnerTube, 18, 180),
        innerMaterial
      );
      ringInner.rotation.set(-Math.PI / 4, Math.PI / 3.5, 0);
      scene.add(ringInner);
    }

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const radius = 4 + Math.random() * 3.2;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(palette.particle),
      size: 0.035,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const onResize = () => {
      if (!container) return;
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      energyCore.rotation.x = elapsed * 0.45;
      energyCore.rotation.y = elapsed * 0.38;

      if (ringOuter) {
        if (variant === 'graphite') {
          ringOuter.rotation.y = elapsed * 0.18;
          ringOuter.rotation.x = Math.PI / 4.2 + Math.sin(elapsed * 0.25) * 0.08;
        } else {
          ringOuter.rotation.z = elapsed * 0.18;
        }
      }
      if (ringInner) {
        if (variant === 'graphite') {
          ringInner.rotation.y = elapsed * -0.2;
          ringInner.rotation.x =
            -Math.PI / 6 + Math.cos(elapsed * 0.22) * 0.06;
        } else {
          ringInner.rotation.y = elapsed * -0.22;
        }
      }
      if (loopCollection.length) {
        loopCollection.forEach((loop, index) => {
          loop.rotation.z += 0.14 + index * 0.02;
          loop.rotation.y += Math.sin(elapsed * 0.4 + index) * 0.01;
        });
        ringInner!.rotation.z = Math.sin(elapsed * 0.3) * 0.3;
      }
      if (frameCollection.length) {
        frameCollection.forEach((frame) => {
          const baseY = frame.userData.baseRotationY ?? 0;
          frame.rotation.y = baseY + elapsed * 0.12;
          frame.rotation.x = Math.sin(elapsed * 0.2) * 0.06;
        });
      }

      particles.rotation.y = elapsed * 0.08;
      particles.rotation.x = Math.sin(elapsed * 0.2) * 0.05;

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => onResize();
    window.addEventListener('resize', handleResize);

    onResize();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);

      energyCore.geometry.dispose();
      energyMaterial.dispose();
      if (ringOuter) {
        ringOuter.geometry.dispose();
        disposeMaterial(ringOuter.material);
      }
      if (ringInner) {
        ringInner.geometry.dispose();
        disposeMaterial(ringInner.material);
      }
      loopCollection.forEach((loop) => {
        loop.geometry.dispose();
        disposeMaterial(loop.material);
      });
      frameCollection.forEach((frame) => {
        frame.geometry.dispose();
        disposeMaterial(frame.material);
      });
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [variant]);

  const containerClasses = className
    ? ['relative overflow-visible', className].join(' ')
    : 'relative aspect-square w-full max-w-[480px] overflow-visible';

  const glowClasses = [
    'pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br blur-3xl animate-[floating-glow_12s_ease-in-out_infinite]',
    VARIANT_GLOW[variant] ?? VARIANT_GLOW.default,
    glowClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={containerRef}
      className={containerClasses}
    >
      <div className={glowClasses} />
    </div>
  );
}


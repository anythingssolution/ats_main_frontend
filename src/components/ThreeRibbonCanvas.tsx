import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RibbonConfig } from '../types';

interface ThreeRibbonCanvasProps {
  config: RibbonConfig;
  onSlabClick?: (index: number) => void;
  hoveredSlabIndex?: number | null;
}

export const ThreeRibbonCanvas: React.FC<ThreeRibbonCanvasProps> = ({
  config,
  onSlabClick,
  hoveredSlabIndex,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);

  // Mouse interaction target angles
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const manualRotation = useRef({ x: 0, y: 0 });

  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Background color based on theme
    const getBgColor = (theme: string) => {
      switch (theme) {
        case 'architectural-monochrome':
          return 0xf4f4f4;
        case 'dusk-gold':
          return 0x141210;
        case 'cyber-dark':
          return 0x090a0f;
        case 'classic-white':
        default:
          return 0xffffff;
      }
    };

    scene.background = new THREE.Color(getBgColor(config.theme));

    // 2. Camera Setup
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
    camera.position.set(0, 1.2, 14);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Clear previous children if any
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting Setup (Clean Architectural Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, config.theme === 'cyber-dark' ? 0.6 : 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, config.theme === 'cyber-dark' ? 2.0 : 1.8);
    mainLight.position.set(12, 20, 15);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.bias = -0.0001;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 40;
    mainLight.shadow.camera.left = -10;
    mainLight.shadow.camera.right = 10;
    mainLight.shadow.camera.top = 10;
    mainLight.shadow.camera.bottom = -10;
    scene.add(mainLight);

    // Soft fill light from opposite angle
    const fillLight = new THREE.DirectionalLight(0xe0e6ed, 0.8);
    fillLight.position.set(-10, -8, -10);
    scene.add(fillLight);

    // Subtle rim light
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
    rimLight.position.set(0, 15, -15);
    scene.add(rimLight);

    // 5. Main Group for the 3D Helical Sculpture
    const group = new THREE.Group();
    // Offset slightly to match the offset layout in the reference video (centered/left curve)
    group.position.set(-1.2, -0.2, 0);
    scene.add(group);
    groupRef.current = group;

    // 6. Generate Helical Ribbon Slabs
    const count = config.slabCount;
    meshesRef.current = [];

    // Geometry for each architectural slab
    const slabWidth = 2.4;
    const slabHeight = 0.07;
    const slabDepth = 0.9;
    const geometry = new THREE.BoxGeometry(slabWidth, slabHeight, slabDepth);

    // Materials based on theme
    const getSlabMaterial = () => {
      if (config.theme === 'cyber-dark') {
        return new THREE.MeshStandardMaterial({
          color: 0x22252a,
          roughness: 0.2,
          metalness: 0.8,
        });
      } else if (config.theme === 'dusk-gold') {
        return new THREE.MeshStandardMaterial({
          color: 0xe6ded1,
          roughness: 0.3,
          metalness: 0.2,
        });
      } else {
        // Classic Architectural Pure Satin White
        return new THREE.MeshStandardMaterial({
          color: 0xf2f2f2,
          roughness: 0.25,
          metalness: 0.05,
        });
      }
    };

    const defaultMaterial = getSlabMaterial();

    // Parametric helical loop layout logic
    // Creates a sweeping arch spiral curve like the reference video
    for (let i = 0; i < count; i++) {
      const progress = i / count; // 0 to 1
      const angle = progress * Math.PI * config.twistFactor; // Total rotation along path
      
      // Parametric curve formulas
      const radius = config.radius * (1 + 0.15 * Math.sin(progress * Math.PI * 2));
      const x = Math.cos(angle) * radius;
      const y = (progress - 0.5) * 5.2 + Math.sin(angle * 1.5) * 0.8;
      const z = Math.sin(angle) * radius * 0.8;

      const mesh = new THREE.Mesh(geometry, defaultMaterial.clone());
      mesh.position.set(x, y, z);

      // Orientation: Orient slab tangent to the spiral curve with progressive fan angle
      mesh.rotation.y = -angle + Math.PI / 2;
      mesh.rotation.z = Math.sin(progress * Math.PI * 2) * 0.45;
      mesh.rotation.x = Math.cos(progress * Math.PI) * 0.3;

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Store metadata on mesh for raycasting
      mesh.userData = { index: i, originalY: y, originalScale: 1 };

      group.add(mesh);
      meshesRef.current.push(mesh);
    }

    // 7. Mouse Interaction Handlers
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const y = -(((event.clientY - rect.top) / container.clientHeight) * 2 - 1);

      mouseTarget.current = { x: x * 0.4, y: y * 0.3 };

      if (isDragging.current) {
        const deltaX = event.clientX - previousMousePosition.current.x;
        const deltaY = event.clientY - previousMousePosition.current.y;

        manualRotation.current.y += deltaX * 0.008;
        manualRotation.current.x += deltaY * 0.008;

        previousMousePosition.current = { x: event.clientX, y: event.clientY };
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const raycaster = new THREE.Raycaster();
    const mouse2D = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      if (!onSlabClick) return;
      const rect = container.getBoundingClientRect();
      mouse2D.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse2D.y = -(((event.clientY - rect.top) / container.clientHeight) * 2 - 1);

      raycaster.setFromCamera(mouse2D, camera);
      const intersects = raycaster.intersectObjects(meshesRef.current);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        if (clickedMesh.userData && typeof clickedMesh.userData.index === 'number') {
          onSlabClick(clickedMesh.userData.index);
        }
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('click', handleClick);

    // 8. ResizeObserver for responsive canvas updates
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera / mouse parallax interpolation (Lerp)
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.05;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.05;

      if (groupRef.current) {
        // Auto continuous rotation
        if (config.autoRotate) {
          groupRef.current.rotation.y += 0.002 * config.speed;
        }

        // Apply interactive mouse parallax & drag rotations smoothly
        groupRef.current.rotation.y = manualRotation.current.y + mouseCurrent.current.x + (config.autoRotate ? elapsedTime * 0.15 * config.speed : 0);
        groupRef.current.rotation.x = manualRotation.current.x + mouseCurrent.current.y * 0.5;

        // Animate individual slabs subtle wave / breath motion
        meshesRef.current.forEach((mesh, idx) => {
          const wave = Math.sin(elapsedTime * 1.5 + idx * 0.12) * 0.04;
          mesh.position.y = mesh.userData.originalY + wave;

          // Wireframe mode check
          if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.wireframe = config.wireframe;
          }

          // Active hover highlight state
          if (idx === hoveredSlabIndex || idx === activeHoverIndex) {
            mesh.scale.set(1.1, 1.3, 1.1);
            if (mesh.material instanceof THREE.MeshStandardMaterial) {
              mesh.material.color.setHex(0x111111);
            }
          } else {
            mesh.scale.set(1, 1, 1);
            if (mesh.material instanceof THREE.MeshStandardMaterial) {
              if (config.theme === 'cyber-dark') {
                mesh.material.color.setHex(0x22252a);
              } else if (config.theme === 'dusk-gold') {
                mesh.material.color.setHex(0xe6ded1);
              } else {
                mesh.material.color.setHex(0xf2f2f2);
              }
            }
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('click', handleClick);

      geometry.dispose();
      meshesRef.current.forEach((m) => {
        if (m.material instanceof THREE.Material) m.material.dispose();
      });
      renderer.dispose();
    };
  }, [config, hoveredSlabIndex]);

  return (
    <div className="relative w-full h-full min-h-[500px] cursor-grab active:cursor-grabbing select-none">
      <div ref={containerRef} className="w-full h-full absolute inset-0" />

      {/* Subtle interaction tip overlay */}
      <div className="absolute bottom-6 left-6 pointer-events-none hidden sm:flex items-center space-x-2 text-[10px] font-mono-custom uppercase tracking-widest text-neutral-400 bg-white/80 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-200/80 shadow-sm">
        <span className="inline-block w-2 h-2 rounded-full bg-black dark:bg-white animate-pulse" />
        <span>3D PARAMETRIC HELIX • DRAG TO ROTATE</span>
      </div>
    </div>
  );
};

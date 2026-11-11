import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeHeroFlagProps {
  className?: string;
}

export const ThreeHeroFlag: React.FC<ThreeHeroFlagProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [windSpeed, setWindSpeed] = useState<number>(1.2);
  const [is3DActive, setIs3DActive] = useState<boolean>(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL to ensure smooth performance
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Procedural Philippine Flag Texture via 2D Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Top Half: Royal Blue
      ctx.fillStyle = '#0038A8';
      ctx.fillRect(0, 0, 1200, 300);

      // Bottom Half: Crimson Red
      ctx.fillStyle = '#CE1126';
      ctx.fillRect(0, 300, 1200, 300);

      // White Equilateral Triangle on Hoist
      const triangleBase = 600;
      const triangleHeight = (Math.sqrt(3) / 2) * triangleBase; // approx 519.6px
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(triangleHeight, 300);
      ctx.lineTo(0, 600);
      ctx.closePath();
      ctx.fill();

      // Draw Sun in Triangle Center (x: 173.2, y: 300)
      const sunCenterX = triangleHeight / 3;
      const sunCenterY = 300;

      // Draw 8-ray sun
      ctx.save();
      ctx.translate(sunCenterX, sunCenterY);
      ctx.fillStyle = '#FCD116';

      // Sun core
      ctx.beginPath();
      ctx.arc(0, 0, 34, 0, Math.PI * 2);
      ctx.fill();

      // 8 Ray clusters
      for (let i = 0; i < 8; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 4);

        // Major ray
        ctx.beginPath();
        ctx.moveTo(0, 32);
        ctx.lineTo(-7, 78);
        ctx.lineTo(0, 92);
        ctx.lineTo(7, 78);
        ctx.closePath();
        ctx.fill();

        // Left minor ray
        ctx.beginPath();
        ctx.moveTo(-10, 32);
        ctx.lineTo(-14, 68);
        ctx.lineTo(-9, 74);
        ctx.closePath();
        ctx.fill();

        // Right minor ray
        ctx.beginPath();
        ctx.moveTo(10, 32);
        ctx.lineTo(14, 68);
        ctx.lineTo(9, 74);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      // 3 Golden Stars at Triangle vertices
      const drawStar = (cx: number, cy: number, radius: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.fillStyle = '#FCD116';
        ctx.beginPath();
        for (let j = 0; j < 5; j++) {
          ctx.lineTo(Math.cos(((18 + j * 72) * Math.PI) / 180) * radius, -Math.sin(((18 + j * 72) * Math.PI) / 180) * radius);
          ctx.lineTo(
            Math.cos(((54 + j * 72) * Math.PI) / 180) * (radius * 0.45),
            -Math.sin(((54 + j * 72) * Math.PI) / 180) * (radius * 0.45)
          );
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      };

      ctx.restore(); // restore from sunCenter

      // Star 1 (Top hoist vertex)
      drawStar(65, 80, 22);
      // Star 2 (Bottom hoist vertex)
      drawStar(65, 520, 22);
      // Star 3 (Apex vertex)
      drawStar(triangleHeight - 75, 300, 22);
    }

    const flagTexture = new THREE.CanvasTexture(canvas);
    flagTexture.colorSpace = THREE.SRGBColorSpace;
    flagTexture.anisotropy = 4;

    // Geometry: high segment plane for waving cloth ripples
    const planeGeo = new THREE.PlaneGeometry(3.6, 1.9, 48, 30);
    const pos = planeGeo.attributes.position;
    const initialZ = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
      initialZ[i] = pos.getZ(i);
    }

    // Material with subtle gloss for silk/nylon flag fabric
    const flagMat = new THREE.MeshStandardMaterial({
      map: flagTexture,
      roughness: 0.38,
      metalness: 0.12,
      side: THREE.DoubleSide
    });

    const flagMesh = new THREE.Mesh(planeGeo, flagMat);
    flagMesh.position.set(0.15, 0.05, 0);
    flagMesh.rotation.y = -0.12;
    flagMesh.rotation.x = 0.05;
    scene.add(flagMesh);

    // Dynamic 3-Point Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5e6, 2.2);
    dirLight.position.set(2, 3, 4);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x73a8ff, 1.4);
    rimLight.position.set(-3, -1, 2);
    scene.add(rimLight);

    // Animation loop for cloth ripple
    let frameId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime() * windSpeed;

      const positions = planeGeo.attributes.position;
      const count = positions.count;

      for (let i = 0; i < count; i++) {
        const u = positions.getX(i);
        const v = positions.getY(i);

        // Amplitude increases further away from hoist (left edge x ≈ -1.8)
        const hoistFactor = Math.max(0, (u + 1.8) / 3.6);

        // Wave combination for organic fabric flutter
        const wave1 = Math.sin(u * 3.2 - elapsedTime * 4.5) * 0.22 * hoistFactor;
        const wave2 = Math.cos(v * 2.8 + elapsedTime * 3.2) * 0.12 * hoistFactor;
        const flutter = Math.sin(u * 7.0 - elapsedTime * 7.5 + v * 3.0) * 0.05 * hoistFactor;

        positions.setZ(i, initialZ[i] + wave1 + wave2 + flutter);
      }

      positions.needsUpdate = true;
      planeGeo.computeVertexNormals();

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 600;
      const newHeight = container.clientHeight || 340;
      camera.aspect = newHeight > 0 ? newWidth / newHeight : 1;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      planeGeo.dispose();
      flagMat.dispose();
      flagTexture.dispose();
      renderer.dispose();
    };
  }, [windSpeed]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div ref={mountRef} className="w-full h-full pointer-events-none" />

      {/* Floating 3D Wind Control Toggle for users */}
      <div className="absolute bottom-2 right-4 z-20 flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm text-[11px] text-slate-700 font-medium border border-white/50">
        <span className="text-blue-700">3D Fabric Wind:</span>
        <button
          onClick={() => setWindSpeed(0.6)}
          className={`px-1.5 py-0.5 rounded ${windSpeed === 0.6 ? 'bg-blue-600 text-white font-bold' : 'hover:bg-blue-50 text-slate-600'}`}
        >
          Calm
        </button>
        <button
          onClick={() => setWindSpeed(1.2)}
          className={`px-1.5 py-0.5 rounded ${windSpeed === 1.2 ? 'bg-blue-600 text-white font-bold' : 'hover:bg-blue-50 text-slate-600'}`}
        >
          Brisk
        </button>
        <button
          onClick={() => setWindSpeed(2.0)}
          className={`px-1.5 py-0.5 rounded ${windSpeed === 2.0 ? 'bg-blue-600 text-white font-bold' : 'hover:bg-blue-50 text-slate-600'}`}
        >
          Dynamic
        </button>
      </div>
    </div>
  );
};

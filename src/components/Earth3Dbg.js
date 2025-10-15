"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const EnhancedEarth3DMap = () => {
  const mountRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    setIsLoading(false);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    }); //ok

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Higher resolution Earth textures
    const textureLoader = new THREE.TextureLoader();
    
    // Earth material with multiple maps
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg'),
      bumpMap: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg'),
      bumpScale: 0.05,
      specularMap: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg'),
      specular: new THREE.Color(0x222222),
      shininess: 10
    });

    const earthGeometry = new THREE.SphereGeometry(5, 128, 128);
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Clouds with better transparency
    const cloudGeometry = new THREE.SphereGeometry(5.05, 128, 128);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png'),
      transparent: true,
      opacity: 0.5,
      depthWrite: false
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);

    // Enhanced starfield
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 15000;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      // Random positions in a sphere
      const radius = 500 + Math.random() * 1000;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = radius * Math.cos(phi);

      // Random colors
      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.2 + 0.8, Math.random() * 0.2, Math.random() * 0.5 + 0.5);
      starColors[i] = color.r;
      starColors[i + 1] = color.g;
      starColors[i + 2] = color.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 2,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Advanced lighting
    const ambientLight = new THREE.AmbientLight(0x333333, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(10, 5, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x4455ff, 0.3);
    fillLight.position.set(-5, -3, -5);
    scene.add(fillLight);

    camera.position.z = 18;
    camera.position.y = 3;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    // const handleMouseMove = (event) => {
    //   mouseX = (event.clientX - window.innerWidth / 2) * 0.0005;
    //   mouseY = (event.clientY - window.innerHeight / 2) * 0.0005;
    // };

    // window.addEventListener('mousemove', handleMouseMove);

    // Animation with smooth rotation and mouse interaction
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      
      // Smooth rotation with mouse interaction
      earth.rotation.y = elapsedTime * 0.05 + mouseX;
      earth.rotation.x = mouseY * 0.5;
      clouds.rotation.y = elapsedTime * 0.06 + mouseX;
      clouds.rotation.x = mouseY * 0.5;

      // Subtle camera movement
      camera.position.x = Math.sin(elapsedTime * 0.1) * 2;
      camera.position.z = 18 + Math.cos(elapsedTime * 0.05) * 1;

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    // Wait for textures to load
    textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_4096.jpg', () => {
      setIsLoading(false);
    });

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      // window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      earthGeometry.dispose();
      earthMaterial.dispose();
      cloudGeometry.dispose();
      cloudMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, []);

  return (
    <>
      <div 
        ref={mountRef} 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: -1 
        }} 
      />
      {isLoading && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          zIndex: 1000
        }}>
          Loading Earth...
        </div>
      )}
    </>
  );
};

export default EnhancedEarth3DMap;
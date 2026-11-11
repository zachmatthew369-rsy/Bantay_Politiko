import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export interface SelectedBuildingInfo {
  id: string;
  name: string;
  type: 'Government' | 'Commercial' | 'Infrastructure' | 'Sports' | 'Residential';
  height: number;
  occupancy: string;
  energyRating: string;
  projectBudget: string;
  contractor: string;
  status: string;
  position: [number, number, number];
}

interface IsometricCityCanvasProps {
  activeLayer: 'all' | 'traffic' | 'energy' | 'air' | 'budget';
  selectedCity: string;
  onBuildingSelect: (building: SelectedBuildingInfo | null) => void;
  isCinematic: boolean;
  onCinematicEnd: () => void;
  nightMode?: boolean;
}

export const IsometricCityCanvas: React.FC<IsometricCityCanvasProps> = ({
  activeLayer,
  selectedCity,
  onBuildingSelect,
  isCinematic,
  onCinematicEnd,
  nightMode = false
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const buildingsGroupRef = useRef<THREE.Group | null>(null);
  const trafficGroupRef = useRef<THREE.Group | null>(null);
  const networkGroupRef = useRef<THREE.Group | null>(null);
  const waterMeshRef = useRef<THREE.Mesh | null>(null);

  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);

  // Buildings data catalogue dynamically calibrated to archipelago & city
  const cityBuildings: SelectedBuildingInfo[] = React.useMemo(() => {
    const isPalawan = selectedCity.toLowerCase().includes('palawan') || selectedCity.toLowerCase().includes('nido');
    const isMindanao = selectedCity.toLowerCase().includes('davao') || selectedCity.toLowerCase().includes('cagayan');
    const isLuzon = selectedCity.toLowerCase().includes('manila') || selectedCity.toLowerCase().includes('clark') || selectedCity.toLowerCase().includes('baguio');

    if (isPalawan) {
      return [
        {
          id: 'capitol',
          name: `${selectedCity} Eco-Governance & Biosphere Center`,
          type: 'Government',
          height: 12,
          occupancy: '96% (480 Researchers & Rangers)',
          energyRating: '100% Off-Grid Solar & Biomass',
          projectBudget: '₱ 820 Million',
          contractor: 'Palawan Sustainable Eco-Architecture JV',
          status: 'Operational · UNESCO Biosphere Hub',
          position: [0, 7, 0]
        },
        {
          id: 'it-tower-alpha',
          name: 'Marine Biodiversity & Coral Telemetry Spire',
          type: 'Commercial',
          height: 22,
          occupancy: '85% (Marine IoT Labs)',
          energyRating: 'Net-Positive Marine Wave Microgrid',
          projectBudget: '₱ 1.40 Billion',
          contractor: 'Oceanic Research & Infra Corp.',
          status: 'Active Oceanic Monitoring',
          position: [-10, 14, -8]
        },
        {
          id: 'telecom-spire',
          name: 'Island Archipelagic Satellite & Mesh Beacon',
          type: 'Infrastructure',
          height: 32,
          occupancy: '100% Coastal Disaster Radar Mesh',
          energyRating: 'Self-Sustaining Hybrid Array',
          projectBudget: '₱ 450 Million',
          contractor: 'Philippine Archipelagic Telecom',
          status: 'Active Node #09-Palawan',
          position: [12, 17, -12]
        },
        {
          id: 'hospital-complex',
          name: 'Island Eco-Health Emergency Complex',
          type: 'Government',
          height: 10,
          occupancy: '90% (250 Bed Capacity)',
          energyRating: 'Critical Continuous Microgrid',
          projectBudget: '₱ 620 Million',
          contractor: 'MIMAROPA Health Builders',
          status: 'Active Island Care',
          position: [12, 6, 8]
        },
        {
          id: 'arena',
          name: 'Coral Pavilion & Environmental Forum',
          type: 'Sports',
          height: 8,
          occupancy: '12,000 Capacity Amphitheater',
          energyRating: 'Natural Canopy Passive Cooling',
          projectBudget: '₱ 1.10 Billion',
          contractor: 'Eco-Archipelago Timber Works',
          status: 'Completed Milestone',
          position: [-14, 4, 10]
        },
        {
          id: 'transit-hub',
          name: 'Zero-Emission Marine Hydroport & Electric Terminal',
          type: 'Infrastructure',
          height: 6,
          occupancy: '35,000 Daily Passengers',
          energyRating: 'Solar Induction Sea-Catamaran Charging',
          projectBudget: '₱ 1.85 Billion',
          contractor: 'Puerto Princesa Green Maritime Port',
          status: 'Operational Eco-Port',
          position: [4, 3, 14]
        }
      ];
    }

    if (isMindanao) {
      return [
        {
          id: 'capitol',
          name: `${selectedCity} Regional Civic Command Center`,
          type: 'Government',
          height: 14,
          occupancy: '93% (1,650 Personnel)',
          energyRating: 'LEED Gold · Mount Apo Geothermal Powered',
          projectBudget: '₱ 2.10 Billion',
          contractor: 'Mindanao Master Infra Consortium',
          status: 'Operational · COA Verified',
          position: [0, 7, 0]
        },
        {
          id: 'it-tower-alpha',
          name: 'Southern Agro-Tech Innovation Tower',
          type: 'Commercial',
          height: 26,
          occupancy: '90% (4,200 Tech & Agro Workers)',
          energyRating: 'Class A Geothermal-Fed Microgrid',
          projectBudget: '₱ 3.40 Billion',
          contractor: 'Davao Prime Engineering Group',
          status: 'Active Logistics & Software Hub',
          position: [-10, 14, -8]
        },
        {
          id: 'telecom-spire',
          name: 'Mindanao Grid High-Bandwidth Telemetry Spire',
          type: 'Infrastructure',
          height: 36,
          occupancy: '100% Cross-Island Optical Mesh',
          energyRating: 'Self-Sustaining Solar-Battery Array',
          projectBudget: '₱ 750 Million',
          contractor: 'National Broadband Southern Core',
          status: 'Active Node #08-MIN',
          position: [12, 17, -12]
        },
        {
          id: 'hospital-complex',
          name: 'Southern Philippines Advanced Trauma Center',
          type: 'Government',
          height: 12,
          occupancy: '95% (600 Bed Capacity)',
          energyRating: 'Critical Resilience Microgrid',
          projectBudget: '₱ 1.25 Billion',
          contractor: 'Mindanao Medical Builders JV',
          status: 'Operational Tertiary Hospital',
          position: [12, 6, 8]
        },
        {
          id: 'arena',
          name: 'Mindanao Civic Stadium & Sports Complex',
          type: 'Sports',
          height: 9,
          occupancy: '30,000 Capacity Modern Arena',
          energyRating: 'Net-Zero Solar Dome Array',
          projectBudget: '₱ 4.80 Billion',
          contractor: 'Southern Sports Infra Builders',
          status: 'Completed Milestone',
          position: [-14, 4, 10]
        },
        {
          id: 'transit-hub',
          name: 'Davao Coastal Expressway & BRT Intermodal',
          type: 'Infrastructure',
          height: 6,
          occupancy: '140,000 Daily Commuters',
          energyRating: 'Fast Electric Bus Induction Loop',
          projectBudget: '₱ 3.20 Billion',
          contractor: 'Mindanao Transit Infrastructure Corp.',
          status: 'Operational Transit Axis',
          position: [4, 3, 14]
        }
      ];
    }

    if (isLuzon) {
      return [
        {
          id: 'capitol',
          name: `${selectedCity} National Civic & Legislative Hall`,
          type: 'Government',
          height: 16,
          occupancy: '95% (2,800 Civil Servants)',
          energyRating: 'LEED Platinum · Microgrid Synced',
          projectBudget: '₱ 5.20 Billion',
          contractor: 'Luzon Premier Civic Builders',
          status: 'Operational · Full Transparency Audit',
          position: [0, 7, 0]
        },
        {
          id: 'it-tower-alpha',
          name: 'Financial Core High-Rise Skyscraper',
          type: 'Commercial',
          height: 32,
          occupancy: '94% (6,500 Fintech Specialists)',
          energyRating: 'Smart Glass Automated Solar Tracking',
          projectBudget: '₱ 7.60 Billion',
          contractor: 'Megawide Capital Engineering',
          status: 'National Fintech Core',
          position: [-10, 14, -8]
        },
        {
          id: 'telecom-spire',
          name: 'Luzon Central 5G Gigabit Spire',
          type: 'Infrastructure',
          height: 38,
          occupancy: '100% Backbone Data Exchange',
          energyRating: 'Redundant Hydrogen Fuel Cell & Solar',
          projectBudget: '₱ 980 Million',
          contractor: 'National Fiber Transmission Co.',
          status: 'Active Node #01-NCR',
          position: [12, 17, -12]
        },
        {
          id: 'hospital-complex',
          name: 'National Specialty Medical Center Complex',
          type: 'Government',
          height: 14,
          occupancy: '96% (800 Bed Capacity)',
          energyRating: 'Emergency Dual-Grid Microgrid',
          projectBudget: '₱ 2.40 Billion',
          contractor: 'National Health Infrastructure JV',
          status: 'Operational Quad-Tower Complex',
          position: [12, 6, 8]
        },
        {
          id: 'arena',
          name: 'Clark International Olympic Coliseum',
          type: 'Sports',
          height: 10,
          occupancy: '45,000 Capacity Stadium',
          energyRating: 'Photovoltaic Kinetic Roof',
          projectBudget: '₱ 6.80 Billion',
          contractor: 'Clark Sports Development Consortium',
          status: 'Operational SEA Games Venue',
          position: [-14, 4, 10]
        },
        {
          id: 'transit-hub',
          name: 'Metro High-Speed Subway & Commuter Hub',
          type: 'Infrastructure',
          height: 7,
          occupancy: '380,000 Daily Passengers',
          energyRating: 'Regenerative Braking Substation Grid',
          projectBudget: '₱ 12.5 Billion',
          contractor: 'Philippine-Japan Metro Subway JV',
          status: 'Phase 1 Active Operations',
          position: [4, 3, 14]
        }
      ];
    }

    // Default: Visayas (Metro Cebu / Iloilo)
    return [
      {
        id: 'capitol',
        name: `${selectedCity} Civic & Provincial Capitol`,
        type: 'Government',
        height: 14,
        occupancy: '94% (1,420 Personnel)',
        energyRating: 'LEED Gold · 78% Solar Powered',
        projectBudget: '₱ 1.45 Billion',
        contractor: 'Philippine National Infra & Restoration Consortium',
        status: 'Operational · COA Verified',
        position: [0, 7, 0]
      },
      {
        id: 'it-tower-alpha',
        name: 'Smart IT Innovation Tower A',
        type: 'Commercial',
        height: 28,
        occupancy: '88% (3,800 Tech Workers)',
        energyRating: 'Class A High-Efficiency Microgrid',
        projectBudget: '₱ 3.80 Billion',
        contractor: 'Megawide Prime Engineering JV',
        status: 'Active Commercial Hub',
        position: [-10, 14, -8]
      },
      {
        id: 'telecom-spire',
        name: '5G Smart Grid Communication Tower',
        type: 'Infrastructure',
        height: 34,
        occupancy: '100% Telecom Network Mesh',
        energyRating: 'Self-Sustaining Solar-Battery Array',
        projectBudget: '₱ 620 Million',
        contractor: 'National Fiber & Telecom Logistics',
        status: 'Active Node #04-PH',
        position: [12, 17, -12]
      },
      {
        id: 'hospital-complex',
        name: 'Smart Regional Medical Center',
        type: 'Government',
        height: 12,
        occupancy: '92% (500 Bed Capacity)',
        energyRating: 'Critical Continuous Microgrid',
        projectBudget: '₱ 850 Million',
        contractor: 'Visayas Prime Medical Builders',
        status: 'Operational Tertiary Hospital',
        position: [12, 6, 8]
      },
      {
        id: 'arena',
        name: 'Philippine Smart Sports Coliseum',
        type: 'Sports',
        height: 8,
        occupancy: '25,000 Capacity Dynamic Venue',
        energyRating: 'Net-Zero Solar Roof Array',
        projectBudget: '₱ 4.10 Billion',
        contractor: 'Archipelago Sports Infra Corp.',
        status: 'Completed Milestone',
        position: [-14, 4, 10]
      },
      {
        id: 'transit-hub',
        name: 'Intermodal Bus Rapid Transit Terminal',
        type: 'Infrastructure',
        height: 6,
        occupancy: '120,000 Daily Passengers',
        energyRating: 'Electric Fleet Induction Charging',
        projectBudget: '₱ 2.30 Billion',
        contractor: 'Metro Cebu BRT Builders',
        status: 'Active Public Transit Corridor',
        position: [4, 3, 14]
      }
    ];
  }, [selectedCity]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // Detect software WebGL to preserve 60fps
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

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Background color: Clean pearl-white and ice-blue or deep cyber blue at night
    const bgColor = nightMode ? 0x0a1128 : 0xecf4fd;
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.FogExp2(bgColor, 0.008);

    // Isometric Camera Setup (True 3D Isometric Orthographic Angle)
    const aspect = width / height;
    const d = 28;
    const camera = new THREE.OrthographicCamera(
      -d * aspect,
      d * aspect,
      d,
      -d,
      0.1,
      1000
    );
    cameraRef.current = camera;

    // Standard Isometric viewing angle (Isometric 45-degree angle)
    camera.position.set(42, 45, 42);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = nightMode ? 1.4 : 1.15;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // ==========================================
    // 1. LIGHTING RIG (Balanced 3-Point Studio + Sunlight)
    // ==========================================
    const ambientLight = new THREE.AmbientLight(
      nightMode ? 0x223366 : 0xdbeafe,
      nightMode ? 0.9 : 1.4
    );
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(
      nightMode ? 0x4477dd : 0xfffaea,
      nightMode ? 1.2 : 2.4
    );
    sunLight.position.set(50, 70, 35);
    sunLight.castShadow = !isSoftwareGl;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.left = -40;
    sunLight.shadow.camera.right = 40;
    sunLight.shadow.camera.top = 40;
    sunLight.shadow.camera.bottom = -40;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(nightMode ? 0x112244 : 0x73a8ff, 0.8);
    fillLight.position.set(-35, 40, -35);
    scene.add(fillLight);

    // ==========================================
    // 2. CITY BASE PLATE & WATER CANAL
    // ==========================================
    const cityBaseGroup = new THREE.Group();
    scene.add(cityBaseGroup);

    // Pearl-White City Island Platform
    const islandGeo = new THREE.BoxGeometry(64, 4, 64);
    const islandMat = new THREE.MeshStandardMaterial({
      color: nightMode ? 0x111c38 : 0xffffff,
      roughness: 0.25,
      metalness: 0.1
    });
    const islandMesh = new THREE.Mesh(islandGeo, islandMat);
    islandMesh.position.y = -2;
    islandMesh.receiveShadow = true;
    cityBaseGroup.add(islandMesh);

    // Water Canal / Strait (e.g. Mactan Channel / Pasig River corridor)
    const waterGeo = new THREE.PlaneGeometry(64, 16, 24, 24);
    const waterMat = new THREE.MeshStandardMaterial({
      color: nightMode ? 0x0055bb : 0x0088e8,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(0, 0.05, -22);
    cityBaseGroup.add(waterMesh);
    waterMeshRef.current = waterMesh;

    // Suspension Bridge over Water
    const bridgeGroup = new THREE.Group();
    const bridgeDeck = new THREE.Mesh(
      new THREE.BoxGeometry(6, 0.6, 18),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3 })
    );
    bridgeDeck.position.set(-4, 1.2, -22);
    bridgeDeck.castShadow = true;
    bridgeGroup.add(bridgeDeck);

    // Bridge Pylons
    const pylonMat = new THREE.MeshStandardMaterial({ color: 0x0757d9, roughness: 0.3 });
    const pylon1 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 8, 1.2), pylonMat);
    pylon1.position.set(-6.8, 4, -22);
    const pylon2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 8, 1.2), pylonMat);
    pylon2.position.set(-1.2, 4, -22);
    bridgeGroup.add(pylon1, pylon2);
    cityBaseGroup.add(bridgeGroup);

    // ==========================================
    // 3. ROADS & INFRASTRUCTURE NETWORK
    // ==========================================
    const roadMat = new THREE.MeshStandardMaterial({
      color: nightMode ? 0x1a233a : 0x334155,
      roughness: 0.8
    });

    // Main Avenue Cross
    const roadX = new THREE.Mesh(new THREE.PlaneGeometry(60, 5), roadMat);
    roadX.rotation.x = -Math.PI / 2;
    roadX.position.set(0, 0.02, 0);
    roadX.receiveShadow = true;
    cityBaseGroup.add(roadX);

    const roadZ = new THREE.Mesh(new THREE.PlaneGeometry(5, 60), roadMat);
    roadZ.rotation.x = -Math.PI / 2;
    roadZ.position.set(0, 0.03, 0);
    roadZ.receiveShadow = true;
    cityBaseGroup.add(roadZ);

    // Secondary perimeter ring road
    const ringRoad1 = new THREE.Mesh(new THREE.PlaneGeometry(4, 50), roadMat);
    ringRoad1.rotation.x = -Math.PI / 2;
    ringRoad1.position.set(-18, 0.02, 0);
    cityBaseGroup.add(ringRoad1);

    const ringRoad2 = new THREE.Mesh(new THREE.PlaneGeometry(4, 50), roadMat);
    ringRoad2.rotation.x = -Math.PI / 2;
    ringRoad2.position.set(18, 0.02, 0);
    cityBaseGroup.add(ringRoad2);

    // Road markings & crosswalks
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (let i = -26; i <= 26; i += 4) {
      if (Math.abs(i) > 3) {
        const line = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.25), lineMat);
        line.rotation.x = -Math.PI / 2;
        line.position.set(i, 0.04, 0);
        cityBaseGroup.add(line);

        const lineV = new THREE.Mesh(new THREE.PlaneGeometry(0.25, 1.6), lineMat);
        lineV.rotation.x = -Math.PI / 2;
        lineV.position.set(0, 0.04, i);
        cityBaseGroup.add(lineV);
      }
    }

    // ==========================================
    // 4. DETAILED MINIATURE BUILDINGS & LANDMARKS
    // ==========================================
    const buildingsGroup = new THREE.Group();
    buildingsGroupRef.current = buildingsGroup;
    scene.add(buildingsGroup);

    // Material Library for Buildings
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.85,
      transparent: true,
      opacity: 0.88
    });

    const whiteConcreteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.35,
      metalness: 0.05
    });

    const darkTrimMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.5
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.2,
      metalness: 0.8
    });

    const civicRoofMat = new THREE.MeshStandardMaterial({
      color: 0x0757d9,
      roughness: 0.3
    });

    // Helper: Build a multi-tier skyscraper
    const createSkyscraper = (
      id: string,
      x: number,
      z: number,
      w: number,
      d: number,
      totalHeight: number,
      style: 'glass' | 'corporate' | 'tiered' | 'tower'
    ) => {
      const bGroup = new THREE.Group();
      bGroup.userData = { id };

      if (style === 'tiered') {
        // Tier 1 Base
        const h1 = totalHeight * 0.45;
        const m1 = new THREE.Mesh(new THREE.BoxGeometry(w, h1, d), whiteConcreteMat);
        m1.position.y = h1 / 2;
        m1.castShadow = true;
        m1.receiveShadow = true;
        bGroup.add(m1);

        // Tier 2 Mid Glass Tower
        const h2 = totalHeight * 0.35;
        const m2 = new THREE.Mesh(new THREE.BoxGeometry(w * 0.8, h2, d * 0.8), glassMat);
        m2.position.y = h1 + h2 / 2;
        m2.castShadow = true;
        bGroup.add(m2);

        // Tier 3 Penthouse & Roof HVAC
        const h3 = totalHeight * 0.2;
        const m3 = new THREE.Mesh(new THREE.BoxGeometry(w * 0.55, h3, d * 0.55), whiteConcreteMat);
        m3.position.y = h1 + h2 + h3 / 2;
        m3.castShadow = true;
        bGroup.add(m3);

        // Roof Antenna Mast
        const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 4), goldAccentMat);
        ant.position.y = totalHeight + 2;
        bGroup.add(ant);
      } else if (style === 'glass') {
        // Sleek Curvature Glass Tower
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, totalHeight, d), glassMat);
        mesh.position.y = totalHeight / 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        bGroup.add(mesh);

        // Floor dividing bands
        for (let y = 2; y < totalHeight; y += 3) {
          const band = new THREE.Mesh(
            new THREE.BoxGeometry(w + 0.1, 0.25, d + 0.1),
            whiteConcreteMat
          );
          band.position.y = y;
          bGroup.add(band);
        }

        // Rooftop Helipad
        const helipad = new THREE.Mesh(
          new THREE.CylinderGeometry(w * 0.35, w * 0.35, 0.2, 16),
          darkTrimMat
        );
        helipad.position.y = totalHeight + 0.1;
        bGroup.add(helipad);
      } else {
        // Modern Block Corporate
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, totalHeight, d), whiteConcreteMat);
        mesh.position.y = totalHeight / 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        bGroup.add(mesh);

        // Glass window inset
        const win = new THREE.Mesh(
          new THREE.BoxGeometry(w * 0.85, totalHeight * 0.9, d + 0.05),
          glassMat
        );
        win.position.y = totalHeight / 2;
        bGroup.add(win);
      }

      bGroup.position.set(x, 0, z);
      buildingsGroup.add(bGroup);
      return bGroup;
    };

    // 1. Featured Civic & Provincial Capitol (Center Landmark)
    const capitolGroup = new THREE.Group();
    capitolGroup.userData = { id: 'capitol' };

    // Neoclassical podium with steps
    const podium = new THREE.Mesh(new THREE.BoxGeometry(16, 2, 14), whiteConcreteMat);
    podium.position.y = 1;
    podium.castShadow = true;
    podium.receiveShadow = true;
    capitolGroup.add(podium);

    // Main Colonnade Hall
    const mainHall = new THREE.Mesh(new THREE.BoxGeometry(12, 6, 10), whiteConcreteMat);
    mainHall.position.y = 5;
    mainHall.castShadow = true;
    capitolGroup.add(mainHall);

    // Colonnade Pillars
    for (let px = -5; px <= 5; px += 2) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 5, 8), whiteConcreteMat);
      col.position.set(px, 4.5, 5.2);
      col.castShadow = true;
      capitolGroup.add(col);
    }

    // Pediment Roof
    const pediment = new THREE.Mesh(
      new THREE.CylinderGeometry(0, 7, 2.5, 4),
      civicRoofMat
    );
    pediment.rotation.y = Math.PI / 4;
    pediment.position.set(0, 9.25, 0);
    pediment.castShadow = true;
    capitolGroup.add(pediment);

    // Golden Central Dome
    const dome = new THREE.Mesh(new THREE.SphereGeometry(2.4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), goldAccentMat);
    dome.position.set(0, 10.5, 0);
    capitolGroup.add(dome);

    // Flagpole with Philippine Flag
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 4), goldAccentMat);
    pole.position.set(0, 14, 0);
    capitolGroup.add(pole);

    const miniFlag = new THREE.Mesh(
      new THREE.PlaneGeometry(1.6, 0.9),
      new THREE.MeshBasicMaterial({ color: 0x0038a8, side: THREE.DoubleSide })
    );
    miniFlag.position.set(0.8, 14.5, 0);
    capitolGroup.add(miniFlag);

    capitolGroup.position.set(0, 0, 0);
    buildingsGroup.add(capitolGroup);

    // 2. High-Tech Skyscraper Cluster (IT Park & Commercial Districts)
    createSkyscraper('it-tower-alpha', -10, -8, 6, 6, 28, 'tiered');
    createSkyscraper('tower-b', -10, -16, 5, 5, 22, 'glass');
    createSkyscraper('tower-c', -18, -8, 5, 6, 18, 'corporate');
    createSkyscraper('telecom-spire', 12, -12, 4, 4, 34, 'tiered');
    createSkyscraper('tower-d', 18, -12, 5, 5, 24, 'glass');

    // 3. Hospital Complex
    const hospitalGroup = new THREE.Group();
    hospitalGroup.userData = { id: 'hospital-complex' };
    const hospMain = new THREE.Mesh(new THREE.BoxGeometry(10, 8, 8), whiteConcreteMat);
    hospMain.position.y = 4;
    hospMain.castShadow = true;
    hospitalGroup.add(hospMain);

    const hospWing = new THREE.Mesh(new THREE.BoxGeometry(6, 6, 7), glassMat);
    hospWing.position.set(5, 3, 0);
    hospWing.castShadow = true;
    hospitalGroup.add(hospWing);

    // Red Cross Emblem
    const crossH = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.5, 0.1), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
    crossH.position.set(0, 6, 4.08);
    const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.8, 0.1), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
    crossV.position.set(0, 6, 4.08);
    hospitalGroup.add(crossH, crossV);
    hospitalGroup.position.set(12, 0, 8);
    buildingsGroup.add(hospitalGroup);

    // 4. Circular Sports Stadium
    const stadiumGroup = new THREE.Group();
    stadiumGroup.userData = { id: 'arena' };
    const stadiumOuter = new THREE.Mesh(
      new THREE.CylinderGeometry(6.5, 5.5, 4, 32, 1, true),
      whiteConcreteMat
    );
    stadiumOuter.position.y = 2;
    stadiumOuter.castShadow = true;
    stadiumGroup.add(stadiumOuter);

    const stadiumField = new THREE.Mesh(
      new THREE.CylinderGeometry(5.2, 5.2, 0.2, 32),
      new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.8 })
    );
    stadiumField.position.y = 0.5;
    stadiumGroup.add(stadiumField);

    const stadiumRoof = new THREE.Mesh(
      new THREE.TorusGeometry(5.8, 0.8, 12, 32),
      glassMat
    );
    stadiumRoof.rotation.x = Math.PI / 2;
    stadiumRoof.position.y = 4.2;
    stadiumGroup.add(stadiumRoof);
    stadiumGroup.position.set(-14, 0, 10);
    buildingsGroup.add(stadiumGroup);

    // 5. Intermodal Transit Hub
    const transitGroup = new THREE.Group();
    transitGroup.userData = { id: 'transit-hub' };
    const transitBase = new THREE.Mesh(new THREE.BoxGeometry(10, 3, 6), whiteConcreteMat);
    transitBase.position.y = 1.5;
    transitBase.castShadow = true;
    transitGroup.add(transitBase);

    const canopy = new THREE.Mesh(new THREE.BoxGeometry(12, 0.4, 8), glassMat);
    canopy.position.y = 3.6;
    transitGroup.add(canopy);
    transitGroup.position.set(4, 0, 14);
    buildingsGroup.add(transitGroup);

    // ==========================================
    // 5. GREEN PARKS, TREES & LANDSCAPING
    // ==========================================
    const parkMat = new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.9 });
    const park1 = new THREE.Mesh(new THREE.BoxGeometry(10, 0.1, 8), parkMat);
    park1.position.set(-8, 0.05, 8);
    cityBaseGroup.add(park1);

    const park2 = new THREE.Mesh(new THREE.BoxGeometry(8, 0.1, 10), parkMat);
    park2.position.set(10, 0.05, -6);
    cityBaseGroup.add(park2);

    // Procedural Isometric Low-Poly Trees
    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
    const treeFoliageMat1 = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.6 });
    const treeFoliageMat2 = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.6 });

    const createTree = (x: number, z: number, scale = 1) => {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12 * scale, 0.18 * scale, 1.2 * scale, 6), treeTrunkMat);
      trunk.position.y = 0.6 * scale;
      trunk.castShadow = true;
      tree.add(trunk);

      const top = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.8 * scale),
        Math.random() > 0.5 ? treeFoliageMat1 : treeFoliageMat2
      );
      top.position.y = 1.6 * scale;
      top.castShadow = true;
      tree.add(top);

      tree.position.set(x, 0, z);
      cityBaseGroup.add(tree);
    };

    // Plant trees in parks & along boulevards
    [
      [-10, 6], [-6, 6], [-10, 10], [-6, 10], [-8, 7.5],
      [8, -4], [12, -4], [8, -8], [12, -8],
      [2, 2.8], [-2, 2.8], [2, -2.8], [-2, -2.8],
      [-16, 2], [16, 2], [-16, -2], [16, -2]
    ].forEach(([tx, tz]) => createTree(tx, tz, 0.9 + Math.random() * 0.3));

    // ==========================================
    // 6. ANIMATED TRAFFIC & CITIZEN VEHICLES
    // ==========================================
    const trafficGroup = new THREE.Group();
    trafficGroupRef.current = trafficGroup;
    scene.add(trafficGroup);

    interface VehicleAgent {
      mesh: THREE.Group;
      speed: number;
      axis: 'x' | 'z';
      dir: number;
      min: number;
      max: number;
    }

    const vehicles: VehicleAgent[] = [];
    const carColors = [0x0757d9, 0xdc2626, 0xf59e0b, 0xffffff, 0x10b981];

    const createCar = (axis: 'x' | 'z', fixedCoord: number, start: number, dir: number) => {
      const carGroup = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(axis === 'x' ? 1.6 : 0.8, 0.6, axis === 'x' ? 0.8 : 1.6),
        new THREE.MeshStandardMaterial({
          color: carColors[Math.floor(Math.random() * carColors.length)],
          roughness: 0.2,
          metalness: 0.5
        })
      );
      body.position.y = 0.35;
      body.castShadow = true;
      carGroup.add(body);

      // Cabin Glass
      const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(axis === 'x' ? 0.9 : 0.6, 0.4, axis === 'x' ? 0.6 : 0.9),
        glassMat
      );
      cabin.position.y = 0.75;
      carGroup.add(cabin);

      // Headlights
      const lightMat = new THREE.MeshBasicMaterial({ color: 0xfff388 });
      const hl = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), lightMat);
      hl.position.set(axis === 'x' ? dir * 0.85 : 0, 0.35, axis === 'z' ? dir * 0.85 : 0);
      carGroup.add(hl);

      if (axis === 'x') {
        carGroup.position.set(start, 0, fixedCoord);
      } else {
        carGroup.position.set(fixedCoord, 0, start);
      }

      trafficGroup.add(carGroup);
      vehicles.push({
        mesh: carGroup,
        speed: 0.12 + Math.random() * 0.08,
        axis,
        dir,
        min: -28,
        max: 28
      });
    };

    // Spawn 12 vehicles along primary lanes
    createCar('x', -1.2, -20, 1);
    createCar('x', -1.2, 5, 1);
    createCar('x', 1.2, 22, -1);
    createCar('x', 1.2, -5, -1);

    createCar('z', -1.2, -22, 1);
    createCar('z', -1.2, 8, 1);
    createCar('z', 1.2, 20, -1);
    createCar('z', 1.2, -6, -1);

    createCar('z', -18, -15, 1);
    createCar('z', 18, 15, -1);

    // ==========================================
    // 7. GLOWING SMART CITY DATA GRID & PULSES
    // ==========================================
    const networkGroup = new THREE.Group();
    networkGroupRef.current = networkGroup;
    scene.add(networkGroup);

    // Spline data highway curves connecting key civic points
    const curvePoints = [
      new THREE.Vector3(-10, 14, -8),
      new THREE.Vector3(0, 16, -4),
      new THREE.Vector3(0, 12, 0), // Capitol
      new THREE.Vector3(12, 14, 8), // Hospital
      new THREE.Vector3(4, 8, 14) // Transit Hub
    ];
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.12, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.75
    });
    const dataStream = new THREE.Mesh(tubeGeo, tubeMat);
    networkGroup.add(dataStream);

    // Glowing data packet spheres
    const packetMat = new THREE.MeshBasicMaterial({ color: 0xfff040 });
    const packetMesh = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), packetMat);
    networkGroup.add(packetMesh);

    // ==========================================
    // 8. RAYCASTING & INTERACTIVE OBJECT SELECTION
    // ==========================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(buildingsGroup.children, true);

      if (intersects.length > 0) {
        let rootGroup: THREE.Object3D | null = intersects[0].object;
        while (rootGroup && !rootGroup.userData?.id && rootGroup.parent !== buildingsGroup) {
          rootGroup = rootGroup.parent;
        }
        if (rootGroup && rootGroup.userData?.id) {
          setHoveredBuilding(rootGroup.userData.id);
          renderer.domElement.style.cursor = 'pointer';
          return;
        }
      }
      setHoveredBuilding(null);
      renderer.domElement.style.cursor = 'default';
    };

    const handleClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(buildingsGroup.children, true);

      if (intersects.length > 0) {
        let rootGroup: THREE.Object3D | null = intersects[0].object;
        while (rootGroup && !rootGroup.userData?.id && rootGroup.parent !== buildingsGroup) {
          rootGroup = rootGroup.parent;
        }

        if (rootGroup && rootGroup.userData?.id) {
          const match = cityBuildings.find((b) => b.id === rootGroup?.userData.id);
          if (match) {
            onBuildingSelect(match);

            // GSAP Camera Transition to smoothly focus on the selected building
            gsap.to(camera.position, {
              x: match.position[0] + 24,
              y: 28,
              z: match.position[2] + 24,
              duration: 1.2,
              ease: 'power2.out',
              onUpdate: () => camera.lookAt(match.position[0], match.position[1] / 2, match.position[2])
            });
            return;
          }
        }
      }
      onBuildingSelect(null);
    };

    renderer.domElement.addEventListener('mousemove', handlePointerMove);
    renderer.domElement.addEventListener('click', handleClick);

    // ==========================================
    // 9. ANIMATION LOOP
    // ==========================================
    let frameId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // 1. Water ripple animation
      if (waterMesh) {
        waterMesh.position.y = 0.05 + Math.sin(elapsed * 2.0) * 0.03;
      }

      // 2. Animate traffic vehicles
      vehicles.forEach((v) => {
        if (v.axis === 'x') {
          v.mesh.position.x += v.speed * v.dir;
          if (v.dir > 0 && v.mesh.position.x > v.max) v.mesh.position.x = v.min;
          if (v.dir < 0 && v.mesh.position.x < v.min) v.mesh.position.x = v.max;
        } else {
          v.mesh.position.z += v.speed * v.dir;
          if (v.dir > 0 && v.mesh.position.z > v.max) v.mesh.position.z = v.min;
          if (v.dir < 0 && v.mesh.position.z < v.min) v.mesh.position.z = v.max;
        }
      });

      // 3. Animate data packet along spline
      const t = (elapsed * 0.25) % 1;
      const pt = curve.getPointAt(t);
      packetMesh.position.copy(pt);

      // 4. Subtle hover pulse on building
      buildingsGroup.children.forEach((child) => {
        if (child.userData?.id === hoveredBuilding) {
          child.scale.set(1.02, 1.02, 1.02);
        } else {
          child.scale.set(1, 1, 1);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // ==========================================
    // 10. RESIZE LISTENER
    // ==========================================
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 550;
      const newAspect = h > 0 ? w / h : 1;
      camera.left = -d * newAspect;
      camera.right = d * newAspect;
      camera.top = d;
      camera.bottom = -d;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', handlePointerMove);
      renderer.domElement.removeEventListener('click', handleClick);
      cancelAnimationFrame(frameId);
      renderer.dispose();
    };
  }, [selectedCity, nightMode]);

  // Handle Layer Filtering Visibility
  useEffect(() => {
    if (trafficGroupRef.current) {
      trafficGroupRef.current.visible = activeLayer === 'all' || activeLayer === 'traffic';
    }
    if (networkGroupRef.current) {
      networkGroupRef.current.visible = activeLayer === 'all' || activeLayer === 'energy' || activeLayer === 'budget';
    }
  }, [activeLayer]);

  // Handle Cinematic Camera Flythrough via GSAP
  useEffect(() => {
    if (!isCinematic || !cameraRef.current) return;
    const camera = cameraRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        onCinematicEnd();
      }
    });

    // Fly through different isometric quadrants smoothly
    tl.to(camera.position, {
      x: 35,
      y: 35,
      z: -35,
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: () => camera.lookAt(0, 4, 0)
    })
      .to(camera.position, {
        x: -35,
        y: 40,
        z: -35,
        duration: 3,
        ease: 'power2.inOut',
        onUpdate: () => camera.lookAt(0, 4, 0)
      })
      .to(camera.position, {
        x: -38,
        y: 36,
        z: 38,
        duration: 3,
        ease: 'power2.inOut',
        onUpdate: () => camera.lookAt(0, 4, 0)
      })
      .to(camera.position, {
        x: 42,
        y: 45,
        z: 42,
        duration: 2.5,
        ease: 'power2.out',
        onUpdate: () => camera.lookAt(0, 2, 0)
      });

    return () => {
      tl.kill();
    };
  }, [isCinematic, onCinematicEnd]);

  return (
    <div className="relative w-full h-full select-none">
      <div ref={mountRef} className="w-full h-full" />

      {/* Hover Tooltip Indicator */}
      {hoveredBuilding && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-blue-200 shadow-lg text-xs font-bold text-[#102A56] pointer-events-none flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
          <span>Click to inspect: {hoveredBuilding.toUpperCase()}</span>
        </div>
      )}
    </div>
  );
};

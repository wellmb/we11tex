(function () {
  const wrap = document.getElementById('bg-canvas-wrap');
  const canvas = document.getElementById('bg-canvas');
  if (!wrap || !canvas || !window.THREE) return;

  const THREE = window.THREE;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x03030a, 0.028);

  const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 220);
  camera.position.set(0, 0.8, 31);

  const ambient = new THREE.AmbientLight(0x5a61ff, 0.42);
  const key = new THREE.DirectionalLight(0x8190ff, 0.72);
  key.position.set(7, 9, 12);
  const rim = new THREE.PointLight(0x4752ff, 2.4, 80, 2.2);
  rim.position.set(-10, -2, -16);
  scene.add(ambient, key, rim);

  const stage = new THREE.Group();
  const cylinder = new THREE.Group();
  stage.add(cylinder);
  scene.add(stage);

  function seededRandom(seed) {
    let t = seed + 0x6d2b79f5;
    return function () {
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function makePanelTexture(index, variant) {
    const rand = seededRandom(index * 97 + variant * 811);
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 1024;
    const g = c.getContext('2d');

    g.fillStyle = '#020208';
    g.fillRect(0, 0, c.width, c.height);

    const grad = g.createLinearGradient(0, 0, 0, c.height);
    grad.addColorStop(0, 'rgba(23,27,54,0.9)');
    grad.addColorStop(0.36, 'rgba(11,14,32,0.85)');
    grad.addColorStop(1, 'rgba(2,3,8,0.95)');
    g.fillStyle = grad;
    g.fillRect(0, 0, c.width, c.height);

    g.strokeStyle = 'rgba(135,150,255,0.08)';
    g.lineWidth = 1;
    for (let x = 0; x < c.width; x += 34) {
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x, c.height);
      g.stroke();
    }
    for (let y = 0; y < c.height; y += 34) {
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(c.width, y);
      g.stroke();
    }

    g.strokeStyle = 'rgba(99,102,241,0.22)';
    g.lineWidth = 1.2;
    for (let i = 0; i < 14; i++) {
      const y = (i + rand()) * (c.height / 14);
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(c.width, y + (rand() - 0.5) * 22);
      g.stroke();
    }

    g.fillStyle = 'rgba(168,180,255,0.07)';
    for (let i = 0; i < 80; i++) {
      const w = 20 + rand() * 80;
      const h = 2 + rand() * 6;
      const x = rand() * c.width;
      const y = rand() * c.height;
      g.fillRect(x, y, w, h);
    }

    g.font = '600 27px "JetBrains Mono", monospace';
    g.fillStyle = 'rgba(191,202,255,0.45)';
    g.textAlign = 'left';
    for (let i = 0; i < 7; i++) {
      const y = 110 + i * 130 + rand() * 18;
      g.fillText(i % 2 === 0 ? 'we11tex' : 'system_data', 34, y);
    }

    g.font = '500 13px "JetBrains Mono", monospace';
    g.fillStyle = 'rgba(148,163,255,0.5)';
    for (let i = 0; i < 16; i++) {
      const y = 42 + i * 60;
      g.fillText(
        '0x' + Math.floor(rand() * 0xffffff).toString(16).padStart(6, '0'),
        34 + rand() * 120,
        y
      );
    }

    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    texture.needsUpdate = true;
    return texture;
  }

  const panelCount = 28;
  const radius = 12.8;
  const panelHeight = 20;
  const panelWidth = ((Math.PI * 2 * radius) / panelCount) * 0.95;

  for (let i = 0; i < panelCount; i++) {
    const angle = (i / panelCount) * Math.PI * 2;
    const geom = new THREE.PlaneGeometry(panelWidth, panelHeight, 1, 1);
    const mat = new THREE.MeshStandardMaterial({
      map: makePanelTexture(i, 0),
      metalness: 0.15,
      roughness: 0.72,
      emissive: 0x11153a,
      emissiveIntensity: 0.44,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    mesh.rotation.y = -angle + Math.PI / 2;
    cylinder.add(mesh);
  }

  const innerRing = new THREE.Group();
  const innerCount = 18;
  const innerRadius = 7.4;
  const innerWidth = ((Math.PI * 2 * innerRadius) / innerCount) * 0.9;
  for (let i = 0; i < innerCount; i++) {
    const angle = (i / innerCount) * Math.PI * 2 + Math.PI / innerCount;
    const geom = new THREE.PlaneGeometry(innerWidth, 14, 1, 1);
    const mat = new THREE.MeshStandardMaterial({
      map: makePanelTexture(i, 1),
      metalness: 0.05,
      roughness: 0.86,
      emissive: 0x090d27,
      emissiveIntensity: 0.26,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(Math.cos(angle) * innerRadius, 0, Math.sin(angle) * innerRadius);
    mesh.rotation.y = -angle + Math.PI / 2;
    innerRing.add(mesh);
  }
  cylinder.add(innerRing);

  const particlesGeom = new THREE.BufferGeometry();
  const particleCount = 520;
  const particleData = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 4 + Math.random() * 15;
    particleData[i * 3 + 0] = Math.cos(a) * r;
    particleData[i * 3 + 1] = (Math.random() - 0.5) * 24;
    particleData[i * 3 + 2] = Math.sin(a) * r;
  }
  particlesGeom.setAttribute('position', new THREE.BufferAttribute(particleData, 3));
  const particles = new THREE.Points(
    particlesGeom,
    new THREE.PointsMaterial({
      color: 0x7c8bff,
      size: 0.085,
      transparent: true,
      opacity: 0.36,
      depthWrite: false,
    })
  );
  scene.add(particles);

  let pointerX = 0;
  let pointerY = 0;
  let targetPointerX = 0;
  let targetPointerY = 0;
  let spinImpulse = 0;
  let tiltImpulse = 0;

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  window.addEventListener(
    'pointermove',
    (e) => {
      const nx = e.clientX / window.innerWidth;
      const ny = e.clientY / window.innerHeight;
      targetPointerX = (nx - 0.5) * 2;
      targetPointerY = (ny - 0.5) * 2;
    },
    { passive: true }
  );

  let lastScrollY = window.scrollY;
  window.addEventListener(
    'scroll',
    () => {
      const nextY = window.scrollY;
      const dy = nextY - lastScrollY;
      lastScrollY = nextY;
      spinImpulse = clamp(spinImpulse + dy * 0.00009, -0.08, 0.08);
      tiltImpulse = clamp(tiltImpulse + dy * 0.00002, -0.18, 0.18);
    },
    { passive: true }
  );

  window.addEventListener(
    'wheel',
    (e) => {
      spinImpulse = clamp(spinImpulse + e.deltaY * 0.0000022, -0.08, 0.08);
      tiltImpulse = clamp(tiltImpulse + e.deltaY * 0.0000007, -0.18, 0.18);
    },
    { passive: true }
  );

  function onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  }

  window.addEventListener('resize', onResize);

  let raf = 0;
  const clock = new THREE.Clock();
  function animate() {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    pointerX += (targetPointerX - pointerX) * 0.06;
    pointerY += (targetPointerY - pointerY) * 0.06;

    const baseSpin = 0.00135;
    cylinder.rotation.y += baseSpin + spinImpulse;
    innerRing.rotation.y -= baseSpin * 0.68 + spinImpulse * 0.44;

    stage.rotation.x += ((-pointerY * 0.16 + tiltImpulse) - stage.rotation.x) * 0.06;
    stage.rotation.z += ((pointerX * 0.1) - stage.rotation.z) * 0.06;

    stage.position.y = Math.sin(t * 0.65) * 0.34;
    particles.rotation.y -= 0.00055 + spinImpulse * 0.3;
    particles.rotation.x = Math.sin(t * 0.4) * 0.03;

    camera.position.x += ((pointerX * 1.7) - camera.position.x) * 0.04;
    camera.position.y += ((0.85 - pointerY * 1.1) - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    spinImpulse *= 0.92;
    tiltImpulse *= 0.9;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
  });
})();

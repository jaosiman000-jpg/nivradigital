// BeamsBackground Canvas Animation - Dark Orange Theme
(function () {
  const canvas = document.getElementById("beams-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let animationFrameId;
  const MINIMUM_BEAMS = 20;
  let beams = [];

  function createBeam(width, height) {
    const angle = -35 + Math.random() * 10;
    return {
      x: Math.random() * width * 1.5 - width * 0.25,
      y: Math.random() * height * 1.5 - height * 0.25,
      width: 30 + Math.random() * 60,
      length: height * 2.5,
      angle: angle,
      speed: 0.6 + Math.random() * 1.2,
      opacity: 0.15 + Math.random() * 0.18,
      hue: 15 + Math.random() * 25, // Dark orange to warm amber (15 - 40)
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
    };
  }

  function updateCanvasSize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);

    const totalBeams = Math.floor(MINIMUM_BEAMS * 1.5);
    beams = Array.from({ length: totalBeams }, () =>
      createBeam(canvas.width, canvas.height)
    );
  }

  function resetBeam(beam, index, totalBeams) {
    const column = index % 3;
    const spacing = canvas.width / 3;

    beam.y = canvas.height + 100;
    beam.x =
      column * spacing +
      spacing / 2 +
      (Math.random() - 0.5) * spacing * 0.5;
    beam.width = 100 + Math.random() * 100;
    beam.speed = 0.5 + Math.random() * 0.4;
    beam.hue = 15 + (index * 25) / totalBeams; // Rich dark orange tones
    beam.opacity = 0.15 + Math.random() * 0.15;
    return beam;
  }

  function drawBeam(ctx, beam) {
    ctx.save();
    ctx.translate(beam.x, beam.y);
    ctx.rotate((beam.angle * Math.PI) / 180);

    const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2);
    const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);

    // Deep dark orange gradients
    gradient.addColorStop(0, `hsla(${beam.hue}, 95%, 45%, 0)`);
    gradient.addColorStop(0.1, `hsla(${beam.hue}, 95%, 48%, ${pulsingOpacity * 0.5})`);
    gradient.addColorStop(0.4, `hsla(${beam.hue}, 95%, 48%, ${pulsingOpacity})`);
    gradient.addColorStop(0.6, `hsla(${beam.hue}, 95%, 48%, ${pulsingOpacity})`);
    gradient.addColorStop(0.9, `hsla(${beam.hue}, 95%, 48%, ${pulsingOpacity * 0.5})`);
    gradient.addColorStop(1, `hsla(${beam.hue}, 95%, 45%, 0)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = "blur(35px)";

    const totalBeams = beams.length;
    beams.forEach((beam, index) => {
      beam.y -= beam.speed;
      beam.pulse += beam.pulseSpeed;

      if (beam.y + beam.length < -100) {
        resetBeam(beam, index, totalBeams);
      }

      drawBeam(ctx, beam);
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  updateCanvasSize();
  window.addEventListener("resize", updateCanvasSize);
  animate();
})();

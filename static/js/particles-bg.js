(function () {
  var canvas = document.createElement('canvas');
  canvas.id = 'particles-bg';
  canvas.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;';
  document.body.prepend(canvas);

  var ctx = canvas.getContext('2d');
  var particles = [];
  var PARTICLE_COUNT = 90;
  var COLORS = ['#4a9eff', '#00d4ff', '#6ab4ff', '#2080ff', '#38bfff'];
  var CONNECTION_DIST = 130;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function Particle() {
    this.reset = function () {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 2.2 + 0.4;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = Math.random() * 0.55 + 0.2;
      this.alphaSpeed = (Math.random() * 0.003 + 0.001) * (Math.random() < 0.5 ? 1 : -1);
    };
    this.reset();

    this.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha += this.alphaSpeed;
      if (this.alpha > 0.8) this.alphaSpeed = -Math.abs(this.alphaSpeed);
      if (this.alpha < 0.1) this.alphaSpeed = Math.abs(this.alphaSpeed);
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    };

    this.draw = function () {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.shadowBlur = 14;
      ctx.shadowColor = this.color;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
  }

  function drawConnections() {
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / CONNECTION_DIST) * 0.18;
          ctx.strokeStyle = '#4a9eff';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#08080f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawConnections();
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animate);
  }

  function init() {
    resize();
    particles = [];
    for (var i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
    window.addEventListener('resize', resize);
    animate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

export function initParticles(){
  const canvas = document.getElementById('particles');
  if(!canvas) return;

  const isMobile = window.innerWidth <= 720;
  if(isMobile) {
    canvas.style.display = 'none';
    return;
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d', { alpha: true });
  if(!ctx) return;

  let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let w=0, h=0;

  const countBase = reduce ? 20 : 70;
  let particles=[];

  function resize(){
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const area = (w*h) / (1920*1080);
    const n = Math.max(18, Math.floor(countBase * area));
    particles = new Array(n).fill(0).map(()=>({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*1.8 + 0.6,
      vx: (Math.random()*0.35 + 0.1) * (Math.random()<.5?-1:1),
      vy: (Math.random()*0.25 + 0.08) * (Math.random()<.5?-1:1),
      a: Math.random()*0.5 + 0.25
    }));
  }

  let mx=w/2, my=h/2;
  window.addEventListener('mousemove', (e)=>{ mx=e.clientX; my=e.clientY; }, {passive:true});
  window.addEventListener('resize', ()=>{ dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1)); resize(); }, {passive:true});
  resize();

  let raf=0;
  function frame(){
    raf = requestAnimationFrame(frame);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,w,h);

    for(const p of particles){
      // soft attraction to mouse
      const dx = mx - p.x;
      const dy = my - p.y;
      const dist = Math.max(60, Math.hypot(dx,dy));
      const pull = 0.02 / (dist/100);
      p.vx += dx * pull * 0.0006;
      p.vy += dy * pull * 0.0006;

      p.x += p.vx;
      p.y += p.vy;

      // wrap
      if(p.x < -20) p.x = w+20;
      if(p.x > w+20) p.x = -20;
      if(p.y < -20) p.y = h+20;
      if(p.y > h+20) p.y = -20;

      ctx.beginPath();
      ctx.fillStyle = `rgba(0,229,255,${p.a})`;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
  }

  raf = requestAnimationFrame(frame);
}


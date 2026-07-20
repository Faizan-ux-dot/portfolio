export function initCounter(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nums = document.querySelectorAll('[data-count]');
  if(!nums.length) return;

  if(reduce){
    nums.forEach(el=>{ el.textContent = String(el.getAttribute('data-count')); });
    return;
  }

  const io = new IntersectionObserver((entries)=>{
    for(const e of entries){
      if(!e.isIntersecting) continue;
      const el = e.target;
      const target = Number(el.getAttribute('data-count') || '0');
      const start = 0;
      const duration = 1100;
      const t0 = performance.now();

      function step(now){
        const t = Math.min(1, (now - t0)/duration);
        const eased = 1 - Math.pow(1-t, 3);
        const v = Math.round(start + (target-start)*eased);
        el.textContent = String(v);
        if(t<1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      io.unobserve(el);
    }
  }, {threshold: 0.25});

  nums.forEach(el=>io.observe(el));
}


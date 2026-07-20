export function initMagnetic(){
  const els = document.querySelectorAll('.btn--magnetic');
  if(!els.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;

  els.forEach(el=>{
    const strength = 0.18;
    el.addEventListener('mousemove', (e)=>{
      const r = el.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      const dx = (mx - r.width/2);
      const dy = (my - r.height/2);
      const tx = dx * strength;
      const ty = dy * strength;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      el.style.setProperty('--mx', `${(mx/r.width)*100}%`);
      el.style.setProperty('--my', `${(my/r.height)*100}%`);
    }, {passive:true});

    el.addEventListener('mouseleave', ()=>{
      el.style.transform = 'translate3d(0,0,0)';
    });
  });
}


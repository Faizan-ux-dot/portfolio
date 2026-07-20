function reduceMotion(){
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initTilt(){
  const els = document.querySelectorAll('.tilt');
  if(!els.length) return;
  if(reduceMotion()) return;

  els.forEach(el=>{
    el.addEventListener('mousemove', (e)=>{
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * 10;
      const ry = (px - 0.5) * 14;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(0,-2px,0)`;
    }, {passive:true});

    el.addEventListener('mouseleave', ()=>{
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)';
    });

    // Keyboard tilt fallback
    el.addEventListener('focus', ()=>{
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0,-2px,0)';
    });
    el.addEventListener('blur', ()=>{
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)';
    });
  });
}


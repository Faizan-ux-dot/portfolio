function clamp(n, a, b){return Math.max(a, Math.min(b,n));}

export function initCursor(){
  const cursor = document.querySelector('.cursor');
  if(!cursor) return;

  // Hide on touch devices
  if(('ontouchstart' in window) || navigator.maxTouchPoints > 0){
    cursor.style.display = 'none';
    return;
  }

  const outer = cursor.querySelector('.cursor__outer');
  const ring = cursor.querySelector('.cursor__ring');
  const inner = cursor.querySelector('.cursor__inner');

  let x=window.innerWidth/2, y=window.innerHeight/2;
  let tx=x, ty=y;
  let raf=0;

  function loop(){
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;

    const ox = x - 19;
    const oy = y - 19;
    if(outer){ outer.style.transform = `translate3d(${ox}px, ${oy}px, 0)`; }
    if(inner){ inner.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`; }
    if(ring){ ring.style.transform = `translate3d(${x - 40}px, ${y - 40}px, 0)`; }

    raf = requestAnimationFrame(loop);
  }

  raf = requestAnimationFrame(loop);

  window.addEventListener('mousemove', (e)=>{
    tx = e.clientX; ty = e.clientY;
  }, {passive:true});

  window.addEventListener('mousedown', ()=>{
    cursor.classList.add('isDown');
  });
  window.addEventListener('mouseup', ()=>{
    cursor.classList.remove('isDown');
  });

  const hoverSelectors = [
    'a',
    'button',
    '.projectCard',
    '.serviceCard',
    '.techIcon',
    '.tilt'
  ];

  const targets = document.querySelectorAll(hoverSelectors.join(','));
  const isInside = (el)=>{
    return el && el.closest && el.closest(hoverSelectors.join(','));
  };

  window.addEventListener('mousemove', (e)=>{
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const active = isInside(el);
    cursor.classList.toggle('isHover', Boolean(active));
  }, {passive:true});
}


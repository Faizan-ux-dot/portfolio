export function initTestimonials(){
  const rail = document.getElementById('testimonialsRail');
  const dotsEl = document.getElementById('testimonialsDots');
  if(!rail || !dotsEl) return;

  const cards = rail.querySelectorAll('.testimonialCard');
  if(!cards.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce){
    dotsEl.innerHTML='';
    return;
  }

  let idx = 0;
  let timer = null;
  let paused = false;

  function update(){
    const w = rail.parentElement.getBoundingClientRect().width;
    rail.style.transform = `translate3d(${-idx * w}px, 0, 0)`;
    // dots
    const dots = Array.from(dotsEl.querySelectorAll('.testimonials__dot'));
    dots.forEach((d,i)=>d.classList.toggle('isActive', i===idx));
  }

  // Create dots
  dotsEl.innerHTML='';
  cards.forEach((_,i)=>{
    const b = document.createElement('button');
    b.type='button';
    b.className='testimonials__dot';
    b.setAttribute('aria-label', `Go to testimonial ${i+1}`);
    b.addEventListener('click', ()=>{
      idx = i;
      update();
      restart();
    });
    dotsEl.appendChild(b);
  });

  const dots = Array.from(dotsEl.querySelectorAll('.testimonials__dot'));
  dots[0]?.classList.add('isActive');

  function restart(){
    if(timer) clearInterval(timer);
    timer = setInterval(()=>{
      if(paused) return;
      idx = (idx + 1) % cards.length;
      update();
    }, 4200);
  }

  rail.parentElement.addEventListener('mouseenter', ()=>{ paused = true; });
  rail.parentElement.addEventListener('mouseleave', ()=>{ paused = false; });

  window.addEventListener('resize', ()=>update(), {passive:true});

  update();
  restart();
}


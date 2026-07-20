function revealInit(){
  const items = document.querySelectorAll('.reveal');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce){
    items.forEach(el=>el.classList.add('isIn'));
    return;
  }

  const io = new IntersectionObserver((entries)=>{
    for(const e of entries){
      if(e.isIntersecting){
        e.target.classList.add('isIn');
        io.unobserve(e.target);
      }
    }
  }, {threshold: 0.12});

  items.forEach(el=>io.observe(el));
}

function initProgressFills(){
  const fills = document.querySelectorAll('[data-fill]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!fills.length) return;

  const io = new IntersectionObserver((entries)=>{
    for(const e of entries){
      if(e.isIntersecting){
        const el = e.target;
        const val = Number(el.getAttribute('data-fill') || '0');
        el.style.width = `${val}%`;
        io.unobserve(el);
      }
    }
  }, {threshold: 0.25});

  fills.forEach(el=>{
    if(reduce){
      const val = Number(el.getAttribute('data-fill') || '0');
      el.style.width = `${val}%`;
    } else {
      io.observe(el);
    }
  });
}

function initSkillFills(){
  const tracks = document.querySelectorAll('.progress__fill[data-progress]');
  if(!tracks.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(reduce){
    tracks.forEach(el=>{ el.style.width = `${el.getAttribute('data-progress')}%`; });
    return;
  }

  const io = new IntersectionObserver((entries)=>{
    for(const e of entries){
      if(e.isIntersecting){
        const el = e.target;
        el.style.width = `${el.getAttribute('data-progress')}%`;
        io.unobserve(el);
      }
    }
  }, {threshold: 0.2});

  tracks.forEach(el=>io.observe(el));
}

export function initScrollReveal(){
  revealInit();
  initProgressFills();
  initSkillFills();
}


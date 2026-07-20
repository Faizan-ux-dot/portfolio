export function initTyping(){
  const roles = ['Web Development','Progressive Web Apps','Mobile Applications','Full Stack Solutions','API Integration'];
  const roleEl = document.querySelector('.hero__roles .roleText');
  if(!roleEl) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce){
    roleEl.textContent = roles[0];
    return;
  }

  let i=0;
  let last = 0;
  const interval = 1700;

  function step(ts){
    if(!last) last = ts;
    if(ts - last >= interval){
      i = (i + 1) % roles.length;
      roleEl.textContent = roles[i];
      last = ts;
    }
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}


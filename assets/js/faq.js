export function initFAQ(){
  const items = document.querySelectorAll('.faqItem');
  if(!items.length) return;

  items.forEach(item=>{
    const q = item.querySelector('.faqQ');
    const a = item.querySelector('.faqA');
    const icon = item.querySelector('.faqIcon');
    if(!q || !a) return;

    q.addEventListener('click', ()=>{
      const expanded = q.getAttribute('aria-expanded') === 'true';
      // collapse all siblings for accordion feel
      const siblings = Array.from(items);
      for(const s of siblings){
        const sq = s.querySelector('.faqQ');
        const sa = s.querySelector('.faqA');
        const si = s.querySelector('.faqIcon');
        if(s !== item && sq && sa){
          sq.setAttribute('aria-expanded','false');
          sa.hidden = true;
          if(si) si.textContent = '+';
        }
      }

      q.setAttribute('aria-expanded', String(!expanded));
      a.hidden = expanded;
      if(icon) icon.textContent = expanded ? '+' : '–';
    });
  });
}


export function initProjects(){
  const grid = document.getElementById('projectsGrid');
  if(!grid) return;
  const buttons = document.querySelectorAll('.filterBtn');
  const cards = grid.querySelectorAll('.projectCard');
  if(!buttons.length || !cards.length) return;

  function setActive(btn){
    buttons.forEach(b=>{
      const active = b === btn;
      b.classList.toggle('isActive', active);
      b.setAttribute('aria-selected', String(active));
    });
  }

  function apply(filter){
    cards.forEach(card=>{
      const tags = String(card.getAttribute('data-tags')||'');
      const show = filter === 'all' ? true : tags.split(/\s+/).includes(filter);
      card.style.display = show ? '' : 'none';
    });
  }

  buttons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      setActive(btn);
      apply(btn.getAttribute('data-filter') || 'all');
    });
  });
}


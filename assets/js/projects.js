export function initProjects(){
  const container = document.getElementById('projectsCarousel');
  if(!container) return;

  const track = document.getElementById('projectsGrid');
  const buttons = document.querySelectorAll('.filterBtn');
  const cards = track.querySelectorAll('.projectCard');
  const prevBtn = container.querySelector('.carousel-control.prev');
  const nextBtn = container.querySelector('.carousel-control.next');
  const dotsContainer = container.querySelector('.carousel-dots');

  if(!cards.length) return;

  let visibleCards = [];
  let currentIndex = 0;

  function getSlideWidth(){
    return parseInt(getComputedStyle(container).getPropertyValue('--card-width')) || 320;
  }

  function updateCarousel(){
    if(!visibleCards.length) return;

    const slideWidth = getSlideWidth();
    const inactiveScale = 0.9;
    const rotationStep = 26;

    // Translate track to focus on current active card
    const translateX = -(currentIndex * slideWidth) - (slideWidth / 2);
    track.style.transform = `translate3d(${translateX}px, 0, 0)`;

    visibleCards.forEach((card, i) => {
      const active = i === currentIndex;
      card.classList.toggle('isActive', active);

      const rotateY = (currentIndex - i) * rotationStep;
      const scale = active ? 1 : inactiveScale;
      const translateZ = active ? 0 : -120;

      card.style.transform = `rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`;
      card.style.zIndex = active ? 10 : 5 - Math.abs(currentIndex - i);
      card.style.opacity = active ? '1' : '0.75';
    });

    if(prevBtn) prevBtn.disabled = currentIndex === 0;
    if(nextBtn) nextBtn.disabled = currentIndex === visibleCards.length - 1;

    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('isActive', i === currentIndex);
    });
  }

  function selectSlide(index){
    if(!visibleCards.length) return;
    currentIndex = Math.max(0, Math.min(index, visibleCards.length - 1));
    updateCarousel();
  }

  function buildDots(){
    if(!dotsContainer) return;
    dotsContainer.innerHTML = '';
    visibleCards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => selectSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  function applyFilter(filter){
    cards.forEach(card=>{
      const tags = String(card.getAttribute('data-tags')||'');
      const show = filter === 'all' ? true : tags.split(/\s+/).includes(filter);
      card.style.display = show ? 'flex' : 'none';
      if(!show){
        card.classList.remove('isActive');
        card.style.transform = '';
      }
    });

    visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
    currentIndex = 0;

    buildDots();
    updateCarousel();
  }

  if(buttons.length) {
    buttons.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        buttons.forEach(b => b.classList.remove('isActive'));
        btn.classList.add('isActive');
        applyFilter(btn.getAttribute('data-filter') || 'all');
      });
    });
  }

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if(e.target.closest('a, button')) return;

      const idx = visibleCards.indexOf(card);
      if(idx !== -1 && idx !== currentIndex){
        e.preventDefault();
        selectSlide(idx);
      }
    });
  });

  if(prevBtn) prevBtn.addEventListener('click', () => selectSlide(currentIndex - 1));
  if(nextBtn) nextBtn.addEventListener('click', () => selectSlide(currentIndex + 1));

  container.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft'){
      e.preventDefault();
      selectSlide(currentIndex - 1);
    }
    if(e.key === 'ArrowRight'){
      e.preventDefault();
      selectSlide(currentIndex + 1);
    }
  });

  window.addEventListener('resize', updateCarousel);

  applyFilter('all');
}

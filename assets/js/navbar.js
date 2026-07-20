export function initNavbar(){
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const mobile = document.getElementById('navMobile');
  if(!nav) return;

  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav__link, .nav__mobileLink'));

  function updateActiveLink(){
    const headerHeight = nav.offsetHeight || 80;
    let currentId = 'home';

    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      // If the top of the section is above the threshold (headerHeight + 100px)
      if (rect.top <= headerHeight + 100) {
        currentId = sec.getAttribute('id');
      }
    });

    // Check if scrolled to the bottom of the page
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
      currentId = 'contact';
    }

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if(href === `#${currentId}`){
        link.classList.add('isActive');
      } else {
        link.classList.remove('isActive');
      }
    });
  }

  // Initial call
  updateActiveLink();

  let ticking=false;
  function onScroll(){
    if(ticking) return;
    ticking=true;
    requestAnimationFrame(()=>{
      const y = window.scrollY || 0;
      nav.classList.toggle('isScrolled', y > 20);
      updateActiveLink();
      ticking=false;
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});

  // Explicit click handler to make it feel instant on click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('isActive'));
      link.classList.add('isActive');
    });
  });

  if(burger && mobile){
    burger.addEventListener('click', ()=>{
      const isOpen = mobile.hasAttribute('hidden') ? false : true;
      if(isOpen){
        mobile.setAttribute('hidden','');
        burger.setAttribute('aria-expanded','false');
      } else {
        mobile.removeAttribute('hidden');
        burger.setAttribute('aria-expanded','true');
      }
    });

    mobile.addEventListener('click', (e)=>{
      const a = e.target.closest('a');
      if(a){
        mobile.setAttribute('hidden','');
        burger.setAttribute('aria-expanded','false');
      }
    });
  }

  // Spotlight movement
  const spot = document.querySelector('.spotlight');
  if(spot){
    window.addEventListener('mousemove', (e)=>{
      const x = e.clientX;
      const y = e.clientY;
      spot.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`;
    }, {passive:true});
  }

  // Theme button (visual placeholder)
  const themeToggle = document.getElementById('themeToggle');
  if(themeToggle){
    themeToggle.addEventListener('click', ()=>{
      // keep palette constant for premium consistency
      themeToggle.animate([{transform:'translate3d(0,0,0)'},{transform:'translate3d(0,-2px,0)'},{transform:'translate3d(0,0,0)'}],{duration:260, easing:'ease-out'});
    });
  }
}


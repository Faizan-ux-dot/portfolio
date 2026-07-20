import { initLoader } from './loader.js';
import { initCursor } from './cursor.js';
import { initTyping } from './typing.js';
import { initParticles } from './particles.js';
import { initNavbar } from './navbar.js';
import { initScrollReveal } from './scroll.js';
import { initTilt } from './tilt.js';
import { initMagnetic } from './magnetic.js';
import { initCounter } from './counter.js';
import { initFAQ } from './faq.js';
import { initContact } from './contact.js';
import { initProjects } from './projects.js';
import { initTestimonials } from './testimonials.js';
import { initPWA } from './pwa.js';

(function bootstrap(){
  initLoader();
  initCursor();
  initTyping();
  initParticles();
  initNavbar();
  initScrollReveal();
  initTilt();
  initMagnetic();
  initCounter();
  initFAQ();
  initContact();
  initProjects();
  initTestimonials();
  initPWA();

  // Performance score bar animation (About section)
  (function animateAboutPerfBar(){
    const fill = document.querySelector('.skillLine__fill[data-fill]');
    if(!fill) return;

    const target = Number(fill.getAttribute('data-fill')) || 0;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setToTarget = () => {
      fill.style.width = '0%';
      if(reduceMotion){
        fill.style.width = target + '%';
        return;
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          fill.style.width = target + '%';
        });
      });
    };

    const aboutSection = document.getElementById('about') || fill.closest('#about');
    if(aboutSection && 'IntersectionObserver' in window){
      const io = new IntersectionObserver((entries) => {
        for(const e of entries){
          if(e.isIntersecting){
            setToTarget();
            io.disconnect();
            break;
          }
        }
      }, { root: null, threshold: 0.25 });
      io.observe(aboutSection);
      return;
    }

    setToTarget();
  })();

  // Footer year
  const y = document.getElementById('year');
  if(y) y.textContent = String(new Date().getFullYear());
})();



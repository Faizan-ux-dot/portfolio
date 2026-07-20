export function initTyping(){
  const roles = [
    'Full Stack Web Developer',
    'Progressive Web App Developer',
    'Prompt Engineer'
  ];
  const textEl = document.querySelector('.hero__tagline .taglineText');
  if(!textEl) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce){
    textEl.textContent = roles[0];
    return;
  }

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type(){
    const currentWord = roles[wordIndex];
    
    if(isDeleting){
      textEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      textEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if(!isDeleting && charIndex === currentWord.length){
      typingSpeed = 2200;
      isDeleting = true;
    } else if(isDeleting && charIndex === 0){
      isDeleting = false;
      wordIndex = (wordIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

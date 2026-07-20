function validateEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function initContact(){
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactStatus');
  if(!form) return;

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    if(status) status.textContent = '';

    const data = new FormData(form);
    const name = String(data.get('name')||'').trim();
    const email = String(data.get('email')||'').trim();
    const subject = String(data.get('subject')||'').trim();
    const message = String(data.get('message')||'').trim();

    const errors = [];
    if(name.length < 2) errors.push('Enter a valid name.');
    if(!validateEmail(email)) errors.push('Enter a valid email.');
    if(subject.length < 3) errors.push('Enter a subject.');
    if(message.length < 10) errors.push('Message should be at least 10 characters.');

    if(errors.length){
      if(status) status.textContent = errors[0];
      status?.animate?.([{opacity:0},{opacity:1}],{duration:220});
      return;
    }

    // Fake submit (no backend). Premium success UX.
    const btn = form.querySelector('button[type="submit"]');
    if(btn) btn.disabled = true;
    if(status) status.textContent = 'Sending…';

    await new Promise(r=>setTimeout(r, 700));

    if(status){
      status.textContent = 'Message sent successfully. I’ll get back to you soon!';
      status.animate?.([{transform:'translate3d(0,4px,0)', opacity:0},{transform:'translate3d(0,0,0)', opacity:1}],{duration:300, easing:'ease-out'});
    }

    form.reset();
    if(btn) btn.disabled = false;
  });
}


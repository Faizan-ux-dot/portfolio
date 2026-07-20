const CACHE_VERSION = 'v1';
const CACHE_NAME = `faizan-portfolio-${CACHE_VERSION}`;

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/robots.txt',
  '/assets/css/variables.css',
  '/assets/css/animations.css',
  '/assets/css/utilities.css',
  '/assets/css/components.css',
  '/assets/css/cursor.css',
  '/assets/css/loader.css',
  '/assets/css/responsive.css',
  '/assets/css/style.css',
  '/assets/js/main.js'
];

export function initPWA(){
  if(!('serviceWorker' in navigator)) return;

  window.addEventListener('load', async ()=>{
    try{
      await navigator.serviceWorker.register('/service-worker.js');
    }catch(_e){}
  });

  // Install button UX
  const btn = document.getElementById('installBtn');
  const hint = document.getElementById('installHint');
  if(!btn) return;

  let deferredPrompt = null;

  btn.disabled = true;

  window.addEventListener('beforeinstallprompt', (e)=>{
    e.preventDefault();
    deferredPrompt = e;
    btn.disabled = false;
    if(hint) hint.textContent = 'Install ready. Tap to add to your device.';
  });

  btn.addEventListener('click', async ()=>{
    if(!deferredPrompt) return;
    deferredPrompt.prompt();
    const res = await deferredPrompt.userChoice.catch(()=>null);
    deferredPrompt = null;

    btn.disabled = true;
    if(hint){
      hint.textContent = (res && res.outcome === 'accepted') ? 'Installed!' : 'Install dismissed.';
    }
  });
}


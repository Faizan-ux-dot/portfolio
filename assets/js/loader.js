export function initLoader(){
  const loader = document.querySelector('.loader');
  if(!loader) return;

  const pctEl = document.getElementById('loaderPct');
  const fillEl = document.getElementById('loaderBarFill');

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // If JS runs late / resources are missing, keep UI usable.
  const totalMs = reduce ? 250 : 650;

  const start = performance.now();

  function tick(now){
    const t = Math.min(1, (now - start) / totalMs);
    const eased = 1 - Math.pow(1 - t, 3);
    const pct = Math.round(eased * 100);

    if(pctEl) pctEl.textContent = `${pct}%`;
    if(fillEl) fillEl.style.width = `${pct}%`;

    if(t < 1){
      requestAnimationFrame(tick);
    } else {
      loader.classList.add('isExit');
      setTimeout(() => loader.remove(), reduce ? 0 : 120);
    }
  }

  // Start immediately and also provide a hard fallback.
  requestAnimationFrame(tick);
  setTimeout(() => {
    if(document.contains(loader)) loader.remove();
  }, reduce ? 400 : 900);
}



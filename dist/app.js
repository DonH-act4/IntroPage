(() => {
  const visual = document.getElementById('research-visual');
  const caption = document.getElementById('visual-caption');
  const tabs = document.querySelectorAll('[data-visual-mode]');
  const captions = {
    transfer: 'Can a model trained on simulated waves learn to read the real ones?',
    sensing: 'If sensors are scarce, where should we place them to hear the most?'
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const mode = tab.dataset.visualMode;
      if (!mode || !captions[mode]) return;
      visual.classList.toggle('visual--transfer', mode === 'transfer');
      visual.classList.toggle('visual--sensing', mode === 'sensing');
      caption.textContent = captions[mode];
      tabs.forEach((button) => {
        const active = button === tab;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
    });
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 40px 0px' });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

/* CIRCLE BATTLE STAGE LP */

(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // 追従CTA：ヒーローか締めのCTAが見えている間は隠す
  var sticky = document.querySelector('.c-sticky-cta');
  var anchors = document.querySelectorAll('[data-hides-sticky]');
  if (sticky && 'IntersectionObserver' in window && anchors.length) {
    var seen = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { seen.add(e.target); } else { seen.delete(e.target); } });
      sticky.classList.toggle('is-visible', seen.size === 0);
    });
    anchors.forEach(function (a) { io.observe(a); });
  } else if (sticky) {
    sticky.classList.add('is-visible');
  }

  // ナビの現在地（aria-current）
  var links = Array.prototype.slice.call(document.querySelectorAll('.c-nav__link[href^="#"]'));
  var targets = links.map(function (l) { return document.querySelector(l.getAttribute('href')); });
  var ticking = false;
  function update() {
    ticking = false;
    var line = window.innerHeight * 0.4;
    var current = -1;
    targets.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= line) { current = i; } });
    links.forEach(function (l, i) {
      if (i === current) { l.setAttribute('aria-current', 'true'); } else { l.removeAttribute('aria-current'); }
    });
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

(function () {
  // GA4の測定ID。【要確認：GA4の測定ID（G-から始まる文字列）】
  // 空のままなら計測コードは読み込まない。
  var GA_MEASUREMENT_ID = '';

  var enabled = /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID);
  if (enabled) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(s);
  }

  // エントリーCTAのクリック計測（cta_click / cta_location）
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-cta-location]');
    if (!a || !enabled || typeof window.gtag !== 'function') { return; }
    window.gtag('event', 'cta_click', {
      cta_location: a.getAttribute('data-cta-location'),
      link_url: a.href,
      transport_type: 'beacon'
    });
  });
})();

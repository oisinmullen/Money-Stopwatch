/* ============================================
   MoneyStopwatch — Shared Components
   ============================================ */

(function () {
  'use strict';

  /* ── Helpers ──────────────────────────── */
  function currentPath() {
    return window.location.pathname;
  }

  function isActive(href) {
    const p = currentPath();
    if (href === '/' || href === '/index.html') return p === '/' || p.endsWith('/index.html') || p.endsWith('/Money-Stopwatch/');
    return p.includes(href.replace('.html', ''));
  }

  /* ── Nav links ──────────────────────────── */
  const navLinks = [
    { label: 'Stopwatch',       href: '/index.html' },
    { label: 'Overtime',        href: '/overtime-calculator.html' },
    { label: 'Time & a Half',   href: '/time-and-a-half-calculator.html' },
    { label: 'Pay Raise',       href: '/pay-raise-calculator.html' },
    { label: 'Paychecks',       href: '/paycheck-calculator/california.html' },
    { label: 'Elon Counter',    href: '/elon-musk-earnings-counter.html' },
  ];

  /* ── Logo assets ───────────────────────── */
  // Flat stopwatch icon: crown + face circle + single hand + pivot dot, all #10b981
  var LOGO_SVG = [
    '<svg width="26" height="30" viewBox="0 0 26 30" fill="none"',
    ' xmlns="http://www.w3.org/2000/svg" aria-hidden="true">',
    // Crown (top button)
    '<rect x="8.5" y="0" width="9" height="3" rx="1.5" fill="#10b981"/>',
    // Stem connecting crown to face
    '<rect x="12" y="2.5" width="2" height="3" fill="#10b981"/>',
    // Watch face circle
    '<circle cx="13" cy="19" r="10.5" stroke="#10b981" stroke-width="1.75"/>',
    // Minute hand pointing straight up (12 o\'clock)
    '<line x1="13" y1="19" x2="13" y2="11" stroke="#10b981"',
    ' stroke-width="2" stroke-linecap="round"/>',
    // Centre pivot dot
    '<circle cx="13" cy="19" r="1.5" fill="#10b981"/>',
    '</svg>',
  ].join('');

  // "Money" white/400 · "Stopwatch" green/600
  var LOGO_TEXT = '<span style="font-weight:400;color:#fff;">Money</span>' +
                  '<span style="font-weight:600;color:#10b981;">Stopwatch</span>';

  /* ── Resolve root path ─────────────────── */
  // Detects if current page is inside a subdirectory (paycheck-calculator/)
  // and uses that to build correct relative paths — works on both
  // a custom domain (moneystopwatch.com/index.html) and
  // GitHub Pages (oisinmullen.github.io/Money-Stopwatch/index.html).
  function resolveHref(href) {
    var inSubDir = currentPath().indexOf('/paycheck-calculator/') !== -1;
    var path = href.replace(/^\//, ''); // strip leading slash
    return inSubDir ? ('../' + path) : path;
  }

  /* ── Build Header ─────────────────────── */
  function buildHeader() {
    const navHTML = navLinks.map(l => {
      const href = resolveHref(l.href);
      const active = isActive(l.href) ? ' active' : '';
      return `<a href="${href}" class="${active}">${l.label}</a>`;
    }).join('');

    return `
<header class="site-header">
  <div class="container">
    <a class="logo" href="${resolveHref('/index.html')}">${LOGO_SVG}${LOGO_TEXT}</a>
    <nav class="site-nav" id="site-nav" aria-label="Main navigation">
      ${navHTML}
    </nav>
    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
      <span>☰</span> Menu
    </button>
  </div>
</header>`;
  }

  /* ── Build Footer ─────────────────────── */
  function buildFooter() {
    const r = resolveHref.bind(null);
    return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="logo" href="${r('/index.html')}">${LOGO_SVG}${LOGO_TEXT}</a>
        <p>Free salary and pay calculators. Know your worth, track every penny.</p>
      </div>
      <div class="footer-col">
        <h4>Calculators</h4>
        <ul>
          <li><a href="${r('/index.html')}">Earnings Stopwatch</a></li>
          <li><a href="${r('/overtime-calculator.html')}">Overtime Calculator</a></li>
          <li><a href="${r('/time-and-a-half-calculator.html')}">Time and a Half</a></li>
          <li><a href="${r('/pay-raise-calculator.html')}">Pay Raise Calculator</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Paycheck Calculators</h4>
        <ul>
          <li><a href="${r('/paycheck-calculator/california.html')}">California</a></li>
          <li><a href="${r('/paycheck-calculator/florida.html')}">Florida</a></li>
          <li><a href="${r('/paycheck-calculator/ohio.html')}">Ohio</a></li>
          <li><a href="${r('/paycheck-calculator/illinois.html')}">Illinois</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Guides</h4>
        <ul>
          <li><a href="${r('/how-to-ask-for-a-raise.html')}">How to Ask for a Raise</a></li>
          <li><a href="${r('/salary-negotiation-email.html')}">Salary Negotiation Emails</a></li>
          <li><a href="${r('/elon-musk-earnings-counter.html')}">Elon Musk Earnings Counter</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} MoneyStopwatch.com — Free financial calculators</p>
      <p class="text-muted text-sm">For informational purposes only. Not financial or tax advice.</p>
    </div>
  </div>
</footer>`;
  }

  /* ── Inject on DOM ready ──────────────── */
  function inject() {
    // Header
    const headerSlot = document.getElementById('site-header-slot');
    if (headerSlot) headerSlot.outerHTML = buildHeader();

    // Footer
    const footerSlot = document.getElementById('site-footer-slot');
    if (footerSlot) footerSlot.outerHTML = buildFooter();

    // Mobile nav toggle
    setTimeout(function () {
      const toggle = document.getElementById('nav-toggle');
      const nav    = document.getElementById('site-nav');
      if (toggle && nav) {
        toggle.addEventListener('click', function () {
          const open = nav.classList.toggle('open');
          toggle.setAttribute('aria-expanded', open);
        });
      }
    }, 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

  /* ── Shared utilities exposed globally ── */
  window.MS = {
    formatCurrency: function (amount, currency) {
      currency = currency || 'USD';
      try {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(amount);
      } catch (e) {
        return '$' + amount.toFixed(2);
      }
    },

    formatTime: function (seconds) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);
      if (h > 0) {
        return h + 'h ' + String(m).padStart(2, '0') + 'm ' + String(s).padStart(2, '0') + 's';
      }
      return String(m).padStart(2, '0') + 'm ' + String(s).padStart(2, '0') + 's';
    },

    // FAQ accordion
    initFAQ: function () {
      document.querySelectorAll('.faq-item').forEach(function (item) {
        var q = item.querySelector('.faq-question');
        if (q) {
          q.addEventListener('click', function () {
            var wasOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
            if (!wasOpen) item.classList.add('open');
          });
        }
      });
    },

    // Copy to clipboard
    copyText: function (text, btn) {
      navigator.clipboard.writeText(text).then(function () {
        var orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = orig; }, 1800);
      }).catch(function () {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        var orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = orig; }, 1800);
      });
    }
  };
})();

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

  /* ── Nav structure ──────────────────────── */
  // Flat links
  var NAV_DIRECT = [
    { label: 'Stopwatch',          href: '/index.html' },
    { label: 'Celebrity Earnings', href: '/elon-musk-earnings-counter.html' },
  ];

  // Dropdown menus
  var NAV_CALCULATORS = [
    { label: 'Overtime Calculator',      href: '/overtime-calculator.html' },
    { label: 'Time and a Half',          href: '/time-and-a-half-calculator.html' },
    { label: 'Pay Raise Calculator',     href: '/pay-raise-calculator.html' },
    { label: 'Salary Increase Calculator', href: '/pay-raise-calculator.html' },
    { type: 'divider' },
    { type: 'group', label: 'Paycheck Calculators' },
    { label: 'California',  href: '/paycheck-calculator/california.html' },
    { label: 'Florida',     href: '/paycheck-calculator/florida.html' },
    { label: 'Ohio',        href: '/paycheck-calculator/ohio.html' },
    { label: 'Illinois',    href: '/paycheck-calculator/illinois.html' },
  ];

  var NAV_GUIDES = [
    { label: 'How to Ask for a Raise',   href: '/how-to-ask-for-a-raise.html' },
    { label: 'Salary Negotiation Emails', href: '/salary-negotiation-email.html' },
    { label: 'How to Negotiate Salary',  href: '/salary-negotiation-email.html' },
  ];

  /* ── Logo assets ───────────────────────── */
  // Square icon: rounded-rect border + bold $ in #10b981, inline SVG
  var LOGO_SVG = [
    '<svg width="28" height="28" viewBox="0 0 28 28" fill="none"',
    ' xmlns="http://www.w3.org/2000/svg" aria-hidden="true">',
    '<rect x="1.5" y="1.5" width="25" height="25" rx="6"',
    ' stroke="#10b981" stroke-width="1.75"/>',
    '<text x="14" y="20" text-anchor="middle"',
    ' font-family="Inter,system-ui,sans-serif"',
    ' font-weight="700" font-size="15" fill="#10b981">$</text>',
    '</svg>',
  ].join('');

  // Wordmark: "Money" white/600 · "Stopwatch" green/600 · Inter 20px −0.03em
  var LOGO_TEXT = '<span style="font-family:Inter,system-ui,sans-serif;font-size:20px;' +
    'letter-spacing:-0.03em;line-height:1;display:flex;gap:0;">' +
    '<span style="color:#fff;font-weight:600;">Money</span>' +
    '<span style="color:#10b981;font-weight:600;">&thinsp;Stopwatch</span>' +
    '</span>';

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

  /* ── Build dropdown menu HTML ──────────── */
  function buildDropdownItems(items) {
    return items.map(function (item) {
      if (item.type === 'divider') {
        return '<div class="nav-dropdown-divider"></div>';
      }
      if (item.type === 'group') {
        return '<div class="nav-dropdown-group-label">' + item.label + '</div>';
      }
      var href   = resolveHref(item.href);
      var active = isActive(item.href) ? ' active' : '';
      return '<a href="' + href + '" class="' + active + '">' + item.label + '</a>';
    }).join('');
  }

  /* ── Build Header ─────────────────────── */
  function buildHeader() {
    // Flat direct links
    var directHTML = NAV_DIRECT.map(function (l) {
      var href   = resolveHref(l.href);
      var active = isActive(l.href) ? ' active' : '';
      return '<a href="' + href + '" class="' + active + '">' + l.label + '</a>';
    }).join('');

    // Calculators dropdown — mark trigger active if any child is active
    var calcActive = NAV_CALCULATORS.some(function (l) { return l.href && isActive(l.href); });
    var calcDropdown = [
      '<div class="nav-dropdown" id="dd-calc">',
      '  <button class="nav-dropdown-trigger' + (calcActive ? ' active' : '') + '" aria-haspopup="true">',
      '    Calculators <span class="nav-arrow">▾</span>',
      '  </button>',
      '  <div class="nav-dropdown-menu">',
      buildDropdownItems(NAV_CALCULATORS),
      '  </div>',
      '</div>',
    ].join('');

    // Guides dropdown
    var guidesActive = NAV_GUIDES.some(function (l) { return l.href && isActive(l.href); });
    var guidesDropdown = [
      '<div class="nav-dropdown" id="dd-guides">',
      '  <button class="nav-dropdown-trigger' + (guidesActive ? ' active' : '') + '" aria-haspopup="true">',
      '    Guides <span class="nav-arrow">▾</span>',
      '  </button>',
      '  <div class="nav-dropdown-menu">',
      buildDropdownItems(NAV_GUIDES),
      '  </div>',
      '</div>',
    ].join('');

    // Insert Celebrity Earnings between Stopwatch and Calculators
    var stopwatchLink = '<a href="' + resolveHref('/index.html') + '" class="' + (isActive('/index.html') ? 'active' : '') + '">Stopwatch</a>';
    var celebLink     = '<a href="' + resolveHref('/elon-musk-earnings-counter.html') + '" class="' + (isActive('/elon-musk-earnings-counter.html') ? 'active' : '') + '">Celebrity Earnings</a>';

    return [
      '<header class="site-header">',
      '  <div class="container">',
      '    <a class="logo" href="' + resolveHref('/index.html') + '">' + LOGO_SVG + LOGO_TEXT + '</a>',
      '    <nav class="site-nav" id="site-nav" aria-label="Main navigation">',
      '      ' + stopwatchLink,
      '      ' + calcDropdown,
      '      ' + celebLink,
      '      ' + guidesDropdown,
      '    </nav>',
      '    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">',
      '      ☰ Menu',
      '    </button>',
      '  </div>',
      '</header>',
    ].join('\n');
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
    var headerSlot = document.getElementById('site-header-slot');
    if (headerSlot) headerSlot.outerHTML = buildHeader();

    var footerSlot = document.getElementById('site-footer-slot');
    if (footerSlot) footerSlot.outerHTML = buildFooter();

    setTimeout(function () {
      // Mobile hamburger — open/close full nav
      var toggle = document.getElementById('nav-toggle');
      var nav    = document.getElementById('site-nav');
      if (toggle && nav) {
        toggle.addEventListener('click', function () {
          var open = nav.classList.toggle('open');
          toggle.setAttribute('aria-expanded', String(open));
        });
      }

      // Desktop hover with 150ms hide delay — prevents flash-close when
      // crossing the gap between the trigger and the dropdown menu.
      document.querySelectorAll('.nav-dropdown').forEach(function (dd) {
        var hideTimer = null;

        dd.addEventListener('mouseenter', function () {
          if (window.innerWidth <= 720) return;
          if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
          dd.classList.add('open');
        });

        dd.addEventListener('mouseleave', function () {
          if (window.innerWidth <= 720) return;
          hideTimer = setTimeout(function () {
            dd.classList.remove('open');
            hideTimer = null;
          }, 150);
        });
      });

      // Mobile dropdown triggers — tap to toggle sub-menus
      document.querySelectorAll('.nav-dropdown-trigger').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          var isMobile = window.innerWidth <= 720;
          if (!isMobile) return;
          e.stopPropagation();
          var dd = btn.closest('.nav-dropdown');
          if (dd) dd.classList.toggle('open');
        });
      });

      // Close nav + all dropdowns when a link inside is clicked
      if (nav) {
        nav.addEventListener('click', function (e) {
          if (e.target.tagName === 'A') {
            nav.classList.remove('open');
            document.querySelectorAll('.nav-dropdown.open').forEach(function (dd) {
              dd.classList.remove('open');
            });
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
          }
        });
      }

      // Close dropdowns when clicking outside (desktop)
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-dropdown')) {
          document.querySelectorAll('.nav-dropdown.open').forEach(function (dd) {
            dd.classList.remove('open');
          });
        }
      });
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

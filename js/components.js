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
    { label: 'Money Counter Online',      href: '/money-counter-online.html' },
    { label: 'Billable Hours Calculator', href: '/billable-hours-calculator.html' },
    { label: 'Overtime Calculator',       href: '/overtime-calculator.html' },
    { label: 'Time and a Half',           href: '/time-and-a-half-calculator.html' },
    { label: 'Pay Raise Calculator',      href: '/pay-raise-calculator.html' },
    { label: 'Salary Increase Calculator', href: '/pay-raise-calculator.html' },
    { type: 'divider' },
    { type: 'group', label: 'Paycheck Calculators' },
    { label: 'California',  href: '/paycheck-calculator/california.html' },
    { label: 'Florida',     href: '/paycheck-calculator/florida.html' },
    { label: 'Ohio',        href: '/paycheck-calculator/ohio.html' },
    { label: 'Illinois',    href: '/paycheck-calculator/illinois.html' },
    { label: 'View All 50 States →', href: '/paycheck-calculator/index.html' },
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
    var p = currentPath();
    var segments = p.replace(/^\//, '').split('/');
    var depth = segments.length - 1;
    if (depth < 1) return href.replace(/^\//, '');
    var prefix = '';
    for (var i = 0; i < depth; i++) prefix += '../';
    return prefix + href.replace(/^\//, '');
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

    var stopwatchLink = '<a href="' + resolveHref('/index.html') + '" class="' + (isActive('/index.html') ? 'active' : '') + '">Stopwatch</a>';
    var celebLink     = '<a href="' + resolveHref('/elon-musk-earnings-counter.html') + '" class="' + (isActive('/elon-musk-earnings-counter.html') ? 'active' : '') + '">Celebrity Earnings</a>';
    var feedLink      = '<a href="' + resolveHref('/feed/index.html') + '" class="' + (isActive('/feed/') ? 'active' : '') + '">The Feed</a>';
    var guidesLink    = '<a href="' + resolveHref('/guides/index.html') + '" class="' + (isActive('/guides/') ? 'active' : '') + '">Guides</a>';

    return [
      '<header class="site-header">',
      '  <div class="container">',
      '    <a class="logo" href="' + resolveHref('/index.html') + '">' + LOGO_SVG + LOGO_TEXT + '</a>',
      '    <nav class="site-nav" id="site-nav" aria-label="Main navigation">',
      '      ' + stopwatchLink,
      '      ' + calcDropdown,
      '      ' + celebLink,
      '      ' + feedLink,
      '      ' + guidesLink,
      '    </nav>',
      '    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">',
      '      ☰ Menu',
      '    </button>',
      '  </div>',
      '</header>',
    ].join('\n');
  }

  /* ── Build Email Banner ─────────────────── */
  function buildEmailBanner() {
    return `
<div class="msw-email-banner" id="msw-email-banner">
  <div class="msw-email-inner">
    <div class="msw-email-text">
      <div class="msw-email-heading">Get a Free Budgeting Checklist</div>
      <div class="msw-email-sub">Join readers getting free money guides and financial tips.</div>
    </div>
    <div class="msw-email-form-wrap">
      <form class="msw-email-form" id="msw-email-form">
        <input type="email" name="email" class="msw-email-input" placeholder="your@email.com" required>
        <button type="submit" class="msw-email-btn">Send Me the Checklist</button>
      </form>
      <div class="msw-email-msg" id="msw-email-msg" style="display:none;"></div>
    </div>
  </div>
</div>
<style>
.msw-email-banner{background:#0d1f18;border-top:1px solid #10b981;padding:32px 24px;width:100%}
.msw-email-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:2rem}
.msw-email-heading{font-size:18px;font-weight:700;color:#fff;margin-bottom:4px}
.msw-email-sub{font-size:14px;color:#9ca3af;line-height:1.5}
.msw-email-form{display:flex;gap:8px}
.msw-email-input{background:#1a1a1a;border:1px solid #2a2a2a;border-radius:8px;padding:10px 16px;color:#fff;font-family:inherit;font-size:14px;outline:none;width:240px;transition:border-color .15s}
.msw-email-input:focus{border-color:#10b981}
.msw-email-input::placeholder{color:#6b7280}
.msw-email-btn{background:#10b981;color:#000;font-weight:700;font-family:inherit;font-size:14px;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;white-space:nowrap;transition:background .15s}
.msw-email-btn:hover{background:#059669}
.msw-email-msg{font-size:15px;font-weight:600;margin-top:4px}
@media(max-width:768px){
.msw-email-inner{flex-direction:column;align-items:flex-start}
.msw-email-form{flex-direction:column;width:100%}
.msw-email-input{width:100%}
.msw-email-btn{width:100%}
}
</style>`;
  }

  function initEmailBanner() {
    var form = document.getElementById('msw-email-form');
    var msg = document.getElementById('msw-email-msg');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.querySelector('.msw-email-input').value;
      fetch('https://formspree.io/f/xgojokll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: email })
      }).then(function (res) {
        if (res.ok) {
          form.style.display = 'none';
          msg.style.display = '';
          msg.style.color = '#10b981';
          msg.textContent = '✓ Checklist on its way — check your inbox.';
        } else {
          msg.style.display = '';
          msg.style.color = '#ef4444';
          msg.textContent = 'Something went wrong — try again.';
        }
      }).catch(function () {
        msg.style.display = '';
        msg.style.color = '#ef4444';
        msg.textContent = 'Something went wrong — try again.';
      });
    });
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
          <li><a href="${r('/guides/index.html')}">Money Guides</a></li>
          <li><a href="${r('/how-to-ask-for-a-raise.html')}">How to Ask for a Raise</a></li>
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
    if (footerSlot) footerSlot.outerHTML = buildEmailBanner() + buildFooter();

    initEmailBanner();

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

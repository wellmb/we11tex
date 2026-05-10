const US_STATES = [
  { code: 'AL', name: 'Alabama', gasPrice: 3.05, incomeTaxPct: 5.0 },
  { code: 'AK', name: 'Alaska', gasPrice: 4.12, incomeTaxPct: 0 },
  { code: 'AZ', name: 'Arizona', gasPrice: 3.72, incomeTaxPct: 2.59 },
  { code: 'AR', name: 'Arkansas', gasPrice: 2.98, incomeTaxPct: 4.7 },
  { code: 'CA', name: 'California', gasPrice: 4.65, incomeTaxPct: 6.0 },
  { code: 'CO', name: 'Colorado', gasPrice: 3.38, incomeTaxPct: 4.4 },
  { code: 'CT', name: 'Connecticut', gasPrice: 3.52, incomeTaxPct: 5.5 },
  { code: 'DE', name: 'Delaware', gasPrice: 3.18, incomeTaxPct: 5.2 },
  { code: 'FL', name: 'Florida', gasPrice: 3.32, incomeTaxPct: 0 },
  { code: 'GA', name: 'Georgia', gasPrice: 3.12, incomeTaxPct: 5.39 },
  { code: 'HI', name: 'Hawaii', gasPrice: 4.78, incomeTaxPct: 6.8 },
  { code: 'ID', name: 'Idaho', gasPrice: 3.55, incomeTaxPct: 5.8 },
  { code: 'IL', name: 'Illinois', gasPrice: 3.68, incomeTaxPct: 4.95 },
  { code: 'IN', name: 'Indiana', gasPrice: 3.28, incomeTaxPct: 3.05 },
  { code: 'IA', name: 'Iowa', gasPrice: 3.08, incomeTaxPct: 5.15 },
  { code: 'KS', name: 'Kansas', gasPrice: 3.02, incomeTaxPct: 5.2 },
  { code: 'KY', name: 'Kentucky', gasPrice: 3.0, incomeTaxPct: 4.5 },
  { code: 'LA', name: 'Louisiana', gasPrice: 2.92, incomeTaxPct: 3.75 },
  { code: 'ME', name: 'Maine', gasPrice: 3.42, incomeTaxPct: 6.0 },
  { code: 'MD', name: 'Maryland', gasPrice: 3.35, incomeTaxPct: 4.75 },
  { code: 'MA', name: 'Massachusetts', gasPrice: 3.28, incomeTaxPct: 5.0 },
  { code: 'MI', name: 'Michigan', gasPrice: 3.45, incomeTaxPct: 4.25 },
  { code: 'MN', name: 'Minnesota', gasPrice: 3.22, incomeTaxPct: 6.1 },
  { code: 'MS', name: 'Mississippi', gasPrice: 2.88, incomeTaxPct: 4.7 },
  { code: 'MO', name: 'Missouri', gasPrice: 3.0, incomeTaxPct: 4.95 },
  { code: 'MT', name: 'Montana', gasPrice: 3.35, incomeTaxPct: 5.9 },
  { code: 'NE', name: 'Nebraska', gasPrice: 3.08, incomeTaxPct: 4.85 },
  { code: 'NV', name: 'Nevada', gasPrice: 3.88, incomeTaxPct: 0 },
  { code: 'NH', name: 'New Hampshire', gasPrice: 3.22, incomeTaxPct: 0 },
  { code: 'NJ', name: 'New Jersey', gasPrice: 3.25, incomeTaxPct: 5.5 },
  { code: 'NM', name: 'New Mexico', gasPrice: 3.18, incomeTaxPct: 4.9 },
  { code: 'NY', name: 'New York', gasPrice: 3.48, incomeTaxPct: 6.3 },
  { code: 'NC', name: 'North Carolina', gasPrice: 3.08, incomeTaxPct: 4.75 },
  { code: 'ND', name: 'North Dakota', gasPrice: 3.12, incomeTaxPct: 1.95 },
  { code: 'OH', name: 'Ohio', gasPrice: 3.05, incomeTaxPct: 3.5 },
  { code: 'OK', name: 'Oklahoma', gasPrice: 2.95, incomeTaxPct: 4.75 },
  { code: 'OR', name: 'Oregon', gasPrice: 3.82, incomeTaxPct: 7.1 },
  { code: 'PA', name: 'Pennsylvania', gasPrice: 3.52, incomeTaxPct: 3.07 },
  { code: 'RI', name: 'Rhode Island', gasPrice: 3.18, incomeTaxPct: 4.75 },
  { code: 'SC', name: 'South Carolina', gasPrice: 3.02, incomeTaxPct: 5.2 },
  { code: 'SD', name: 'South Dakota', gasPrice: 3.15, incomeTaxPct: 0 },
  { code: 'TN', name: 'Tennessee', gasPrice: 2.92, incomeTaxPct: 0 },
  { code: 'TX', name: 'Texas', gasPrice: 2.88, incomeTaxPct: 0 },
  { code: 'UT', name: 'Utah', gasPrice: 3.45, incomeTaxPct: 4.65 },
  { code: 'VT', name: 'Vermont', gasPrice: 3.38, incomeTaxPct: 5.75 },
  { code: 'VA', name: 'Virginia', gasPrice: 3.22, incomeTaxPct: 5.0 },
  { code: 'WA', name: 'Washington', gasPrice: 4.05, incomeTaxPct: 0 },
  { code: 'WV', name: 'West Virginia', gasPrice: 3.12, incomeTaxPct: 4.82 },
  { code: 'WI', name: 'Wisconsin', gasPrice: 3.08, incomeTaxPct: 5.3 },
  { code: 'WY', name: 'Wyoming', gasPrice: 3.25, incomeTaxPct: 0 },
];

const IRS_STANDARD_MILEAGE_2024 = 0.67;
const USDT_TRC20 = 'ТВОЙ_АДРЕС_КОШЕЛЬКА';
const COOKIE_KEY = 'we11tex_cookie_consent';

(function () {
  const el = (id) => document.getElementById(id);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const fmt = (n) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number.isFinite(n) ? n : 0);

  const parseNum = (v) => {
    const x = parseFloat(String(v).replace(/,/g, ''));
    return Number.isFinite(x) ? x : 0;
  };

  let selected = US_STATES.find((s) => s.code === 'CA') || US_STATES[0];
  let listOpen = false;

  function setListOpen(open) {
    listOpen = open;
    const panel = el('statePanel');
    const input = el('stateInput');
    if (panel) panel.setAttribute('data-open', open ? 'true' : 'false');
    if (input) input.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function filterStates(q) {
    const s = q.trim().toLowerCase();
    if (!s) return US_STATES.slice();
    return US_STATES.filter(
      (st) => st.name.toLowerCase().includes(s) || st.code.toLowerCase().includes(s)
    );
  }

  function renderStateList(query) {
    const list = el('stateList');
    if (!list) return;
    list.innerHTML = '';
    const items = filterStates(query);
    if (!items.length) {
      const p = document.createElement('p');
      p.className = 'combobox-empty';
      p.textContent = 'No matches';
      list.appendChild(p);
      return;
    }
    items.forEach((st) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'combobox-option' + (selected && st.code === selected.code ? ' is-active' : '');
      const left = document.createElement('span');
      left.textContent = st.name;
      const meta = document.createElement('span');
      meta.className = 'combobox-meta';
      meta.textContent =
        '$' + st.gasPrice.toFixed(2) + ' · ~' + st.incomeTaxPct + '%';
      btn.appendChild(left);
      btn.appendChild(meta);
      btn.addEventListener('mousedown', (e) => e.preventDefault());
      btn.addEventListener('click', () => {
        selected = st;
        el('stateInput').value = st.name;
        setListOpen(false);
        calc();
      });
      list.appendChild(btn);
    });
  }

  function syncInputFromSelection() {
    const input = el('stateInput');
    if (input && selected) input.value = selected.name;
  }

  function calc() {
    const gross = parseNum(el('gross').value);
    const miles = parseNum(el('miles').value);
    const mpg = parseNum(el('mpg').value);
    const gasPrice = selected ? selected.gasPrice : 0;

    const irsDeduction = miles * IRS_STANDARD_MILEAGE_2024;
    let gasCost = 0;
    if (mpg > 0) gasCost = (miles / mpg) * gasPrice;

    const netProfit = gross - irsDeduction - gasCost;

    el('outIrs').textContent = fmt(irsDeduction);
    el('outGas').textContent = fmt(gasCost);
    el('outNet').textContent = fmt(netProfit);
  }

  let toastTimer;
  function showToast(message) {
    const toast = el('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  }

  function initCookieBanner() {
    const banner = el('cookieBanner');
    const accept = el('cookieAccept');
    if (!banner || !accept) return;
    if (localStorage.getItem(COOKIE_KEY) === '1') {
      banner.setAttribute('data-hidden', 'true');
      return;
    }
    banner.setAttribute('data-hidden', 'false');
    accept.addEventListener('click', () => {
      localStorage.setItem(COOKIE_KEY, '1');
      banner.setAttribute('data-hidden', 'true');
    });
  }

  function onDocPointerDown(e) {
    const root = el('stateCombobox');
    if (!root || !listOpen) return;
    if (!root.contains(e.target)) {
      setListOpen(false);
      syncInputFromSelection();
    }
  }

  function init() {
    const foot = el('footerUsdtAddress');
    if (foot) foot.textContent = USDT_TRC20;

    syncInputFromSelection();
    renderStateList('');

    const stateInput = el('stateInput');
    const statePanel = el('statePanel');

    stateInput.addEventListener('focus', () => {
      setListOpen(true);
      stateInput.select();
      renderStateList('');
    });

    stateInput.addEventListener('input', () => {
      setListOpen(true);
      renderStateList(stateInput.value);
    });

    stateInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setListOpen(false);
        syncInputFromSelection();
        stateInput.blur();
      }
    });

    stateInput.addEventListener('blur', () => {
      window.setTimeout(() => {
        if (!statePanel || !statePanel.contains(document.activeElement)) {
          if (listOpen) setListOpen(false);
          syncInputFromSelection();
        }
      }, 120);
    });

    document.addEventListener('mousedown', onDocPointerDown);
    document.addEventListener('touchstart', onDocPointerDown, { passive: true });

    ['gross', 'miles', 'mpg'].forEach((id) => {
      const node = el(id);
      if (!node) return;
      node.addEventListener('input', calc);
      node.addEventListener('change', calc);
    });

    $$('[data-copy-usdt]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        await copyText(USDT_TRC20);
        showToast('Address copied');
      });
    });

    initCookieBanner();
    calc();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

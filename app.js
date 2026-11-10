/* ============================================================
   SETTINGS — the only part to edit when launching
   network: 'nile' for testing, 'mainnet' for the real sale.
   token:   the EP contract address after you deploy it.
   (Shared by index.html in English and fa.html in Persian.)
   ============================================================ */
const CONFIG = {
  network: 'nile',
  networks: {
    nile: {
      api: 'https://nile.trongrid.io',
      scan: 'https://nile.tronscan.org/#',
      token: 'TN7FPajFsq5Pf8srRtExhMUEw79UqN5Dzx',
      usdt: 'TSveqAL6wB3G8ksZwmptzz1q6gzK1B4Qom',
      testDollars: true
    },
    mainnet: {
      api: 'https://api.trongrid.io',
      scan: 'https://tronscan.org/#',
      token: '',
      usdt: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      testDollars: false
    }
  },
  // Name and official page of the foundation that receives 50%. Leave empty until confirmed.
  // name: English name, nameFa: Persian name.
  foundation: { name: '', nameFa: '', url: '' },
  fees: { approve: 100000000, buy: 250000000, faucet: 60000000 }  // fee limits in SUN (1 TRX = 1,000,000 SUN)
};

const NET = CONFIG.networks[CONFIG.network];
// On the testnet only, ?token=T... lets you try a freshly deployed contract without editing this file.
(function () {
  if (CONFIG.network !== 'nile') return;
  const t = new URLSearchParams(location.search).get('token');
  if (t && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(t)) NET.token = t;
})();

/* ---------- words (English and Persian) ---------- */
const LANG = document.documentElement.lang === 'fa' ? 'fa' : 'en';
const WORDS = {
  en: {
    usd: 'USDT',
    net: { nile: 'Nile testnet', mainnet: 'TRON mainnet' },
    viewTx: 'View the transaction',
    fName: 'the foundation', fNameCap: 'The foundation',
    giftYes: (g) => 'You qualify for a free extra souvenir if you are among the first 25 buyers of 5 or more (' + g + ' gifts left).',
    giftMore: (g) => 'Buy 5 or more in one purchase for a free extra souvenir (' + g + ' gifts left).',
    giftNone: 'All 25 gifts have been given.',
    soon: 'Sale opens soon',
    waitFoundation: 'Sale opens once the foundation wallet is set',
    connectToBuy: 'Connect your wallet to buy',
    buyFor: (q, a) => 'Buy ' + q + ' for ' + a,
    allowThenBuy: (a) => 'Allow ' + a + ', then buy',
    noTronLink: 'TronLink was not found. On a computer, install TronLink for Chrome from <a href="https://www.tronlink.org" target="_blank" rel="noopener">tronlink.org</a> and reload this page. On a phone, open this page in the TronLink app\'s browser.',
    declined: 'You declined the connection in TronLink.',
    notConnected: 'TronLink did not connect. Unlock TronLink and try again.',
    notConnectedMsg: (m) => 'TronLink did not connect: ' + m,
    unlock: 'Unlock TronLink, then press Connect again.',
    wrongNet: (n) => 'TronLink is on a different network. Switch it to ' + n + ' and press Connect again.',
    connected: (a) => 'Connected: ' + a,
    rPrice: 'The price changed before your purchase went through. Nothing was charged. Check the new price and try again.',
    rSoldOut: 'This batch does not have that many souvenirs left. Choose a smaller number.',
    rNotOpen: 'The sale has not opened yet. Nothing was charged.',
    rEnergy: 'The network fee ran out before the purchase finished. Add TRX to your wallet and try again.',
    rNoTrx: 'Your wallet does not have enough TRX for the network fee. Add TRX and try again.',
    rOther: (r) => 'The network did not accept the transaction (' + r + ').',
    notConfirmed: 'The network has not confirmed yet. Check the transaction before trying again.',
    cantPrepare: 'Could not prepare the transaction. Nothing was charged. Please try again.',
    rejected: (r) => 'The network did not accept the transaction (' + r + '). Nothing was charged.',
    cancelled: 'You cancelled in TronLink. Nothing was charged.',
    priceJust: (p) => 'The price just changed to ' + p + '. Check the total and press the button again.',
    onlyLeft: (n) => 'Only ' + n + ' souvenirs are left in this batch.',
    needs: (a, b) => 'This purchase needs ' + a + '. Your wallet has ' + b + '.',
    lowTrx: 'Your wallet has less than 20 TRX. The network fee may not be covered; add TRX if the purchase fails.',
    resetting: 'Resetting the old allowance…',
    confirmReset: 'Confirm in TronLink: reset the previous allowance first.',
    waiting: 'Waiting for TronLink…',
    confirmAllow: (a) => 'Confirm in TronLink: allow the souvenir contract to take ' + a + '.',
    allowing: 'Allowing…',
    confirmBuy: (q, a) => 'Confirm in TronLink: buy ' + q + ' for ' + a + '.',
    buying: 'Buying…',
    done: 'Done. ',
    nSouvenirs: (q) => q + ' souvenir' + (q > 1 ? 's' : ''),
    giftOne: 'One of them is your gift.',
    confirmFaucet: 'Confirm in TronLink to receive 100 test dollars.',
    faucetDone: '100 test dollars added. ',
    capBack: 'Back of the coin. Tap to turn it over',
    capFront: 'Front of the coin. Tap to turn it over',
    copied: 'Copied',
    selected: 'Selected, press Ctrl+C',
    copy: 'Copy address',
    walletChanged: 'Wallet changed. Connect again',
    netChanged: 'Network changed. Connect again'
  },
  fa: {
    usd: 'تتر',
    net: { nile: 'شبکه‌ی آزمایشی Nile', mainnet: 'شبکه‌ی اصلی ترون' },
    viewTx: 'دیدن تراکنش',
    fName: 'بنیاد', fNameCap: 'بنیاد',
    giftYes: (g) => 'اگر جزو ۲۵ نفر اولی باشید که ۵ یادبود یا بیشتر می‌خرند، یک یادبود اضافه هدیه می‌گیرید (' + g + ' هدیه مانده).',
    giftMore: (g) => 'با خرید ۵ یادبود یا بیشتر در یک خرید، یک یادبود اضافه هدیه بگیرید (' + g + ' هدیه مانده).',
    giftNone: 'هر ۲۵ هدیه داده شده است.',
    soon: 'فروش به‌زودی آغاز می‌شود',
    waitFoundation: 'فروش پس از ثبت کیف پول بنیاد آغاز می‌شود',
    connectToBuy: 'برای خرید، کیف پولتان را وصل کنید',
    buyFor: (q, a) => 'خرید ' + q + ' یادبود به بهای ' + a,
    allowThenBuy: (a) => 'اجازه‌ی ' + a + '، سپس خرید',
    noTronLink: 'TronLink پیدا نشد. روی کامپیوتر، افزونه‌ی TronLink را برای کروم از <a href="https://www.tronlink.org" target="_blank" rel="noopener">tronlink.org</a> نصب کنید و صفحه را دوباره باز کنید. روی گوشی، این صفحه را در مرورگر داخل اپ TronLink باز کنید.',
    declined: 'اتصال را در TronLink رد کردید.',
    notConnected: 'TronLink وصل نشد. قفل TronLink را باز کنید و دوباره امتحان کنید.',
    notConnectedMsg: (m) => 'TronLink وصل نشد: ' + m,
    unlock: 'قفل TronLink را باز کنید و دوباره دکمه‌ی اتصال را بزنید.',
    wrongNet: (n) => 'TronLink روی شبکه‌ی دیگری است. آن را روی ' + n + ' بگذارید و دوباره دکمه‌ی اتصال را بزنید.',
    connected: (a) => 'وصل شد: ' + a,
    rPrice: 'قیمت پیش از انجام خرید تغییر کرد. هیچ پولی کم نشد. قیمت تازه را ببینید و دوباره امتحان کنید.',
    rSoldOut: 'در این دسته به این تعداد یادبود باقی نمانده است. تعداد کمتری انتخاب کنید.',
    rNotOpen: 'فروش هنوز آغاز نشده است. هیچ پولی کم نشد.',
    rEnergy: 'کارمزد شبکه پیش از پایان خرید تمام شد. به کیف پولتان TRX اضافه کنید و دوباره امتحان کنید.',
    rNoTrx: 'کیف پولتان برای کارمزد شبکه TRX کافی ندارد. TRX اضافه کنید و دوباره امتحان کنید.',
    rOther: (r) => 'شبکه تراکنش را نپذیرفت (' + r + ').',
    notConfirmed: 'شبکه هنوز تأیید نکرده است. پیش از تلاش دوباره، تراکنش را بررسی کنید.',
    cantPrepare: 'آماده‌کردن تراکنش ممکن نشد. هیچ پولی کم نشد. دوباره امتحان کنید.',
    rejected: (r) => 'شبکه تراکنش را نپذیرفت (' + r + '). هیچ پولی کم نشد.',
    cancelled: 'در TronLink لغو کردید. هیچ پولی کم نشد.',
    priceJust: (p) => 'قیمت همین حالا به ' + p + ' تغییر کرد. جمع را ببینید و دوباره دکمه را بزنید.',
    onlyLeft: (n) => 'در این دسته فقط ' + n + ' یادبود باقی مانده است.',
    needs: (a, b) => 'این خرید ' + a + ' لازم دارد. در کیف پول شما ' + b + ' هست.',
    lowTrx: 'کیف پولتان کمتر از ۲۰ TRX دارد. ممکن است کارمزد شبکه کافی نباشد؛ اگر خرید انجام نشد، TRX اضافه کنید.',
    resetting: 'در حال صفر کردن اجازه‌ی قبلی…',
    confirmReset: 'در TronLink تأیید کنید: اول اجازه‌ی قبلی صفر می‌شود.',
    waiting: 'منتظر تأیید در TronLink…',
    confirmAllow: (a) => 'در TronLink تأیید کنید: قرارداد یادبود اجازه می‌گیرد ' + a + ' بردارد.',
    allowing: 'در حال ثبت اجازه…',
    confirmBuy: (q, a) => 'در TronLink تأیید کنید: خرید ' + q + ' یادبود به بهای ' + a + '.',
    buying: 'در حال خرید…',
    done: 'انجام شد. ',
    nSouvenirs: (q) => q + ' یادبود',
    giftOne: 'یکی از آن‌ها هدیه‌ی شماست.',
    confirmFaucet: 'برای دریافت ۱۰۰ دلار آزمایشی، در TronLink تأیید کنید.',
    faucetDone: '۱۰۰ دلار آزمایشی اضافه شد. ',
    capBack: 'پشت سکه. برای برگرداندن، روی آن بزنید',
    capFront: 'روی سکه. برای برگرداندن، روی آن بزنید',
    copied: 'کپی شد',
    selected: 'انتخاب شد؛ Ctrl+C را بزنید',
    copy: 'کپی آدرس',
    walletChanged: 'کیف پول عوض شد. دوباره وصل کنید',
    netChanged: 'شبکه عوض شد. دوباره وصل کنید'
  }
};
const T = WORDS[LANG];
const NET_LABEL = T.net[CONFIG.network];

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat(LANG === 'fa' ? 'fa-IR' : 'en-US');
const fmtUsd = new Intl.NumberFormat(LANG === 'fa' ? 'fa-IR' : 'en-US', { maximumFractionDigits: 2 });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const USD_DEC = 1000000n;

const state = { price: 10n * USD_DEC, next: 101n, gifts: 25n, batchLeft: 100000n, toFound: 0n, foundAddr: '', tw: null, me: null, usd: 0n, trx: 0n, ep: 0n, allowance: 0n, busy: false };

/* ---------- small helpers ---------- */
const B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
function b58hex(s) {
  let n = 0n;
  for (const c of s) { const i = B58.indexOf(c); if (i < 0) throw new Error('bad address'); n = n * 58n + BigInt(i); }
  return n.toString(16).padStart(50, '0').slice(0, 42);
}
async function hexToB58(hex) {
  const bytes = new Uint8Array(hex.match(/../g).map((h) => parseInt(h, 16)));
  const h1 = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
  const h2 = new Uint8Array(await crypto.subtle.digest('SHA-256', h1));
  const all = new Uint8Array(25); all.set(bytes); all.set(h2.slice(0, 4), 21);
  let n = BigInt('0x' + Array.from(all, (b) => b.toString(16).padStart(2, '0')).join(''));
  let out = '';
  while (n > 0n) { out = B58[Number(n % 58n)] + out; n /= 58n; }
  return out;
}
function big(v) {
  if (v == null) return 0n;
  if (typeof v === 'object' && !Array.isArray(v) && !v._hex && v[0] !== undefined) v = v[0];
  if (Array.isArray(v)) v = v[0];
  if (typeof v === 'bigint') return v;
  if (typeof v === 'number') return BigInt(Math.floor(v));
  if (typeof v === 'string') return BigInt(v);
  if (v._hex) return BigInt(v._hex);
  if (v.toString) { const s = v.toString(); if (/^(0x)?[0-9a-f]+$/i.test(s)) return BigInt(/^0x/i.test(s) ? s : (/^\d+$/.test(s) ? s : '0x' + s)); }
  return 0n;
}
function usdNum(units) { return fmtUsd.format(Number(units) / 1e6); }
function usdText(units) { return usdNum(units) + ' ' + T.usd; }
function shortAddr(a) { return a ? a.slice(0, 6) + '…' + a.slice(-5) : ''; }
function setStatus(text, kind, html) {
  const s = $('status');
  if (!text) { s.className = 'status'; s.textContent = ''; return; }
  s.className = 'status show ' + (kind || 'info');
  if (html) s.innerHTML = text; else s.textContent = text;
}
function txLink(id) { return '<a href="' + NET.scan + '/transaction/' + id + '" target="_blank" rel="noopener">' + T.viewTx + '</a>'; }

/* ---------- public figures (no wallet needed) ---------- */
async function view(selector, paramHex) {
  const hex = b58hex(NET.token);
  const r = await fetch(NET.api + '/wallet/triggerconstantcontract', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ owner_address: hex, contract_address: hex, function_selector: selector, parameter: paramHex || '' })
  }).then((x) => x.json());
  const w = r && r.constant_result && r.constant_result[0];
  if (!w) throw new Error('read failed');
  return BigInt('0x' + (w.slice(0, 64) || '0'));
}
async function loadFigures() {
  if (!NET.token) return render();
  try {
    const [price, next, gifts, left, toFound, fWord] = await Promise.all([
      view('pricePerToken()'), view('nextNumber()'), view('giftsRemaining()'), view('saleRemainingInBatch()'),
      view('totalToFoundation()'), view('foundation()')
    ]);
    Object.assign(state, { price, next, gifts, batchLeft: left, toFound });
    state.foundAddr = fWord === 0n ? '' : await hexToB58('41' + fWord.toString(16).padStart(40, '0'));
  } catch (e) { /* keep the published defaults if the network is slow */ }
  render();
}

/* ---------- rendering ---------- */
function qty() { const q = parseInt($('qty').value, 10); return Number.isFinite(q) && q > 0 ? q : 1; }
function render() {
  const p = usdText(state.price);
  $('heroPrice').textContent = p; $('sPrice').textContent = p; $('dPrice').textContent = p;
  $('sNext').textContent = '#' + fmt.format(Number(state.next));
  $('sGifts').textContent = fmt.format(Number(state.gifts));
  $('sFound').textContent = usdText(state.toFound);
  const q = qty();
  const tot = state.price * BigInt(q), half = tot * 50n / 100n;
  $('dTotal').textContent = usdText(tot);
  $('dFound').textContent = usdText(half);
  $('dCreator').textContent = usdText(tot - half);
  const fn = LANG === 'fa' ? CONFIG.foundation.nameFa : CONFIG.foundation.name;
  document.querySelectorAll('.fName, .fNameCap').forEach((el) => {
    const text = fn || (el.classList.contains('fNameCap') ? T.fNameCap : T.fName);
    if (CONFIG.foundation.url && !el.querySelector('a')) el.innerHTML = '<a href="' + CONFIG.foundation.url + '" target="_blank" rel="noopener"></a>';
    (el.querySelector('a') || el).textContent = text;
  });
  if (state.foundAddr) $('foundAddr').textContent = state.foundAddr;
  const hint = $('giftHint');
  const g = fmt.format(Number(state.gifts));
  if (state.gifts > 0n && q >= 5) { hint.className = 'gift-hint'; hint.textContent = T.giftYes(g); }
  else if (state.gifts > 0n) { hint.className = 'gift-hint off'; hint.textContent = T.giftMore(g); }
  else { hint.className = 'gift-hint off'; hint.textContent = T.giftNone; }

  $('netName').textContent = NET_LABEL;
  if (NET.token) { $('tokenAddr').textContent = NET.token; $('scanLink').hidden = false; $('scanLink').href = NET.scan + '/token20/' + NET.token; }

  const btn = $('buyBtn');
  if (!NET.token) { btn.disabled = true; btn.textContent = T.soon; }
  else if (!state.foundAddr) { btn.disabled = true; btn.textContent = T.waitFoundation; }
  else if (!state.me) { btn.disabled = state.busy; btn.textContent = T.connectToBuy; }
  else if (state.busy) { btn.disabled = true; }
  else {
    btn.disabled = false;
    const need = state.price * BigInt(q);
    btn.textContent = state.allowance >= need ? T.buyFor(fmt.format(q), usdText(need)) : T.allowThenBuy(usdText(need));
  }
  $('faucetBtn').hidden = !(NET.testDollars && state.me && NET.token);
}

/* ---------- wallet ---------- */
function getTW() { return (window.tronLink && window.tronLink.tronWeb) || window.tronWeb || null; }
function rightNetwork(tw) {
  const host = (tw.fullNode && tw.fullNode.host) || '';
  const nile = /nile/i.test(host), shasta = /shasta/i.test(host);
  return CONFIG.network === 'nile' ? nile : (!nile && !shasta);
}
async function connect() {
  setStatus('');
  if (!window.tronLink && !window.tronWeb) { setStatus(T.noTronLink, 'err', true); return; }
  try {
    if (window.tronLink && window.tronLink.request) {
      const res = await window.tronLink.request({ method: 'tron_requestAccounts' });
      if (res && res.code && res.code !== 200) { setStatus(res.code === 4001 ? T.declined : T.notConnected, 'err'); return; }
    }
  } catch (e) { setStatus(T.notConnectedMsg((e && e.message) || e), 'err'); return; }
  let tw = null;
  for (let i = 0; i < 25; i++) { tw = getTW(); if (tw && tw.defaultAddress && tw.defaultAddress.base58) break; await sleep(150); }
  if (!tw || !tw.defaultAddress || !tw.defaultAddress.base58) { setStatus(T.unlock, 'err'); return; }
  if (!rightNetwork(tw)) { setStatus(T.wrongNet(NET_LABEL), 'err'); return; }
  state.tw = tw; state.me = tw.defaultAddress.base58;
  $('walletLine').classList.add('on');
  $('walletText').textContent = T.connected(shortAddr(state.me));
  $('connectBtn').hidden = true;
  $('balances').hidden = false;
  await refreshWallet();
}
const USD_ABI = [
  { type: 'function', name: 'balanceOf', stateMutability: 'view', inputs: [{ name: 'a', type: 'address' }], outputs: [{ name: '', type: 'uint256' }] },
  { type: 'function', name: 'allowance', stateMutability: 'view', inputs: [{ name: 'o', type: 'address' }, { name: 's', type: 'address' }], outputs: [{ name: '', type: 'uint256' }] }
];
const EP_ABI = [
  { type: 'function', name: 'balanceOf', stateMutability: 'view', inputs: [{ name: 'a', type: 'address' }], outputs: [{ name: '', type: 'uint256' }] }
];
const usdC = () => state.tw.contract(USD_ABI, NET.usdt);
const epC = () => state.tw.contract(EP_ABI, NET.token);

async function refreshWallet() {
  if (!state.tw || !state.me) return render();
  try {
    const [usd, trx, ep, al] = await Promise.all([
      usdC().balanceOf(state.me).call(),
      state.tw.trx.getBalance(state.me),
      NET.token ? epC().balanceOf(state.me).call() : 0,
      NET.token ? usdC().allowance(state.me, NET.token).call() : 0
    ]);
    state.usd = big(usd); state.trx = big(trx); state.ep = big(ep); state.allowance = big(al);
  } catch (e) { /* balances will refresh on the next action */ }
  $('bUsd').textContent = usdNum(state.usd);
  $('bTrx').textContent = fmt.format(Number(state.trx / 1000000n));
  $('bEp').textContent = fmt.format(Number(state.ep));
  render();
}

/* ---------- transactions ---------- */
function hexText(h) { try { return decodeURIComponent(h.replace(/(..)/g, '%$1')); } catch (e) { return ''; } }
function revertReason(info) {
  const raw = info && info.contractResult && info.contractResult[0];
  if (raw && raw.startsWith('08c379a0')) {
    const len = parseInt(raw.slice(8 + 64, 8 + 128), 16);
    return hexText(raw.slice(8 + 128, 8 + 128 + len * 2));
  }
  if (info && info.receipt && info.receipt.result && info.receipt.result !== 'REVERT') return info.receipt.result;
  return info && info.resMessage ? hexText(info.resMessage) : 'REVERT';
}
function friendly(reason) {
  if (/price changed/i.test(reason)) return T.rPrice;
  if (/batch sold out/i.test(reason)) return T.rSoldOut;
  if (/sale not open/i.test(reason)) return T.rNotOpen;
  if (/OUT_OF_ENERGY|OUT_OF_TIME/i.test(reason)) return T.rEnergy;
  if (/balance is not sufficient|insufficient/i.test(reason)) return T.rNoTrx;
  return T.rOther(reason);
}
async function waitTx(txid) {
  for (let i = 0; i < 40; i++) {
    await sleep(3000);
    let info = null;
    try { info = await state.tw.trx.getTransactionInfo(txid); } catch (e) {}
    if (info && info.id) {
      if (info.receipt && info.receipt.result === 'SUCCESS') return info;
      if (!info.receipt || !info.receipt.result) { if (!info.result) return info; }
      const e = new Error(friendly(revertReason(info))); e.txid = txid; throw e;
    }
  }
  const e = new Error(T.notConfirmed); e.txid = txid; throw e;
}
// Build, sign in TronLink and broadcast a contract call.
// The transaction stays valid for about 10 minutes, so a buyer who takes a while
// to read the TronLink window does not get "Transaction expired".
async function sendTx(addr, sel, params, feeLimit) {
  const tw = state.tw;
  const b = await tw.transactionBuilder.triggerSmartContract(addr, sel, { feeLimit, callValue: 0 }, params, state.me);
  if (!b || !b.result || !b.result.result || !b.transaction) throw new Error(T.cantPrepare);
  let tx = b.transaction;
  try { tx = await tw.transactionBuilder.extendExpiration(tx, 540); } catch (e) { /* keep the default expiry */ }
  const signed = await tw.trx.sign(tx);
  const r = await tw.trx.sendRawTransaction(signed);
  if (!r || !r.result) throw new Error(T.rejected(hexText((r && r.message) || '') || (r && r.code) || 'unknown'));
  return signed.txID;
}
function sendErr(e) {
  const m = (e && (e.message || e.error)) || String(e);
  if (/declined|reject|cancel|denied/i.test(m)) return T.cancelled;
  return m;
}

async function buyFlow() {
  if (!state.me) return connect();
  if (state.busy) return;
  const q = qty();
  const priceSeen = state.price;
  const need = priceSeen * BigInt(q);
  $('result').classList.remove('show');
  await refreshWallet();
  if (state.price !== priceSeen) { setStatus(T.priceJust(usdText(state.price)), 'err'); return; }
  if (BigInt(q) > state.batchLeft) { setStatus(T.onlyLeft(fmt.format(Number(state.batchLeft))), 'err'); return; }
  if (state.usd < need) { setStatus(T.needs(usdText(need), usdText(state.usd)), 'err'); return; }
  if (state.trx < 20n * 1000000n) setStatus(T.lowTrx, 'info');

  state.busy = true; render();
  const pg = $('progress'); pg.hidden = false;
  $('pg1').className = state.allowance >= need ? 'done' : 'now'; $('pg2').className = '';
  try {
    if (state.allowance < need) {
      if (state.allowance > 0n) {
        $('buyBtn').textContent = T.resetting;
        setStatus(T.confirmReset, 'info');
        const t0 = await sendTx(NET.usdt, 'approve(address,uint256)', [{ type: 'address', value: NET.token }, { type: 'uint256', value: '0' }], CONFIG.fees.approve);
        await waitTx(t0);
      }
      $('buyBtn').textContent = T.waiting;
      setStatus(T.confirmAllow(usdText(need)), 'info');
      const t1 = await sendTx(NET.usdt, 'approve(address,uint256)', [{ type: 'address', value: NET.token }, { type: 'uint256', value: need.toString() }], CONFIG.fees.approve);
      $('buyBtn').textContent = T.allowing;
      await waitTx(t1);
      state.allowance = need;
    }
    $('pg1').className = 'done'; $('pg2').className = 'now';
    $('buyBtn').textContent = T.waiting;
    setStatus(T.confirmBuy(fmt.format(q), usdText(need)), 'info');
    const t2 = await sendTx(NET.token, 'buy(uint256,uint256)', [{ type: 'uint256', value: String(q) }, { type: 'uint256', value: priceSeen.toString() }], CONFIG.fees.buy);
    $('buyBtn').textContent = T.buying;
    const info = await waitTx(t2);
    $('pg2').className = 'done';
    showNumbers(info, q);
    setStatus(T.done + txLink(t2), 'ok', true);
  } catch (e) {
    const msg = e && e.txid ? (e.message + ' ' + txLink(e.txid)) : sendErr(e);
    setStatus(msg, 'err', !!(e && e.txid));
  } finally {
    state.busy = false;
    await loadFigures();
    await refreshWallet();
  }
}
function showNumbers(info, q) {
  let first = null, last = null, gift = 0n;
  for (const lg of (info && info.log) || []) {
    const d = lg.data || '';
    if (d.length === 384 || d.length === 320) { gift = BigInt('0x' + d.slice(128, 192)); first = BigInt('0x' + d.slice(192, 256)); last = BigInt('0x' + d.slice(256, 320)); }
  }
  const box = $('result');
  if (first !== null) {
    $('resultNums').textContent = first === last ? '#' + fmt.format(Number(first)) : '#' + fmt.format(Number(first)) + ' – #' + fmt.format(Number(last));
  } else {
    $('resultNums').textContent = T.nSouvenirs(fmt.format(q));
  }
  $('resultGift').textContent = gift > 0n ? T.giftOne : '';
  box.classList.add('show');
}
async function faucet() {
  if (!state.me || state.busy) return;
  state.busy = true; render();
  try {
    setStatus(T.confirmFaucet, 'info');
    const t = await sendTx(NET.usdt, 'faucet(uint256)', [{ type: 'uint256', value: '100' }], CONFIG.fees.faucet);
    await waitTx(t);
    setStatus(T.faucetDone + txLink(t), 'ok', true);
  } catch (e) {
    setStatus(e && e.txid ? e.message + ' ' + txLink(e.txid) : sendErr(e), 'err', !!(e && e.txid));
  } finally { state.busy = false; await refreshWallet(); }
}

/* ---------- wiring ---------- */
document.querySelectorAll('a.lang').forEach((a) => {
  a.href = a.getAttribute('href') + location.search;
  a.addEventListener('click', () => { try { localStorage.setItem('ep-lang', a.dataset.lang); } catch (e) { /* choice is not remembered */ } });
});
document.querySelectorAll('.zoom').forEach((b) => b.addEventListener('click', () => {
  $('lightboxImg').src = b.dataset.full;
  $('lightboxImg').alt = b.querySelector('img').alt;
  $('lightbox').hidden = false;
  $('lightboxClose').focus();
}));
$('lightbox').addEventListener('click', () => { $('lightbox').hidden = true; });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $('lightbox').hidden = true; });
$('heroCoin').addEventListener('click', () => { const c = $('heroCoin'); c.classList.toggle('flipped'); $('coinCap').textContent = c.classList.contains('flipped') ? T.capBack : T.capFront; });
$('inc').addEventListener('click', () => { $('qty').value = qty() + 1; render(); });
$('dec').addEventListener('click', () => { $('qty').value = Math.max(1, qty() - 1); render(); });
$('qty').addEventListener('input', render);
$('connectBtn').addEventListener('click', connect);
$('buyBtn').addEventListener('click', buyFlow);
$('faucetBtn').addEventListener('click', faucet);
$('copyAddr').addEventListener('click', async () => {
  const a = NET.token; if (!a) return;
  try { await navigator.clipboard.writeText(a); $('copyAddr').textContent = T.copied; }
  catch (e) { const r = document.createRange(); r.selectNodeContents($('tokenAddr')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); $('copyAddr').textContent = T.selected; }
  setTimeout(() => { $('copyAddr').textContent = T.copy; }, 2200);
});
function walletReset(msg) { state.me = null; $('connectBtn').hidden = false; $('balances').hidden = true; $('walletLine').classList.remove('on'); $('walletText').textContent = msg; render(); }
window.addEventListener('message', (e) => {
  const a = e && e.data && e.data.message && e.data.message.action;
  if (a === 'setAccount' || a === 'setNode' || a === 'accountsChanged' || a === 'disconnect') {
    setTimeout(() => {
      const tw = getTW();
      if (state.me && tw && tw.defaultAddress && tw.defaultAddress.base58 && tw.defaultAddress.base58 !== state.me) walletReset(T.walletChanged);
      if (a === 'setNode' && state.me) walletReset(T.netChanged);
    }, 300);
  }
});
(function candles() { const row = $('candles'); for (let i = 0; i < 53; i++) { const d = document.createElement('i'); d.style.animationDelay = (i * 0.37 % 4).toFixed(2) + 's'; row.appendChild(d); } })();
if (CONFIG.network === 'nile') $('ribbon').hidden = false;
render();
loadFigures();
setInterval(loadFigures, 30000);

/* ============================================================
   SETTINGS — the only part to edit when launching
   network: 'arbitrum' for the real sale, 'sepolia' for the testnet.
   token:   the EP contract address after you deploy it.
   deployBlock: the block of the deployment (makes the founders' wall load fast).
   (Shared by index.html in English and fa.html in Persian.)
   ============================================================ */
const CONFIG = {
  network: 'arbitrum',
  networks: {
    arbitrum: {
      chainId: 42161, name: 'Arbitrum One',
      rpc: 'https://arb1.arbitrum.io/rpc', scan: 'https://arbiscan.io',
      token: '0x2D881cf7f4c5583d676cF280E0C5f430C03691Ee',   // v7 contract on Arbitrum One
      usdt: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',   // USDT on Arbitrum One (USDT0, 6 decimals)
      deployBlock: 524508670,
      testDollars: false
    },
    sepolia: {
      chainId: 421614, name: 'Arbitrum Sepolia',
      rpc: 'https://sepolia-rollup.arbitrum.io/rpc', scan: 'https://sepolia.arbiscan.io',
      token: '', usdt: '', deployBlock: 0,
      testDollars: true
    }
  }
};
// Only when the page is opened from this computer (localhost): ?net=sepolia&token=0x..&usd=0x.. tests a testnet deployment.
(function () {
  if (!['localhost', '127.0.0.1'].includes(location.hostname)) return;
  const q = new URLSearchParams(location.search);
  if (q.get('net') === 'sepolia') CONFIG.network = 'sepolia';
  const t = q.get('token'), u = q.get('usd');
  if (/^0x[0-9a-fA-F]{40}$/.test(t || '')) CONFIG.networks[CONFIG.network].token = t;
  if (/^0x[0-9a-fA-F]{40}$/.test(u || '')) CONFIG.networks[CONFIG.network].usdt = u;
})();
const NET = CONFIG.networks[CONFIG.network];

/* ---------- words (English and Persian) ---------- */
const LANG = document.documentElement.lang === 'fa' ? 'fa' : 'en';
const WORDS = {
  en: {
    usd: 'USDT',
    net: { arbitrum: 'Arbitrum One', sepolia: 'Arbitrum Sepolia testnet' },
    viewTx: 'View the transaction',
    wallEmpty: 'No founders yet. Be the first.',
    giftYes: (g) => 'You qualify for a free extra souvenir and a place on the Founders\' wall if you are among the first 25 buyers of 5 or more (' + g + ' gifts left).',
    giftMore: (g) => 'Buy 5 or more in one purchase for a free extra souvenir and a place on the Founders\' wall (' + g + ' gifts left).',
    giftNone: 'All 25 founder gifts have been given.',
    giftCreator: 'This is the creator\'s wallet. Purchases from it never receive gifts, so every gift stays for buyers.',
    goldenYes: 'Your purchase includes the golden number #2585! With 10 or more you get 3 extra souvenirs free.',
    soon: 'Sale opens soon',
    waitFoundation: 'The sale is not ready yet',
    connectToBuy: 'Connect your wallet to buy',
    buyFor: (q, a) => 'Buy ' + q + ' for ' + a,
    allowThenBuy: (a) => 'Allow ' + a + ', then buy',
    noWallet: 'No wallet found. Install the Trust Wallet extension for Chrome from the Chrome Web Store, or open this page inside the Trust Wallet app\'s browser, then reload this page.',
    declined: 'You declined the connection in your wallet.',
    notConnected: 'Your wallet did not connect. Unlock it and try again.',
    notConnectedMsg: (m) => 'Your wallet did not connect: ' + m,
    unlock: 'Unlock your wallet, then press Connect again.',
    wrongNet: (n) => 'Your wallet is on a different network. Switch it to ' + n + ' and press Connect again.',
    connected: (a) => 'Connected: ' + a,
    rPrice: 'The price changed before your purchase went through. Nothing was charged. Check the new price and try again.',
    rSoldOut: 'This batch does not have that many souvenirs left. Choose a smaller number.',
    rNotOpen: 'The sale has not opened yet. Nothing was charged.',
    rNoUsd: 'Your wallet does not have enough USDT for this purchase.',
    rNoEth: 'Your wallet does not have enough ETH for the network fee. Add a little ETH on Arbitrum and try again.',
    rOther: (r) => 'The network did not accept the transaction (' + r + ').',
    notConfirmed: 'The network has not confirmed yet. Check the transaction before trying again.',
    cantPrepare: 'Could not prepare the transaction. Nothing was charged. Please try again.',
    rejected: (r) => 'The network did not accept the transaction (' + r + '). Nothing was charged.',
    cancelled: 'You cancelled in your wallet. Nothing was charged.',
    priceJust: (p) => 'The price just changed to ' + p + '. Check the total and press the button again.',
    onlyLeft: (n) => 'Only ' + n + ' souvenirs are left in this batch.',
    needs: (a, b) => 'This purchase needs ' + a + '. Your wallet has ' + b + '.',
    lowEth: 'Your wallet has very little ETH. The network fee is only a few cents, but you need a little ETH on Arbitrum to pay it.',
    resetting: 'Resetting the old allowance…',
    confirmReset: 'Confirm in your wallet: reset the previous allowance first.',
    waiting: 'Waiting for your wallet…',
    confirmAllow: (a) => 'Confirm in your wallet: allow the souvenir contract to take ' + a + '.',
    confirmSign: (a) => 'Sign in your wallet: permission to spend ' + a + '. Signing costs no fee.',
    allowing: 'Allowing…',
    confirmBuy: (q, a) => 'Confirm in your wallet: buy ' + q + ' for ' + a + '.',
    buying: 'Buying…',
    done: 'Done. ',
    nSouvenirs: (q) => q + ' souvenir' + (q > 1 ? 's' : ''),
    giftN: (n) => 'Plus ' + n + ' free gift souvenir' + (n === '1' ? '' : 's') + ' in your wallet.',
    confirmFaucet: 'Confirm in your wallet to receive 100 test dollars.',
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
    net: { arbitrum: 'شبکه‌ی Arbitrum One', sepolia: 'شبکه‌ی آزمایشی Arbitrum Sepolia' },
    viewTx: 'دیدن تراکنش',
    wallEmpty: 'هنوز بنیان‌گذاری نیست. اولین نفر باشید.',
    giftYes: (g) => 'اگر جزو ۲۵ نفر اولی باشید که ۵ یادبود یا بیشتر می‌خرند، یک یادبود اضافه هدیه و جایی روی دیوار بنیان‌گذاران می‌گیرید (' + g + ' هدیه مانده).',
    giftMore: (g) => 'با خرید ۵ یادبود یا بیشتر در یک خرید، یک یادبود اضافه هدیه و جایی روی دیوار بنیان‌گذاران بگیرید (' + g + ' هدیه مانده).',
    giftNone: 'هر ۲۵ هدیه‌ی بنیان‌گذاران داده شده است.',
    giftCreator: 'این کیف پول سازنده است. خرید از این کیف پول هدیه نمی‌گیرد تا همه‌ی هدیه‌ها برای خریداران بماند.',
    goldenYes: 'خرید شما شماره‌ی طلایی #۲۵۸۵ را دربرمی‌گیرد! با ۱۰ یادبود یا بیشتر، ۳ یادبود اضافه رایگان می‌گیرید.',
    soon: 'فروش به‌زودی آغاز می‌شود',
    waitFoundation: 'فروش هنوز آماده نیست',
    connectToBuy: 'برای خرید، کیف پولتان را وصل کنید',
    buyFor: (q, a) => 'خرید ' + q + ' یادبود به بهای ' + a,
    allowThenBuy: (a) => 'اجازه‌ی ' + a + '، سپس خرید',
    noWallet: 'کیف پول پیدا نشد. افزونه‌ی Trust Wallet را از فروشگاه کروم نصب کنید، یا این صفحه را در مرورگر داخل اپ Trust Wallet باز کنید و صفحه را دوباره بارگذاری کنید.',
    declined: 'اتصال را در کیف پول رد کردید.',
    notConnected: 'کیف پول وصل نشد. قفلش را باز کنید و دوباره امتحان کنید.',
    notConnectedMsg: (m) => 'کیف پول وصل نشد: ' + m,
    unlock: 'قفل کیف پول را باز کنید و دوباره دکمه‌ی اتصال را بزنید.',
    wrongNet: (n) => 'کیف پول روی شبکه‌ی دیگری است. آن را روی ' + n + ' بگذارید و دوباره دکمه‌ی اتصال را بزنید.',
    connected: (a) => 'وصل شد: ' + a,
    rPrice: 'قیمت پیش از انجام خرید تغییر کرد. هیچ پولی کم نشد. قیمت تازه را ببینید و دوباره امتحان کنید.',
    rSoldOut: 'در این دسته به این تعداد یادبود باقی نمانده است. تعداد کمتری انتخاب کنید.',
    rNotOpen: 'فروش هنوز آغاز نشده است. هیچ پولی کم نشد.',
    rNoUsd: 'کیف پولتان برای این خرید تتر کافی ندارد.',
    rNoEth: 'کیف پولتان برای کارمزد شبکه ETH کافی ندارد. کمی ETH روی شبکه‌ی Arbitrum اضافه کنید و دوباره امتحان کنید.',
    rOther: (r) => 'شبکه تراکنش را نپذیرفت (' + r + ').',
    notConfirmed: 'شبکه هنوز تأیید نکرده است. پیش از تلاش دوباره، تراکنش را بررسی کنید.',
    cantPrepare: 'آماده‌کردن تراکنش ممکن نشد. هیچ پولی کم نشد. دوباره امتحان کنید.',
    rejected: (r) => 'شبکه تراکنش را نپذیرفت (' + r + '). هیچ پولی کم نشد.',
    cancelled: 'در کیف پول لغو کردید. هیچ پولی کم نشد.',
    priceJust: (p) => 'قیمت همین حالا به ' + p + ' تغییر کرد. جمع را ببینید و دوباره دکمه را بزنید.',
    onlyLeft: (n) => 'در این دسته فقط ' + n + ' یادبود باقی مانده است.',
    needs: (a, b) => 'این خرید ' + a + ' لازم دارد. در کیف پول شما ' + b + ' هست.',
    lowEth: 'کیف پولتان ETH خیلی کمی دارد. کارمزد شبکه فقط چند سنت است، ولی برای پرداخت آن کمی ETH روی شبکه‌ی Arbitrum لازم است.',
    resetting: 'در حال صفر کردن اجازه‌ی قبلی…',
    confirmReset: 'در کیف پول تأیید کنید: اول اجازه‌ی قبلی صفر می‌شود.',
    waiting: 'منتظر تأیید در کیف پول…',
    confirmAllow: (a) => 'در کیف پول تأیید کنید: قرارداد یادبود اجازه می‌گیرد ' + a + ' بردارد.',
    confirmSign: (a) => 'در کیف پول امضا کنید: اجازه‌ی خرج کردن ' + a + '. امضا کارمزد ندارد.',
    allowing: 'در حال ثبت اجازه…',
    confirmBuy: (q, a) => 'در کیف پول تأیید کنید: خرید ' + q + ' یادبود به بهای ' + a + '.',
    buying: 'در حال خرید…',
    done: 'انجام شد. ',
    nSouvenirs: (q) => q + ' یادبود',
    giftN: (n) => n + ' یادبود هدیه‌ی رایگان هم در کیف پولتان است.',
    confirmFaucet: 'برای دریافت ۱۰۰ دلار آزمایشی، در کیف پول تأیید کنید.',
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

/* ---------- copy guard ----------
   The official site lives only at these addresses. On any other address (a copy or a mirror),
   a red warning is shown and buying is switched off. A copier can remove this, but it protects
   people who land on a naive copy. Add your own domain here if you ever get one. */
const OFFICIAL_HOSTS = ['iranshahan.github.io', 'localhost', '127.0.0.1'];
const OFFICIAL = OFFICIAL_HOSTS.includes(location.hostname);
if (!OFFICIAL) {
  document.addEventListener('DOMContentLoaded', () => {
    const b = document.createElement('div');
    b.setAttribute('role', 'alert');
    b.style.cssText = 'position:sticky;top:0;z-index:99999;background:#b00020;color:#fff;padding:12px 16px;text-align:center;font-weight:700';
    b.textContent = LANG === 'fa'
      ? 'هشدار: این صفحه سایت رسمی ایران شاهان نیست. این‌جا چیزی نخرید. سایت رسمی: iranshahan.github.io'
      : 'Warning: this is NOT the official Iran Shahan site. Do not buy here. The official site is iranshahan.github.io';
    document.body.prepend(b);
  });
}
const NET_LABEL = T.net[CONFIG.network];
const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat(LANG === 'fa' ? 'fa-IR' : 'en-US');
const fmtUsd = new Intl.NumberFormat(LANG === 'fa' ? 'fa-IR' : 'en-US', { maximumFractionDigits: 2 });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const USD_DEC = 1000000n;
const GOLDEN = 2585n;
const state = { price: 5n * USD_DEC, next: 1n, gifts: 25n, given: 0n, golden: false, batchLeft: 100000n, foundAddr: '', ownerAddr: '', treasuryAddr: '', bp: null, signer: null, me: null, usd: 0n, eth: 0n, ep: 0n, allowance: 0n, permit: undefined, busy: false };

/* ---------- small helpers ---------- */
function usdNum(units) { return fmtUsd.format(Number(units) / 1e6); }
function usdText(units) { return usdNum(units) + ' ' + T.usd; }
function shortAddr(a) { return a ? a.slice(0, 6) + '…' + a.slice(-5) : ''; }
function setStatus(text, kind, html) {
  const s = $('status');
  if (!text) { s.className = 'status'; s.textContent = ''; return; }
  s.className = 'status show ' + (kind || 'info');
  if (html) s.innerHTML = text; else s.textContent = text;
}
function txLink(hash) { return '<a href="' + NET.scan + '/tx/' + hash + '" target="_blank" rel="noopener">' + T.viewTx + '</a>'; }
function lib() { return typeof ethers !== 'undefined'; }

const EP_ABI = [
  'function pricePerToken() view returns (uint256)', 'function nextNumber() view returns (uint256)',
  'function giftsRemaining() view returns (uint256)', 'function saleRemainingInBatch() view returns (uint256)',
  'function giftsGiven() view returns (uint256)', 'function goldenClaimed() view returns (bool)',
  'function owner() view returns (address)', 'function treasury() view returns (address)',
  'function balanceOf(address) view returns (uint256)',
  'function buy(uint256 amount, uint256 maxPricePerToken)',
  'function buyWithPermit(uint256 amount, uint256 maxPricePerToken, uint256 deadline, uint8 v, bytes32 r, bytes32 s)',
  'event Purchased(address indexed buyer, uint256 amount, uint256 cost, uint256 firstNumber, uint256 lastNumber, uint256 foundersGift, uint256 goldenGift, uint256 firstGiftNumber)'
];
const USD_ABI = [
  'function balanceOf(address) view returns (uint256)', 'function allowance(address,address) view returns (uint256)',
  'function approve(address,uint256) returns (bool)', 'function nonces(address) view returns (uint256)',
  'function name() view returns (string)', 'function DOMAIN_SEPARATOR() view returns (bytes32)',
  'function faucet(uint256)'
];
let _rp = null;
function reader() { if (!_rp) _rp = new ethers.JsonRpcProvider(NET.rpc, NET.chainId, { staticNetwork: true }); return _rp; }

/* ---------- public figures (no wallet needed) ---------- */
async function loadFigures() {
  if (!NET.token || !lib()) return render();
  try {
    const c = new ethers.Contract(NET.token, EP_ABI, reader());
    const [price, next, gifts, left, given, golden, owner, treasury] = await Promise.all([
      c.pricePerToken(), c.nextNumber(), c.giftsRemaining(), c.saleRemainingInBatch(),
      c.giftsGiven(), c.goldenClaimed(), c.owner(), c.treasury()
    ]);
    Object.assign(state, { price, next, gifts, batchLeft: left, given, golden, ownerAddr: owner.toLowerCase(), treasuryAddr: treasury.toLowerCase(), foundAddr: treasury });
  } catch (e) { /* keep the published defaults if the network is slow */ }
  render();
  loadWall();
}
// Founders' wall: the buyers who received the founders' gift, from the public Purchased events.
async function loadWall() {
  const box = $('foundersWall');
  if (!box || !NET.token || !lib()) return;
  try {
    const iface = new ethers.Interface(EP_ABI);
    const logs = await reader().getLogs({ address: NET.token, topics: [iface.getEvent('Purchased').topicHash], fromBlock: NET.deployBlock || 0, toBlock: 'latest' });
    const rows = [];
    for (const lg of logs) {
      const p = iface.parseLog(lg);
      if (p && p.args.foundersGift === 1n) rows.push({ addr: p.args.buyer, top: p.args.firstGiftNumber });
    }
    if (!rows.length) return;
    box.textContent = '';
    rows.forEach((w, i) => {
      const line = document.createElement('div');
      line.style.cssText = 'display:flex;gap:10px;align-items:baseline;font-size:13px';
      const n = document.createElement('b'); n.className = 'num'; n.textContent = (i + 1) + '.';
      const a = document.createElement('code'); a.dir = 'ltr'; a.textContent = shortAddr(w.addr);
      const g = document.createElement('span'); g.style.color = 'var(--ink-3)'; g.textContent = '#' + fmt.format(Number(w.top));
      line.appendChild(n); line.appendChild(a); line.appendChild(g);
      box.appendChild(line);
    });
  } catch (e) { /* keep what is shown */ }
}

/* ---------- rendering ---------- */
function qty() { const q = parseInt($('qty').value, 10); return Number.isFinite(q) && q > 0 ? q : 1; }
function isCreator() { const m = state.me ? state.me.toLowerCase() : ''; return !!m && (m === state.ownerAddr || m === state.treasuryAddr); }
function render() {
  const p = usdText(state.price);
  $('heroPrice').textContent = p; $('sPrice').textContent = p; $('dPrice').textContent = p;
  $('sNext').textContent = '#' + fmt.format(Number(state.next));
  $('sGifts').textContent = fmt.format(Number(state.gifts));
  $('sFound').textContent = fmt.format(Number(state.given)) + ' / ' + fmt.format(25);
  const q = qty();
  const tot = state.price * BigInt(q);
  $('dTotal').textContent = usdText(tot);
  if (state.foundAddr && $('foundAddr')) $('foundAddr').textContent = state.foundAddr;
  const hint = $('giftHint');
  const g = fmt.format(Number(state.gifts));
  if (isCreator()) { hint.className = 'gift-hint off'; hint.textContent = T.giftCreator; }
  else if (state.gifts > 0n && q >= 5) { hint.className = 'gift-hint'; hint.textContent = T.giftYes(g); }
  else if (state.gifts > 0n) { hint.className = 'gift-hint off'; hint.textContent = T.giftMore(g); }
  else { hint.className = 'gift-hint off'; hint.textContent = T.giftNone; }
  if (!state.golden && q >= 10 && state.next <= GOLDEN && GOLDEN < state.next + BigInt(q) && !isCreator()) {
    hint.className = 'gift-hint'; hint.textContent += ' ' + T.goldenYes;
  }

  $('netName').textContent = NET_LABEL;
  if (NET.token) { $('tokenAddr').textContent = NET.token; $('scanLink').hidden = false; $('scanLink').href = NET.scan + '/token/' + NET.token; }

  const btn = $('buyBtn');
  if (!OFFICIAL) { btn.disabled = true; btn.textContent = LANG === 'fa' ? 'این سایت رسمی نیست' : 'Not the official site'; }
  else if (!NET.token) { btn.disabled = true; btn.textContent = T.soon; }
  else if (!state.foundAddr) { btn.disabled = true; btn.textContent = T.waitFoundation; }
  else if (!state.me) { btn.disabled = state.busy; btn.textContent = T.connectToBuy; }
  else if (state.busy) { btn.disabled = true; }
  else {
    btn.disabled = false;
    const need = state.price * BigInt(q);
    btn.textContent = T.buyFor(fmt.format(q), usdText(need));
  }
  $('faucetBtn').hidden = !(NET.testDollars && state.me && NET.token);
}

/* ---------- wallet ---------- */
// Wallets announce themselves (EIP-6963). Trust Wallet is preferred; TronLink is never used here.
const announced = [];
window.addEventListener('eip6963:announceProvider', (e) => { if (e && e.detail) announced.push(e.detail); });
window.dispatchEvent(new Event('eip6963:requestProvider'));
function pickProvider() {
  const trust = announced.find((a) => a.info && a.info.rdns === 'com.trustwallet.app');
  if (trust) return trust.provider;
  const eth = window.ethereum;
  if (eth) {
    if (Array.isArray(eth.providers)) { const t = eth.providers.find((x) => x.isTrust || x.isTrustWallet); if (t) return t; }
    return eth;
  }
  const other = announced.find((a) => a.info && a.info.rdns !== 'org.tronlink.www');
  return other ? other.provider : null;
}
async function ensureChain(p) {
  const want = '0x' + NET.chainId.toString(16);
  const cur = String(await p.request({ method: 'eth_chainId' })).toLowerCase();
  if (cur === want) return true;
  try { await p.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: want }] }); return true; }
  catch (e) {
    if (e && e.code === 4902) {
      try {
        await p.request({ method: 'wallet_addEthereumChain', params: [{ chainId: want, chainName: NET.name, nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }, rpcUrls: [NET.rpc], blockExplorerUrls: [NET.scan] }] });
        return true;
      } catch (e2) { /* fall through */ }
    }
    setStatus(T.wrongNet(NET_LABEL), 'err');
    return false;
  }
}
let _prov = null;
async function connect() {
  setStatus('');
  if (!lib()) { setStatus(T.cantPrepare, 'err'); return; }
  const p = pickProvider();
  if (!p) { setStatus(T.noWallet, 'err', true); return; }
  try { await p.request({ method: 'eth_requestAccounts' }); }
  catch (e) { setStatus(e && e.code === 4001 ? T.declined : T.notConnectedMsg((e && e.message) || e), 'err'); return; }
  if (!(await ensureChain(p))) return;
  try {
    state.bp = new ethers.BrowserProvider(p);
    state.signer = await state.bp.getSigner();
    state.me = await state.signer.getAddress();
  } catch (e) { setStatus(T.notConnectedMsg((e && e.message) || e), 'err'); return; }
  if (_prov && _prov.removeListener) { try { _prov.removeListener('accountsChanged', onAcc); _prov.removeListener('chainChanged', onChain); } catch (e) { /* ignore */ } }
  _prov = p;
  if (p.on) { p.on('accountsChanged', onAcc); p.on('chainChanged', onChain); }
  $('walletLine').classList.add('on');
  $('walletText').textContent = T.connected(shortAddr(state.me));
  $('connectBtn').hidden = true;
  $('balances').hidden = false;
  await refreshWallet();
}
function onAcc() { walletReset(T.walletChanged); }
function onChain() { walletReset(T.netChanged); }
function walletReset(msg) { state.me = null; state.signer = null; $('connectBtn').hidden = false; $('balances').hidden = true; $('walletLine').classList.remove('on'); $('walletText').textContent = msg; render(); }

async function refreshWallet() {
  if (!state.me) return render();
  try {
    const u = new ethers.Contract(NET.usdt, USD_ABI, reader());
    const e = NET.token ? new ethers.Contract(NET.token, EP_ABI, reader()) : null;
    const [usd, eth, ep, al] = await Promise.all([
      u.balanceOf(state.me), reader().getBalance(state.me),
      e ? e.balanceOf(state.me) : 0n, e ? u.allowance(state.me, NET.token) : 0n
    ]);
    state.usd = usd; state.eth = eth; state.ep = ep; state.allowance = al;
  } catch (e) { /* balances will refresh on the next action */ }
  $('bUsd').textContent = usdNum(state.usd);
  $('bEth').textContent = Number(ethers.formatEther(state.eth)).toFixed(5);
  $('bEp').textContent = fmt.format(Number(state.ep));
  render();
}

/* ---------- transactions ---------- */
function friendly(reason) {
  if (/price changed/i.test(reason)) return T.rPrice;
  if (/batch sold out/i.test(reason)) return T.rSoldOut;
  if (/insufficient funds|gas required exceeds|intrinsic gas/i.test(reason)) return T.rNoEth;
  if (/transfer amount exceeds balance|ERC20InsufficientBalance|insufficient balance/i.test(reason)) return T.rNoUsd;
  return T.rOther(reason);
}
function sendErr(e) {
  if (!e) return T.rOther('unknown');
  if (e.code === 'ACTION_REJECTED' || e.code === 4001 || /user (rejected|denied)|rejected the request/i.test(String(e.message || ''))) return T.cancelled;
  const m = e.reason || (e.info && e.info.error && e.info.error.message) || e.shortMessage || e.message || String(e);
  return friendly(String(m));
}
// Does this USDT contract support signed permits? We check that the signing domain we compute matches the contract's own.
async function permitDomain() {
  if (state.permit !== undefined) return state.permit;
  state.permit = null;
  try {
    const u = new ethers.Contract(NET.usdt, USD_ABI, reader());
    const [name, sep] = await Promise.all([u.name(), u.DOMAIN_SEPARATOR()]);
    for (const version of ['1', '2']) {
      const dom = { name, version, chainId: NET.chainId, verifyingContract: NET.usdt };
      if (ethers.TypedDataEncoder.hashDomain(dom).toLowerCase() === String(sep).toLowerCase()) { state.permit = dom; break; }
    }
  } catch (e) { state.permit = null; }
  return state.permit;
}
const PERMIT_TYPES = { Permit: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }, { name: 'value', type: 'uint256' }, { name: 'nonce', type: 'uint256' }, { name: 'deadline', type: 'uint256' }] };

async function buyFlow() {
  if (!OFFICIAL) return;
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
  if (state.eth < 50000000000000n) setStatus(T.lowEth, 'info');   // under 0.00005 ETH

  state.busy = true; render();
  const pg = $('progress'); pg.hidden = false;
  $('pg1').className = 'now'; $('pg2').className = '';
  try {
    const ep = new ethers.Contract(NET.token, EP_ABI, state.signer);
    const usd = new ethers.Contract(NET.usdt, USD_ABI, state.signer);
    let tx = null;
    if (state.allowance >= need) {
      $('pg1').className = 'done'; $('pg2').className = 'now';
      $('buyBtn').textContent = T.waiting; setStatus(T.confirmBuy(fmt.format(q), usdText(need)), 'info');
      tx = await ep.buy(q, priceSeen);
    } else {
      const dom = await permitDomain();
      let signed = null;
      if (dom) {
        try {
          const nonce = await new ethers.Contract(NET.usdt, USD_ABI, reader()).nonces(state.me);
          const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600);
          $('buyBtn').textContent = T.waiting; setStatus(T.confirmSign(usdText(need)), 'info');
          const sig = ethers.Signature.from(await state.signer.signTypedData(dom, PERMIT_TYPES, { owner: state.me, spender: NET.token, value: priceSeen * BigInt(q), nonce, deadline }));
          signed = { deadline, sig };
        } catch (e) {
          if (e && (e.code === 'ACTION_REJECTED' || e.code === 4001)) throw e;
          signed = null;   // the wallet cannot sign this way: use the two-step way below
        }
      }
      if (signed) {
        $('pg1').className = 'done'; $('pg2').className = 'now';
        $('buyBtn').textContent = T.waiting; setStatus(T.confirmBuy(fmt.format(q), usdText(need)), 'info');
        tx = await ep.buyWithPermit(q, priceSeen, signed.deadline, signed.sig.v, signed.sig.r, signed.sig.s);
      } else {
        if (state.allowance > 0n) {
          $('buyBtn').textContent = T.resetting; setStatus(T.confirmReset, 'info');
          await (await usd.approve(NET.token, 0n)).wait();
        }
        $('buyBtn').textContent = T.waiting; setStatus(T.confirmAllow(usdText(need)), 'info');
        const t1 = await usd.approve(NET.token, need);
        $('buyBtn').textContent = T.allowing;
        await t1.wait();
        $('pg1').className = 'done'; $('pg2').className = 'now';
        $('buyBtn').textContent = T.waiting; setStatus(T.confirmBuy(fmt.format(q), usdText(need)), 'info');
        tx = await ep.buy(q, priceSeen);
      }
    }
    $('buyBtn').textContent = T.buying;
    const rc = await tx.wait();
    $('pg2').className = 'done';
    showNumbers(rc, q);
    setStatus(T.done + txLink(tx.hash), 'ok', true);
  } catch (e) {
    setStatus(sendErr(e), 'err');
  } finally {
    state.busy = false;
    await loadFigures();
    await refreshWallet();
  }
}
function showNumbers(rc, q) {
  let first = null, last = null, gift = 0n;
  try {
    const iface = new ethers.Interface(EP_ABI);
    for (const lg of (rc && rc.logs) || []) {
      if (String(lg.address).toLowerCase() !== NET.token.toLowerCase()) continue;
      let p = null; try { p = iface.parseLog(lg); } catch (e) { p = null; }
      if (p && p.name === 'Purchased') { first = p.args.firstNumber; last = p.args.lastNumber; gift = p.args.foundersGift + p.args.goldenGift; }
    }
  } catch (e) { /* show the plain count instead */ }
  const box = $('result');
  if (first !== null) {
    $('resultNums').textContent = first === last ? '#' + fmt.format(Number(first)) : '#' + fmt.format(Number(first)) + ' – #' + fmt.format(Number(last));
  } else {
    $('resultNums').textContent = T.nSouvenirs(fmt.format(q));
  }
  $('resultGift').textContent = gift > 0n ? T.giftN(fmt.format(Number(gift))) : '';
  box.classList.add('show');
}
async function faucet() {
  if (!state.me || state.busy) return;
  state.busy = true; render();
  try {
    setStatus(T.confirmFaucet, 'info');
    const tx = await new ethers.Contract(NET.usdt, USD_ABI, state.signer).faucet(100);
    await tx.wait();
    setStatus(T.faucetDone + txLink(tx.hash), 'ok', true);
  } catch (e) {
    setStatus(sendErr(e), 'err');
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
(function candles() { const row = $('candles'); for (let i = 0; i < 53; i++) { const d = document.createElement('i'); d.style.animationDelay = (i * 0.37 % 4).toFixed(2) + 's'; row.appendChild(d); } })();
if (CONFIG.network !== 'arbitrum') $('ribbon').hidden = false;
render();
loadFigures();
setInterval(loadFigures, 30000);

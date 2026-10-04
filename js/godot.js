/* godot.js — الألعاب في صفحة الدرس (بارق · L1-01-d1 · v6 · مسوّدة للمراجعة)
   v6 (PLAN_v6): كلّ عنصر «لعبة» (٩) يُوجَّه إلى مشروعه — games/g6a (EL09 · EL10 · EL11) · games/g6b (EL12 · EL13 · EL07) · games/g6c (EL08 · EL14 · EL16) —
     بالمحطّة المكتوبة في البيانات (meta.game.station، من game.json لكلّ مشروع عبر build_data_v5.py). النسخة HTML (js/el) بديل آليّ كما هي:
     بلا WebGL2/WASM · المشروع غير مصدَّر بعد (طلب HEAD) · تعذّر التحميل · محطّة مجهولة ('error'). قبل تصدير v6: محطّات v5 (games/meem) لـ EL12/13/14.
   رسائل اللعبة: {bq:'ready'|'progress'|'error'|'done', station, result, arc} · {bq:'next'} · {bq:'arc', arc}.
   «بَوْصَلَةُ الأَصْواتِ» (BQ.compass): ٧ أقواس + قلب «م» + «يوم جديد» — localStorage (try/catch) · زرّ في الرأس · عرض كامل عند القلب ونهاية الدرس.
   BQ.ui.godot(parent, {src, station, age, onDone, onReady, onFail, title}) → {el, box, row, iframe, load(src, station), destroy()}
     مراقب التحميل: لا علامة حياة ٢٠ ث، أو ٩٠ ث بلا 'ready'، أو 'error' → onFail() (أو لوحة «تعذّر تشغيل اللعبة» + «العودة إلى الدرس»).
   BQ.ui.godotOK() — WebGL2 + WebAssembly + DecompressionStream، ولم تفشل اللعبة في هذه الجلسة · ?godot=0 يفرض النسخة الخفيفة و?godot=1 يفرض المحاولة.
   BQ.ui.godotRender(v5Station|null, htmlRender, {name, title, instruction, after}) → render(stage, ctx). */
(function () {
  'use strict';
  const BQ = window.BQ; if (!BQ || !BQ.ui) return;
  const h = BQ.h;
  const GAME = 'games/meem/index.html';
  const AR = BQ.AR || ((n) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]));
  const IDLE_MS = 20000, READY_MS = 90000, MAX_MS = 240000;
  const V5_STATIONS = ['write', 'listen', 'play'];

  if (!document.getElementById('st-godot')) {
    const st = document.createElement('style'); st.id = 'st-godot';
    st.textContent = `
.bq-godot { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 10px; }
.bq-godot-box { position: relative; width: min(100%, 1280px); width: min(100%, calc((100vh - 190px) * 16 / 9), 1280px); width: min(100%, calc((100dvh - 190px) * 16 / 9), 1280px);
  min-width: min(100%, 300px); aspect-ratio: 16 / 9; border-radius: var(--r-lg);
  overflow: hidden; background: var(--sky); box-shadow: 0 18px 40px var(--shade), 0 0 0 4px var(--white); }
.bq-godot-box iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; display: block; background: var(--sky); }
.bq-godot-box:fullscreen { width: 100%; height: 100%; border-radius: 0; box-shadow: none; background: var(--sky); }
.bq-godot-load { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;
  background: radial-gradient(circle at 50% 40%, var(--sky-2), var(--sky)); color: var(--white); font: 600 15px/1.5 var(--ff-ui); text-align: center; padding: 20px; transition: opacity .35s; z-index: 2; }
.bq-godot-load.is-off { opacity: 0; pointer-events: none; }
.bq-godot-dead { z-index: 4; color: var(--white); }
.bq-godot-dead .bq-btn { min-height: 52px; font-size: 18px; }
.bq-godot-spin { width: 46px; height: 46px; border-radius: 50%; border: 5px solid rgba(255,255,255,.35); border-top-color: var(--sun-soft); animation: bqgspin 1s linear infinite; }
@keyframes bqgspin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .bq-godot-spin { animation: none; } }
.bq-godot-fs { position: absolute; inset-inline-start: 10px; top: 10px; z-index: 3; width: 44px; height: 44px; border-radius: 50%; border: 0; cursor: pointer;
  background: rgba(0, 52, 91, .55); color: var(--white); display: grid; place-items: center; }
.bq-godot-fs:hover, .bq-godot-fs:focus-visible { background: var(--navy); outline: 3px solid var(--sun-soft); }
.bq-godot-fs svg { width: 22px; height: 22px; }
.bq-godot-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 6px 14px; font: 500 13px/1.5 var(--ff-ui); color: var(--muted); max-width: 100%; }
.bq-godot-row:empty { display: none; }
.bq-godot-link { font: 600 13px/1 var(--ff-ui); color: var(--navy); background: none; border: 0; padding: 10px 4px; min-height: 44px; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
.bq-godot-link:hover { color: var(--sky-ink); }
.bq-support { background: var(--paper); border: 1.5px solid var(--paper-edge); border-radius: var(--r-sm); padding: 10px 12px; margin: 0 0 12px; }
.bq-support p { margin: 0 0 8px; }
.bq-support div { display: flex; flex-wrap: wrap; gap: 8px; }
.bq-support .bq-btn { min-height: 44px; font-size: 14px; padding: .5em 1em; }
/* بطاقة اللعبة الثانية (EL14) */
.bq-gcards { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 14px; }
.bq-gcard { width: min(100%, 470px); display: grid; grid-template-columns: 64px minmax(0, 1fr) auto; gap: 12px; align-items: center; text-align: start;
  background: var(--white); border: 1.5px solid var(--sky-line); border-radius: var(--r-md); padding: 10px 12px; box-shadow: 0 6px 16px var(--shade); }
.bq-gcard img { width: 64px; height: 64px; border-radius: 14px; object-fit: cover; background: var(--sky); }
.bq-gcard b { display: block; font: 700 16px/1.3 var(--ff-display); color: var(--navy); }
.bq-gcard small { display: block; font: 500 12.5px/1.5 var(--ff-ui); color: var(--muted); }
.bq-gcard .go { font: 700 14px/1 var(--ff-ui); border: 0; border-radius: 999px; padding: 12px 16px; min-height: 44px; cursor: pointer; background: var(--sun); color: var(--navy); white-space: nowrap; }
.bq-gcard .go:hover { background: var(--sun-soft); }
.bq-gcard.is-on { border-color: var(--sky); }
@media (max-height: 520px) and (orientation: landscape) { .bq-godot-box { width: min(100%, calc((100vh - 40px) * 16 / 9)); width: min(100%, calc((100dvh - 40px) * 16 / 9)); } }
/* v5: the board is LANDSCAPE (16:9) — overrides the older portrait sizing of the lesson frame (css/app.css «محطّات اللعبة») */
.elp-play .bq-godot .bq-godot-box { width: min(100%, calc((var(--play-h, 100dvh) - 64px) * 16 / 9)) !important; }
.elp-play .bq-godot { flex-direction: column !important; justify-content: center; gap: 8px; height: 100%; }
.elp-play .bq-godot .bq-godot-row { flex-direction: row; align-items: center; max-width: 100%; }

.elp-tool.bq-godot-fs2 .bq-ic svg, .bq-godot-fs3 svg { width: 100%; height: 100%; display: block; }
.bq-godot-fs3 { display: inline-flex; align-items: center; gap: 6px; } .bq-godot-fs3 svg { width: 18px; height: 18px; }
/* v6: «التالي» ينبض بعد ختام لعبة v6 */
.elp-nav .nextbtn.is-ready { animation: bqnext 1.6s ease-in-out 3; }
@keyframes bqnext { 0%,100% { transform: none; } 50% { transform: scale(1.06); box-shadow: 0 0 0 6px rgba(254,186,2,.35); } }
/* v6: «بَوْصَلَةُ الأَصْواتِ» */
.hdr-compass { flex: none; width: 44px; height: 44px; padding: 3px; border-radius: 50%; border: 1px solid var(--sky-line); background: var(--white); cursor: pointer; display: grid; place-items: center; touch-action: manipulation; }
.hdr-compass svg { width: 36px; height: 36px; display: block; }
.hdr-compass:focus-visible { outline: 3px solid var(--sky); outline-offset: 2px; }
.hdr-compass.is-new { animation: bqcp 1.1s ease-in-out 2; }
@keyframes bqcp { 0%,100% { transform: none; } 40% { transform: scale(1.18) rotate(-8deg); box-shadow: 0 0 0 6px rgba(254,186,2,.45); } }
.cp-svg .cp-rim { fill: var(--navy); }
.cp-svg .cp-disc { fill: #F6EBD2; }
.cp-svg .cp-arc { fill: none; stroke: rgba(255,255,255,.22); stroke-width: 12; stroke-linecap: round; transition: stroke .45s ease; }
.cp-svg .cp-arc.is-lit { stroke: var(--sun); }
.cp-svg .cp-arc.is-lit.is-wait { stroke: rgba(255,255,255,.22); }
.cp-svg .cp-tick { fill: #C9B48A; }
.cp-svg .cp-n { fill: #8C9AA8; } .cp-svg .cp-n2 { fill: var(--coral); }
.cp-svg .cp-needle { transform-origin: 100px 100px; transform: rotate(-35deg); transition: transform 1.2s cubic-bezier(.3,1.5,.5,1); }
.cp-svg .cp-needle.is-home { transform: rotate(200deg); }
.cp-svg .cp-heart { fill: #E8DCC0; stroke: #fff; stroke-width: 3; transition: fill .5s; }
.cp-svg .cp-heart.is-lit { fill: #FFF6DA; stroke: var(--sun); }
.cp-svg .cp-heart.is-wait { fill: #E8DCC0; stroke: #fff; }
.cp-svg .cp-m { font: 700 34px/1 var(--ff-child, serif); fill: #BFAF8C; }
.cp-svg .cp-m.is-lit { fill: var(--coral); }
.cp-svg .cp-m.is-wait { fill: #BFAF8C; }
.cp-svg .cp-day { fill: none; stroke: var(--sun-soft); stroke-width: 5; opacity: .9; }
.hdr-compass .cp-svg .cp-m { font-size: 42px; }
.cp-ov { position: fixed; inset: 0; z-index: 90; display: grid; place-items: center; padding: 16px; background: rgba(0, 32, 56, .62); animation: cpin .25s ease-out; }
.cp-ov.is-out { opacity: 0; transition: opacity .25s; }
@keyframes cpin { from { opacity: 0; } }
.cp-card { position: relative; width: min(92vw, 78vh, 520px); width: min(92vw, 78dvh, 520px); aspect-ratio: 1; display: grid; place-items: center; }
.cp-stage { position: relative; width: 72%; aspect-ratio: 1; }
.cp-box, .cp-ring { position: absolute; inset: 0; }
.cp-box svg { width: 100%; height: 100%; display: block; filter: drop-shadow(0 18px 30px rgba(0,0,0,.35)); }
.cp-ov.is-celebrate .cp-box svg { animation: cpspin 1.4s cubic-bezier(.2,1.4,.4,1); }
@keyframes cpspin { from { transform: scale(.6) rotate(-40deg); opacity: 0; } }
.cp-game { position: absolute; width: clamp(44px, 17%, 64px); aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; border: 3px solid rgba(255,255,255,.5); background: #fff; padding: 6px; cursor: pointer; touch-action: manipulation; opacity: .72; }
.cp-game img { width: 100%; height: 100%; object-fit: contain; display: block; }
.cp-game.is-lit { opacity: 1; border-color: var(--sun); box-shadow: 0 0 0 4px rgba(254,186,2,.35); }
.cp-game:focus-visible, .cp-x:focus-visible, .cp-next:focus-visible { outline: 3px solid var(--sun-soft); outline-offset: 3px; }
.cp-x, .cp-next { position: absolute; width: 52px; height: 52px; border-radius: 50%; border: 0; cursor: pointer; display: grid; place-items: center; touch-action: manipulation; }
.cp-x { top: 0; inset-inline-end: 0; background: rgba(255,255,255,.92); color: var(--navy); }
.cp-next { bottom: 0; inset-inline-start: 0; background: var(--sun); color: var(--navy); width: 64px; height: 64px; }
.cp-x svg, .cp-next svg { width: 26px; height: 26px; }
.cp-ov.is-rm, .cp-ov.is-rm * { animation: none !important; transition: none !important; }
@media (prefers-reduced-motion: reduce) { .hdr-compass.is-new, .elp-nav .nextbtn.is-ready, .cp-ov, .cp-ov .cp-box svg { animation: none !important; } .cp-svg .cp-needle, .cp-svg .cp-arc { transition: none; } }
@media (max-width: 430px) { .hdr-compass { width: 40px; height: 40px; padding: 2px; } .hdr-compass svg { width: 34px; height: 34px; } }
`;
    document.head.append(st);
  }

  const FS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';

  const force = (() => { try { return new URLSearchParams(location.search).get('godot'); } catch (e) { return null; } })();
  BQ.ui.godotOK = function () {
    if (force === '0') return false;
    if (force !== '1') { try { if (sessionStorage.getItem('bq-godot-fail')) return false; } catch (e) { /* التخزين محجوب */ } }
    if (typeof WebAssembly !== 'object' || typeof WebAssembly.instantiate !== 'function') return false;
    if (typeof DecompressionStream !== 'function') return false; // المحرّك مضغوط gz (Safari < 16.4 لا يدعمه)
    try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2')); } catch (e) { return false; }
  };

  BQ.ui.godot = function (parent, opt) {
    opt = opt || {};
    const url = (src, station) => (src || GAME) + (station ? '#station=' + encodeURIComponent(station) + '&age=' + encodeURIComponent(opt.age || BQ.state.age || '4-6') +
      '&rm=' + (BQ.reduced() ? 1 : 0) + '&cc=' + (BQ.state.cc ? 1 : 0) + '&emb=1' : '');
    const load = h('div.bq-godot-load', { role: 'status' }, h('span.bq-godot-spin', { 'aria-hidden': 'true' }), h('span', null, 'جارٍ تحميل اللعبة…'));
    const iframe = h('iframe', { title: opt.title || 'لعبة صوت مْـ', allow: 'autoplay; fullscreen', loading: 'eager' });
    const canFs = !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
    /* v6 (مراجعة B1): زرّ ملء الشاشة خارج لوحة اللعبة — في صفّ أدوات العنصر (أو تحت اللوحة) فلا يغطّي أزرار اللعبة أبداً */
    const tools = parent.closest && parent.closest('.elp') ? parent.closest('.elp').querySelector('.elp-tools') : null;
    const fs = !canFs ? null : tools
      ? h('button.elp-tool.bq-godot-fs2', { type: 'button', 'aria-label': 'ملء الشاشة', title: 'ملء الشاشة' }, h('span.bq-ic', { 'aria-hidden': 'true', html: FS }), h('span.elp-tool-l', null, 'ملء الشاشة'), h('span.elp-tool-s', { 'aria-hidden': 'true' }, 'الشاشة'))
      : h('button.bq-godot-link.bq-godot-fs3', { type: 'button', 'aria-label': 'ملء الشاشة', html: FS + '<span>ملء الشاشة</span>' });
    const box = h('div.bq-godot-box', null, iframe, load);
    const row = h('div.bq-godot-row');
    const el = h('div.bq-godot', null, box, row);
    parent.append(el);
    if (fs) { if (tools) tools.prepend(fs); else row.append(fs); }
    if (fs) fs.addEventListener('click', () => {
      try {
        if (document.fullscreenElement) { const p = document.exitFullscreen && document.exitFullscreen(); if (p && p.catch) p.catch(() => {}); return; }
        const f = box.requestFullscreen || box.webkitRequestFullscreen; if (f) { const p = f.call(box); if (p && p.catch) p.catch(() => {}); }
      } catch (e) { /* ملء الشاشة غير متاح هنا */ }
    });
    let timer = 0, watchdog = 0, cap = 0, ready = false, failed = false, dead = false;
    const hideLoad = () => { load.classList.add('is-off'); clearTimeout(timer); };
    const stopWatch = () => { clearTimeout(watchdog); clearTimeout(cap); };
    const alive = () => { if (ready || failed || dead) return; clearTimeout(watchdog); watchdog = setTimeout(() => fail('timeout'), IDLE_MS); };
    /* مهلة «ready»: ٩٠ ث بلا تقدّم؛ كلّ رسالة progress بنسبة أعلى تؤجّلها (حتى ٢٤٠ ث كلّياً) — التنزيل الأوّل البطيء لا يُستبدل بالنسخة الخفيفة */
    let t0 = 0, lastPct = -1;
    const armCap = () => { if (!t0) t0 = Date.now(); clearTimeout(cap); const left = Math.max(0, Math.min(READY_MS, MAX_MS - (Date.now() - t0))); cap = setTimeout(() => { if (!ready) fail('timeout'); }, left); };
    const loadTxt = load.querySelector('span:last-child');
    const deadBox = () => { // لا onFail: لوحة داخل المربّع بدل شاشة ميّتة
      hideLoad(); try { iframe.src = 'about:blank'; } catch (e) { /* */ }
      const back = h('button.bq-btn', { type: 'button', onclick: () => { const id = BQ.state && BQ.state.current; if (id && BQ.open) BQ.open(id, { skipCover: true, history: 'replace' }); } }, 'العودة إلى الدرس');
      box.append(h('div.bq-godot-load.bq-godot-dead', { role: 'alert' }, h('span', null, 'تعذّر تشغيل اللعبة على هذا الجهاز.'), back));
    };
    const fail = (why, fatal) => {
      if (failed || dead || (ready && !fatal)) return;
      failed = true; stopWatch();
      if (opt.onFail) opt.onFail(why); else deadBox();
    };
    iframe.addEventListener('load', () => {
      if (dead || !iframe.src || iframe.src === 'about:blank') return;
      clearTimeout(timer); timer = setTimeout(hideLoad, 1200); // اللعبة تعرض شاشة تحميلها
      alive(); armCap(); // v6 (مراجعة S7): المهلة الكلّية تتمدّد ما دام التحميل يتقدّم
    });
    iframe.addEventListener('error', () => fail('iframe'));
    function onMsg(e) {
      if (!iframe.contentWindow || e.source !== iframe.contentWindow) return;
      const m = e.data; if (!m || typeof m !== 'object' || !m.bq) return;
      if (m.bq === 'progress') {
        alive();
        const pct = typeof m.p === 'number' ? m.p * 100 : typeof m.pct === 'number' ? m.pct : typeof m.progress === 'number' ? (m.progress <= 1 ? m.progress * 100 : m.progress) : null;
        if (pct == null || pct > lastPct) { if (pct != null) lastPct = pct; armCap(); }
        if (pct != null && loadTxt) loadTxt.textContent = 'جارٍ تحميل اللعبة… ' + AR(Math.max(0, Math.min(99, Math.round(pct)))) + '٪';
      }
      if (m.bq === 'ready') { ready = true; stopWatch(); hideLoad(); opt.onReady && opt.onReady(m); }
      if (m.bq === 'error') fail('game', !!m.fatal);
      if (m.bq === 'done') opt.onDone && opt.onDone(m);
    }
    window.addEventListener('message', onMsg);
    const api = {
      el, box, row, iframe,
      load(src, station) { ready = false; failed = false; load.classList.remove('is-off'); const d = box.querySelector('.bq-godot-dead'); if (d) d.remove(); iframe.src = url(src, station); },
      destroy() { dead = true; if (fs) fs.remove(); window.removeEventListener('message', onMsg); clearTimeout(timer); stopWatch(); try { iframe.src = 'about:blank'; } catch (e) {} el.remove(); },
    };
    api.load(opt.src, opt.station);
    return api;
  };

  /* ================================================================================================================
     v6: الألعاب التسع — كلّ عنصر لعبة له meta.game = {proj, src, station, v5, arc, title} (build_data_v5.py)
     ================================================================================================================ */
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const metaOf = (id) => (BQ.meta ? BQ.meta(id) : null) || {};

  /** هل صدّر وكيل الألعاب المشروع؟ (طلب HEAD مرّة لكلّ مشروع) — بلا fetch/‏file:// يُعتمد حقل exported من البيانات */
  const probes = {};
  function exported(game) {
    if (!game || !game.src) return Promise.resolve(false);
    if (game.exported) return Promise.resolve(true); // البيانات بُنيت بعد التصدير: بلا طلب إضافي
    if (!probes[game.src]) { // لم يُصدَّر عند بناء البيانات: نتحقّق مرّة (قد يكون صُدِّر بعدها)
      probes[game.src] = (typeof fetch === 'function' && /^https?:/.test(location.protocol))
        ? fetch(game.src, { method: 'HEAD', cache: 'no-store' }).then((r) => r.ok).catch(() => !!game.exported)
        : Promise.resolve(!!game.exported);
    }
    return probes[game.src];
  }

  /* ---------- ملخّص المعلّم من نتيجة اللعبة (للدليل وحده — لا أرقام على شاشة الطفل) ---------- */
  function listenSummary(r) {
    const n = (k) => AR(r[k] || 0);
    const rounds = AR(r.rounds || 5);
    const pass = r.passed ? 'بلغ عتبة الإتقان (٤ من ٥ من المحاولة الأولى).' : 'لم يبلغ ٤ من ٥ من المحاولة الأولى.';
    const alt = r.alt_first_try != null ? '<p>الإعادة بتسجيلات ثانية: ' + AR(r.alt_first_try) + ' من ' + AR(r.alt_rounds || 5) + ' من المحاولة الأولى — ' +
      (r.alt_passed ? 'بلغ العتبة في الإعادة.' : 'لم يبلغها في الإعادة: يحتاج دعماً.') + '</p>' : '';
    return '<p class="goal"><b>نتيجة «تدرّب» (النشاط المرصود — الناتج ١):</b> ' + n('first_try') + ' من ' + rounds + ' من المحاولة الأولى — ' + pass + '</p>' +
      '<p>يقيس هذا النشاط أنّ الطفل <b>يميّز «مْـ» من صوت كلامي آخر («آ» بفم مفتوح) ومن أصوات الأشياء</b>: أربع جولات من خمس فيها مشتِّت كلامي.</p>' +
      '<p>بعد محاولة ثانية: ' + n('after_retry') + ' · لم يُصِب: ' + n('missed') + ' · إعادات الصوت: ' + n('replays') + '.</p>' + alt;
  }
  const KEYS = [ // مفاتيح النتيجة المعروفة ← تسمية المعلّم
    ['first_try', 'من أوّل مرّة'], ['alone', 'وحده'], ['after_hint', 'بعد تلميح'], ['after_retry', 'بعد محاولة ثانية'], ['hint2', 'بعد التلميح الثاني'],
    ['helped', 'بمساعدة'], ['assisted', 'بمساعدة (أُضيء الصواب)'], ['shown', 'أظهرت اللعبة الحلّ'], ['not_yet', 'ليس بعد'], ['unjudged', 'لم يُحكَم'],
    ['no_answer', 'لم يُجِب'], ['stumbles', 'تعثّرات'], ['replays', 'إعادات الصوت']];
  const STATE = { first: 'من أوّل مرّة', first_try: 'من أوّل مرّة', alone: 'وحده', hint: 'بعد تلميح', hint1: 'بعد تلميح', after_hint: 'بعد تلميح', retry: 'بعد محاولة ثانية',
    hint2: 'بعد التلميح الثاني', helped: 'بمساعدة', help: 'بمساعدة', notyet: 'ليس بعد', assisted: 'بمساعدة', shown: 'أظهرت اللعبة الحلّ', not_yet: 'ليس بعد', unjudged: 'لم يُحكَم', none: 'لم يُجِب', no_answer: 'لم يُجِب', answered: 'أجاب' };
  const LVL = { drip: 'من أين التقطير؟', mouth: 'أيّ فم يقول «مْـ»؟', nose: 'من أين يخرج «مْـ»؟', order: 'رتّب الأدلّة', two: 'فقاعتان', three: 'ثلاث فقاعات',
    mouths: 'فمان', chain: 'سلسلة', finale: 'البوصلة تكتمل', wide: 'مجرى واسع', narrow: 'مجرى ضيّق', dots: 'نقط فقط', line: 'على السطر', slot: 'في «ـاءْ»' };
  const SLOT = { first: 'من أوّل مرّة', hint: 'بعد تلميح', shown: 'أظهرت اللعبة الحلّ', done: 'أكمل' };
  const T16 = [ // بنود «اختبر نفسك» ← العنصر الذي يُعاد قبل الدرس الثاني
    ['ت١ «إبرة البوصلة»: «مْـ» بين فم مطبق وفم مفتوح', 'EL13'], ['ت٢ «قطعة الأحجية»: «م» وثلاث صور', 'EL11'], ['ت٣ «زرّ الشفتين»: يقول «ماءْ» (حكمك)', 'EL10'],
    ['ت٤ «البرجان»: «مْـ» ثم «آ»', 'EL09'], ['ت٥ «درب القطرة» بالنقط وحدها', 'EL12']];
  const JUDGE = { alone: 'وحده', help: 'بمساعدة', notyet: 'ليس بعد', not_judged: 'لم يُحكَم', unjudged: 'لم يُحكَم', next: 'لم يُحكَم' };
  function summary6(id, r) {
    r = r || {};
    const m = metaOf(id), g = m.game || {};
    const head = (txt) => '<p class="goal"><b>نتيجة «' + esc(m.name || id) + '»' + (g.title ? ' — «' + esc(g.title) + '»' : '') + ':</b> ' + txt + '</p>';
    if (id === 'EL13') {
      let html = listenSummary(r);
      const pr = Array.isArray(r.per_round) ? r.per_round : [];
      const KIND = { m: '«مْـ»', mm: '«مْـ»', maa: '«ماءْ»', water: '«ماءْ»', aa: '«آ»', a: '«آ»', knock: 'طرق' };
      if (pr.length) html += '<ol class="hands">' + pr.map((x) => '<li>' + (x.set === 'alt' ? 'الإعادة · ' : '') + 'الجولة ' + AR(x.round || '') + ' ' + (KIND[x.kind] || KIND[x.stim] || '') + ': <i>' +
        (x.first_try ? 'من المحاولة الأولى' : x.assisted ? 'لم يُصِب' : 'بعد محاولة ثانية') + '</i></li>').join('') + '</ol>';
      return html;
    }
    if (id === 'EL16') { // البنود الخمسة سطراً سطراً + ماذا يُعاد قبل الدرس الثاني
      const det = Array.isArray(r.detail) ? r.detail : [];
      const by = {}; det.forEach((d) => { by[+d.item] = d; });
      const redo = [];
      const rows = T16.map(([label, el], k) => {
        const d = by[k + 1];
        let st = 'لم يُعرَض';
        if (d) {
          if (d.teacher || k === 2) { const j = r.say_judge || d.answer || ''; st = 'حكمك: ' + (JUDGE[j] || j || 'لم يُحكَم'); if (j !== 'alone') redo.push(el); }
          else if (d.first_try) st = 'من أوّل مرّة';
          else if (d.answer == null || d.answer === '' || d.answer === 'none') { st = 'لم يُجِب'; redo.push(el); }
          else { st = 'أجاب بغير الصواب — يُعاد'; redo.push(el); }
        }
        return '<li>' + esc(label) + ' — <i>' + esc(st) + '</i></li>';
      });
      return head('من أوّل مرّة ' + AR(r.first_try || 0) + ' من ٥') + '<ol class="hands">' + rows.join('') + '</ol>' +
        '<p><b>يعيد قبل الدرس الثاني:</b> ' + (redo.length ? redo.map((e) => '«' + esc(metaOf(e).name || e) + '»').join(' · ') : 'لا شيء — أجاب عن البنود كلّها من أوّل مرّة.') + '</p>';
    }
    const rows = Array.isArray(r.per_item) ? r.per_item : (Array.isArray(r.items) && typeof r.items[0] === 'object' ? r.items : []);
    let html;
    if (id === 'EL10') { // لعبة يحكم فيها المعلّم: وحده · بمساعدة · ليس بعد · لم يُحكَم
      const c = {}; rows.forEach((it) => { const k = JUDGE[it.outcome] || STATE[it.outcome] || 'أجاب'; c[k] = (c[k] || 0) + 1; });
      html = head('البنود ' + AR(rows.length || r.items || 0) + (Object.keys(c).length ? ' · ' + Object.keys(c).map((k) => k + ': ' + AR(c[k])).join(' · ') : ''));
    } else {
      const total = r.total != null ? r.total : (typeof r.items === 'number' ? r.items : rows.length || null);
      const skip = (k) => k === 'assisted' && typeof r.after_hint === 'number' && typeof r.shown === 'number'; // g6b: assisted = after_hint + shown
      const parts = KEYS.filter(([k]) => typeof r[k] === 'number' && !skip(k)).map(([k, l]) => l + ': ' + AR(r[k]));
      html = head((total != null ? 'البنود ' + AR(total) + (parts.length ? ' · ' : '') : '') + (parts.length ? parts.join(' · ') : (total == null ? 'أكمل اللعبة.' : '')) + ' (غير مرصود)');
    }
    if (rows.length && id !== 'EL10') { // سطر لكلّ مستوى (المستويات تبدأ من ١ ولو أرسلتها اللعبة من ٠)
      const lv = {}; const order = [];
      const nums = rows.map((it) => it.level).filter((x) => typeof x === 'number');
      const base = nums.length && Math.min.apply(null, nums) === 0 ? 1 : 0;
      rows.forEach((it) => { const k = it.level != null ? it.level : '·'; if (!lv[k]) { lv[k] = {}; order.push(k); } const st = STATE[it.outcome || it.state || it.res || it.result || ''] || 'أجاب'; lv[k][st] = (lv[k][st] || 0) + 1; });
      html += '<ol class="hands">' + order.map((k) => '<li>' + (k !== '·' ? 'المستوى ' + (typeof k === 'number' ? AR(k + base) : esc(LVL[k] || k)) + ': ' : '') + Object.keys(lv[k]).map((st) => esc(st) + ' ×' + AR(lv[k][st])).join(' · ') + '</li>').join('') + '</ol>';
    } else if (Array.isArray(r.levels) && r.levels.length && typeof r.levels[0] === 'object') {
      html += '<ol class="hands">' + r.levels.map((l, i) => {
        const c = {}; (l.items || []).forEach((x) => { const k = SLOT[x] || STATE[x]; if (k) c[k] = (c[k] || 0) + 1; });
        return '<li>' + esc(LVL[l.level] || LVL[l.id] || ('المستوى ' + AR(i + 1))) + ': ' + (Object.keys(c).map((k) => esc(k) + ' ×' + AR(c[k])).join(' · ') || 'أكمل') + '</li>';
      }).join('') + '</ol>';
    }
    if (typeof r.report === 'string' && r.report.trim() && !/[A-Za-z]/.test(r.report)) html += '<p>' + esc(r.report) + '</p>';
    if (typeof r.stars === 'number' && r.stars > 0) html += '<p class="lp-muted">نجوم الختام على شاشة الطفل: ' + AR(r.stars) + ' من ٣ (للتشجيع لا للقياس).</p>';
    return html;
  }
  /** آخر نتيجة محفوظة لعنصر (تبقى في الدليل حين يعود المعلّم) */
  function savedResult(id) {
    const r = BQ.store.get('g6-' + id, null); if (!r || typeof r !== 'object') return '';
    let when = ''; try { when = new Date(r.t).toLocaleString('ar', { weekday: 'long', hour: 'numeric', minute: '2-digit' }); } catch (e) { /* */ }
    return '<p class="lp-muted"><b>آخر نتيجة على هذا الجهاز</b>' + (when ? ' (' + esc(when) + ')' : '') + '</p>' + summary6(id, r);
  }
  BQ.ui.godotSaved = savedResult;
  function summary(station, r) { // واجهة v5 (المحطّات القديمة في games/meem)
    r = r || {};
    const n = (k) => AR(r[k] || 0);
    if (station === 'listen') return { line: '', html: listenSummary(r) };
    if (station === 'write') return { line: '', html: '<p class="goal"><b>«اكتب» (غير مرصود):</b> تتبّع «م» بحركة واحدة مرّتين: ' + n('items') + ' من ٢ · دون مساعدة: ' + n('first_try') +
      ' · بعد أن رسمتها يد الإرشاد: ' + n('assisted') + ' · تعثّرات (بدء من غير النقطة أو خروج عن الطريق): ' + n('stumbles') + '. المهمّ الإتمام من نقطة البدء وفي الاتّجاه، لا جمال الخطّ.</p>' };
    if (station === 'play') return { line: '', html: '<p class="goal"><b>«العب» (غير مرصود):</b> فقأ الفقاعة التي تقول «مْـ» من أوّل مرّة في ' + n('first_try') + ' من ' + AR(r.items || 6) +
      ' جولات · بعد محاولة ثانية: ' + n('after_retry') + ' · أُضيء الصواب: ' + n('assisted') + '. الجولتان الأخيرتان («مْـ» مقابل «آ») أصعبها.</p>' };
    return { line: '', html: '' };
  }
  BQ.ui.godotSummary = summary;
  BQ.ui.godotSummary6 = summary6;

  /** بطاقة دعم للمعلّم بعد تعثّر «تدرّب» — روابط بلا توجيه آليّ */
  function supportCard() {
    const go = (id, label) => h('button.bq-btn.ghost', { type: 'button', onclick: () => BQ.open(id, { src: 'menu' }) }, label);
    return h('div.bq-support', null,
      h('p', null, h('b', null, 'يحتاج الطفل دعماً في تمييز «مْـ»: '), 'أعِد معه هذه الأنشطة مرّة قصيرة، ثم «تدرّب» مرّة أخرى في يوم لاحق.'),
      h('div', null, go('EL09', 'استمع وتعلّم'), go('EL03', 'فمي مغلق'), go('EL10', 'تحدّث')));
  }

  /** render(stage, ctx): لعبة v6 (games/g6?) هي التجربة الأساسية؛ النسخة HTML بديل آليّ (بلا WebGL · المشروع غير مصدَّر · تعذّر التحميل · محطّة مجهولة).
      station = محطّة v5 القديمة (EL12/13/14 فقط) تُستعمل بديلاً مؤقّتاً حين لا يكون تصدير v6 موجوداً بعد. */
  BQ.ui.godotRender = function (station, htmlRender, opt) {
    opt = opt || {};
    return function render(stage, ctx) {
      const alive = () => (typeof ctx.alive === 'function' ? ctx.alive() : true);
      const meta = ctx.meta || {}, game = meta.game || null;
      const runHtml = () => { stage.replaceChildren(); ctx.instruction(''); htmlRender(stage, ctx); };
      if (game) { // v6 (مراجعة S2): آخر نتيجة محفوظة تظهر في الدليل حين يعود المعلّم إلى العنصر
        const saved = savedResult(meta.id), b0 = ctx.frame.querySelector('.elp-adult-body');
        if (saved && b0) b0.prepend(h('div.bq-godot-res.is-saved', { html: saved }));
      }
      if (!BQ.ui.godotOK()) return htmlRender(stage, ctx);
      const v5st = (game && game.v5) || (V5_STATIONS.indexOf(station) >= 0 ? station : null);
      const wait = h('div.bq-godot-load', { role: 'status', style: { position: 'relative', minHeight: '200px', borderRadius: '18px' } }, h('span.bq-godot-spin', { 'aria-hidden': 'true' }));
      stage.append(wait);
      let gone = false; ctx.onCleanup(() => { gone = true; });
      (game ? exported(game) : Promise.resolve(false)).then((ok) => {
        if (gone || !alive()) return;
        wait.remove();
        if (ok) return start(game.src, game.station, true);
        if (v5st) return start(GAME, v5st, false);
        htmlRender(stage, ctx);
      });

      function start(src, st, v6) {
        const body = ctx.frame.querySelector('.elp-adult-body');
        const gname = v6 && game && game.title ? '«' + game.title + '»' : '«' + (opt.name || meta.name || st) + '»';
        const note = h('p.meta', null, 'التجربة الأساسية هنا لعبة على لوحة أفقية (' + gname + ')؛ النتيجة تظهر هنا للمعلّم وحده حين تنتهي.');
        const altBtn = h('p', null, h('button.bq-btn.ghost.bq-alt-run', { type: 'button', onclick: () => { g.destroy(); altBtn.remove(); runHtml(); } }, 'تشغيل النسخة الخفيفة (تعمل في أيّ متصفّح)'));
        if (body) body.append(note, altBtn);
        if (opt.instruction && !v6) ctx.instruction(opt.instruction);
        let finished = false;
        const g = BQ.ui.godot(stage, { src, station: st, age: ctx.age(), title: (v6 && game.title) || opt.title || meta.name,
          onFail() {
            if (!alive() || finished) return;
            g.destroy(); altBtn.remove(); note.textContent = 'تعذّر تحميل اللعبة على هذا الجهاز، فشُغّلت النسخة الخفيفة تلقائياً.';
            runHtml();
            const b = ctx.frame.querySelector('.elp-adult-body'); if (b && !b.contains(note)) b.prepend(note);
          },
          onDone(m) {
            if (finished || !alive()) return;
            if (m.station && m.station !== st) return;
            finished = true;
            const r = m.result || {};
            if (v6) {
              if (BQ.compass) BQ.compass.light(m.arc != null ? m.arc : game.arc, meta.id, { fromGame: true });
              try { BQ.store.set('g6-' + meta.id, Object.assign({ t: Date.now() }, r)); } catch (e) { /* */ }
              if (meta.id === 'EL13') { try { BQ.store.set('ix5-EL13', Object.assign({ t: Date.now(), godot: true }, r)); } catch (e) { /* */ } }
            }
            ctx.done();
            const b = ctx.frame.querySelector('.elp-adult-body');
            if (b) {
              const res = h('div.bq-godot-res', { html: v6 ? summary6(meta.id, r) : summary(st, r).html });
              b.querySelectorAll('.bq-godot-res').forEach((o) => o.remove());
              b.prepend(res);
              if (meta.id === 'EL13' && (r.support || m.support || r.passed === false)) res.append(supportCard());
            }
            if (v6) { // للعبة v6 بطاقة ختامها (نجوم + الخريطة/الإعادة): الصفحة لا تغطّيها — زرّ «التالي» في الصفحة ينبض
              const nb = ctx.frame.querySelector('.nextbtn'); if (nb) nb.classList.add('is-ready');
              return;
            }
            if (typeof opt.after === 'function') { try { opt.after(ctx, r, stage); } catch (e) { console.error(e); } }
            else BQ.ui.endCard(stage, { title: 'أَحْسَنْتَ!', onReplay: () => BQ.open(meta.id, { skipCover: true, history: 'replace' }) });
          } });
        ctx.onCleanup(() => g.destroy());
      }
    };
  };

  /* رسائل إضافية من لعبة v6: {bq:'next'} ← العنصر التالي · {bq:'arc', arc} ← قوس يضيء قبل الختام (اختياري) */
  window.addEventListener('message', (e) => {
    const m = e.data; if (!m || typeof m !== 'object' || !m.bq) return;
    const f = document.querySelector('#content iframe'); if (!f || e.source !== f.contentWindow) return;
    if (m.bq === 'next' && BQ.goNext) BQ.goNext();
    if (m.bq === 'arc' && BQ.compass) BQ.compass.light(m.arc, BQ.state.current, { fromGame: true });
  });

  /* كلّ عنصر لعبة يمرّ بـ godotRender ولو لم يطلبه ملفّه (EL07–EL11 · EL16): التسجيل يُلفّ هنا؛ وEL12–EL14 تلفّ نفسها بعده بالدالّة نفسها */
  const _reg = BQ.register;
  BQ.register = function (id, def) {
    _reg(id, def);
    const m = metaOf(id);
    if (m.game && def && typeof def.render === 'function' && !def.__g6) {
      const html = def.render;
      def.render = BQ.ui.godotRender(null, html, { name: m.name, title: m.name });
      def.__g6 = true;
    }
  };

  /* ================================================================================================================
     «بَوْصَلَةُ الأَصْواتِ» — التقدّم عبر الدرس (ق٦-٢): ٧ أقواس + قلب «م» (EL14) + توهّج «يوم جديد» (EL16)
     القوس يضيء بإكمال اللعبة لا بالدرجة (Godot أو النسخة الخفيفة). الحالة في localStorage (BQ.store: try/catch).
     للطفل: رسم بلا نصّ (إلّا «م») · في الرأس زرّ صغير، وتُعرض كاملة عند القلب وعند نهاية الدرس.
     ================================================================================================================ */
  const C = BQ.D.v5 && BQ.D.v5.compass;
  if (C) {
    const ARCS = C.arcs.map((a) => a.n).sort((x, y) => x - y); // [1..7]
    const ARC_EL = {}; C.arcs.forEach((a) => { ARC_EL[a.n] = a.id; });
    const KEY = 'compass';
    const read = () => { const v = BQ.store.get(KEY, null); const o = v && typeof v === 'object' ? v : {};
      return { arcs: Array.isArray(o.arcs) ? o.arcs.filter((n) => ARCS.indexOf(n) >= 0) : [], heart: !!o.heart, day: !!o.day }; };
    let S = read();
    const save = () => BQ.store.set(KEY, S);
    const NS = 'http://www.w3.org/2000/svg';
    const R0 = 100, RA = 84, GAP = 7; // مركز 100، نصف قطر الأقواس 84
    const pt = (r, deg) => { const a = (deg - 90) * Math.PI / 180; return [R0 + r * Math.cos(a), R0 + r * Math.sin(a)]; };
    const arcPath = (k) => { const span = 360 / 7, a0 = k * span + GAP / 2, a1 = (k + 1) * span - GAP / 2; const p0 = pt(RA, a0), p1 = pt(RA, a1);
      return 'M' + p0[0].toFixed(2) + ' ' + p0[1].toFixed(2) + ' A' + RA + ' ' + RA + ' 0 0 1 ' + p1[0].toFixed(2) + ' ' + p1[1].toFixed(2); };
    function svg(big) {
      const lit = (n) => S.arcs.indexOf(n) >= 0;
      let s = '<svg viewBox="0 0 200 200" class="cp-svg" aria-hidden="true" focusable="false">' +
        '<circle cx="100" cy="100" r="97" class="cp-rim"/><circle cx="100" cy="100" r="70" class="cp-disc"/>';
      ARCS.forEach((n, k) => { s += '<path d="' + arcPath(k) + '" class="cp-arc' + (lit(n) ? ' is-lit' : '') + '" data-n="' + n + '"/>'; });
      if (big) for (let k = 0; k < 7; k++) { const p = pt(70, k * 360 / 7 + 180 / 7); s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="2.4" class="cp-tick"/>'; }
      s += '<g class="cp-needle' + (S.heart ? ' is-home' : '') + '"><path d="M100 40 L108 100 L100 160 L92 100Z" class="cp-n"/><path d="M100 40 L108 100 L92 100Z" class="cp-n2"/></g>' +
        '<circle cx="100" cy="100" r="' + (big ? 30 : 34) + '" class="cp-heart' + (S.heart ? ' is-lit' : '') + '"/>' +
        (S.heart || big ? '<text x="100" y="' + (big ? 112 : 114) + '" text-anchor="middle" class="cp-m' + (S.heart ? ' is-lit' : '') + '">م</text>' : '') +
        (S.day ? '<circle cx="100" cy="100" r="97" class="cp-day"/>' : '') + '</svg>';
      return s;
    }
    const label = () => 'بوصلة الأصوات: أضاء ' + AR(S.arcs.length) + ' من ٧ أقواس' + (S.heart ? '، و«م» في قلبها' : '') + (S.day ? '، وتوهّجت في اليوم التالي' : '');

    /* الرأس: زرّ صغير */
    let btn = null;
    function paintBtn(pulse) {
      if (!btn) return;
      btn.innerHTML = svg(false);
      btn.setAttribute('aria-label', label());
      btn.classList.toggle('is-full', S.arcs.length === 7 && S.heart);
      if (pulse) { btn.classList.remove('is-new'); void btn.offsetWidth; btn.classList.add('is-new'); }
    }
    function mountBtn() {
      if (btn) return;
      btn = document.getElementById('compassBtn');
      if (!btn) {
        const tools = document.querySelector('.hdr-tools'); if (!tools) return;
        btn = h('button.hdr-compass', { id: 'compassBtn', type: 'button' }); tools.prepend(btn);
      }
      btn.addEventListener('click', () => show({}));
      paintBtn(false);
    }

    /* العرض الكامل: لوحة فوق الصفحة — البوصلة الكبيرة وأيقونات الألعاب حولها (لمسها يفتح اللعبة) */
    let ov = null;
    function close() { if (!ov) return; const o = ov; ov = null; o.classList.add('is-out'); setTimeout(() => o.remove(), 260); document.removeEventListener('keydown', keys, true); if (btn) try { btn.focus({ preventScroll: true }); } catch (e) { /* */ } }
    function keys(e) { if (e.key === 'Escape' && ov) { e.preventDefault(); close(); } }
    function show(o) {
      o = o || {};
      if (ov) ov.remove();
      const box = h('div.cp-box', { html: svg(true) });
      const ring = h('div.cp-ring');
      ARCS.forEach((n, k) => {
        const id = ARC_EL[n], m = metaOf(id); if (!m || !m.icon) return;
        const p = pt(116, k * 360 / 7 + 180 / 7);
        ring.append(h('button.cp-game' + (S.arcs.indexOf(n) >= 0 ? '.is-lit' : ''), { type: 'button', 'aria-label': 'افتح: ' + (m.name || id), style: { left: (p[0] / 2) + '%', top: (p[1] / 2) + '%' },
          onclick: () => { close(); BQ.open(id, { src: 'menu' }); } }, h('img', { src: m.icon, alt: '' })));
      });
      const x = h('button.cp-x', { type: 'button', 'aria-label': 'إغلاق', onclick: close }, BQ.icon('close'));
      const next = o.next ? h('button.cp-next', { type: 'button', 'aria-label': 'التالي', onclick: () => { close(); o.next(); } }, BQ.icon('next')) : null;
      ov = h('div.cp-ov' + (o.celebrate ? '.is-celebrate' : '') + (BQ.reduced() ? '.is-rm' : ''), { role: 'dialog', 'aria-modal': 'true', 'aria-label': label() },
        h('div.cp-card', null, x, h('div.cp-stage', null, box, ring), next));
      ov.addEventListener('click', (e) => { if (e.target === ov) close(); });
      document.body.append(ov);
      document.addEventListener('keydown', keys, true);
      if (o.celebrate && !BQ.reduced()) { // الأقواس تضيء واحداً واحداً ثم القلب
        const arcs = box.querySelectorAll('.cp-arc.is-lit'); const heart = box.querySelector('.cp-heart.is-lit'); const mm = box.querySelector('.cp-m.is-lit');
        arcs.forEach((a) => a.classList.add('is-wait')); if (heart) heart.classList.add('is-wait'); if (mm) mm.classList.add('is-wait');
        arcs.forEach((a, i) => setTimeout(() => a.classList.remove('is-wait'), 350 + i * 260));
        setTimeout(() => { if (heart) heart.classList.remove('is-wait'); if (mm) mm.classList.remove('is-wait'); }, 450 + arcs.length * 260);
        try { BQ.audio.fx && BQ.audio.fx('bariq_L1-01_sfx-compass-bead', 0.7); } catch (e) { /* */ }
      }
      requestAnimationFrame(() => { const f = next || x; try { f.focus({ preventScroll: true }); } catch (e) { /* */ } });
      return ov;
    }

    /** قوس يضيء: arc = 1..7 | 'heart' | 'day' (أو رقم ٨ للقلب) — من رسالة اللعبة أو من إتمام العنصر */
    function light(arc, id, o) {
      o = o || {};
      if (arc == null && id && ARC_OF[id] != null) arc = ARC_OF[id];
      if (arc === 8 || arc === 'core' || arc === 'm') arc = 'heart';
      if (typeof arc === 'string' && /^\d+$/.test(arc)) arc = +arc;
      let changed = false, kind = null;
      if (typeof arc === 'number' && ARCS.indexOf(arc) >= 0 && S.arcs.indexOf(arc) < 0) { S.arcs.push(arc); S.arcs.sort((a, b) => a - b); changed = true; kind = 'arc'; }
      if (arc === 'heart' && !S.heart) { S.heart = true; changed = true; kind = 'heart'; ARCS.forEach((n) => { if (S.arcs.indexOf(n) < 0) S.arcs.push(n); }); S.arcs.sort((a, b) => a - b); }
      if (arc === 'day' && !S.day) { S.day = true; changed = true; kind = 'day'; }
      if (!changed) return false;
      save(); paintBtn(true);
      try { window.dispatchEvent(new CustomEvent('bq:compass', { detail: { arc, id, state: S } })); } catch (e) { /* */ }
      // القلب من النسخة الخفيفة (لا ختام Godot) أو توهّج اليوم التالي ⇒ العرض الكامل
      if ((kind === 'heart' && !o.fromGame) || kind === 'day') setTimeout(() => show({ celebrate: true }), 900);
      return true;
    }
    const ARC_OF = {}; (BQ.D.elements || []).forEach((e) => { if (e.game && e.game.arc != null) ARC_OF[e.id] = e.game.arc; });

    BQ.compass = { light, show, close, state: () => JSON.parse(JSON.stringify(S)), reset() { S = { arcs: [], heart: false, day: false }; BQ.store.del(KEY); paintBtn(false); }, svg };
    // إتمام أيّ لعبة (Godot أو النسخة الخفيفة) يضيء قوسها · نهاية الدرس المتّصل (الخريطة) تعرض البوصلة
    window.addEventListener('bq:done', (e) => {
      const id = e.detail && e.detail.id; if (!id) return;
      if (ARC_OF[id] != null) light(ARC_OF[id], id, { fromGame: false });
      if (id === 'EL15' && e.detail.first) setTimeout(() => show({ celebrate: true }), 600);
    });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountBtn); else mountBtn();
  }
})();

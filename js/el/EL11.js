/* EL11 · اقرأ — v5 #٧ · تفاعلي · نجرّب معاً · غير مرصود (المحاولة الأولى تُسجَّل للمعلّم)
   الهدف: يلمس صورة الماء حين يرى «م» ويسمع «مْـ». تابع (معلَن): يضع «م» في «ـاءْ» فتكتمل الكلمة.
   ١ التمهيد: خريطة «م» الصغيرة (المركز «م» وفرع الماء) — سيف «مْـ… ماءْ.» ← زرّ البدء
   ٢ البند ١ (مرّتان): «م» فوق ثلاث صور تُسمِع صوتها عند اللمس (الماء · يد على الباب · البوصلة) — حبيبة «اسْمَعْ: مْـ… الْمِسِ الصّورَةَ!»
   ٣ البند ٢: صورة الماء و«ـاءْ» بخانة منقّطة و«م» تحتها — «هَيّا: أَيْنَ مْـ؟» — يلمس «م» (أو يسحبها) فتطير إلى الخانة
   ٤ اكتملت: «ماءْ» كاملة والماء يتموّج — «نَعَمْ! هَذا هُوَ!» ثم سيف «مْـ… ماءْ.»
   تغذية: خطأ ١ = الصورة تُسمِع صوتها وفم سيف المطبق يظهر بجانب «م» + «اسْمَعْ جَيِّداً: مْـ… الفَمُ مُغْلَقٌ.» · خطأ ٢ = يلمع الصواب + «أَصْغِ: هَذا، وَهَذا.» */
(function () {
  'use strict';
  const ID = 'EL11';
  const need = () => (BQ.ix5 ? Promise.resolve(BQ.ix5) : (window.__ix5p = window.__ix5p || new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = 'js/el/ix5.js';
    s.onload = () => (BQ.ix5 ? res(BQ.ix5) : rej(new Error('ix5'))); s.onerror = () => { window.__ix5p = null; rej(new Error('ix5')); };
    document.head.append(s);
  })));
  need().catch(() => {});

  const CSS = `
.x11 .x11-map { position: relative; display: flex; align-items: center; justify-content: center; gap: 0; }
.x11 .x11-c { width: clamp(120px, 26cqi, 210px); aspect-ratio: 1; border-radius: 50%; background: var(--white); border: 6px solid var(--coral); display: grid; place-items: center; box-shadow: 0 10px 26px var(--shade); }
.x11 .x11-c .x5-m { font-size: clamp(64px, 14cqi, 120px); margin-top: -.12em; }
.x11 .x11-line { width: clamp(40px, 12cqi, 120px); height: 8px; border-radius: 4px; background: #2FB5B0; }
.x11 .x11-leaf { width: clamp(110px, 24cqi, 200px); aspect-ratio: 1; border-radius: 24px; overflow: hidden; border: 6px solid #2FB5B0; box-shadow: 0 10px 26px var(--shade); }
.x11 .x11-top { display: flex; align-items: center; justify-content: center; gap: clamp(10px, 3cqi, 24px); min-height: clamp(80px, 16cqi, 150px); }
.x11 .x11-top .x5-m { transition: transform .3s; }
.x11 .x11-top .x5-m.is-on { transform: scale(1.15); text-shadow: 0 0 22px #FFD45A; }
.x11 .x11-mouth { width: clamp(70px, 14cqi, 120px); aspect-ratio: 1; border-radius: 18px; overflow: hidden; border: 4px solid var(--white); box-shadow: 0 6px 16px var(--shade); animation: x5In .3s ease-out both; }
.x11 .x11-word { display: flex; align-items: center; justify-content: center; gap: clamp(14px, 5cqi, 44px); }
.x11 .x11-w { display: flex; align-items: center; direction: rtl; font: 700 clamp(64px, 15cqi, 140px)/1.2 var(--ff-child); color: var(--navy); }
.x11 .x11-slot { width: 1.05em; height: 1.25em; border: 5px dashed var(--coral); border-radius: 18px; display: grid; place-items: center; box-sizing: border-box; background: rgba(255,255,255,.6); }
.x11 .x11-slot.is-glow { box-shadow: 0 0 0 6px #FFE58A; }
.x11 .x11-slot.is-full { border-color: transparent; background: none; }
.x11 .x11-full b { color: var(--coral); font-weight: 700; }
.x11 .x11-wp { width: min(clamp(120px, 28cqi, 250px), calc(var(--x5-h) - 290px)); min-width: 96px; aspect-ratio: 1; border-radius: 24px; overflow: hidden; border: 5px solid var(--white); box-shadow: 0 8px 0 var(--sky-line), 0 12px 24px var(--shade); }
.x11 .x11-wp.is-wave .x5-pic img { animation: x11Wave 1.2s ease-in-out 2; }
@keyframes x11Wave { 50% { transform: scale(1.06) skewX(2deg); filter: brightness(1.1); } }
.x11 .x11-tile { width: clamp(84px, 16cqi, 130px); aspect-ratio: 1; border-radius: 24px; border: 0; background: var(--white); box-shadow: 0 6px 0 #F3C4BB, 0 12px 24px var(--shade); display: grid; place-items: center; cursor: grab; touch-action: none; position: relative; z-index: 4; }
.x11 .x11-tile .x5-m { font-size: clamp(56px, 11cqi, 96px); margin-top: -.12em; pointer-events: none; }
.x11 .x11-tile:focus-visible { outline: 4px solid var(--navy); outline-offset: 4px; }
.x11 .x11-tile.is-drag { cursor: grabbing; box-shadow: 0 16px 30px rgba(0,52,91,.25); transition: none; }
.x11 .x11-tile.is-fly { transition: transform .55s cubic-bezier(.3,1.2,.5,1); }
@container stage (max-width: 560px) { .x11 .x11-word { flex-direction: column; gap: 12px; } .x11 .x11-wp { width: min(46cqi, calc(var(--x5-h) - 330px)); } }
@media (prefers-reduced-motion: reduce) { .x11 .x11-tile.is-fly { transition: none; } .x11 .x11-wp.is-wave .x5-pic img { animation: none; } }`;

  function run(X, stage, ctx) {
    const h = BQ.h, L = X.L, S = X.session(ctx);
    if (!document.getElementById('st-x11')) document.head.append(h('style', { id: 'st-x11' }, CSS));
    X.prep([L.touchPic, L.whereM, L.hintM, L.thisAndThis, L.mm]);
    X.prepArt(['water', 'knock', 'compass', 'mouthM']);
    const RES = { first: 'من أوّل لمسة', second: 'بعد تلميح', shown: 'عُرض الصواب' };
    const rec = { r1: [], word: null };
    X.guide(ctx, {
      goal: 'يلمس صورة الماء حين يرى «م» ويسمع «مْـ». <b>تابع:</b> يضع «م» في «ـاءْ» فتكتمل الكلمة.',
      steps: ['التمهيد: خريطة «م» الصغيرة (المركز «م» وفرع الماء) مع «مْـ… ماءْ.».', 'البند ١ مرّتين: «م» فوق ثلاث صور — كلّ صورة تُسمِع صوتها عند اللمس.', 'البند ٢: الكلمة الناقصة — يلمس «م» أو يسحبها إلى الخانة فتكتمل «ماءْ».'],
      teacher: ['لا تقل اسم الحرف؛ إن سأل الطفل قل: «هَذا يَقولُ: مْـ».', 'بعد اكتمال الكلمة اقرأها معه بإصبعك: «مْـ… ماءْ».'],
      fb: 'صواب: حركة + «نَعَمْ! هَذا هُوَ!» · خطأ أوّل: تُسمِع الصورة صوتها ويظهر فم سيف المطبق بجانب «م» + «اسْمَعْ جَيِّداً: مْـ… الفَمُ مُغْلَقٌ.» · خطأ ثانٍ: يلمع الصواب + «أَصْغِ: هَذا، وَهَذا.» — غير مرصود؛ تُسجَّل المحاولة الأولى للتشخيص.',
    });
    const showRes = () => X.result(ctx, '<p class="goal"><b>المحاولة الأولى (للتشخيص):</b><br>البند ١: ' + (rec.r1.map((r) => RES[r]).join(' · ') || '—') + '<br>الكلمة الناقصة: ' + (rec.word ? 'اكتملت' : '—') + '</p>');

    const root = X.root(stage, 'x11');
    let replay = null, busy = false;
    ctx.onReplay(async () => { if (busy || !replay) return; busy = true; await replay(); busy = false; });

    async function intro() {
      ctx.instruction(X.lineText(L.mMaa)); replay = () => S.say(L.mMaa);
      const map = h('div.x11-map.x5-in', { role: 'img', 'aria-label': 'م — ماءْ' }, h('div.x11-c', null, h('span.x5-m', null, 'م')), h('i.x11-line'), h('div.x11-leaf', null, X.pic('water')));
      root.replaceChildren(map);
      await S.sleep(400);
      await S.say(L.mMaa);
      await X.goBtn(root);
    }

    async function round1(k) {
      ctx.instruction(X.lineText(L.touchPic));
      const top = h('div.x11-top', null, h('span.x5-m', null, 'م'));
      const host = h('div');
      root.replaceChildren(top, host);
      const mEl = top.querySelector('.x5-m');
      replay = () => S.say(L.touchPic);
      const r = await X.pickRound(S, host, {
        items: [{ key: 'water', aria: 'ماءٌ', snd: L.maa }, { key: 'knock', aria: 'يَدٌ تَطْرُقُ', snd: L.knock }, { key: 'compass', aria: 'بَوْصَلَةٌ', snd: L.click }],
        correct: 'water', tapSound: true,
        prompt: async () => { busy = true; await S.sleep(k ? 200 : 400); await S.say(L.touchPic); busy = false; },
        onRight: async () => { await S.say(L.yes); },
        onWrong1: async () => {
          if (!top.querySelector('.x11-mouth')) top.append(h('div.x11-mouth', null, X.pic('mouthM')));
          mEl.classList.add('is-on'); await S.say(L.hintM); mEl.classList.remove('is-on');
        },
        onWrong2: async (it, b, cb) => {
          await S.say(L.thisAndThis);
          mEl.classList.add('is-on'); await S.say(L.mm, { stim: true }); mEl.classList.remove('is-on'); await S.sleep(250);
          await S.say(L.maa, { stim: true });
        },
      });
      rec.r1.push(r.res); showRes();
      await S.sleep(500);
    }

    async function word() {
      ctx.instruction(X.lineText(L.whereM));
      const slot = h('span.x11-slot', { 'aria-hidden': 'true' });
      const w = h('div.x11-w', { lang: 'ar', role: 'img', 'aria-label': 'ـاءْ' }, slot, h('span', null, 'ـاءْ'));
      const wp = h('div.x11-wp', null, X.pic('water'));
      const tile = h('button.x11-tile.x5-in', { type: 'button', 'aria-label': 'م' }, h('span.x5-m', null, 'م'));
      root.replaceChildren(h('div.x11-word', null, w, wp), tile);
      replay = () => S.say(L.whereM);
      let placed = false, resolveW;
      const doneP = new Promise((r) => { resolveW = r; });
      const place = async () => {
        if (placed) return; placed = true;
        const a = tile.getBoundingClientRect(), b = slot.getBoundingClientRect();
        tile.classList.remove('is-drag'); tile.classList.add('is-fly');
        const cur = tile._dx || [0, 0];
        tile.style.transform = 'translate(' + (cur[0] + b.left + b.width / 2 - (a.left + a.width / 2)) + 'px,' + (cur[1] + b.top + b.height / 2 - (a.top + a.height / 2)) + 'px) scale(.9)';
        S.fx(L.snap, 0.6);
        await S.sleep(BQ.reduced() ? 60 : 560);
        tile.remove();
        // الكلمة كاملة في سطر واحد (لتتّصل «م» بما بعدها) و«م» مرجانية
        w.replaceChildren(h('span.x11-full.x5-in', null, h('b', null, 'م'), 'اءْ'));
        w.setAttribute('aria-label', 'ماءْ');
        resolveW();
      };
      // سحب بالإصبع (التقاط المؤشّر) أو لمسة واحدة
      let start = null, moved = false;
      tile.addEventListener('pointerdown', (e) => { if (placed || busy) return; if (e.cancelable) e.preventDefault(); start = [e.clientX, e.clientY]; moved = false; tile._dx = [0, 0]; try { tile.setPointerCapture(e.pointerId); } catch (x) { /* */ } tile.classList.add('is-drag'); slot.classList.add('is-glow'); });
      tile.addEventListener('pointermove', (e) => { if (!start || placed) return; if (e.cancelable) e.preventDefault(); const dx = e.clientX - start[0], dy = e.clientY - start[1]; if (Math.hypot(dx, dy) > 8) moved = true; tile._dx = [dx, dy]; tile.style.transform = 'translate(' + dx + 'px,' + dy + 'px)'; });
      const up = (e) => {
        if (!start) return; start = null; slot.classList.remove('is-glow');
        try { tile.releasePointerCapture(e.pointerId); } catch (x) { /* */ }
        if (placed) return;
        const b = slot.getBoundingClientRect(), t = tile.getBoundingClientRect();
        const over = !(t.right < b.left - 30 || t.left > b.right + 30 || t.bottom < b.top - 30 || t.top > b.bottom + 30);
        if (!moved || over) place();
        else { tile.classList.remove('is-drag'); tile.classList.add('is-fly'); tile.style.transform = ''; tile._dx = [0, 0]; S.later(() => tile.classList.remove('is-fly'), 600); }
      };
      tile.addEventListener('pointerup', up); tile.addEventListener('pointercancel', up);
      tile.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); place(); } });
      tile.addEventListener('touchstart', (e) => { if (e.cancelable) e.preventDefault(); }, { passive: false });
      tile.addEventListener('click', (e) => { if (e.detail === 0) place(); }); // تفعيل لوحة المفاتيح/قارئ الشاشة
      busy = true; await S.sleep(300); await S.say(L.whereM); busy = false;
      await S.gate(doneP);
      rec.word = true; showRes();
      wp.classList.add('is-wave');
      await S.say(L.yes);
      await S.say(L.mMaa);
      await S.sleep(500);
    }

    (async () => {
      await intro();
      await round1(0);
      await round1(1);
      await word();
      ctx.done();
      X.rec(ID).set(rec);
      X.finish(S, ctx, { pose: 'clap' });
    })();
    X.phNote(ctx, ['water', 'knock', 'compass', 'mouthM']);
  }

  BQ.register(ID, {
    hero: 'img-001',
    render(stage, ctx) {
      need().then((X) => { if (ctx.alive()) run(X, stage, ctx); })
        .catch(() => stage.append(BQ.h('p.bq-missing', null, 'تعذّر تحميل النشاط. جرّب «من البداية».')));
    },
  });
})();

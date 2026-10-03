/* EL14 · العب — v5 #١٤ · تفاعلي · أجرّب وحدي · غير مرصود
   التجربة الأساسية: محطّة «play» في لعبة Godot (BQ.ui.godotRender) — وهذه النسخة HTML («الغرفة») بديلها الآليّ.
   الهدف الواحد: يفقأ الفقاعة التي تقول مثل صوت سيف، في ست جولات تصعب تدريجاً.
   المشهد: غرفة الجلوس؛ ماجد ينفخ فقاعات صابون من حلقة فتطفو ببطء؛ البوصلة مفتوحة على الطاولة (لا تطفو)؛ كلّ صواب يرسل بريقاً إلى غطائها.
   قاعدة اللعب المعلنة: «الفقاعة تقول صوتاً» — لمسة أولى تُسمِع صوت الفقاعة، ولمسة ثانية عليها تفقؤها.
   ١ النافذة: ماجد ينفخ الفقاعات — «هَيّا، أَصْغِ مَعي!» — بارق يلعب الجولة الأولى (يسمع الفقاعتين ثم يفقأ ما يقول «مْـ») ← زرّ البدء
   ٢ جولات ١–٢ «مْـ»/طرق · ٣–٤ «مْـ»/تكّة · ٥–٦ «مْـ»/«آ» — سيف «مْـ» في أوّل كلّ جولة (زرّ الأذن يعيده)
   ٣ صواب: الفقاعة تنفجر وبريق يطير إلى البوصلة + «نَعَمْ! هَذا هُوَ!» · خطأ: الفقاعة تبتعد وتُسمِع صوتها + «اسْمَعْ جَيِّداً: مْـ… الفَمُ مُغْلَقٌ.»
      · خطأ ثانٍ: يلمع الصواب + «أَصْغِ: هَذا، وَهَذا.» بلا احتفال (الاحتفال لصواب الطفل وحده)
   ٤ البوصلة تكتمل: «م» تظهر على غطائها فوق الطاولة؛ بارق يقفز فرحاً — سيف «مْـ… ماءْ.» */
(function () {
  'use strict';
  const ID = 'EL14';
  const need = () => (BQ.ix5 ? Promise.resolve(BQ.ix5) : (window.__ix5p = window.__ix5p || new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = 'js/el/ix5.js';
    s.onload = () => (BQ.ix5 ? res(BQ.ix5) : rej(new Error('ix5'))); s.onerror = () => { window.__ix5p = null; rej(new Error('ix5')); };
    document.head.append(s);
  })));
  need().catch(() => {});

  const CSS = `
.x14 { justify-content: stretch; }
.x14 .x14-room { position: relative; width: 100%; height: var(--x5-h); border-radius: 26px; overflow: hidden; box-shadow: 0 10px 26px var(--shade); container-type: size; touch-action: manipulation; }
.x14 .x14-bg { position: absolute; inset: 0; }
.x14 .x14-bg .x5-pic { width: 100%; height: 100%; }
.x14 .x14-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255,240,210,.0), rgba(60,30,0,.12)); }
.x14 .x14-maj { position: absolute; inset-inline-end: 2%; bottom: 0; height: min(62cqh, 70cqw); pointer-events: none; filter: drop-shadow(0 8px 12px rgba(0,0,0,.25)); }
.x14 .x14-comp { position: absolute; left: 50%; top: 82%; width: 12%; aspect-ratio: 1; margin: 0; transform: translate(-50%, -50%); border-radius: 50%; display: grid; place-items: center; container-type: inline-size; }
.x14 .x14-comp.drawn, .x14 .x14-comp.is-m { background: radial-gradient(circle, #FFF8E6 0 54%, #E9C27A 55% 64%, #B98532 65%); box-shadow: 0 6px 12px rgba(0,0,0,.3); }
.x14 .x14-comp .x5-m { font-size: 62cqi; opacity: 0; transform: scale(.4); transition: opacity .5s, transform .6s cubic-bezier(.3,1.5,.5,1); margin-top: -.12em; }
.x14 .x14-comp.is-m { transform: translate(-50%, -50%) scale(1.25); transition: transform .5s; }
.x14 .x14-comp.is-m .x5-m { opacity: 1; transform: none; }
.x14 .x14-comp.glint { animation: x14Glint .6s ease-out; }
@keyframes x14Glint { 50% { box-shadow: 0 0 0 8px #FFE58A, 0 0 30px #FFD45A; } }
.x14 .x14-glow { position: absolute; inset: 8%; border-radius: 50%; background: radial-gradient(circle, rgba(255,229,138,var(--g, 0)), transparent 70%); pointer-events: none; transition: --g .4s; }
.x14 .x14-b { --bs: min(30cqh, 34cqw, 210px); position: absolute; width: var(--bs); height: var(--bs); margin: calc(var(--bs) / -2) 0 0 calc(var(--bs) / -2); border: 0; padding: 0; border-radius: 50%; cursor: pointer; z-index: 3;
  background: radial-gradient(circle at 32% 28%, rgba(255,255,255,.95) 0 7%, rgba(255,255,255,.15) 8% 40%, rgba(186,230,255,.18) 41% 68%, rgba(255,160,220,.35) 80%, rgba(140,210,255,.55) 92%, rgba(255,255,255,.75) 100%);
  box-shadow: inset 0 0 18px rgba(255,255,255,.7), 0 6px 18px rgba(0,52,91,.12); transition: left 1.2s ease-in-out, top 1.2s ease-in-out, transform .25s, opacity .4s; animation: x14Bob 3.4s ease-in-out infinite; }
.x14 .x14-b:nth-of-type(2n) { animation-duration: 4.1s; animation-delay: -1.3s; }
@keyframes x14Bob { 0%, 100% { translate: 0 0; } 50% { translate: 0 -5cqh; } }
.x14 .x14-b:focus-visible { outline: 4px solid var(--navy); outline-offset: 4px; }
.x14 .x14-b.is-heard { box-shadow: inset 0 0 18px rgba(255,255,255,.7), 0 0 0 6px rgba(0,174,237,.75), 0 6px 18px rgba(0,52,91,.12); }
.x14 .x14-b.is-sing { transform: scale(1.1); }
.x14 .x14-b.is-glow { box-shadow: inset 0 0 18px rgba(255,255,255,.7), 0 0 0 7px var(--sun), 0 0 34px var(--sun); }
.x14 .x14-b.is-pop { animation: x14Pop .35s ease-out forwards; pointer-events: none; }
@keyframes x14Pop { 60% { transform: scale(1.3); opacity: .8; } 100% { transform: scale(1.6); opacity: 0; } }
.x14 .x14-b .x14-ear { position: absolute; inset: 0; margin: auto; width: 34%; height: 34%; color: rgba(0,52,91,.55); }
.x14 .x14-b.is-heard .x14-ear { color: var(--sky-ink); }
.x14 .x14-spark { position: absolute; z-index: 6; width: 34px; height: 34px; margin: -17px 0 0 -17px; color: var(--sun); pointer-events: none; transition: left .8s cubic-bezier(.5,0,.3,1), top .8s cubic-bezier(.5,0,.3,1), opacity .3s; filter: drop-shadow(0 0 6px #FFE58A); }
.x14 .x14-puff { position: absolute; z-index: 2; width: 4cqh; aspect-ratio: 1; border-radius: 50%; border: 2px solid rgba(255,255,255,.85); background: rgba(200,235,255,.25); pointer-events: none; animation: x14Puff 3s ease-out forwards; }
@keyframes x14Puff { from { transform: translate(0, 0) scale(.4); opacity: 1; } to { transform: translate(22cqw, -30cqh) scale(1.1); opacity: 0; } }
.x14 .x14-win { position: absolute; z-index: 7; top: 4%; left: 50%; transform: translateX(-50%); display: flex; align-items: flex-end; gap: 10px; padding: 10px 16px 0; border-radius: 22px; background: rgba(255, 248, 230, .92); box-shadow: 0 10px 26px rgba(0,0,0,.18); animation: x5In .35s ease-out both; }
.x14 .x14-win .bq-brq { width: min(20cqh, 120px); display: block; }
.x14 .x14-win .bq-brq img { width: 100%; display: block; }
.x14 .x14-top { position: absolute; z-index: 8; top: 3%; inset-inline-start: 3%; }
.x14 .x14-go { position: absolute; z-index: 8; left: 50%; top: 50%; transform: translate(-50%, -50%); }
.x14 .x14-brq { position: absolute; z-index: 7; inset-inline-start: 4%; bottom: 3%; width: min(26cqh, 22cqw); pointer-events: none; }
.x14 .x14-brq img { width: 100%; display: block; }
@media (prefers-reduced-motion: reduce) { .x14 .x14-b { animation: none; transition: none; } .x14 .x14-puff { display: none; } .x14 .x14-spark { transition: none; } }`;

  function htmlRender(stage, ctx) {
    need().then((X) => { if (ctx.alive()) run(X, stage, ctx); })
      .catch(() => stage.append(BQ.h('p.bq-missing', null, 'تعذّر تحميل النشاط. جرّب «من البداية».')));
  }

  function run(X, stage, ctx) {
    const h = BQ.h, L = X.L, S = X.session(ctx);
    if (!document.getElementById('st-x14')) document.head.append(h('style', { id: 'st-x14' }, CSS));
    X.prep([L.mm, L.mmB, L.aa, L.listenWithMe, L.hintM, L.thisAndThis]);
    X.prepArt(['bubbles']);
    const ROUNDS = [
      { other: L.knock, m: L.mmB, name: '«مْـ»/طرق' }, { other: L.knockB, m: L.mm, name: '«مْـ»/طرق' },
      { other: L.click, m: L.mmB, name: '«مْـ»/تكّة' }, { other: L.clickB, m: L.mm, name: '«مْـ»/تكّة' },
      { other: L.aa, m: L.mmB, name: '«مْـ»/«آ»' }, { other: L.aaB, m: L.mm, name: '«مْـ»/«آ»' },
    ];
    const RES = { first: 'من أوّل مرّة', second: 'بعد تلميح', shown: 'عُرض الصواب' };
    const rec = [];
    X.guide(ctx, {
      goal: 'يفقأ الفقاعة التي تقول مثل صوت سيف «مْـ»، في ست جولات تصعب تدريجاً.',
      steps: ['ماجد ينفخ فقاعات الصابون، وبارق يلعب الجولة الأولى أمام الطفل.', 'قاعدة اللعب: لمسة على الفقاعة تُسمِع صوتها، ولمسة ثانية عليها تفقؤها.', 'الجولات ١–٢ «مْـ»/طرق · ٣–٤ «مْـ»/تكّة · ٥–٦ «مْـ»/«آ» — كلّ صواب يرسل بريقاً إلى البوصلة، وفي النهاية تظهر «م» على غطائها.'],
      teacher: ['دع الطفل يسمع الفقاعتين قبل أن يفقأ؛ زرّ الأذن يعيد صوت سيف.', 'لا مؤقّت ولا خسارة: الخطأ يعيد الفقاعة ويُسمِع صوتها.'],
      fb: 'صواب: انفجار وبريق + «نَعَمْ! هَذا هُوَ!» · خطأ: الفقاعة تبتعد وتُسمِع صوتها + «اسْمَعْ جَيِّداً: مْـ… الفَمُ مُغْلَقٌ.» · بعد محاولتين يلمع الصواب + «أَصْغِ: هَذا، وَهَذا.» بلا احتفال — غير مرصود.',
    });
    const showRes = () => X.result(ctx, '<p class="goal"><b>ما جرى (غير مرصود):</b><br>' + rec.map((r, i) => X.AR(i + 1) + '. ' + ROUNDS[i].name + ': ' + RES[r]).join('<br>') + '</p>');

    const root = X.root(stage, 'x14');
    const room = h('div.x14-room');
    root.append(room);
    const comp = h('div.x14-comp', { 'aria-hidden': 'true' }, h('span.x5-m', null, 'م'));
    room.append(h('div.x14-bg', null, X.pic('bubbles')), h('img.x14-maj', { src: BQ.char.MAJ, alt: '', draggable: 'false' }), comp);
    /* البوصلة على الطاولة: فوق بوصلة صورة الغرفة نفسها (img-033: ‎0.528, 0.65‎ عرضها ‎0.09‎ من الصورة) — صورة v5 أخرى: بوصلة مرسومة أسفل الوسط */
    let anchorPt = null;
    X.art('bubbles').then((a) => { if (/img-033\.webp$/.test(a.src || '')) anchorPt = { x: 0.528, y: 0.648, w: 0.092, ar: 900 / 1600 }; else comp.classList.add('drawn'); placeComp(); });
    const placeComp = () => {
      if (!anchorPt) return;
      const W = room.clientWidth, H = room.clientHeight; if (!W || !H) return;
      const iw = 1, ih = anchorPt.ar, sc = Math.max(W / iw, H / ih);
      const ox = (W - iw * sc) / 2, oy = (H - ih * sc) / 2;
      comp.style.left = (ox + anchorPt.x * iw * sc) + 'px'; comp.style.top = (oy + anchorPt.y * ih * sc) + 'px'; comp.style.width = (anchorPt.w * iw * sc) + 'px';
    };
    if (window.ResizeObserver) { const ro = new ResizeObserver(placeComp); ro.observe(room); ctx.onCleanup(() => ro.disconnect()); }
    let model = null, busy = true;
    const ear = X.earBtn(async () => { if (busy || !model) return; busy = true; await S.say(model, { stim: true }); busy = false; });
    room.append(h('div.x14-top', null, ear));
    ctx.instruction('');
    ctx.onReplay(async () => { if (busy || !model) return; busy = true; await S.say(model, { stim: true }); busy = false; });

    // فقاعات صغيرة من حلقة ماجد (زينة)
    const puffs = setInterval(() => {
      if (!S.live) return clearInterval(puffs);
      if (BQ.reduced() || document.hidden) return;
      const mj = room.querySelector('.x14-maj'); if (!mj || !mj.complete) return;
      const rr = mj.getBoundingClientRect(), R = room.getBoundingClientRect();
      const p = h('i.x14-puff'); p.style.left = (rr.left - R.left + rr.width * 0.7) + 'px'; p.style.top = (rr.top - R.top + rr.height * 0.16) + 'px';
      room.append(p); setTimeout(() => p.remove(), 3100);
    }, 900);
    ctx.onCleanup(() => clearInterval(puffs));

    const posOf = (el) => { const r = el.getBoundingClientRect(), R = room.getBoundingClientRect(); return [r.left - R.left + r.width / 2, r.top - R.top + r.height / 2]; };
    const spark = async (fromEl) => {
      const st = h('span.x14-spark', { 'aria-hidden': 'true', html: BQ.icons.star });
      const a = posOf(fromEl), b = posOf(comp);
      st.style.left = a[0] + 'px'; st.style.top = a[1] + 'px';
      room.append(st);
      await S.sleep(30);
      st.style.left = b[0] + 'px'; st.style.top = b[1] + 'px';
      await S.sleep(BQ.reduced() ? 50 : 820);
      st.remove(); X.anim(comp, 'glint', 650); BQ.audio.fx(L.bead, 0.55);
    };

    /** جولة: فقاعتان؛ لمسة تُسمِع، ولمسة ثانية تفقأ — demo: يد بارق تلعب */
    function round(rd, demo) {
      return new Promise((resolve) => {
        const sideM = Math.random() < 0.5 ? 0 : 1;
        const SPOTS = [[28, 44], [70, 38]];
        const mk = (isM, i) => {
          const b = h('button.x14-b', { type: 'button', 'aria-label': 'فُقّاعَةٌ تَقولُ صَوْتاً', html: '<svg class="x14-ear" viewBox="0 0 48 48">' + BQ.icons.ear.replace(/^<svg[^>]*>|<\/svg>$/g, '') + '</svg>' });
          b.style.left = SPOTS[i][0] + '%'; b.style.top = SPOTS[i][1] + '%';
          b.isM = isM; b.snd = isM ? rd.m : rd.other; b.home = SPOTS[i];
          return b;
        };
        const bs = [mk(sideM === 0, 0), mk(sideM === 1, 1)];
        bs.forEach((b) => room.append(b));
        let tries = 0, lock = true, finished = false;
        const sing = async (b) => { b.classList.add('is-sing'); await S.stim(b.snd); b.classList.remove('is-sing'); };
        const done = (res) => { finished = true; bs.forEach((b) => b.remove()); resolve(res); };
        const tap = async (b) => {
          if (lock) return; lock = true;
          if (!b.classList.contains('is-heard')) { b.classList.add('is-heard'); await sing(b); lock = false; return; }
          if (b.isM) {
            b.classList.add('is-pop'); S.fx(L.snap, 0.5);
            await spark(b);
            if (!demo) await S.say(L.yes);
            await S.sleep(300);
            return done(tries === 0 ? 'first' : 'second');
          }
          tries++;
          // الخطأ: تبتعد وتُسمِع صوتها، ثم تعود
          b.style.left = (b.home[0] < 50 ? 12 : 86) + '%'; b.style.top = '30%';
          await sing(b);
          if (tries === 1) {
            await S.say(L.hintM);
            b.style.left = b.home[0] + '%'; b.style.top = b.home[1] + '%';
            await S.sleep(700); lock = false; return;
          }
          const cm = bs.find((x) => x.isM);
          cm.classList.add('is-glow');
          await S.say(L.thisAndThis);
          await sing(cm); await S.sleep(200); await sing(b);
          await S.sleep(500);
          cm.classList.remove('is-glow');
          return done('shown');
        };
        bs.forEach((b) => b.addEventListener('click', () => tap(b)));
        (async () => {
          busy = true; model = L.mm;
          await S.sleep(500);
          await S.say(L.mm, { stim: true });
          busy = false;
          if (!demo) { lock = false; return; }
          // يد بارق: تسمع الأخرى، ثم «مْـ»، ثم تفقأ «مْـ»
          const host = room;
          const other = bs.find((x) => !x.isM), mb = bs.find((x) => x.isM);
          for (const t of [other, mb, mb]) {
            lock = false;
            await X.ghostTap(S, host, t, { onTap: () => tap(t) });
            await S.sleep(200);
            while (lock && !finished && S.live) await S.sleep(120);
            if (finished) break;
          }
        })();
      });
    }

    (async () => {
      // ١ النافذة: ماجد وبارق — «هَيّا، أَصْغِ مَعي!» — بارق يلعب الجولة الأولى
      const win = h('div.x14-win', null, h('img', { src: BQ.char.MAJ, alt: '', draggable: 'false', style: { height: 'min(22cqh, 140px)', display: 'block' } }), BQ.ui.brq('wave'));
      room.append(win);
      ear.hidden = true;
      await S.sleep(500);
      await S.say(L.listenWithMe);
      await S.sleep(500);
      win.remove();
      const bq = h('div.x14-brq', { 'aria-hidden': 'true' }, BQ.ui.brq('point'));
      room.append(bq);
      ear.hidden = false;
      await round(ROUNDS[0], true);
      bq.remove();
      const go = h('div.x14-go'); room.append(go);
      await X.goBtn(go); go.remove();
      // ٢–٣ الجولات الست
      for (let i = 0; i < ROUNDS.length; i++) {
        rec.push(await round(ROUNDS[i], false));
        showRes(); X.rec(ID).set({ rounds: rec });
      }
      // ٤ البوصلة تكتمل
      busy = true; model = null; ear.hidden = true;
      comp.classList.add('is-m'); X.anim(comp, 'glint', 700);
      const jb = h('div.x14-brq', { 'aria-hidden': 'true' }, BQ.ui.brq('cheer')); room.append(jb);
      await S.sleep(700);
      await S.say(L.mMaa);
      await S.sleep(600);
      ctx.done();
      X.finish(S, ctx, { pose: 'cheer' });
    })();
    X.phNote(ctx, ['bubbles']);
  }

  BQ.register(ID, { hero: 'img-033', render: htmlRender });
  // Godot أوّلاً (محطّة play) والغرفة HTML بديل آليّ — سلك وكيل Godot كما هو (بلا ألعاب إضافية على شاشة الطفل)
  if (BQ.ui && BQ.ui.godotRender) {
    BQ.defs[ID].render = BQ.ui.godotRender('play', htmlRender, {
      name: 'العب', title: 'العب',
      after(c, result, st) { need().then((X) => X.finish(X.session(c), c, { pose: 'cheer' })).catch(() => BQ.ui.endCard(st || c.stage, { onReplay: () => BQ.open(ID, { skipCover: true, history: 'replace' }) })); },
    });
  }
})();

/* EL07 · كلمات وصور — v5 #١٢ · تفاعلي · نجرّب معاً · غير مرصود (المهمّة الأخيرة تُسجَّل لتقرير المعلّم)
   الهدف الواحد: يسمّي «ماءْ» في صور جديدة للماء قبل قلب البطاقة، ثم يتحقّق بالقلب.
   ١ أربع بطاقات كبيرة: الصحن بالماء · كوب ماء على طاولة المطبخ · ماء يجري من صنبور · البوصلة (ليست ماء) — حبيبة «هَيّا، أَصْغِ مَعي!»
   ٢ سمِّ أوّلاً: بطاقة وحدها بلا صوت — «هَيّا: ما هَذا؟» — يقول الطفل «ماءْ» (أو يقلّد صوت البوصلة) ثم يلمسها
   ٣ اقلب وتحقّق: بطاقات الماء تنقلب إلى «ماءْ» و«م» مرجانية + سيف «ماءْ.» · البوصلة تنقلب إلى صورتها وتكّتها
   ٤ مهمّة قصيرة: تُخلط البطاقات (الصحن · البوصلة · يد تطرق) — «هَيّا: أَيْنَ الماءُ؟» — يلمس الماء (يُسجَّل لا يُرصد)
   تغذية: القلب يُسمِع النموذج بعد محاولة الطفل (تحقّق ذاتي) · المهمّة: صواب «نَعَمْ! هَذا هُوَ!» · خطأ ١ «جَرِّبْ مَرَّةً أُخْرى.» · خطأ ٢ يلمع الصواب. */
(function () {
  'use strict';
  const ID = 'EL07';
  const need = () => (BQ.ix5 ? Promise.resolve(BQ.ix5) : (window.__ix5p = window.__ix5p || new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = 'js/el/ix5.js';
    s.onload = () => (BQ.ix5 ? res(BQ.ix5) : rej(new Error('ix5'))); s.onerror = () => { window.__ix5p = null; rej(new Error('ix5')); };
    document.head.append(s);
  })));
  need().catch(() => {});

  const CSS = `
.x7 .x7-grid { display: grid; grid-template-columns: repeat(4, auto); gap: clamp(10px, 2.6cqi, 26px); justify-content: center; }
.x7 .x7-card { --s: min(21cqi, calc(var(--x5-h) - 150px), 250px); position: relative; width: var(--s); aspect-ratio: 3 / 4; border: 0; padding: 0; background: none; cursor: pointer; perspective: 1000px; border-radius: 24px; transition: transform .35s cubic-bezier(.3,1.3,.5,1), opacity .35s, filter .35s; }
.x7 .x7-in { position: absolute; inset: 0; transform-style: preserve-3d; transition: transform .5s cubic-bezier(.4,.1,.3,1.2); border-radius: inherit; }
.x7 .x7-card.is-flip .x7-in { transform: rotateY(180deg); }
.x7 .x7-f { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: inherit; overflow: hidden; border: 5px solid var(--white); background: var(--white); box-shadow: 0 6px 0 var(--sky-line), 0 14px 28px var(--shade); display: flex; align-items: center; justify-content: center; }
.x7 .x7-b { transform: rotateY(180deg); background: linear-gradient(180deg, #FFFDF4, #FFF3CF); }
.x7 .x7-b .x5-word { font-size: clamp(34px, 7.4cqi, 76px); }
.x7 .x7-card.is-focus { transform: scale(1.12); z-index: 2; }
.x7 .x7-card.is-focus .x7-f { box-shadow: 0 0 0 6px var(--sun), 0 18px 36px var(--shade); }
.x7 .x7-card.is-back { opacity: .28; filter: saturate(.4); pointer-events: none; }
.x7 .x7-card:focus-visible { outline: 4px solid var(--navy); outline-offset: 5px; }
.x7 .x7-card.is-wiggle { animation: x7W .7s ease-in-out; }
@keyframes x7W { 25% { transform: scale(1.12) rotate(-3deg); } 75% { transform: scale(1.12) rotate(3deg); } }
.x7 .x7-task .x5-card { --x5-reserve: 120px; }
@container stage (max-width: 620px) { .x7 .x7-grid { grid-template-columns: repeat(2, auto); } .x7 .x7-card { --s: min(38cqi, calc((var(--x5-h) - 60px) / 2 * .75)); } }
@media (prefers-reduced-motion: reduce) { .x7 .x7-in, .x7 .x7-card { transition: none; } .x7 .x7-card.is-wiggle { animation: none; } }`;

  function run(X, stage, ctx) {
    const h = BQ.h, L = X.L, S = X.session(ctx);
    if (!document.getElementById('st-x7')) document.head.append(h('style', { id: 'st-x7' }, CSS));
    X.prep([L.listenWithMe]);
    X.prepArt(['water', 'cup', 'tap', 'compassTable', 'compass', 'knock']);
    const CARDS = [
      { key: 'water', water: true, aria: 'صَحْنٌ فيهِ ماءٌ' },
      { key: 'cup', water: true, aria: 'كوبُ ماءٍ' },
      { key: 'tap', water: true, aria: 'صُنْبورٌ يَجْري مِنْهُ الماءُ' },
      { key: 'compassTable', water: false, aria: 'بَوْصَلَةٌ' },
    ];
    const RES = { first: 'لمس الماء من أوّل مرّة', second: 'لمس الماء بعد محاولة ثانية', shown: 'عُرض الصواب' };
    const rec = { task: null };
    X.guide(ctx, {
      goal: 'يسمّي «ماءْ» في صور جديدة للماء قبل قلب البطاقة، ثم يتحقّق بالقلب.',
      steps: ['أربع بطاقات: الصحن بالماء (المعروف) · كوب ماء · صنبور · البوصلة (ليست ماء).', 'كلّ بطاقة وحدها: «هَيّا: ما هَذا؟» — يسمّيها الطفل أوّلاً ثم يلمسها فتنقلب ويسمع النموذج.', 'مهمّة قصيرة: «هَيّا: أَيْنَ الماءُ؟» بين الصحن والبوصلة ويد تطرق — تُسجَّل لتقريرك.'],
      teacher: ['انتظر حتى يقول الطفل شيئاً قبل أن يقلب؛ «ماءْ» للماء، وتقليد التكّة للبوصلة جواب مقبول.', 'بعد العنصر الخامس عشر اسأل: «أَيْنَ الماءُ في بَيْتِكُمْ؟».'],
      fb: 'القلب يُسمِع النموذج بعد محاولة الطفل (تحقّق ذاتي) · المهمّة الأخيرة: صواب «نَعَمْ! هَذا هُوَ!» · خطأ أوّل «جَرِّبْ مَرَّةً أُخْرى.» · خطأ ثانٍ يلمع الصواب — يُسجَّل لا يُرصد.',
    });
    const showRes = () => X.result(ctx, '<p class="goal"><b>المهمّة الأخيرة (تُسجَّل):</b> ' + (rec.task ? RES[rec.task] : '—') + '</p>');

    const root = X.root(stage, 'x7');
    const grid = h('div.x7-grid'); root.append(grid);
    let replay = null, busy = false;
    ctx.onReplay(async () => { if (busy || !replay) return; busy = true; await replay(); busy = false; });
    const cards = CARDS.map((c) => {
      const back = c.water
        ? h('div.x7-f.x7-b', null, h('span.x5-word', { lang: 'ar' }, h('b', null, 'م'), 'اءْ'))
        : h('div.x7-f.x7-b', null, X.pic('compass'));
      const b = h('button.x7-card.x5-in', { type: 'button', 'aria-label': c.aria, dataset: { k: c.key } }, h('div.x7-in', null, h('div.x7-f', null, X.pic(c.key)), back));
      b.def = c;
      grid.append(b);
      return b;
    });
    let flipWait = null;
    cards.forEach((b) => b.addEventListener('click', () => { if (flipWait && flipWait.b === b) { const w = flipWait; flipWait = null; w.r(); } }));

    async function nameAndFlip(b) {
      cards.forEach((x) => { x.classList.toggle('is-back', x !== b); x.classList.toggle('is-focus', x === b); });
      replay = () => S.say(L.whatIs);
      ctx.instruction(X.lineText(L.whatIs));
      await S.sleep(350);
      busy = true; await S.say(L.whatIs); busy = false;
      // يسمّي الطفل ثم يلمس البطاقة فتنقلب (تلمع إن تأخّر — لا قلب آليّ)
      const tapped = new Promise((r) => { flipWait = { b, r }; });
      const wig = setInterval(() => { if (!S.live) return clearInterval(wig); X.anim(b, 'is-wiggle', 750); }, 7000);
      await S.gate(tapped);
      clearInterval(wig);
      busy = true;
      b.classList.add('is-flip'); S.fx(L.flip, 0.6);
      await S.sleep(450);
      if (b.def.water) await S.say(L.maa); else await S.sfx(L.click);
      busy = false;
      await S.sleep(600);
      b.classList.remove('is-focus');
    }

    async function task() {
      ctx.instruction(X.lineText(L.whereWater));
      const host = h('div.x7-task');
      root.replaceChildren(host);
      replay = () => S.say(L.whereWater);
      const out = await X.pickRound(S, host, {
        items: [{ key: 'water', aria: 'ماءٌ' }, { key: 'compass', aria: 'بَوْصَلَةٌ' }, { key: 'knock', aria: 'يَدٌ تَطْرُقُ' }], correct: 'water',
        prompt: async () => { busy = true; await S.sleep(300); await S.say(L.whereWater); busy = false; },
        onRight: async () => { await S.say(L.yes); },
        onWrong1: async () => { await S.say(L.retry); },
        onWrong2: async () => { await S.say(L.maa); },
      });
      rec.task = out.res; showRes(); X.rec(ID).set(rec);
      await S.sleep(400);
    }

    (async () => {
      ctx.instruction(X.lineText(L.listenWithMe));
      replay = () => S.say(L.listenWithMe);
      busy = true; await S.sleep(500); await S.say(L.listenWithMe); busy = false;
      await S.sleep(400);
      for (const b of cards) await nameAndFlip(b);
      cards.forEach((x) => x.classList.remove('is-back'));
      await S.sleep(1400);
      await task();
      ctx.done();
      X.finish(S, ctx, { pose: 'clap' });
    })();
    showRes();
    X.phNote(ctx, ['water', 'cup', 'tap', 'compassTable', 'compass', 'knock']);
  }

  BQ.register(ID, {
    hero: 'img-001',
    render(stage, ctx) {
      need().then((X) => { if (ctx.alive()) run(X, stage, ctx); })
        .catch(() => stage.append(BQ.h('p.bq-missing', null, 'تعذّر تحميل النشاط. جرّب «من البداية».')));
    },
  });
})();

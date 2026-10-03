/* EL10 · تحدّث — v5 #٥ · تفاعلي · نجرّب معاً · بحكم المعلّم (ق٤-٢) — لا ميكروفون ولا حكم آليّ ولا نصّ على شاشة الطفل
   الهدف الواحد: يقول وحده بعد سماع النموذج: «مْـ» ثم «ماءْ» ثم «سَمِعْتُ فَرْقاً!» في دور بارق.
   البند ١ «مْـ»: فم سيف المطبق + زرّ «اسمع» (سيف «مْـ» ≥ ١٫٢ ث) ← حبيبة «الآنَ دَوْرُكَ، هَيّا!»
   لوحة المعلّم: ضغط مطوَّل (ثانيتان) على بارق الصغير في الزاوية ← ثلاث أيقونات (وحده · بمساعدة · ليس بعد) تُغلق بعد الاختيار.
   البند ٢ «ماءْ»: الصحن بالماء ← سيف «مْـ… ماءْ.» ← «الآنَ دَوْرُكَ، هَيّا!»
   البند ٣ «أنت بارق»: صورة الصبّ ثم يد تطرق الباب؛ بارق صغير يشير إلى الطفل ← صبّ… طق طق ← «هَلْ هُما صَوْتٌ واحِدٌ؟» ← يقول «سَمِعْتُ فَرْقاً!».
   تغذية: وحده ← بارق يصفّق + «نَعَمْ! هَذا هُوَ!» · بمساعدة ← النموذج مرّة أخرى ثم التالي · ليس بعد ← لقطة الفم ببطء + «اسْمَعْ جَيِّداً: مْـ… الفَمُ مُغْلَقٌ.»
   ومحاولة ثانية، ثم يمضي بلا حكم — يُحفظ لتقرير المعلّم (ix5-EL10) لا درجة. */
(function () {
  'use strict';
  const ID = 'EL10';
  const need = () => (BQ.ix5 ? Promise.resolve(BQ.ix5) : (window.__ix5p = window.__ix5p || new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = 'js/el/ix5.js';
    s.onload = () => (BQ.ix5 ? res(BQ.ix5) : rej(new Error('ix5'))); s.onerror = () => { window.__ix5p = null; rej(new Error('ix5')); };
    document.head.append(s);
  })));
  need().catch(() => {});

  const CSS = `
.x10 .x10-row { display: flex; align-items: center; justify-content: center; gap: clamp(16px, 5cqi, 48px); }
.x10 .x10-pics { display: flex; gap: clamp(10px, 3cqi, 24px); align-items: center; }
.x10 .x10-pic { --s: min(clamp(150px, 38cqi, 340px), calc(var(--x5-h) - 120px)); width: var(--s); aspect-ratio: 1; border-radius: 28px; overflow: hidden; border: 6px solid var(--white); box-shadow: 0 8px 0 var(--sky-line), 0 14px 30px var(--shade); transition: transform 1.6s ease, box-shadow .3s; }
.x10 .x10-pics.two .x10-pic { --s: min(clamp(120px, 28cqi, 260px), calc(var(--x5-h) - 150px)); }
.x10 .x10-pic.is-on { box-shadow: 0 0 0 6px var(--sun), 0 14px 30px var(--shade); }
.x10 .x10-pic.is-slow { transform: scale(1.12); }
.x10 .x10-pic.is-slow .x5-pic img { transform: scale(1.35); transition: transform 2.2s ease; }
.x10 .x10-brq { width: clamp(80px, 14cqi, 130px); align-self: flex-end; }
.x10 .x10-brq .bq-brq, .x10 .x10-brq img { width: 100%; display: block; }
.elp-play > .x10-cheer { position: absolute; z-index: 5; inset-inline-end: 4%; bottom: 2%; width: clamp(90px, 18cqi, 160px); pointer-events: none; animation: x5In .3s ease-out both; }
.elp-play > .x10-cheer img { width: 100%; display: block; }
.x10 .x10-skip { min-height: 64px; display: flex; align-items: center; justify-content: center; }
@container stage (max-width: 560px) { .x10 .x10-row { flex-direction: column-reverse; gap: 14px; } .x10 .x10-pic { --s: min(72cqi, calc(var(--x5-h) - 230px)); } .x10 .x10-pics.two .x10-pic { --s: min(44cqi, calc(var(--x5-h) - 260px)); } }
@media (prefers-reduced-motion: reduce) { .x10 .x10-pic, .x10 .x10-pic.is-slow .x5-pic img { transition: none; } }`;

  function run(X, stage, ctx) {
    const h = BQ.h, L = X.L, S = X.session(ctx);
    if (!document.getElementById('st-x10')) document.head.append(h('style', { id: 'st-x10' }, CSS));
    X.prep([L.mm, L.yourTurn, L.hintM]);
    X.prepArt(['mouthM', 'water', 'saifPour', 'knock']);
    const ITEMS = [
      { id: 'mm', word: '«مْـ»', pics: ['mouthM'] },
      { id: 'maa', word: '«ماءْ»', pics: ['water'] },
      { id: 'diff', word: '«سَمِعْتُ فَرْقاً!» (دور بارق)', pics: ['saifPour', 'knock'] },
    ];
    const PICK = { alone: 'قالها وحده', help: 'قالها بمساعدة', notyet: 'لم يقلها بعد', none: 'لم يُلاحَظ (انتقل بلا اختيار)' };
    const rec = ITEMS.map((it) => ({ id: it.id, picks: [] }));
    X.guide(ctx, {
      goal: 'يقول وحده بعد سماع النموذج: «مْـ» ثم «ماءْ» ثم «سَمِعْتُ فَرْقاً!» في دور بارق.',
      steps: ['البند ١ «مْـ»: فم سيف المطبق — زرّ الأذن يُسمِع النموذج (همهمة ممدودة بشفتين مطبقتين).', 'البند ٢ «ماءْ»: الصحن بالماء — النموذج «مْـ… ماءْ.»', 'البند ٣: صبّ ثم طرق — الطفل في دور بارق يقول «سَمِعْتُ فَرْقاً!».'],
      teacher: ['أنت الأذن: بعد أن يقول الطفل، اضغط مطوّلاً على بارق الصغير في الزاوية (ثانيتان) واختر ما سمعت.', 'صحّح بالنموذج و«حركة مْـ» (شفتان مطبقتان وسبّابة على جانب الأنف) لا بكلمة «خطأ».', 'لا تقل اسم الحرف؛ قل الصوت «مْـ» ممدوداً.'],
      icons: X.ICON_LEGEND,
      fb: 'وحده ← بارق يصفّق و«نَعَمْ! هَذا هُوَ!» · بمساعدة ← النموذج مرّة أخرى ثم البند التالي · ليس بعد ← لقطة الفم ببطء و«اسْمَعْ جَيِّداً: مْـ… الفَمُ مُغْلَقٌ.» ومحاولة ثانية، ثم يمضي بلا حكم. يُحفظ لتقرير «اختبر نفسك» — لا درجة.',
      note: 'إن لم تختر شيئاً يظهر للطفل سهم «التّالي» بعد قليل، ويُسجَّل البند «لم يُلاحَظ».',
    });
    const showRes = () => X.result(ctx, '<p class="goal"><b>ما اخترتَه (لتقريرك):</b><br>' + ITEMS.map((it, i) => it.word + ': ' + (rec[i].picks.length ? rec[i].picks.map((p) => PICK[p]).join(' ← ') : '—')).join('<br>') + '</p>');
    showRes();

    const root = X.root(stage, 'x10');
    const top = h('div'); root.append(top);
    const steps = BQ.ui.steps(top, ITEMS.length);
    const row = h('div.x10-row'); root.append(row);
    const skipHost = h('div.x10-skip'); root.append(skipHost);
    const tc = X.teacher(ctx, {});
    let model = async () => {};
    let busy = false;
    const ear = X.earBtn(async () => { if (busy) return; busy = true; await model(); busy = false; }, 'big');
    ctx.instruction(X.lineText(L.yourTurn));
    ctx.onReplay(async () => { if (busy) return; busy = true; await model(); busy = false; });

    const cheer = async (pose, line) => {
      const c = h('div.x10-cheer', { 'aria-hidden': 'true' }, BQ.ui.brq(pose || 'clap'));
      X.playArea(ctx).append(c);
      if (line) await S.say(line); else await S.sleep(1400);
      c.remove();
    };

    async function item(i) {
      const it = ITEMS[i];
      steps.set(i); tc.clear();
      const pics = it.pics.map((k) => h('div.x10-pic.x5-in', null, X.pic(k)));
      const picsBox = h('div.x10-pics' + (pics.length > 1 ? '.two' : ''), null, pics);
      const extra = it.id === 'diff' ? h('div.x10-brq', { 'aria-hidden': 'true' }, BQ.ui.brq('point')) : null;
      row.replaceChildren(ear, picsBox, extra || '');
      if (it.id === 'mm') model = async () => { pics[0].classList.add('is-on'); await S.say(L.mm, { stim: true }); pics[0].classList.remove('is-on'); };
      else if (it.id === 'maa') model = async () => { pics[0].classList.add('is-on'); await S.say(L.mMaa); pics[0].classList.remove('is-on'); };
      else model = async () => {
        pics[0].classList.add('is-on'); await S.sfx(L.pour); pics[0].classList.remove('is-on'); await S.sleep(250);
        pics[1].classList.add('is-on'); await S.sfx(L.knock); pics[1].classList.remove('is-on'); await S.sleep(250);
        await S.say(L.same);
      };
      const prompt = async () => { busy = true; await model(); if (it.id !== 'diff') await S.say(L.yourTurn); busy = false; };
      await S.sleep(350);
      await prompt();
      let attempt = 1;
      for (;;) {
        tc.wait(true);
        let skipRes;
        const skipP = new Promise((r) => { skipRes = r; });
        const sk = X.skipAfter(S, skipHost, 10000, () => skipRes('none'));
        const pick = await S.gate(Promise.race([tc.ask(), skipP]));
        sk.cancel(); tc.wait(false);
        rec[i].picks.push(pick); showRes(); X.rec(ID).set({ items: rec });
        if (pick === 'alone') { await cheer('clap', L.yes); break; }
        if (pick === 'help') { busy = true; await model(); busy = false; await S.sleep(500); break; }
        if (pick === 'notyet' && attempt === 1) {
          attempt = 2; busy = true;
          if (it.id === 'diff') { await cheer('cheer', L.brqDiff); }
          else {
            const slow = it.id === 'mm' ? pics[0] : h('div.x10-pic.x5-in', null, X.pic('mouthM'));
            if (it.id !== 'mm') picsBox.append(slow);
            slow.classList.add('is-slow');
            await S.say(L.mm, { stim: true, rate: 0.85 });
            await S.say(L.hintM);
            slow.classList.remove('is-slow');
            if (it.id !== 'mm') { await S.sleep(300); slow.remove(); }
          }
          busy = false;
          if (it.id !== 'diff') await S.say(L.yourTurn);
          continue;
        }
        break;
      }
      await S.sleep(400);
    }

    (async () => {
      for (let i = 0; i < ITEMS.length; i++) await item(i);
      tc.remove();
      ctx.done();
      X.finish(S, ctx, { pose: 'clap' });
    })();
    X.phNote(ctx, ['mouthM', 'water', 'saifPour', 'knock']);
  }

  BQ.register(ID, {
    hero: 'img-101',
    render(stage, ctx) {
      need().then((X) => { if (ctx.alive()) run(X, stage, ctx); })
        .catch(() => stage.append(BQ.h('p.bq-missing', null, 'تعذّر تحميل النشاط. جرّب «من البداية».')));
    },
  });
})();

/* EL16 · اختبر نفسك — v5 #١٦ · تفاعلي · أجرّب وحدي · تحقّق مؤجَّل (يوم لاحق؛ بوّابة اليوم التالي في الغلاف — المحرّك)
   الهدف الواحد: يجيب بلا تلميح، في يوم لاحق، عن خمسة بنود بأشكال تدرّب عليها.
   ت١ اسمع والمس (شكل #١٠): فم مطبق · فم مفتوح · يد تطرق — «أَيْنَ هَذا الصَّوْتُ؟» + «مْـ» بتسجيل ثانٍ
   ت٢ الرسم وصورته (شكل #٧): «م» + ثلاث صور — «اسْمَعْ: مْـ… الْمِسِ الصّورَةَ!»
   ت٣ قُل (شكل #٥): الصحن بالماء — «هَيّا: ما هَذا؟» — يقول؛ المعلّم يختار أيقونة (ضغط مطوَّل على بارق الصغير)
   ت٤ صوتان (شكل #٣): المشغّل + زرّا بارق — «مْـ» ثم «آ» · «هَلْ هُما صَوْتٌ واحِدٌ؟»
   ت٥ تتبّع (شكل #٨): «م» منقّطة بنقطة البدء، بلا سهمين — «مْـ» ممدودة مع الإصبع — مرّة
   لا صواب ولا خطأ أمام الطفل: كلّ جواب يلوّن نقطة بنغمة محايدة. التقرير في دليل المعلّم وحده: سطر لكلّ ناتج «من أوّل مرّة · بعد إعادة · لم يُجِب» + ماذا يعيد. */
(function () {
  'use strict';
  const ID = 'EL16';
  const need = () => (BQ.ix5 ? Promise.resolve(BQ.ix5) : (window.__ix5p = window.__ix5p || new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = 'js/el/ix5.js';
    s.onload = () => (BQ.ix5 ? res(BQ.ix5) : rej(new Error('ix5'))); s.onerror = () => { window.__ix5p = null; rej(new Error('ix5')); };
    document.head.append(s);
  })));
  need().catch(() => {});

  const CSS = `
.x16 .x16-dots { display: flex; gap: 12px; justify-content: center; align-items: center; min-height: 34px; }
.x16 .x16-dots i { width: 22px; height: 22px; border-radius: 50%; border: 3px solid var(--sky-line); background: var(--white); transition: background .35s, border-color .35s, transform .3s; }
.x16 .x16-dots i.cur { border-color: var(--sky); transform: scale(1.15); }
.x16 .x16-dots i.on { background: var(--sky); border-color: var(--sky); }
.x16 .x16-body { display: flex; flex-direction: column; align-items: center; gap: clamp(12px, 2.6cqi, 24px); width: 100%; }
.x16 .x16-pic { width: min(clamp(150px, 38cqi, 320px), calc(var(--x5-h) - 140px)); aspect-ratio: 1; border-radius: 28px; overflow: hidden; border: 6px solid var(--white); box-shadow: 0 8px 0 var(--sky-line), 0 14px 30px var(--shade); }
.x16 .x16-tr { width: min(60cqi, calc(var(--x5-h) - 90px), 420px); aspect-ratio: 1; border-radius: 18px; background: repeating-linear-gradient(180deg, transparent 0 36px, #BFDDF2 36px 38px), #FFFDF7; box-shadow: 0 6px 16px var(--shade); }
.x16 .x16-tr .x5-tr { width: 100%; height: 100%; }
.x16 .x5-card.is-picked { box-shadow: 0 0 0 5px var(--sky), 0 12px 24px var(--shade); }
.x16 .x5-jb.is-picked { box-shadow: 0 0 0 6px var(--sky), 0 12px 24px var(--shade); }
.x16 .x5-card { --x5-reserve: 240px; }
.x16 .x5-jb { --x5-reserve: 300px; }`;

  function run(X, stage, ctx) {
    const h = BQ.h, L = X.L, S = X.session(ctx);
    if (!document.getElementById('st-x16')) document.head.append(h('style', { id: 'st-x16' }, CSS));
    X.prep([L.mmB, L.aa, L.touchPic, L.mm]);
    X.prepArt(['mouthM', 'mouthA', 'knock', 'water', 'compass']);
    const preview = !!BQ.state.el16Preview;
    const OUT = [
      { k: 't1', n: 'الناتج ١ · الاستماع (ت١): يميّز «مْـ» من «آ» ومن صوت شيء', redo: '«تدرّب» (العنصر ١٠) و«استمع وتعلّم» (العنصر ٣)' },
      { k: 't2', n: 'الناتج ٣ · تعرّف الرسم (ت٢): «م» وصورة الماء', redo: '«اقرأ» (العنصر ٧)' },
      { k: 't3', n: 'الناتج ٢ · النطق (ت٣): يقول «ماءْ» وأوّلها «مْـ»', redo: '«تحدّث» (العنصر ٥) مع «حركة مْـ»' },
      { k: 't4', n: 'الناتج ٥ · التفاعل (ت٤): «سَمِعْتُ فَرْقاً!» حين يختلف صوتان', redo: '«استمع وتعلّم» (العنصر ٣)' },
      { k: 't5', n: 'الناتج ٤ · الكتابة (ت٥): يتتبّع «م» من نقطة البدء', redo: '«اكتب» (العنصر ٨) والورقة المطبوعة' },
    ];
    const RES = { first: 'من أوّل مرّة', replay: 'بعد إعادة', none: 'لم يُجِب' };
    const rec = {};
    X.guide(ctx, {
      goal: 'يجيب بلا تلميح، في يوم لاحق، عن خمسة بنود بأشكال تدرّب عليها.',
      steps: ['ت١ اسمع والمس · ت٢ «م» وصورته · ت٣ قُل (أنت تحكم) · ت٤ صوتان وزرّا بارق · ت٥ تتبّع «م» بلا سهمين.', 'كلّ جواب يلوّن نقطة بنغمة محايدة — لا صواب ولا خطأ أمام الطفل.'],
      teacher: ['افتحه في يوم لاحق (بعد «تدرّب» بيوم). لا تلمّح؛ إعادة الصوت بزرّ الأذن مسموحة وتُسجَّل «بعد إعادة».', 'في ت٣ اضغط مطوّلاً على بارق الصغير في الزاوية واختر ما سمعت.', 'التقرير يظهر هنا في الدليل عند النهاية: ماذا تعيد قبل الدرس الثاني.'],
      icons: X.ICON_LEGEND,
    });
    const report = () => {
      const rows = OUT.map((o) => '<li><b>' + o.n + ':</b> ' + (rec[o.k] ? RES[rec[o.k]] : '—') + (rec[o.k] && rec[o.k] !== 'first' ? ' ← أعِد: ' + o.redo : '') + '</li>').join('');
      const e13 = X.rec('EL13').get(), e10 = X.rec('EL10').get();
      const P10 = { alone: 'وحده', help: 'بمساعدة', notyet: 'ليس بعد', none: 'لم يُلاحَظ' };
      const W10 = { mm: '«مْـ»', maa: '«ماءْ»', diff: '«سَمِعْتُ فَرْقاً!»' };
      const lesson = [];
      if (e13) lesson.push('«تدرّب»: ' + (e13.passed ? 'بلغ العتبة (٤ من ٥ من المحاولة الأولى)' : e13.passed === false ? 'لم يبلغ العتبة' + (e13.support ? ' — يحتاج دعماً' : '') : 'لم يكتمل'));
      if (e10 && e10.items) lesson.push('«تحدّث»: ' + e10.items.map((it) => W10[it.id] + ' ' + (it.picks.length ? P10[it.picks[it.picks.length - 1]] : '—')).join(' · '));
      const todo = OUT.filter((o) => rec[o.k] && rec[o.k] !== 'first').map((o) => o.redo);
      X.result(ctx, '<p class="goal"><b>تقرير «اختبر نفسك»' + (preview ? ' (معاينة مبكرة — قبل مرور يوم)' : '') + ':</b></p><ul class="do">' + rows + '</ul>' +
        (Object.keys(rec).length === 5 ? '<p class="age"><b>ماذا تعيد قبل الدرس الثاني:</b> ' + (todo.length ? [...new Set(todo)].join(' · ') : 'لا شيء — أتقن الطفل البنود الخمسة من أوّل مرّة.') + '</p>' : '') +
        (lesson.length ? '<p class="meta"><b>من الدرس نفسه:</b> ' + lesson.join(' — ') + '</p>' : ''));
    };
    report();

    const root = X.root(stage, 'x16');
    const dotsEl = h('div.x16-dots', { 'aria-hidden': 'true' }, Array.from({ length: 5 }, () => h('i')));
    const dots = [...dotsEl.children];
    const body = h('div.x16-body');
    root.append(dotsEl, body);
    let replay = null, busy = false, replays = 0;
    ctx.onReplay(async () => { if (busy || !replay) return; busy = true; replays++; await replay(); busy = false; });
    const ear = (fn) => X.earBtn(async () => { if (busy) return; busy = true; replays++; await fn(); busy = false; });
    const mark = (i, k, res) => {
      rec[k] = res; dots[i].classList.remove('cur'); dots[i].classList.add('on');
      BQ.audio.fx(L.ding, 0.45); report(); X.rec(ID).set({ items: rec, preview });
    };
    const cur = (i) => dots.forEach((d, j) => d.classList.toggle('cur', j === i));

    /** بند صور بمحاولة واحدة — لا صواب ولا خطأ أمام الطفل */
    function pick1(items, correct, prompt, stimFn, top) {
      return new Promise((resolve) => {
        body.replaceChildren();
        if (top) body.append(top);
        replays = 0;
        replay = prompt;
        const row = h('div.x5-row'); body.append(row);
        row.append(ear(stimFn));
        const host = h('div'); body.append(host);
        const C = X.cards(host, BQ.shuffle(items), { onPick: (it, b) => { C.lock(); b.classList.add('is-picked'); S.later(() => resolve(it.key === correct ? (replays ? 'replay' : 'first') : 'none'), 700); } });
        C.lock();
        (async () => { busy = true; await S.sleep(300); await prompt(); busy = false; C.lock(false); })();
      });
    }

    (async () => {
      // ت١
      cur(0); ctx.instruction(X.lineText(L.where));
      mark(0, 't1', await pick1([{ key: 'mouthM', aria: 'فَمٌ مُطْبَقٌ' }, { key: 'mouthA', aria: 'فَمٌ مَفْتوحٌ' }, { key: 'knock', aria: 'يَدٌ تَطْرُقُ' }], 'mouthM',
        async () => { await S.say(L.where); await S.stim(L.mmB); }, () => S.stim(L.mmB)));
      await S.sleep(300);
      // ت٢
      cur(1); ctx.instruction(X.lineText(L.touchPic));
      mark(1, 't2', await pick1([{ key: 'water', aria: 'ماءْ' }, { key: 'knock', aria: 'يَدٌ تَطْرُقُ' }, { key: 'compass', aria: 'بَوْصَلَةٌ' }], 'water',
        () => S.say(L.touchPic), () => S.say(L.touchPic), h('span.x5-m', null, 'م')));
      await S.sleep(300);
      // ت٣ قُل — المعلّم يحكم
      cur(2); ctx.instruction(X.lineText(L.whatIs));
      body.replaceChildren(h('div.x16-pic.x5-in', null, X.pic('water')));
      replay = () => S.say(L.whatIs);
      const tc = X.teacher(ctx, {});
      busy = true; await S.sleep(300); await S.say(L.whatIs); busy = false;
      tc.wait(true);
      let skipRes; const skipP = new Promise((r) => { skipRes = r; });
      const sk = X.skipAfter(S, body, 12000, () => skipRes('none'));
      const p3 = await S.gate(Promise.race([tc.ask(), skipP]));
      sk.cancel(); tc.remove();
      mark(2, 't3', p3 === 'alone' ? 'first' : p3 === 'help' ? 'replay' : 'none');
      await S.sleep(300);
      // ت٤ صوتان + زرّا بارق
      cur(3); ctx.instruction(X.lineText(L.same));
      body.replaceChildren();
      replays = 0;
      const pair = [L.mm, L.aa];
      const P = X.player(body, async () => { if (busy) return; busy = true; replays++; await P.play(S, pair); busy = false; });
      let res4;
      const p4 = new Promise((r) => { res4 = r; });
      const J = X.judge(body, { onPick: (id, b) => { J.lock(); b.classList.add('is-picked'); S.later(() => res4(id === 'diff' ? (replays ? 'replay' : 'first') : 'none'), 700); } });
      J.lock();
      replay = async () => { await S.say(L.same); await P.play(S, pair); };
      busy = true; await S.sleep(300); await P.play(S, pair); await S.say(L.same); busy = false; J.lock(false);
      mark(3, 't4', await S.gate(p4));
      await S.sleep(300);
      // ت٥ تتبّع بلا سهمين — مرّة
      cur(4); ctx.instruction('');
      body.replaceChildren();
      const box = h('div.x16-tr'); body.append(box);
      const hum = X.hum(S, L.mm);
      let teacherDone = false;
      const T = X.trace(box, { arrows: false, hum });
      const tc5 = X.teacher(ctx, { icons: ['done'], onPick: () => { teacherDone = true; T.fill(); } });
      replay = null;
      const out5 = await S.gate(T.done);
      tc5.remove();
      mark(4, 't5', teacherDone ? 'none' : out5.stumbles ? 'replay' : 'first');
      await S.sleep(500);
      body.replaceChildren();
      ctx.done();
      const tool = ctx.frame.querySelector('.elp-tool[aria-label="دليل المعلّم"]'); if (tool) X.anim(tool, 'fx-pulse', 2600);
      X.finish(S, ctx, { pose: 'wave' });
    })();
    X.phNote(ctx, ['mouthM', 'mouthA', 'knock', 'water', 'compass']);
  }

  BQ.register(ID, {
    hero: 'img-109',
    render(stage, ctx) {
      need().then((X) => { if (ctx.alive()) run(X, stage, ctx); })
        .catch(() => stage.append(BQ.h('p.bq-missing', null, 'تعذّر تحميل النشاط. جرّب «من البداية».')));
    },
  });
})();

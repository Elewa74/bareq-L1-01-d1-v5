/* EL13 · تدرّب ✅ — v5 #١٠ · تفاعلي · أجرّب وحدي · العنصر المرصود الوحيد (الناتج ١ — ق٥-١)
   التجربة الأساسية: محطّة «listen» في لعبة Godot (BQ.ui.godotRender) — وهذه النسخة HTML بديلها الآليّ.
   الهدف الواحد: يميّز «مْـ» حين يسمعه من صوت كلامي آخر ومن أصوات الأشياء: يلمس صورته من ثلاث، في ٤ جولات من ٥ من المحاولة الأولى.
   ٢ تجربة بارق (غير محتسبة، صوت شيء لا كلام حتى لا تعلّم اختصاراً): «أَيْنَ هَذا الصَّوْتُ؟» + طق طق ← يد بارق تلمس اليد التي تطرق.
   الجولات: ج١ «مْـ» ← [فم مطبق ✓ · فم مفتوح · يد تطرق] · ج٢ «ماءْ» ← [ماء ✓ · فم مفتوح · بوصلة] · ج٣ «آ» ← [فم مطبق · فم مفتوح ✓ · بوصلة]
           · ج٤ طق طق ← [يد تطرق ✓ · فم مطبق · ماء] · ج٥ «مْـ» بتسجيل ثانٍ ← [فم مطبق ✓ · فم مفتوح · بوصلة]
   (أربع جولات من خمس فيها مشتِّت كلامي «آ» بفم مفتوح، ولا جولة يُسمَع فيها «مْـ» والماء بين الخيارات).
   تغذية v6 (PLAN_v6: القياس محايد بلا تلميح يكشف الجواب، كمحطّة Godot st6_listen): خطأ ١ ← «هَيّا، أَصْغِ مَرَّةً أُخْرى!» ويُعاد الصوت
   · خطأ ٢ ← تنتهي الجولة بهدوء (تخفت الصور كلّها، بلا توهّج للصواب ولا «أَصْغِ: هَذا، وَهَذا.») وتُسجَّل «لم يُصِب».
   الخرزة تضيء لكلّ جولة (تقدّم لا درجة): ساطعة من المحاولة الأولى وناعمة لغيرها. العتبة ٤/٥ من المحاولة الأولى؛ أقلّ منها ← إعادة واحدة بتسجيلات ثانية ثم ملاحظة دعم في دليل المعلّم.
   النهاية: الخرزات الخمس مضاءة وبارق يصفّق «أَحْسَنْتَ! أَصْغَيْتَ جَيِّداً!» — لا رقم أمام الطفل؛ النتيجة في دليل المعلّم (ix5-EL13). */
(function () {
  'use strict';
  const ID = 'EL13';
  const need = () => (BQ.ix5 ? Promise.resolve(BQ.ix5) : (window.__ix5p = window.__ix5p || new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = 'js/el/ix5.js';
    s.onload = () => (BQ.ix5 ? res(BQ.ix5) : rej(new Error('ix5'))); s.onerror = () => { window.__ix5p = null; rej(new Error('ix5')); };
    document.head.append(s);
  })));
  need().catch(() => {});

  const CSS = `
.x13 .x13-head { display: flex; align-items: center; justify-content: center; gap: clamp(14px, 4cqi, 36px); }
.x13 .x13-comp { position: relative; width: clamp(92px, 15cqi, 130px); aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle at 50% 50%, #FFF8E6 0 52%, #E9C27A 53% 62%, #B98532 63% 100%); box-shadow: 0 8px 18px var(--shade), inset 0 2px 4px rgba(255,255,255,.6); }
.x13 .x13-comp::before { content: ''; position: absolute; left: 50%; top: 50%; width: 8%; height: 40%; margin: -38% 0 0 -4%; background: linear-gradient(180deg, var(--coral) 0 50%, #5A6B7B 50% 100%); clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%); transform-origin: 50% 95%; animation: x13Needle 6s ease-in-out infinite; }
@keyframes x13Needle { 0%, 100% { transform: rotate(-12deg); } 50% { transform: rotate(14deg); } }
.x13 .x13-comp i { position: absolute; width: 17%; height: 17%; margin: -8.5% 0 0 -8.5%; border-radius: 50%; background: #7A5216; box-shadow: inset 0 2px 3px rgba(0,0,0,.35); transition: background .4s, box-shadow .4s, transform .3s; }
.x13 .x13-comp i.on { background: radial-gradient(circle at 35% 35%, #FFF6C4, var(--sun)); box-shadow: 0 0 10px var(--sun); transform: scale(1.15); }
.x13 .x13-comp i.on.soft { background: radial-gradient(circle at 35% 35%, #FFF6DD, #E9C27A); box-shadow: none; transform: none; }
.x13 .x13-win { display: flex; align-items: flex-end; justify-content: center; gap: clamp(8px, 3cqi, 30px); padding: 12px 18px 0; border-radius: 28px; background: linear-gradient(180deg, #FFF8E6, #FFE9B8); box-shadow: 0 10px 26px var(--shade); animation: x5In .35s ease-out both; }
.x13 .x13-win img.maj { height: min(30cqi, calc(var(--x5-h) - 360px), 230px); min-height: 90px; display: block; }
.x13 .x13-win .bq-brq { width: min(20cqi, calc(var(--x5-h) - 420px), 150px); min-width: 70px; display: block; }
.x13 .x13-win .bq-brq img { width: 100%; display: block; }
.x13 .x5-card { --x5-reserve: 250px; }
@media (prefers-reduced-motion: reduce) { .x13 .x13-comp::before { animation: none; } }`;

  function htmlRender(stage, ctx) {
    need().then((X) => { if (ctx.alive()) run(X, stage, ctx); })
      .catch(() => stage.append(BQ.h('p.bq-missing', null, 'تعذّر تحميل النشاط. جرّب «من البداية».')));
  }

  function run(X, stage, ctx) {
    const h = BQ.h, L = X.L, S = X.session(ctx);
    if (!document.getElementById('st-x13')) document.head.append(h('style', { id: 'st-x13' }, CSS));
    const SND = { mouthM: L.mm, mouthA: L.aa, knock: L.knock, water: L.maa, compass: L.click };
    const ARIA = { mouthM: 'فَمٌ مُطْبَقٌ', mouthA: 'فَمٌ مَفْتوحٌ', knock: 'يَدٌ تَطْرُقُ', water: 'ماءْ', compass: 'بَوْصَلَةٌ' };
    const R = (stim, correct, keys, m) => ({ stim, correct, keys, m: !!m });
    const PASS1 = [
      R(L.mm, 'mouthM', ['mouthM', 'mouthA', 'knock'], true),
      R(L.maa, 'water', ['water', 'mouthA', 'compass']),
      R(L.aa, 'mouthA', ['mouthM', 'mouthA', 'compass']),
      R(L.knock, 'knock', ['knock', 'mouthM', 'water']),
      R(L.mmB, 'mouthM', ['mouthM', 'mouthA', 'compass'], true),
    ];
    // الإعادة الواحدة: الجولات نفسها بتسجيلات ثانية
    const PASS2 = [
      R(L.mmB, 'mouthM', ['mouthM', 'mouthA', 'knock'], true),
      R(L.maaB, 'water', ['water', 'mouthA', 'compass']),
      R(L.aaB, 'mouthA', ['mouthM', 'mouthA', 'compass']),
      R(L.knockB, 'knock', ['knock', 'mouthM', 'water']),
      R(L.mm, 'mouthM', ['mouthM', 'mouthA', 'compass'], true),
    ];
    X.prep([L.mm, L.mmB, L.aa, L.aaB, L.listenAgain, L.wellDone]);
    X.prepArt(['mouthM', 'mouthA', 'knock', 'water', 'compass']);
    const NAMES = ['«مْـ»', '«ماءْ»', '«آ»', 'طق طق', '«مْـ» (تسجيل ثانٍ)'];
    const RES = { first: 'من المحاولة الأولى', second: 'بعد محاولة ثانية', missed: 'لم يُصِب (انتهت الجولة بلا كشف)', shown: 'لم يُصِب' };
    const rec = { pass1: [], pass2: null, passed: null, support: false };
    X.guide(ctx, {
      goal: 'يميّز «مْـ» حين يسمعه من صوت كلامي آخر («آ» بفم مفتوح) ومن أصوات الأشياء: يلمس صورته من ثلاث — العتبة ٤ من ٥ من المحاولة الأولى.',
      steps: ['بارق يلعب جولة تجريبية بصوت شيء (طرق ← اليد) — غير محتسبة.', 'خمس جولات: «مْـ» · «ماءْ» · «آ» · طق طق · «مْـ» بتسجيل ثانٍ — أربع منها فيها مشتِّت كلامي (فم مفتوح «آ»).', 'خرزات البوصلة تضيء جولةً جولة — تقدّم لا درجة؛ لا رقم أمام الطفل.'],
      teacher: ['هذا النشاط المرصود الوحيد في الدرس: دع الطفل يجيب وحده، ولا تلمّح بالكلام أو الإشارة.', 'زرّ الأذن يعيد الصوت متى شاء الطفل (الإعادة لا تُحتسب خطأ).', 'النتيجة تظهر هنا في الدليل عند النهاية، وتُحفظ لتقرير «اختبر نفسك».'],
      fb: 'قياس محايد بلا تلميح يكشف الجواب · خطأ أوّل: «هَيّا، أَصْغِ مَرَّةً أُخْرى!» ويُعاد الصوت · خطأ ثانٍ: تنتهي الجولة بهدوء بلا كشف للصواب · تُحتسب المحاولة الأولى وحدها · أقلّ من ٤/٥: إعادة واحدة بتسجيلات ثانية.',
      note: 'موضع توقّف مقترح بعد هذا العنصر (دليل المعلّم).',
    });
    const firstOf = (a) => a.filter((r) => r === 'first').length;
    const showRes = () => {
      const p1 = rec.pass1.map((r, i) => X.AR(i + 1) + '. ' + NAMES[i] + ': ' + RES[r]).join('<br>');
      const p2 = rec.pass2 ? '<br><b>الإعادة بتسجيلات ثانية:</b> ' + X.AR(firstOf(rec.pass2)) + ' من ' + X.AR(rec.pass2.length || 5) + ' من المحاولة الأولى' : '';
      const verdict = rec.passed == null ? '' : rec.passed
        ? (rec.pass2 ? '<p class="goal"><b>بلغ العتبة في الإعادة</b> بتسجيلات ثانية (لم يبلغها في الجولات الخمس الأولى) — راقبه في «اختبر نفسك».</p>'
          : '<p class="goal"><b>بلغ العتبة:</b> يميّز «مْـ» من «آ» ومن أصوات الأشياء (٤ من ٥ أو أكثر من المحاولة الأولى).</p>')
        : '<p class="goal"><b>لم يبلغ العتبة بعد.</b> ' + (rec.support ? 'يحتاج دعماً: أعِد معه «استمع وتعلّم» و«فمي مغلق» و«تحدّث» مرّة قصيرة، ثم «تدرّب» في يوم لاحق.' : '') + '</p>';
      X.result(ctx, verdict + '<p><b>نتيجة «تدرّب» (المرصود):</b> ' + X.AR(firstOf(rec.pass1)) + ' من ٥ من المحاولة الأولى<br>' + p1 + p2 + '</p>');
    };

    const root = X.root(stage, 'x13');
    const comp = h('div.x13-comp', { 'aria-hidden': 'true' });
    const beads = Array.from({ length: 5 }, (_, i) => { const a = (-90 + (i - 2) * 34) * Math.PI / 180; const b = h('i'); b.style.left = (50 + 41 * Math.cos(a)) + '%'; b.style.top = (50 + 41 * Math.sin(a)) + '%'; return b; });
    comp.append(...beads);
    let stim = null, busy = true;
    const ear = X.earBtn(async () => { if (busy || !stim) return; busy = true; await S.stim(stim); busy = false; });
    const head = h('div.x13-head', null, ear, comp);
    const body = h('div');
    root.append(head, body);
    const bead = (i, soft) => { if (beads[i]) { beads[i].classList.add('on'); beads[i].classList.toggle('soft', !!soft); BQ.audio.fx(L.bead, soft ? 0.25 : 0.5); } };
    const beadsReset = () => beads.forEach((b) => b.classList.remove('on', 'soft'));
    ctx.instruction(X.lineText(L.where));
    ctx.onReplay(async () => { if (busy || !stim) return; busy = true; await S.say(L.where); await S.stim(stim); busy = false; });

    async function demo() {
      ear.hidden = true;
      body.replaceChildren(h('div.x13-win', null, h('img.maj', { src: BQ.char.MAJ, alt: '', draggable: 'false' }), BQ.ui.brq('wave')));
      S.fx(L.tune, 0.6);
      await S.sleep(2200);
      body.replaceChildren();
      ear.hidden = false;
      stim = L.knock;
      let C = null, open;
      const gateP = new Promise((r) => { open = r; });
      const host = h('div'); body.append(host);
      const p = X.pickRound(S, host, { items: ['knock', 'compass', 'water'].map((k) => ({ key: k, aria: ARIA[k] })), correct: 'knock', shuffle: false, onCards: (c) => { C = c; }, prompt: () => gateP });
      await S.say(L.where); await S.sfx(L.knock); await S.sleep(400);
      open(); await S.sleep(30);
      // يد بارق تلمس اليد التي تطرق (لمسة حقيقية على البطاقة)
      await X.ghostTap(S, X.playArea(ctx), C.byKey('knock'), { onTap: async () => { C.byKey('knock').click(); } });
      await S.gate(p);
      await S.say(L.yes);
      await S.sleep(400);
      body.replaceChildren();
      stim = null;
      await X.goBtn(body);
    }

    async function round(r) {
      body.replaceChildren();
      const host = h('div'); body.append(host);
      stim = r.stim;
      const out = await X.pickRound(S, host, {
        items: r.keys.map((k) => ({ key: k, aria: ARIA[k] })), correct: r.correct,
        prompt: async () => { busy = true; await S.sleep(250); await S.say(L.where); await S.stim(r.stim); busy = false; },
        onRight: async () => { await S.say(L.yes); },
        reveal: false, // v6: محايد — لا يتوهّج الصواب بعد الخطأ الثاني
        onWrong1: async () => { busy = true; await S.say(L.listenAgain); await S.stim(r.stim); busy = false; },
        onWrong2: async () => { busy = true; await S.sleep(350); busy = false; },
      });
      busy = true;
      return out.res;
    }

    async function pass(list, store) {
      beadsReset();
      for (let i = 0; i < list.length; i++) {
        const res = await round(list[i]);
        store.push(res);
        bead(i, res !== 'first'); showRes(); X.rec(ID).set(rec);
        await S.sleep(450);
      }
      return firstOf(store);
    }

    (async () => {
      await demo();
      const n1 = await pass(PASS1, rec.pass1);
      rec.passed = n1 >= 4;
      if (!rec.passed) {
        body.replaceChildren(); stim = null;
        await X.bariq(S, stage, L.listenAgain, { mood: 'think' });
        rec.pass2 = [];
        const n2 = await pass(PASS2, rec.pass2);
        rec.passed = n2 >= 4; rec.support = !rec.passed;
      }
      showRes(); X.rec(ID).set(rec);
      body.replaceChildren(); stim = null; ear.hidden = true;
      beads.forEach((b) => b.classList.add('on'));
      ctx.done();
      try { window.dispatchEvent(new CustomEvent('bq:result', { detail: { id: ID, passed: rec.passed, first_try: firstOf(rec.pass1), rounds: 5, support: rec.support } })); } catch (e) { /* */ }
      X.finish(S, ctx, { pose: 'clap', line: L.wellDone });
    })();
    X.phNote(ctx, ['mouthM', 'mouthA', 'knock', 'water', 'compass']);
  }

  BQ.register(ID, { hero: 'img-019', render: htmlRender });
  // Godot أوّلاً (محطّة listen، النتيجة تصل إلى الصفحة عبر godot.js) والنسخة HTML بديل آليّ — سلك وكيل Godot كما هو
  if (BQ.ui && BQ.ui.godotRender) {
    BQ.defs[ID].render = BQ.ui.godotRender('listen', htmlRender, {
      name: 'تدرّب', title: 'تدرّب',
      after(c, result, st) {
        try { BQ.store.set('ix5-' + ID, Object.assign({ t: Date.now(), godot: true }, result || {})); } catch (e) { /* */ }
        need().then((X) => X.finish(X.session(c), c, { pose: 'clap', line: X.L.wellDone })).catch(() => BQ.ui.endCard(st || c.stage, { onReplay: () => BQ.open(ID, { skipCover: true, history: 'replace' }) }));
      },
    });
  }
})();

/* EL12 · اكتب — v5 #٨ · تفاعلي · نجرّب معاً · غير مرصود (إتمام لا إتقان)
   التجربة الأساسية: محطّة «write» في لعبة Godot (BQ.ui.godotRender) — وهذه النسخة HTML بديلها الآليّ (بلا WebGL أو إن تعذّر التحميل).
   الهدف الواحد: يتتبّع «م» المنفصلة بإصبعه من نقطة البدء في الاتّجاه الصحيح، مرّتين.
   ١ النموذج (≈ ٥ ث): القلم يرسم «م» بحركة واحدة وسهمَي اتّجاه — سيف «مْـ» ممدودة ← ٢ التتبّع الأوّل: نقطة بدء خضراء تنبض والسهمان ظاهران،
   «مْـ» ممدودة ما دام الإصبع يتحرّك ← ٣ مرّة ثانية: سهمان أخفّ والحرف الأوّل ممتلئ بجانبه؛ عند الإكمال «نَعَمْ! هَذا هُوَ!» ← ٤ الحرفان ممتلئان وبارق يصفّق.
   تغذية: البدء من غير النقطة ← النقطة تنبض · الخروج عن الطريق ← يتوقّف الحبر وتلمع النقطة التالية · بعد تعثّرين ← يد الإرشاد ترسم ثم يعيد — لا صوت خطأ.
   لا زرّ «اطبع» على شاشة الطفل (الورقة في دليل المعلّم) · لا أرقام «١ ٢» (ق-٢: حركة واحدة). المعلّم: ضغط مطوَّل على بارق الصغير ← ✓ يتمّ التتبّع «بمساعدة». */
(function () {
  'use strict';
  const ID = 'EL12';
  const need = () => (BQ.ix5 ? Promise.resolve(BQ.ix5) : (window.__ix5p = window.__ix5p || new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = 'js/el/ix5.js';
    s.onload = () => (BQ.ix5 ? res(BQ.ix5) : rej(new Error('ix5'))); s.onerror = () => { window.__ix5p = null; rej(new Error('ix5')); };
    document.head.append(s);
  })));
  need().catch(() => {});

  const CSS = `
.x12 { justify-content: center; }
.x12 .x12-desk { width: 100%; max-width: 1100px; padding: clamp(8px, 1.6cqi, 16px); border-radius: 26px; background: linear-gradient(180deg, #C98E58, #A86C38); box-shadow: inset 0 2px 0 rgba(255,255,255,.25), 0 10px 26px var(--shade); box-sizing: border-box; }
.x12 .x12-paper { position: relative; display: flex; justify-content: center; align-items: center; gap: clamp(8px, 4cqi, 48px); padding: clamp(8px, 2cqi, 22px) clamp(10px, 3cqi, 30px); border-radius: 16px;
  background: repeating-linear-gradient(180deg, transparent 0 calc(var(--lh, 38px) - 2px), #BFDDF2 calc(var(--lh, 38px) - 2px) var(--lh, 38px)), linear-gradient(90deg, transparent 0 34px, #F4B6AE 34px 36px, transparent 36px), #FFFDF7; box-shadow: 0 4px 12px rgba(0,0,0,.15); }
.x12 .x12-cell { --c: min(42cqi, calc(var(--x5-h) - 70px), 430px); width: var(--c); height: var(--c); position: relative; border-radius: 18px; transition: background .3s; }
.x12 .x12-cell.is-act { background: rgba(255, 229, 138, .22); box-shadow: 0 0 0 3px rgba(254, 186, 2, .5); }
.x12 .x12-cell .x5-tr { width: 100%; height: 100%; }
@container stage (max-width: 560px) { .x12 .x12-paper { flex-direction: column; } .x12 .x12-cell { --c: min(80cqi, calc((var(--x5-h) - 70px) / 2)); } }`;

  function htmlRender(stage, ctx) {
    need().then((X) => { if (ctx.alive()) run(X, stage, ctx); })
      .catch(() => stage.append(BQ.h('p.bq-missing', null, 'تعذّر تحميل النشاط. جرّب «من البداية».')));
  }

  function run(X, stage, ctx) {
    const h = BQ.h, L = X.L, S = X.session(ctx);
    if (!document.getElementById('st-x12')) document.head.append(h('style', { id: 'st-x12' }, CSS));
    X.prep([L.mm]);
    const rec = { traces: [], assisted: 0, guided: 0 };
    X.guide(ctx, {
      goal: 'يتتبّع «م» المنفصلة بإصبعه من نقطة البدء في الاتّجاه الصحيح، مرّتين.',
      steps: ['النموذج: القلم يرسم «م» بحركة واحدة (من نقطة الالتقاء أسفل يسار الرأس صعوداً، دورة، ثم الذيل نازلاً) وسهمان للاتّجاه.', 'التتبّع الأوّل من النقطة الخضراء والسهمان ظاهران — «مْـ» ممدودة ما دام الإصبع يتحرّك.', 'مرّة ثانية بسهمين أخفّ، والحرف الأوّل ممتلئ بجانبه.'],
      teacher: ['اجلس بجانب الطفل؛ إن تعثّر مرّتين رسمت يد الإرشاد الحرف ثم أعاد هو.', 'إن احتاج إتمام التتبّع: اضغط مطوّلاً على بارق الصغير في الزاوية ثم ✓ (يُسجَّل «بمساعدة»).', 'ورقة «م» المطبوعة في دليلك (الصفحة المستقلّة) — لا زرّ طباعة على شاشة الطفل.'],
      fb: 'لا صوت خطأ: البدء من غير النقطة ← النقطة تنبض · الخروج عن الطريق ← يتوقّف الحبر وتلمع النقطة التالية · بعد تعثّرين ← يد الإرشاد ترسم ثم يعيد. غير مرصود.',
    });
    const showRes = () => X.result(ctx, '<p class="goal"><b>ما جرى (غير مرصود):</b> تتبّعات مكتملة: ' + X.AR(rec.traces.length) + ' من ٢' + (rec.guided ? ' · رسمت يد الإرشاد: ' + X.AR(rec.guided) + ' مرّة' : '') + (rec.assisted ? ' · أتمّه المعلّم: ' + X.AR(rec.assisted) : '') + '</p>');

    const root = X.root(stage, 'x12');
    const paper = h('div.x12-paper');
    root.append(h('div.x12-desk', null, paper));
    const cells = [h('div.x12-cell'), h('div.x12-cell')];
    paper.append(...cells);
    const hum = X.hum(S, L.mm);
    let cur = null;
    const tc = X.teacher(ctx, { icons: ['done'], onPick: () => { if (cur) { rec.assisted++; cur.fill(); } } });
    ctx.instruction('');
    let demoing = false;
    const demo = async (T) => {
      demoing = true;
      const iv = setInterval(() => hum.on(), 120);
      await T.demo(S, 2800);
      clearInterval(iv); hum.off();
      await S.sleep(450); T.clearDemo(); demoing = false;
    };
    ctx.onReplay(async () => { if (cur && !demoing) await demo(cur); });

    async function traceIn(i, arrows) {
      cells.forEach((c, k) => c.classList.toggle('is-act', k === i));
      cells[i].replaceChildren();
      const T = X.trace(cells[i], { arrows, hum, onStumble: async (n) => {
        if (n < 2 || demoing) return;
        rec.guided++; showRes();
        await demo(T); T.reset();
      } });
      cur = T;
      return T;
    }

    (async () => {
      await S.sleep(300);
      // ١ النموذج
      const T1 = await traceIn(0, true);
      await demo(T1);
      // ٢ التتبّع الأوّل
      await S.gate(T1.done);
      rec.traces.push(1); showRes(); S.fx(L.ding, 0.45);
      await S.sleep(600);
      // ٣ مرّة ثانية: سهمان أخفّ والحرف الأوّل ممتلئ بجانبه
      const T2 = await traceIn(1, 'faint');
      await S.gate(T2.done);
      rec.traces.push(2); showRes();
      cells.forEach((c) => c.classList.remove('is-act'));
      cur = null;
      await S.say(L.yes);
      // ٤ اكتمل
      tc.remove();
      ctx.done();
      X.rec(ID).set(rec);
      X.finish(S, ctx, { pose: 'clap' });
    })();
  }

  BQ.register(ID, {
    hero: 'img-013',
    render: htmlRender,
  });
  // Godot أوّلاً (محطّة write) والنسخة HTML بديل آليّ — سلك وكيل Godot كما هو
  if (BQ.ui && BQ.ui.godotRender) {
    BQ.defs[ID].render = BQ.ui.godotRender('write', htmlRender, {
      name: 'اكتب', title: 'اكتب',
      after(c, result, st) { c.done(); need().then((X) => X.finish(X.session(c), c, { pose: 'clap' })).catch(() => BQ.ui.endCard(st || c.stage, { onReplay: () => BQ.open(ID, { skipCover: true, history: 'replace' }) })); },
    });
  }
})();

/* EL08 · فكّر وأجب — v5 #١٣ · تفاعلي · نجرّب معاً · غير مرصود
   الهدف الواحد: يجيب عن ثلاثة أسئلة «كيف عرفنا؟» بالصور، ثم يتحقّق بالدليل أو بالتجربة.
   س١ من أين التقطير؟ [الصحن تحت الإبريق · النافذة · الباب] — حبيبة «أَيْنَ هَذا الصَّوْتُ؟» + تك…
      الدليل (بعد أيّ جواب): قطرة تسقط من قاع الإبريق في الصحن (والنافذة كانت جافّة) — بارق «الماءُ هُنا، في الصَّحْنِ!»
   س٢ أيّ فم يقول مْـ؟ [فم سيف مطبق · فم سيف مفتوح] — «أَيُّ فَمٍ يَقولُ: مْـ؟» · «جَرِّبْ أَنْتَ بِفَمِكَ.» — الدليل: سيف «مْـ… مْـ… فَمي مُغْلَقٌ هَكَذا!»
   س٣ من أين يخرج مْـ؟ [سيف وإصبعه على أنفه · فم سيف مفتوح] — «مِنْ أَيْنَ يَخْرُجُ مْـ؟»
      التجربة دليلاً: سيف يمسك أنفه فينقطع «مْـ» ثم يعود — «أَمْسِكْ أَنْفَكَ وَقُلْ: مْـ.»
   تغذية: صواب = إطار أخضر + «نَعَمْ! هَذا هُوَ!» · خطأ ١ = «جَرِّبْ مَرَّةً أُخْرى.» · بعد الصواب أو المحاولة الثانية: الدليل دائماً. */
(function () {
  'use strict';
  const ID = 'EL08';
  const need = () => (BQ.ix5 ? Promise.resolve(BQ.ix5) : (window.__ix5p = window.__ix5p || new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = 'js/el/ix5.js';
    s.onload = () => (BQ.ix5 ? res(BQ.ix5) : rej(new Error('ix5'))); s.onerror = () => { window.__ix5p = null; rej(new Error('ix5')); };
    document.head.append(s);
  })));
  need().catch(() => {});

  const CSS = `
.x8 .x8-ev { position: relative; width: min(clamp(200px, 50cqi, 440px), calc(var(--x5-h) - 60px)); aspect-ratio: 1; border-radius: 30px; overflow: hidden; border: 7px solid var(--white); box-shadow: 0 10px 0 var(--sky-line), 0 18px 36px var(--shade); animation: x5In .35s ease-out both; }
.x8 .x8-ev.wide { aspect-ratio: 4 / 3; width: min(clamp(220px, 60cqi, 560px), calc((var(--x5-h) - 60px) * 4 / 3)); }
.x8 .x8-drop { position: absolute; left: 33%; top: 18%; width: 5.5%; aspect-ratio: .7; background: radial-gradient(circle at 40% 35%, #fff, #7FD0F5 60%, #2FA3DC); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; box-shadow: 0 0 8px rgba(255,255,255,.8); animation: x8Drop 1.1s ease-in infinite; }
@keyframes x8Drop { 0% { transform: translateY(0) scale(.6); opacity: 0; } 15% { opacity: 1; transform: translateY(0) scale(1); } 85% { opacity: 1; } 100% { transform: translateY(330%); opacity: 0; } }
.x8 .x8-ring { position: absolute; left: 30%; top: 64%; width: 12%; aspect-ratio: 3; border: 3px solid rgba(255,255,255,.9); border-radius: 50%; opacity: 0; animation: x8Ring 1.1s ease-out infinite; animation-delay: .9s; }
@keyframes x8Ring { 0% { transform: scale(.3); opacity: .9; } 100% { transform: scale(1.8); opacity: 0; } }
.x8 .x8-cut { position: absolute; inset-inline-start: 6%; top: 6%; width: 22%; aspect-ratio: 1; border-radius: 50%; background: rgba(255,255,255,.92); display: grid; place-items: center; box-shadow: 0 4px 12px var(--shade); transition: opacity .2s; }
.x8 .x8-cut svg { width: 70%; height: 70%; }
.x8 .x8-cut.is-off { opacity: .25; }
.x8 .x5-card { --x5-reserve: 120px; }
@media (prefers-reduced-motion: reduce) { .x8 .x8-drop, .x8 .x8-ring { animation: none; } }`;

  function run(X, stage, ctx) {
    const h = BQ.h, L = X.L, S = X.session(ctx);
    if (!document.getElementById('st-x8')) document.head.append(h('style', { id: 'st-x8' }, CSS));
    X.prep([L.whichMouth, L.tryMouth, L.fromWhere, L.holdNose, L.mouthClosed, L.mm]);
    X.prepArt(['dishJug', 'window', 'door', 'drip', 'mouthM', 'mouthA', 'nose']);
    const RES = { first: 'من أوّل مرّة', second: 'بعد محاولة ثانية', shown: 'رأى الدليل بعد محاولتين' };
    const QN = ['من أين التقطير؟', 'أيّ فم يقول «مْـ»؟', 'من أين يخرج «مْـ»؟'];
    const rec = [];
    X.guide(ctx, {
      goal: 'يجيب عن ثلاثة أسئلة «كيف عرفنا؟» بالصور، ثم يتحقّق بالدليل أو بالتجربة.',
      steps: ['س١ من أين التقطير؟ — الصحن تحت الإبريق · النافذة (خطأ بارق في المقطع) · الباب؛ ثم الدليل: قطرة تسقط من قاع الإبريق في الصحن.', 'س٢ أيّ فم يقول «مْـ»؟ — يجرّب الطفل بفمه أوّلاً ثم يلمس.', 'س٣ من أين يخرج «مْـ»؟ — ثم التجربة: يمسك أنفه ويقول «مْـ» فينقطع الصوت.'],
      teacher: ['اطلب من الطفل أن يجرّب بفمه قبل اللمس، وجرّب معه «حركة مْـ» (إصبع على جانب الأنف).', 'في التجربة الأخيرة أمسك أنفك معه: ينقطع «مْـ» ثم يعود حين تتركه.'],
      fb: 'صواب: إطار أخضر + «نَعَمْ! هَذا هُوَ!» · خطأ أوّل: «جَرِّبْ مَرَّةً أُخْرى.» · بعد الصواب أو المحاولة الثانية: الدليل دائماً — غير مرصود.',
    });
    const showRes = () => X.result(ctx, '<p class="goal"><b>ما جرى (غير مرصود):</b><br>' + rec.map((r, i) => QN[i] + ' ' + RES[r]).join('<br>') + '</p>');

    const root = X.root(stage, 'x8');
    let replay = null, busy = false;
    ctx.onReplay(async () => { if (busy || !replay) return; busy = true; await replay(); busy = false; });

    async function ask(q) {
      ctx.instruction(X.lineText(q.line));
      const host = h('div');
      root.replaceChildren(host);
      replay = q.prompt;
      const out = await X.pickRound(S, host, {
        items: q.items, correct: q.correct,
        prompt: async () => { busy = true; await S.sleep(350); await q.prompt(); busy = false; },
        onRight: async () => { await S.say(L.yes); },
        onWrong1: async () => { await S.say(L.retry); },
      });
      rec.push(out.res); showRes(); X.rec(ID).set({ items: rec });
      await S.sleep(500);
    }

    const NOSE_SVG = '<svg viewBox="0 0 48 48"><path d="M24 8c-3 8-7 15-7 21a7 7 0 0 0 14 0c0-6-4-13-7-21z" fill="#F2C9A6" stroke="#8B5A2B" stroke-width="2.5"/><path d="M10 30c4 0 6 2 8 4M38 30c-4 0-6 2-8 4" stroke="#00AEED" stroke-width="3" stroke-linecap="round" fill="none"/></svg>';

    (async () => {
      // س١
      await ask({ line: L.where, correct: 'dishJug', prompt: async () => { await S.say(L.where); await S.sfx(L.drops); },
        items: [{ key: 'dishJug', aria: 'الصَّحْنُ تَحْتَ الإِبْريقِ' }, { key: 'window', aria: 'النّافِذَةُ' }, { key: 'door', aria: 'البابُ' }] });
      // الدليل: قطرة تسقط من قاع الإبريق في الصحن (بديل ثابت إلى أن يصل مقطع #٢ الجديد)
      ctx.instruction('');
      const ev = h('div.x8-ev.wide', null, X.pic('drip'), h('i.x8-drop', { 'aria-hidden': 'true' }), h('i.x8-ring', { 'aria-hidden': 'true' }));
      root.replaceChildren(ev);
      replay = async () => { await S.sfx(L.drops); await S.say(L.waterHere); };
      busy = true; S.fx(L.drops, 0.7); await S.sleep(1600);
      await X.bariq(S, stage, L.waterHere, { mood: 'point' }); busy = false;
      await S.sleep(600);
      // س٢
      await ask({ line: L.whichMouth, correct: 'mouthM', prompt: async () => { await S.say(L.whichMouth); await S.sleep(200); await S.say(L.tryMouth); await S.sleep(1500); },
        items: [{ key: 'mouthM', aria: 'فَمٌ مُطْبَقٌ' }, { key: 'mouthA', aria: 'فَمٌ مَفْتوحٌ' }] });
      ctx.instruction('');
      root.replaceChildren(h('div.x8-ev', null, X.pic('mouthM')));
      replay = () => S.say(L.mouthClosed);
      busy = true; await S.sleep(300); await S.say(L.mouthClosed); busy = false;
      await S.sleep(600);
      // س٣
      await ask({ line: L.fromWhere, correct: 'nose', prompt: async () => { await S.say(L.fromWhere); },
        items: [{ key: 'nose', aria: 'سَيْفٌ وَإِصْبَعُهُ عَلى أَنْفِهِ' }, { key: 'mouthA', aria: 'فَمٌ مَفْتوحٌ' }] });
      // التجربة دليلاً: يمسك أنفه فينقطع «مْـ» ثم يعود
      ctx.instruction(X.lineText(L.holdNose));
      const cut = h('span.x8-cut', { 'aria-hidden': 'true', html: NOSE_SVG });
      root.replaceChildren(h('div.x8-ev', null, X.pic('nose'), cut));
      const demoCut = async () => {
        X.say(L.mm, { stim: true }); await S.sleep(650);
        cut.classList.add('is-off'); BQ.audio.stop(); await S.sleep(900);
        cut.classList.remove('is-off'); await S.say(L.mm, { stim: true });
      };
      replay = async () => { await demoCut(); await S.say(L.holdNose); };
      busy = true; await S.sleep(300); await demoCut(); await S.sleep(300); await S.say(L.holdNose); busy = false;
      await S.sleep(2600);
      ctx.done();
      X.finish(S, ctx, { pose: 'clap' });
    })();
    X.phNote(ctx, ['dishJug', 'window', 'door', 'drip', 'mouthM', 'mouthA', 'nose']);
  }

  BQ.register(ID, {
    hero: 'img-019',
    render(stage, ctx) {
      need().then((X) => { if (ctx.alive()) run(X, stage, ctx); })
        .catch(() => stage.append(BQ.h('p.bq-missing', null, 'تعذّر تحميل النشاط. جرّب «من البداية».')));
    },
  });
})();

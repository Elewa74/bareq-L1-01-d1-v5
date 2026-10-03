/* EL09 · استمع وتعلّم — v5 #٣ · تفاعلي · نجرّب معاً · غير مرصود (اللوحات v5 §٣ · الإطار v2)
   الهدف الواحد: يحكم على صوتين يسمعهما: صوت واحد أم مختلفان، بلمس أحد زرّي بارق.
   ١ بارق يشرح الزرّين (يصفّق «هُما صَوْتٌ واحِدٌ.» · يقفز «سَمِعْتُ فَرْقاً!») ← ٢ مثال محلول: صبّ/صبّ، اليد تلمس زرّ التصفيق، الدليل إبريق|إبريق
   ← ٣ خمسة بنود بالترتيب: طرق/طرق · صبّ/تكّة · «مْـ»/«مْـ» · «مْـ»/«آ» · «مْـ»/طرق ← ٤ الدليل بعد كلّ جواب ← ٥ بارق يصفّق «أَحْسَنْتَ! أَصْغَيْتَ جَيِّداً!».
   تغذية: صواب = الزرّ يتحرّك + الجملة + صورتا المصدرين · خطأ ١ = يُعاد الزوج + «هَيّا، أَصْغِ مَرَّةً أُخْرى!» · خطأ ٢ = صورتا المصدرين + «أَصْغِ: هَذا، وَهَذا.» ويمضي.
   لا رموز ولا كتابة على الشاشة؛ الأدوات المشتركة في ix5.js. */
(function () {
  'use strict';
  const ID = 'EL09';
  const need = () => (BQ.ix5 ? Promise.resolve(BQ.ix5) : (window.__ix5p = window.__ix5p || new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = 'js/el/ix5.js';
    s.onload = () => (BQ.ix5 ? res(BQ.ix5) : rej(new Error('ix5'))); s.onerror = () => { window.__ix5p = null; rej(new Error('ix5')); };
    document.head.append(s);
  })));
  need().catch(() => {});

  function run(X, stage, ctx) {
    const h = BQ.h, L = X.L, S = X.session(ctx);
    const ITEMS = [
      { a: L.knock, b: L.knockB, same: true, ea: 'knock', eb: 'knock', name: 'طرق/طرق' },
      { a: L.pour, b: L.click, same: false, ea: 'jug', eb: 'compass', name: 'صبّ/تكّة' },
      { a: L.mm, b: L.mmB, same: true, ea: 'mouthM', eb: 'mouthM', name: '«مْـ»/«مْـ»' },
      { a: L.mm, b: L.aa, same: false, ea: 'mouthM', eb: 'mouthA', name: '«مْـ»/«آ»' },
      { a: L.mm, b: L.knock, same: false, ea: 'mouthM', eb: 'knock', name: '«مْـ»/طرق' },
    ];
    X.prep([L.mm, L.mmB, L.aa, L.listenAgain, L.thisAndThis, L.wellDone]);
    X.prepArt(['knock', 'jug', 'compass', 'mouthM', 'mouthA']);
    const res = [];
    const RES = { first: 'من أوّل مرّة', second: 'بعد إعادة', shown: 'عُرض الصواب' };
    const guide = () => X.guide(ctx, {
      goal: 'يحكم على صوتين يسمعهما: صوت واحد أم مختلفان، بلمس أحد زرّي بارق.',
      steps: ['بارق يشرح الزرّين: يصفّق = «هُما صَوْتٌ واحِدٌ» · يقفز فاتحاً ذراعيه = «سَمِعْتُ فَرْقاً!».', 'مثال محلول: صبّ ثم صبّ — بارق يلمس زرّ التصفيق (غير محسوب).',
        'خمسة بنود: طرق/طرق · صبّ/تكّة · «مْـ»/«مْـ» · «مْـ»/«آ» · «مْـ»/طرق — بعد كلّ جواب صورتا المصدرين جنباً إلى جنب.'],
      teacher: ['اجلس بجانب الطفل ولا تلمس الجواب عنه؛ زرّ الأذن يعيد الصوتين متى شاء.', 'إن تردّد: «أَغْمِضْ عَيْنَيْكَ وَاسْمَعْ» ثم الأذن — بلا كلمة «خطأ».'],
      fb: 'صواب: الزرّ يتحرّك + «نَعَمْ! …» + صورتا المصدرين · خطأ أوّل: يُعاد الزوج + «هَيّا، أَصْغِ مَرَّةً أُخْرى!» · خطأ ثانٍ: «أَصْغِ: هَذا، وَهَذا.» ويمضي. غير مرصود — لا نقاط.',
      note: 'التمييز السمعي يسبق النطق والحرف؛ «أين الصوت؟» انتقل إلى «تدرّب» و«فكّر وأجب».',
    });
    guide();
    const showRes = () => X.result(ctx, res.length ? '<p class="goal"><b>ما جرى (غير مرصود):</b><br>' + res.map((r, i) => X.AR(i + 1) + '. ' + ITEMS[i].name + ': ' + RES[r]).join('<br>') + '</p>' : '');

    const root = X.root(stage, 'x9');
    const top = h('div.x9-top'); root.append(top);
    let pair = null, busy = true, waiter = null;
    const P = X.player(root, async () => { if (busy || !pair) return; busy = true; J.lock(); await P.play(S, pair); busy = false; J.lock(false); });
    const J = X.judge(root, { onPick: (id, b) => { if (waiter) { const w = waiter; waiter = null; w({ id, b }); } } });
    J.lock();
    const ev = h('div.x9-ev'); root.append(ev);
    const waitPick = () => new Promise((r) => { waiter = r; });
    ctx.instruction(X.lineText(L.same));
    ctx.onReplay(async () => { if (busy || !pair) return; busy = true; J.lock(); await S.say(L.same); await P.play(S, pair); busy = false; J.lock(false); });

    async function demo() {
      busy = true;
      await S.sleep(400);
      await J.act(S, 'same');            // بارق يصفّق «هُما صَوْتٌ واحِدٌ.»
      await J.act(S, 'diff');            // بارق يقفز «سَمِعْتُ فَرْقاً!»
      // مثال محلول: صبّ ثم صبّ ← اليد تلمس زرّ التصفيق ← الدليل إبريق|إبريق
      pair = [L.pour, L.pour];
      await P.play(S, pair);
      const sb = J.byId('same');
      await X.ghostTap(S, X.playArea(ctx), sb, { onTap: async () => { sb.pose(true); sb.classList.add('is-ok'); } });
      X.evidence(ev, 'jug', 'jug');
      await S.say(L.yesSame);
      sb.pose(false);
      await S.sleep(700);
      J.reset(); ev.replaceChildren(); P.reset();
    }

    async function item(it) {
      ev.replaceChildren(); J.reset(); J.lock(); busy = true;
      pair = [it.a, it.b];
      await S.say(L.same);
      await P.play(S, pair);
      let tries = 0;
      for (;;) {
        busy = false; J.lock(false);
        const { id, b } = await waitPick();
        busy = true; J.lock();
        if ((id === 'same') === it.same) {
          b.classList.add('is-ok'); b.pose(true); S.fx(L.ding, 0.4);
          X.evidence(ev, it.ea, it.eb);
          await S.say(it.same ? L.yesSame : L.yesDiff);
          await S.sleep(400); b.pose(false);
          return tries === 0 ? 'first' : 'second';
        }
        tries++;
        X.anim(b, 'fx-shake', 500);
        if (tries === 1) { await S.say(L.listenAgain); await P.play(S, pair); continue; }
        b.classList.add('is-dim');
        const cb = J.byId(it.same ? 'same' : 'diff');
        const E = X.evidence(ev, it.ea, it.eb);
        await S.say(L.thisAndThis);
        for (let k = 0; k < 2; k++) { E.parts[k].classList.add('is-on'); await S.stim(k ? it.b : it.a); E.parts[k].classList.remove('is-on'); await S.sleep(250); }
        cb.classList.add('is-glow'); await J.act(S, cb.dataset.id); cb.classList.remove('is-glow'); cb.classList.add('is-ok');
        await S.sleep(600);
        return 'shown';
      }
    }

    (async () => {
      await demo();
      const steps = BQ.ui.steps(top, ITEMS.length);
      for (let i = 0; i < ITEMS.length; i++) {
        steps.set(i);
        res.push(await item(ITEMS[i]));
        showRes();
        await S.sleep(500);
      }
      ctx.done();
      X.rec(ID).set({ items: res });
      ev.replaceChildren();
      X.finish(S, ctx, { pose: 'clap', line: L.wellDone });
    })();
    X.phNote(ctx, ['knock', 'jug', 'compass', 'mouthM', 'mouthA']);
  }

  BQ.register(ID, {
    hero: 'img-121',
    render(stage, ctx) {
      need().then((X) => { if (ctx.alive()) run(X, stage, ctx); })
        .catch(() => stage.append(BQ.h('p.bq-missing', null, 'تعذّر تحميل النشاط. جرّب «من البداية».')));
    },
  });
})();

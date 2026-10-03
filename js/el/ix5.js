/* ix5.js — أدوات مشتركة للعناصر التفاعلية v5 (EL07 · EL08 · EL09 · EL10 · EL11 · EL12 · EL13 · EL14 · EL16) — L1-01-d1 · مسوّدة draft_unapproved
   يُحمَّل مرّة واحدة: إمّا بوسم <script> قبل EL07، وإمّا آلياً من أوّل ملفّ عنصر تفاعليّ يحتاجه (BQ.ix5load()).
   لا يعدّل core.js؛ يستعمل عقده العامّ فقط: BQ.h · BQ.audio · BQ.ui.brq · BQ.char · BQ.icon · BQ.img · BQ.store · BQ.ui.steps.
   ─ قواعد الإطار v2 المطبَّقة هنا: لا اسم حرف · لا رموز (زرّا بارق المتحرّك بدلها) · لا نصّ للمعلّم على شاشة الطفل
     (لوحته بالضغط المطوَّل على بارق الصغير في الزاوية، بأيقونات) · المكتوب للطفل «ماءْ» و«م» فقط · لا رقم ولا مؤقّت ولا قلوب.
   ─ الصوت: الأسطر الجديدة (NEW_LINES.json) تُشغَّل من media/audio/<id>.mp3 حين يوجد الملفّ (ولو لم يُعِد المنصّة بناء data.js)،
     وإلا البديل المؤقّت في media/fx/ أو سطر قديم قريب، وإلا صمت بزمن تقديريّ ونصّ مصاحب — العنصر يعمل في كلّ حال.
   ─ الصور: جدول ART (مفتاح ← مرشّحات)؛ الصورة الجديدة من media/img/v5/ أو vis5/ إن وُجدت، وإلا البديل الحاليّ.
     خريطة اختيارية media/img/v5/ix5_map.json {مفتاح: ملفّ} تُقدَّم على الجدول (للاستبدال بلا تعديل شيفرة). */
(function () {
  'use strict';
  const BQ = window.BQ; if (!BQ || BQ.ix5) return;
  const h = BQ.h;
  const X = {};
  const never = () => new Promise(() => {});
  X.never = never;
  const AR = BQ.AR || ((n) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]));
  X.AR = AR;
  const reduced = () => (BQ.reduced ? BQ.reduced() : false);

  /* ================= الأسطر ================= */
  const P = 'bariq_L1-01_';
  /** أسطر v5 الجديدة: t النصّ · sp المتكلّم · ph بديل مؤقّت (media/fx) · alt سطر قديم مسجَّل قريب المعنى */
  const NEW = {
    [P + 'v5_hayya_asghi_maai_ar']: { t: 'هَيّا، أَصْغِ مَعي!', sp: 'HAB', alt: [P + 'ins-listen_ar'] },
    [P + 'v5_ayyu_fam_ar']: { t: 'أَيُّ فَمٍ يَقولُ: مْـ؟', sp: 'HAB' },
    [P + 'v5_jarrib_bifamik_ar']: { t: 'جَرِّبْ أَنْتَ بِفَمِكَ.', sp: 'HAB' },
    [P + 'v5_min_ayna_yakhruj_ar']: { t: 'مِنْ أَيْنَ يَخْرُجُ مْـ؟', sp: 'HAB' },
    [P + 'v5_amsik_anfak_ar']: { t: 'أَمْسِكْ أَنْفَكَ وَقُلْ: مْـ.', sp: 'HAB' },
    [P + 'v5_mm_mm_maa_ar']: { t: 'مْـ… مْـ… ماءْ!', sp: 'SAY', alt: [P + 'intro-1_12_ar'] },
    [P + 'v5_ahsant_asghayt_ar']: { t: 'أَحْسَنْتَ! أَصْغَيْتَ جَيِّداً!', sp: 'HAB' },
    [P + 'v5_asghi_marra_ar']: { t: 'هَيّا، أَصْغِ مَرَّةً أُخْرى!', sp: 'HAB', alt: [P + 'd1-EL02_04_ar'] },
    [P + 'v5_aa_ar']: { t: 'آ', sp: 'SAY', ph: 'media/fx/ph_aa.mp3' },
    [P + 'v5_asghi_hatha_ar']: { t: 'أَصْغِ: هَذا، وَهَذا.', sp: 'HAB', alt: [P + 'd1-FB_04_ar'] },
    [P + 'v5_fami_mughlaq_ar']: { t: 'مْـ… مْـ… فَمي مُغْلَقٌ هَكَذا!', sp: 'SAY' },
    [P + 'v5_alan_dawruk_ar']: { t: 'الآنَ دَوْرُكَ، هَيّا!', sp: 'HAB', alt: [P + 'ins-say_ar'] },
    [P + 'v5_isma_alfam_ar']: { t: 'اسْمَعْ جَيِّداً: مْـ… الفَمُ مُغْلَقٌ.', sp: 'HAB' },
    [P + 'v5_hayya_ayna_m_ar']: { t: 'هَيّا: أَيْنَ مْـ؟', sp: 'HAB' },
    [P + 'v5_isma_ilmis_ar']: { t: 'اسْمَعْ: مْـ… الْمِسِ الصّورَةَ!', sp: 'HAB' },
    [P + 'v5_mm_long_ar']: { t: 'مْـ', sp: 'SAY', ph: 'media/fx/ph_mm_long.mp3', alt: [P + 'snd-m_ar', 'L1-01_d2_s5_01'] },
    [P + 'v5_mm_long_b_ar']: { t: 'مْـ', sp: 'SAY', ph: 'media/fx/ph_mm_long_b.mp3', alt: ['L1-01_d2_s5_01', P + 'snd-m_ar'] },
    /* تسجيل ثانٍ لـ«آ» لإعادة «تدرّب» (لا سطر له في الجرد بعد — بديل مؤقّت؛ يُستبدل حين يُسجَّل _b) */
    'ix5:aa_b': { t: 'آ', sp: 'SAY', pseudo: true, ph: 'media/fx/ph_aa_b.mp3', alt: [P + 'v5_aa_ar'] },
  };
  X.NEW = NEW;
  /** معرّفات قصيرة مستعملة في العناصر */
  const L = (X.L = {
    listenWithMe: P + 'v5_hayya_asghi_maai_ar', whichMouth: P + 'v5_ayyu_fam_ar', tryMouth: P + 'v5_jarrib_bifamik_ar',
    fromWhere: P + 'v5_min_ayna_yakhruj_ar', holdNose: P + 'v5_amsik_anfak_ar', mmMaa: P + 'v5_mm_mm_maa_ar',
    wellDone: P + 'v5_ahsant_asghayt_ar', listenAgain: P + 'v5_asghi_marra_ar', aa: P + 'v5_aa_ar', aaB: 'ix5:aa_b',
    thisAndThis: P + 'v5_asghi_hatha_ar', mouthClosed: P + 'v5_fami_mughlaq_ar', yourTurn: P + 'v5_alan_dawruk_ar',
    hintM: P + 'v5_isma_alfam_ar', whereM: P + 'v5_hayya_ayna_m_ar', touchPic: P + 'v5_isma_ilmis_ar',
    mm: P + 'v5_mm_long_ar', mmB: P + 'v5_mm_long_b_ar',
    // أسطر موجودة (تُستعمل كما هي — اللوحات v5 §و)
    where: P + 'ins-where_ar', same: P + 'ins-same_ar', yes: P + 'fb-yes_ar', retry: P + 'fb-retry_ar', whatIs: 'L1-01_d1_s2_03',
    whereWater: P + 'L2-recall_01_ar', mMaa: P + 'vocab-w1_02_ar', maa: P + 'vocab-w1_01_ar', maaB: 'L1-01_d2_s5_03',
    waterHere: P + 'd1-scr06_01_ar', yesSame: P + 'd1-FB_02_ar', yesDiff: P + 'd1-FB_01_ar',
    brqSame: P + 'd1-EL02_01_ar', brqDiff: 'L1-01_d1_s1_01',
    // مؤثّرات (أصوات الأشياء)
    knock: P + 'sfx-door-knock', knockB: P + 'sfx-door-knock-b', pour: P + 'sfx-water-pour-1s', click: P + 'sfx-compass', clickB: P + 'sfx-compass-b',
    drops: P + 'sfx-water-drops', tune: P + 'sfx-song-drops', ding: P + 'sfx-check-done', flip: P + 'sfx-card-flip', snap: P + 'sfx-tile-snap', bead: P + 'sfx-compass-bead',
  });
  const SPN = { HAB: '', SAY: 'سَيْف', MAJ: 'ماجِد', BRQ: 'بارِق' };

  /* ---------- ما الموجود من الملفّات الجديدة؟ بلا طلبات 404 (لا أخطاء في الطرفية):
     data.js (BQ.hasAudio · D.assets، يعيد المنصّة بناءه) + media/audio/_voices.json (يحدّثه وكيل الصوت) + media/fx/ix5_map.json
     ({"img":{مفتاح: مسار}, "files":[مسارات موجودة], "audio":[معرّفات]} — يولّده media/fx/ix5_scan.py) ---------- */
  let MAP = { img: {}, files: [], audio: [] };
  let mapP = null;
  function loadMap() {
    if (!mapP) mapP = (async () => {
      try {
        const r = await fetch('media/fx/ix5_map.json', { cache: 'no-cache' });
        if (r.ok) { const m = await r.json(); MAP = { img: m.img || {}, files: m.files || [], audio: m.audio || [] }; }
      } catch (e) { /* لا خريطة */ }
      Object.keys(MAP.img).forEach((k) => { if (ART[k] && typeof MAP.img[k] === 'string') ART[k] = [MAP.img[k]].concat(ART[k]); });
    })();
    return mapP;
  }
  let knownP = null;
  const knownAudio = () => (knownP = knownP || (async () => {
    const s = new Set();
    try { const r = await fetch('media/audio/_voices.json', { cache: 'no-cache' }); if (r.ok) { const j = await r.json(); Object.keys((j && j.files) || {}).forEach((k) => s.add(k)); } } catch (e) { /* */ }
    await loadMap(); MAP.audio.forEach((k) => s.add(k));
    return s;
  })());
  const estMs = (t) => Math.max(1100, String(t || '').length * 85);
  /** يحلّ معرّف سطر إلى ما يُشغَّل: {kind:'core', id} | {kind:'url', url} | {kind:'none', ms} */
  const resCache = {};
  X.resolve = function (id) {
    if (BQ.hasAudio(id)) return Promise.resolve({ kind: 'core', id });
    if (!resCache[id]) resCache[id] = (async () => {
      const e = NEW[id];
      if (!e) return { kind: 'none', ms: 900 };
      if (!e.pseudo && (await knownAudio()).has(id)) return { kind: 'url', url: 'media/audio/' + id + '.mp3' };
      if (e.ph) return { kind: 'url', url: e.ph };
      for (const a of e.alt || []) {
        if (BQ.hasAudio(a)) return { kind: 'core', id: a };
        if (NEW[a]) { const r = await X.resolve(a); if (r.kind !== 'none') return r; }
      }
      return { kind: 'none', ms: estMs(e.t) };
    })();
    return resCache[id];
  };
  /** يحلّ مسبقاً (يُستدعى عند بدء العنصر لتفادي تأخير أوّل تشغيل) */
  X.prep = (ids) => Promise.all(ids.map((i) => X.resolve(i))).catch(() => {});
  X.srcOf = async (id) => { const r = await X.resolve(id); return r.kind === 'core' ? 'media/audio/' + r.id + '.mp3' : r.kind === 'url' ? r.url : null; };
  X.lineText = (id) => (NEW[id] ? NEW[id].t : ((BQ.line(id) || {}).t || ''));

  /* ---------- النصّ المصاحب ---------- */
  function caption(id) {
    const cap = BQ.audio.capEl; if (!cap) return;
    const e = NEW[id];
    if (!e) { BQ.audio.caption(id); return; }
    cap.replaceChildren(SPN[e.sp] ? h('b', null, SPN[e.sp] + ': ') : '', e.t);
    cap.hidden = !BQ.state.cc;
  }
  function capOff() { const cap = BQ.audio.capEl; if (cap) { cap.hidden = true; cap.textContent = ''; } }

  /** يشغّل ملفّاً بمسار حرّ عبر عنصر الكلام المشترك المفتوح (iOS) ويندمج مع BQ.audio (stop · المقاطعة · العودة إلى الصفحة) */
  function playUrl(url, opt) {
    opt = opt || {};
    const A = BQ.audio;
    A.stop();
    const my = ++A.token;
    const au = (A.voice && A.voice()) || new Audio();
    try { au.pause(); } catch (e) { /* */ }
    au.src = url;
    try { au.defaultPlaybackRate = opt.rate || 1; au.playbackRate = opt.rate || 1; } catch (e) { /* */ }
    au.volume = opt.volume == null ? 1 : opt.volume;
    A.cur = au;
    return new Promise((resolve) => {
      let fin = false, wd = 0;
      const off = () => { au.removeEventListener('ended', finish); au.removeEventListener('error', finish); au.removeEventListener('loadedmetadata', meta); };
      function finish() { if (fin) return; fin = true; clearTimeout(wd); off(); if (A.pending === finish) A.pending = null; if (my === A.token) { if (A.cur === au) A.cur = null; if (!opt.keepCaption) capOff(); } resolve(); }
      const arm = (ms) => { clearTimeout(wd); wd = setTimeout(finish, Math.max(4000, ms)); };
      function meta() { const d = au.duration; if (d && isFinite(d)) arm(2 * d * 1000 / (opt.rate || 1)); }
      A.pending = finish;
      au.addEventListener('ended', finish); au.addEventListener('error', finish); au.addEventListener('loadedmetadata', meta);
      arm(6000);
      let p; try { p = au.play(); } catch (e) { p = null; }
      if (p && p.catch) p.catch((err) => {
        if (fin || my !== A.token) return;
        if (err && err.name === 'NotAllowedError' && A.blocked) { clearTimeout(wd); A.blocked(() => { if (fin || my !== A.token) return; arm(6000); const q = au.play(); if (q && q.catch) q.catch(() => setTimeout(finish, 500)); }); }
        else setTimeout(finish, 500);
      });
    });
  }
  /** سطر صامت (لا ملفّ ولا بديل): نصّ مصاحب بزمن تقديريّ، ويُقطع كما يُقطع الصوت */
  function silent(ms) {
    const A = BQ.audio;
    A.stop();
    const my = ++A.token;
    return new Promise((resolve) => {
      let fin = false;
      const finish = () => { if (fin) return; fin = true; clearTimeout(t); if (A.pending === finish) A.pending = null; if (my === A.token) capOff(); resolve(); };
      const t = setTimeout(finish, ms);
      A.pending = finish;
    });
  }
  /** say(id, {stim, rate}) — stim: مثير مسموع بلا نصّ مصاحب (لا قرينة مكتوبة) */
  X.say = async function (id, opt) {
    opt = opt || {};
    const r = await X.resolve(id);
    if (r.kind === 'core') return BQ.audio.play(r.id, { noCaption: !!opt.stim, rate: opt.rate });
    if (!opt.stim) caption(id); else capOff();
    if (BQ.audio.onLine) try { BQ.audio.onLine(id); } catch (e) { /* */ }
    if (r.kind === 'url') return playUrl(r.url, opt);
    return silent(opt.stim ? 700 : r.ms);
  };

  /* ================= الجلسة ================= */
  /** S: تشغيل وانتظار يتوقّفان عند مغادرة العنصر (الوعد لا يُحلّ بعد الخروج فتتوقّف السلسلة) */
  X.session = function (ctx) {
    let live = true;
    const timers = new Set();
    ctx.onCleanup(() => { live = false; timers.forEach(clearTimeout); timers.clear(); });
    const alive = () => live && (typeof ctx.alive !== 'function' || ctx.alive());
    const gate = (p) => p.then((v) => (alive() ? v : never()));
    const S = {
      ctx,
      get live() { return alive(); },
      gate,
      say(id, opt) { return alive() ? gate(X.say(id, opt)) : never(); },
      sleep(ms) { return alive() ? gate(new Promise((r) => { const t = setTimeout(() => { timers.delete(t); r(); }, ms); timers.add(t); })) : never(); },
      later(fn, ms) { const t = setTimeout(() => { timers.delete(t); if (alive()) fn(); }, ms); timers.add(t); return t; },
      clear(t) { clearTimeout(t); timers.delete(t); },
      fx(id, vol) { return alive() ? BQ.audio.fx(id, vol == null ? 0.85 : vol) : { stop() {}, done: never() }; },
      /** مؤثّر ينتظر نهايته (يقطع الكلام الجاري) */
      async sfx(id, vol) { if (!alive()) return never(); BQ.audio.stop(); const f = BQ.audio.fx(id, vol == null ? 0.9 : vol); await Promise.race([f.done, new Promise((r) => setTimeout(r, 4000))]); return gate(Promise.resolve()); },
      /** يشغّل مثيراً: سطر صوتيّ بلا نصّ، أو مؤثّر */
      stim(id) { return /sfx-/.test(id) ? S.sfx(id) : S.say(id, { stim: true }); },
      async seq(list) { for (const it of list) { if (!alive()) return never(); if (typeof it === 'number') await S.sleep(it); else if (typeof it === 'function') await it(); else if (typeof it === 'string') await S.say(it); } },
      stop() { BQ.audio.stop(); },
    };
    return S;
  };

  /* ================= الصور ================= */
  /* مرشّحات كلّ صورة: أوّلاً فنّ v5 (media/img/v5/ · vis5/) ثم البديل الحاليّ. view = قصّ من صورة أكبر {x,y,w (نسبة من العرض), ar (ارتفاع/عرض)} */
  const ROOM = { src: 'media/img/img-033.webp', ar: 900 / 1600 };
  const ART = (X.ART = {
    water: ['media/img/v5/water_dish.webp', 'media/img/img-001.webp'],
    dishJug: ['media/img/v5/dish_under_jug.webp', 'media/img/img-001.webp'],
    drip: ['media/img/v5/drip_evidence.webp', 'media/img/img-001.webp'],
    cup: ['media/img/v5/water_cup.webp', 'media/fx/ph_cup.svg'],
    tap: ['media/img/v5/water_tap.webp', 'media/fx/ph_tap.svg'],
    compass: ['media/img/v5/compass_hand.webp', 'media/img/img-008.webp'],
    compassTable: ['media/img/v5/compass_table.webp', 'media/img/img-103.webp'],
    knock: ['media/img/v5/knock_hand.webp', 'media/img/img-007.webp'],
    mouthM: ['media/img/vis5/saif-V1.webp', { src: 'media/img/img-101.webp', ar: 1, view: { x: 0.49, y: 0.34, w: 0.58 } }],
    mouthA: ['media/img/vis5/saif-V3.webp', { src: 'media/img/img-102.webp', ar: 1, view: { x: 0.49, y: 0.34, w: 0.58 } }],
    nose: ['media/img/v5/saif_nose.webp', { src: 'media/img/img-019.webp', ar: 1, view: { x: 0.52, y: 0.36, w: 0.62 } }],
    jug: ['media/img/v5/jug_pour.webp', { src: 'media/img/img-122.webp', ar: 900 / 1600, view: { x: 0.6, y: 0.5, w: 0.36 } }],
    saifPour: ['media/img/v5/saif_pour.webp', { src: 'media/img/img-122.webp', ar: 900 / 1600, view: { x: 0.6, y: 0.5, w: 0.36 } }],
    window: ['media/img/v5/room_window.webp', Object.assign({ view: { x: 0.16, y: 0.33, w: 0.32 } }, ROOM)],
    door: ['media/img/v5/room_door.webp', Object.assign({ view: { x: 0.885, y: 0.4, w: 0.3 } }, ROOM)],
    room: ['media/img/v5/room_evening.webp', 'media/img/img-033.webp'],
    saifTable: ['media/img/v5/EL13_cover.webp', 'media/img/img-019.webp'],
    bubbles: ['media/img/v5/EL14_bubbles.webp', 'media/img/img-033.webp'],
  });
  /** هل الملفّ موجود؟ — من القوائم وحدها (لا طلب شبكة): D.assets (يشمل media/img/v5/) · ix5_map.files · ما ليس من فنّ v5 موجود أصلاً */
  const assetSet = new Set(Object.values((BQ.D && BQ.D.assets) || {}));
  const probeImg = async (src) => {
    if (!/media\/img\/(v5|vis5)\//.test(src)) return true;
    await loadMap();
    return assetSet.has(src) || MAP.files.includes(src) || Object.values(MAP.img).includes(src);
  };
  const artRes = {};
  /* أفواه vis5 (لقطة وجه كتفين فما فوق): تُقصّ حول صندوق الفم من anchors.json إن وُجد (أيّ صيغة معقولة: [x,y,w,h] أو {x,y,w,h} بالبكسل أو بالنسب) */
  let anchorsP = null;
  const anchors = () => (anchorsP = anchorsP || (async () => {
    await loadMap();
    if (!MAP.files.includes('media/img/vis5/anchors.json')) return null;
    try { const r = await fetch('media/img/vis5/anchors.json'); return r.ok ? await r.json() : null; } catch (e) { return null; }
  })());
  const natSize = (src) => new Promise((res) => { const i = new Image(); i.onload = () => res([i.naturalWidth, i.naturalHeight]); i.onerror = () => res(null); i.src = src; });
  async function mouthView(src) {
    const m = src.match(/vis5\/([^/]+)\.(webp|png|jpg)$/); if (!m) return null;
    const A = await anchors(); if (!A) return null;
    const stem = m[1];
    let e = A[stem] || A[stem + '.' + m[2]] || (A.images && (A.images[stem] || A.images[stem + '.' + m[2]]));
    if (!e) { const k = Object.keys(A).find((x) => x.indexOf(stem) >= 0); e = k ? A[k] : null; }
    if (e && e.mouth) e = e.mouth; if (e && e.box) e = e.box;
    if (!e) return null;
    let [x, y, w, hh] = Array.isArray(e) ? e : [e.x, e.y, e.w || e.width, e.h || e.height];
    if (![x, y, w, hh].every((v) => typeof v === 'number')) return null;
    const ns = await natSize(src); if (!ns) return null;
    if (x > 1 || y > 1 || w > 1) { x /= ns[0]; w /= ns[0]; y /= ns[1]; hh /= ns[1]; }
    return { ar: ns[1] / ns[0], view: { x: x + w / 2, y: y + hh / 2, w: Math.min(1, w * 2.6) } };
  }
  /** يحلّ مفتاح صورة إلى {src, view?, ar?, placeholder} */
  X.art = function (key) {
    if (!artRes[key]) artRes[key] = (async () => {
      await loadMap();
      const list = ART[key] || [key];
      for (let i = 0; i < list.length; i++) {
        const c = typeof list[i] === 'string' ? { src: list[i] } : list[i];
        if (i === list.length - 1 || (await probeImg(c.src))) {
          const out = Object.assign({ placeholder: i > 0 && list.length > 1 }, c);
          if (!out.view && /vis5\//.test(out.src)) Object.assign(out, (await mouthView(out.src)) || {});
          return out;
        }
      }
      return { src: '', placeholder: true };
    })();
    return artRes[key];
  };
  X.prepArt = (keys) => Promise.all(keys.map((k) => X.art(k))).catch(() => {});
  /** صورة داخل إطار (span.x5-pic) — المحتوى يُملأ حين يُحلّ المفتاح */
  X.pic = function (key, cls) {
    const box = h('span.x5-pic' + (cls ? '.' + cls : ''), { 'aria-hidden': 'true', dataset: { k: key } });
    X.art(key).then((a) => {
      const im = h('img', { alt: '', draggable: 'false', decoding: 'async', src: a.src });
      if (a.view) {
        const v = a.view, ar = a.ar || 1;
        im.classList.add('is-crop');
        Object.assign(im.style, { width: (100 / v.w) + '%', left: (-100 * (v.x - v.w / 2) / v.w) + '%', top: 'calc(50% - ' + (v.y * ar * 100 / v.w) + 'cqi)' });
        box.classList.add('has-crop');
      }
      if (a.placeholder) box.dataset.ph = '1';
      box.replaceChildren(im);
    });
    return box;
  };

  /* ================= الأنماط ================= */
  const CSS = `
.x5 { --x5-h: max(300px, calc(var(--play-h, 700px) - 104px)); position: relative; width: 100%; min-height: min(100%, var(--x5-h)); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: clamp(12px, 2.6cqi, 26px); }
.x5, .x5 * { -webkit-tap-highlight-color: transparent; }
.x5 :is(button, [role="button"]) { touch-action: manipulation; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }
.x5 img, .x5 svg { -webkit-user-drag: none; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }
.x5-in { animation: x5In .4s cubic-bezier(.2,.9,.3,1.15) both; }
@keyframes x5In { from { opacity: 0; transform: translateY(12px) scale(.97); } }
.x5-row { display: flex; align-items: center; justify-content: center; gap: clamp(10px, 3cqi, 28px); flex-wrap: nowrap; max-width: 100%; }
.x5-sr { position: absolute !important; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
/* الصورة */
.x5-pic { position: relative; display: block; width: 100%; height: 100%; overflow: hidden; container-type: inline-size; background: var(--sky-wash); }
.x5-pic > img { display: block; width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
.x5-pic.has-crop > img { position: absolute; height: auto; max-width: none; }
/* بطاقة اختيار (صورة) */
.x5-card { --s: clamp(92px, 27cqi, 230px); position: relative; flex: none; width: min(var(--s), calc((var(--x5-h) - var(--x5-reserve, 230px)))); min-width: 72px; aspect-ratio: 1; padding: 0; border: 5px solid var(--white); border-radius: 24px; background: var(--white); overflow: hidden; cursor: pointer;
  box-shadow: 0 6px 0 var(--sky-line), 0 12px 24px var(--shade); transition: transform .18s ease, opacity .3s, box-shadow .2s, filter .3s; }
.x5-card .x5-pic { border-radius: 19px; }
.x5-card:focus-visible { outline: 4px solid var(--navy); outline-offset: 4px; }
.x5-card:active:not(.is-locked) { transform: scale(.96); }
@media (hover: hover) { .x5-cards:not(.is-locked) .x5-card:hover { transform: translateY(-4px); } }
.x5-card .x5-tick { position: absolute; z-index: 2; top: 7%; inset-inline-end: 7%; width: 26%; max-width: 48px; aspect-ratio: 1; border-radius: 50%; background: var(--ok); color: var(--white); display: none; place-items: center; padding: 5%; box-sizing: border-box; }
.x5-card .x5-tick svg { width: 100%; height: 100%; }
.x5-card.is-ok { border-color: var(--ok); box-shadow: 0 0 0 5px var(--ok), 0 12px 24px var(--shade); }
.x5-card.is-ok .x5-tick { display: grid; }
.x5-card.is-dim { opacity: .45; filter: saturate(.5); }
.x5-card.is-glow { box-shadow: 0 0 0 6px var(--sun), 0 0 30px var(--sun); }
.x5-card.is-heard { box-shadow: 0 0 0 5px var(--sky), 0 12px 24px var(--shade); }
.x5-card.is-gone { opacity: 0; pointer-events: none; }
.x5-cards { display: flex; justify-content: center; align-items: center; gap: clamp(10px, 3cqi, 30px); flex-wrap: nowrap; max-width: 100%; }
.x5-cards.is-locked .x5-card { cursor: default; }
@container stage (max-width: 520px) { .x5-cards { gap: 12px; flex-wrap: wrap; } .x5-card { width: min(42cqi, calc((var(--x5-h) - var(--x5-reserve-n, 200px)) / 2)); border-width: 4px; border-radius: 20px; } .x5-card .x5-pic { border-radius: 15px; } }
.fx-pop { animation: x5Pop .45s ease-out; }
@keyframes x5Pop { 40% { transform: scale(1.08); } }
.fx-shake { animation: x5Shake .5s ease-in-out; }
@keyframes x5Shake { 20%, 60% { transform: translateX(-7px); } 40%, 80% { transform: translateX(7px); } }
.fx-pulse { animation: x5Pulse 1.2s ease-in-out 2; }
@keyframes x5Pulse { 50% { transform: scale(1.06); } }
/* «م» */
.x5-m { font: 700 clamp(64px, 16cqi, 150px)/1 var(--ff-child); color: var(--coral); }
.x5-word { font: 700 clamp(44px, 11cqi, 104px)/1.25 var(--ff-child); color: var(--navy); }
.x5-word b { color: var(--coral); font-weight: 700; }
/* المشغّل (اسمع الصوتين) */
.x5-player { width: min(100%, 620px); display: flex; align-items: center; gap: 14px; padding: 8px 10px 8px 18px; border-radius: 999px; background: var(--white); box-shadow: 0 6px 18px var(--shade); }
.x5-ear { flex: none; width: 64px; height: 64px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; display: grid; place-items: center; background: var(--sky); color: var(--white); box-shadow: 0 4px 0 #0084b6; }
.x5-ear .bq-ic, .x5-ear svg { width: 34px; height: 34px; }
.x5-ear:active { transform: translateY(3px); box-shadow: none; }
.x5-ear:focus-visible { outline: 4px solid var(--navy); outline-offset: 3px; }
.x5-ear.is-on { animation: x5Pulse 1s ease-in-out infinite; }
.x5-ear.big { width: 96px; height: 96px; border-radius: 28px; background: #6A3FB5; box-shadow: 0 6px 0 #4B2A86; }
.x5-ear.big svg, .x5-ear.big .bq-ic { width: 52px; height: 52px; }
.x5-bar { position: relative; flex: 1; height: 14px; border-radius: 99px; background: var(--sky-line); overflow: hidden; }
.x5-bar i { position: absolute; inset-block: 0; inset-inline-start: 0; width: 0; background: var(--sky); border-radius: inherit; }
.x5-bar i.run { transition: width var(--d, 1.5s) linear; }
.x5-bar b { position: absolute; top: 50%; width: 4px; height: 22px; margin-top: -11px; background: var(--white); inset-inline-start: 50%; }
/* زرّا بارق (بلا كتابة: بارق يصفّق = صوت واحد · بارق يقفز فاتحاً ذراعيه = سمعت فرقاً) */
.x5-judge { display: flex; justify-content: center; align-items: stretch; gap: clamp(14px, 5cqi, 44px); }
.x5-jb { position: relative; width: min(clamp(120px, 28cqi, 220px), calc(var(--x5-h) - var(--x5-reserve, 250px))); min-width: 104px; aspect-ratio: 1; display: grid; place-items: center; padding: 6px; border-radius: 30px; border: 5px solid var(--white); cursor: pointer;
  background: radial-gradient(circle at 50% 40%, var(--white), var(--sky-wash)); box-shadow: 0 6px 0 var(--sky-line), 0 12px 24px var(--shade); transition: transform .2s ease-out, box-shadow .25s, opacity .3s, filter .3s; }
.x5-jb[data-id="diff"] { background: radial-gradient(circle at 50% 40%, var(--white), #FFF1C2); }
.x5-jb .bq-brq, .x5-jb img { width: 100%; height: 100%; object-fit: contain; display: block; }
.x5-jb:focus-visible { outline: 4px solid var(--navy); outline-offset: 4px; }
.x5-jb:active { transform: translateY(4px); }
.x5-jb.is-act { transform: translateY(-6px) scale(1.05); box-shadow: 0 0 0 6px #FFE58A, 0 16px 30px var(--shade); }
.x5-jb.is-ok { box-shadow: 0 0 0 6px var(--ok), 0 12px 24px var(--shade); }
.x5-jb.is-dim { opacity: .5; filter: saturate(.5); }
.x5-jb.is-glow { box-shadow: 0 0 0 6px var(--sun), 0 0 30px var(--sun); }
.x5-judge.is-locked .x5-jb { cursor: default; }
/* الدليل: صورتا المصدرين جنباً إلى جنب */
.x5-evid { display: flex; align-items: center; justify-content: center; gap: clamp(10px, 3cqi, 22px); animation: x5In .35s ease-out both; }
.x5-evid > span { width: min(clamp(78px, 19cqi, 150px), calc((var(--x5-h) - 330px))); min-width: 64px; aspect-ratio: 1; border-radius: 18px; overflow: hidden; border: 4px solid var(--white); box-shadow: 0 8px 18px var(--shade); transition: box-shadow .2s, transform .2s; }
.x5-evid > span.is-on { box-shadow: 0 0 0 5px var(--sun), 0 8px 18px var(--shade); transform: scale(1.06); }
.x5-evid > i { width: 12px; height: 12px; border-radius: 50%; background: var(--sky-line); flex: none; }
.x5-evid.same > span:last-child { animation: x5Same .7s ease-out; }
@keyframes x5Same { from { transform: translateX(calc(-1 * clamp(30px, 8cqi, 70px))) scale(.9); opacity: .4; } }
/* لوحة المعلّم: بارق صغير في الزاوية — ضغط مطوَّل ثانيتان */
.x5-tc { position: absolute; z-index: 9; inset-inline-start: 6px; bottom: 6px; width: 64px; height: 64px; border-radius: 50%; border: 0; padding: 0; background: rgba(255,255,255,.75); cursor: pointer; box-shadow: 0 3px 10px var(--shade); touch-action: none; }
.x5-tc .bq-brq, .x5-tc img { width: 100%; height: 100%; object-fit: contain; display: block; border-radius: 50%; }
.x5-tc::after { content: ''; position: absolute; inset: -5px; border-radius: 50%; background: conic-gradient(var(--navy) calc(var(--p, 0) * 360deg), transparent 0); -webkit-mask: radial-gradient(circle, transparent 60%, #000 61%); mask: radial-gradient(circle, transparent 60%, #000 61%); pointer-events: none; }
.x5-tc:focus-visible { outline: 3px solid var(--navy); outline-offset: 4px; }
.x5-tc.is-wait { animation: x5Nudge 2.4s ease-in-out infinite; }
@keyframes x5Nudge { 0%, 80%, 100% { transform: none; } 88% { transform: rotate(-8deg); } 94% { transform: rotate(6deg); } }
.x5-tpanel { position: absolute; z-index: 10; inset-inline-start: 10px; bottom: 80px; display: flex; gap: 12px; padding: 12px; border-radius: 22px; background: var(--white); box-shadow: 0 12px 34px rgba(0,52,91,.25); animation: x5In .25s ease-out both; }
.x5-tpanel button { width: 66px; height: 66px; border-radius: 18px; border: 3px solid var(--sky-line); background: var(--white); cursor: pointer; display: grid; place-items: center; padding: 8px; }
.x5-tpanel button svg { width: 100%; height: 100%; }
.x5-tpanel button:focus-visible { outline: 3px solid var(--navy); outline-offset: 2px; }
.x5-tpanel button:active { transform: scale(.94); }
/* يد الإرشاد */
.x5-hand { position: absolute; z-index: 11; width: 64px; height: 64px; pointer-events: none; transition: left .7s cubic-bezier(.4,.1,.3,1), top .7s cubic-bezier(.4,.1,.3,1), transform .15s; filter: drop-shadow(0 6px 8px rgba(0,0,0,.25)); }
.x5-hand.tap { transform: scale(.82); }
/* زرّ «التالي» بأيقونة وحدها (حين لا يختار المعلّم) */
.x5-skip { width: 64px; height: 64px; border-radius: 50%; border: 0; background: var(--white); color: var(--navy); display: grid; place-items: center; cursor: pointer; box-shadow: 0 4px 12px var(--shade); animation: x5In .3s ease-out both; }
.x5-skip .bq-ic { width: 30px; height: 30px; }
/* زرّ البدء الدائريّ داخل العنصر */
.x5-go { width: 96px; height: 96px; border-radius: 50%; border: 0; background: var(--sun); color: var(--navy); display: grid; place-items: center; cursor: pointer; box-shadow: 0 6px 0 var(--sun-edge, #C98F00), 0 12px 24px var(--shade); animation: x5In .35s ease-out both; }
.x5-go .bq-ic, .x5-go svg { width: 46px; height: 46px; margin-inline-start: 6px; }
.x5-go:active { transform: translateY(4px); box-shadow: 0 2px 0 var(--sun-edge, #C98F00); }
.x5-go:focus-visible { outline: 4px solid var(--navy); outline-offset: 4px; }
/* الختام */
.x5-end { position: absolute; inset: 0; z-index: 12; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: clamp(10px, 3vh, 22px); padding: 14px; background: rgba(238, 248, 253, .92); backdrop-filter: blur(3px); animation: x5In .35s ease-out both; }
.x5-end .bq-brq { width: min(46vw, 34vh, 260px); aspect-ratio: 1; }
.x5-end .bq-brq img { width: 100%; height: 100%; object-fit: contain; }
.x5-end-row { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
.x5-end-row .bq-btn { min-height: 64px; font-size: 19px; }
.x5-end-row .x5-again { width: 64px; height: 64px; padding: 0; border-radius: 50%; display: grid; place-items: center; }
.x5-end-row .x5-again .bq-ic { width: 28px; height: 28px; }
/* خرزات حول البوصلة (تقدّم لا درجة) */
.x5-beads { display: flex; gap: 10px; justify-content: center; align-items: center; padding: 8px 14px; border-radius: 999px; background: linear-gradient(180deg, #E9C27A, #B98532); box-shadow: inset 0 2px 4px rgba(255,255,255,.5), 0 4px 10px var(--shade); }
.x5-beads i { width: 20px; height: 20px; border-radius: 50%; background: #7A5216; box-shadow: inset 0 2px 3px rgba(0,0,0,.35); transition: background .4s, box-shadow .4s, transform .3s; }
.x5-beads i.on { background: radial-gradient(circle at 35% 35%, #FFF6C4, var(--sun)); box-shadow: 0 0 10px var(--sun); transform: scale(1.12); }
/* لوحة الكتابة («م» بحركة واحدة) */
.x5-tr { position: relative; aspect-ratio: 1; touch-action: none; -webkit-user-select: none; user-select: none; }
.x5-tr svg { width: 100%; height: 100%; display: block; overflow: visible; touch-action: none; }
.x5-tr .road { fill: none; stroke: rgba(0, 52, 91, .10); stroke-width: 13; stroke-linecap: round; stroke-linejoin: round; }
.x5-tr .dots { fill: none; stroke: rgba(0, 52, 91, .45); stroke-width: 1.4; stroke-dasharray: .1 3.4; stroke-linecap: round; }
.x5-tr .ink { fill: none; stroke: var(--navy); stroke-width: 8.5; stroke-linecap: round; stroke-linejoin: round; }
.x5-tr .demo { fill: none; stroke: #2E6CA6; stroke-width: 8.5; stroke-linecap: round; stroke-linejoin: round; }
.x5-tr .arr path { fill: none; stroke: var(--coral); stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.x5-tr.faint .arr { opacity: .35; }
.x5-tr .start { fill: #22B14C; stroke: var(--white); stroke-width: 1.2; }
.x5-tr .start.pulse { animation: x5Dot 1.1s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
@keyframes x5Dot { 50% { transform: scale(1.45); } }
.x5-tr .nextp { fill: none; stroke: var(--sun); stroke-width: 1.6; opacity: 0; }
.x5-tr .nextp.on { animation: x5Next .9s ease-out 2; }
@keyframes x5Next { 0% { opacity: 1; r: 2; } 100% { opacity: 0; r: 7; } }
.x5-tr .pen { fill: var(--white); stroke: #2E6CA6; stroke-width: 1.2; }
.x5-tr.is-done .start, .x5-tr.is-done .arr { display: none; }
@media (prefers-reduced-motion: reduce) {
  .x5-in, .x5-evid, .x5-end, .x5-tpanel, .x5-go, .x5-skip { animation: none; }
  .fx-pop, .fx-shake, .fx-pulse, .x5-ear.is-on, .x5-tc.is-wait, .x5-tr .start.pulse { animation: none; }
  .x5-hand { transition: none; }
}`;
  if (!document.getElementById('st-ix5')) document.head.append(h('style', { id: 'st-ix5' }, CSS));

  /* ================= مكوّنات ================= */
  const anim = (el, cls, ms) => { if (!el || reduced()) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms || 700); };
  X.anim = anim;
  X.root = (stage, cls) => { const r = h('div.x5' + (cls ? '.' + cls : '')); stage.replaceChildren(r); return r; };
  X.playArea = (ctx) => ctx.frame.querySelector('.elp-play') || ctx.stage;

  const SVG_EAR = BQ.icons.ear;
  X.earBtn = (onClick, cls) => h('button.x5-ear' + (cls ? '.' + cls : ''), { type: 'button', 'aria-label': 'اسْمَعْ', onclick: onClick, html: SVG_EAR });

  /** بطاقات صور — items: [{key, aria}] · onPick(item, btn) → {el, btns, lock(v), byKey(k)} */
  X.cards = function (parent, items, opt) {
    opt = opt || {};
    const wrap = h('div.x5-cards', { role: 'group', 'aria-label': 'صُوَرٌ' });
    const btns = items.map((it) => {
      const b = h('button.x5-card', { type: 'button', 'aria-label': it.aria || 'صورة', dataset: { k: it.key } }, X.pic(it.key), h('span.x5-tick', { 'aria-hidden': 'true', html: BQ.icons.check }));
      b.item = it;
      b.addEventListener('click', () => { if (wrap.classList.contains('is-locked') || b.classList.contains('is-gone')) return; opt.onPick && opt.onPick(it, b); });
      return b;
    });
    wrap.append(...btns);
    parent.append(wrap);
    return { el: wrap, btns, lock(v) { wrap.classList.toggle('is-locked', v !== false); }, byKey: (k) => btns.find((b) => b.dataset.k === k) };
  };

  /** جولة «المس الصورة» بمحاولتين (سياسة الإطار v2 §٧):
   *  opt: {items:[{key, aria, snd}], correct, prompt:async, tapSound:bool, onRight:async(btn), onWrong1:async(it,btn), onWrong2:async(it,btn,cbtn), dimOthers}
   *  → {res:'first'|'second'|'shown', picks:[keys]} */
  X.pickRound = function (S, parent, opt) {
    return new Promise((resolve) => {
      let tries = 0, busy = false;
      const picks = [];
      const items = opt.shuffle === false ? opt.items.slice() : BQ.shuffle(opt.items);
      const C = X.cards(parent, items, {
        onPick: async (it, b) => {
          if (busy) return; busy = true; C.lock(); picks.push(it.key);
          if (opt.tapSound && it.snd) { b.classList.add('is-heard'); await S.stim(it.snd); b.classList.remove('is-heard'); }
          const cb = C.byKey(opt.correct);
          if (it.key === opt.correct) {
            b.classList.add('is-ok'); anim(b, 'fx-pop', 450); S.fx(L.ding, 0.4);
            if (opt.onRight) await opt.onRight(b);
            return resolve({ res: tries === 0 ? 'first' : 'second', picks, C });
          }
          tries++;
          anim(b, 'fx-shake', 500); b.classList.add('is-dim');
          if (tries === 1) {
            if (opt.onWrong1) await opt.onWrong1(it, b);
            b.classList.remove('is-dim'); busy = false; C.lock(false);
          } else {
            C.btns.forEach((x) => { if (x !== cb) x.classList.add('is-dim'); });
            cb.classList.add('is-glow'); anim(cb, 'fx-pulse', 1300);
            if (opt.onWrong2) await opt.onWrong2(it, b, cb);
            cb.classList.remove('is-glow'); cb.classList.add('is-ok');
            await S.sleep(500);
            resolve({ res: 'shown', picks, C });
          }
        },
      });
      C.lock();
      opt.onCards && opt.onCards(C);
      (async () => { if (opt.prompt) await opt.prompt(); C.lock(false); })();
    });
  };

  /* ---------- زرّا بارق (منقول من BQ.elJudge في EL01 v0-12 — بلا كتابة على شاشة الطفل) ---------- */
  const JDEF = {
    same: { pose: 'clap', line: L.brqSame, aria: 'صَوْتٌ واحِدٌ — بارِقٌ يُصَفِّقُ' },
    diff: { pose: 'cheer', line: L.brqDiff, aria: 'سَمِعْتُ فَرْقاً — بارِقٌ يَقْفِزُ' },
  };
  X.judge = function (parent, opt) {
    opt = opt || {};
    const wrap = h('div.x5-judge', { role: 'group', 'aria-label': 'صَوْتٌ واحِدٌ، أَمْ سَمِعْتَ فَرْقاً؟' });
    const btns = ['same', 'diff'].map((id) => {
      const d = JDEF[id];
      const img = h('img', { alt: '', draggable: 'false', decoding: 'async', src: BQ.char.still(d.pose) });
      const b = h('button.x5-jb', { type: 'button', 'aria-label': d.aria, dataset: { id } }, h('span.bq-brq', { 'aria-hidden': 'true' }, img), h('span.x5-sr', null, d.aria));
      b.pose = (on) => { img.src = on && !reduced() ? BQ.char.anim(d.pose) : BQ.char.still(d.pose); b.classList.toggle('is-act', !!on); };
      b.addEventListener('click', () => { if (wrap.classList.contains('is-locked')) return; opt.onPick && opt.onPick(id, b); });
      return b;
    });
    wrap.append(...btns);
    parent.append(wrap);
    const api = {
      el: wrap, btns,
      byId: (id) => btns.find((b) => b.dataset.id === id),
      lock(v) { wrap.classList.toggle('is-locked', v !== false); },
      /** الزرّ يتحرّك ويقول عبارته بصوت بارق */
      async act(S, id, o) { o = o || {}; const b = api.byId(id); b.pose(true); if (o.line === false) await S.sleep(o.ms || 1400); else await S.say(JDEF[id].line); await S.sleep(250); b.pose(false); },
      reset() { btns.forEach((b) => { b.classList.remove('is-ok', 'is-dim', 'is-glow'); b.pose(false); }); },
    };
    return api;
  };
  X.judge.DEF = JDEF;

  /** الدليل: صورتا المصدرين جنباً إلى جنب (المفتاح نفسه مرّتين = صوت واحد) */
  X.evidence = function (parent, a, b) {
    const el = h('div.x5-evid' + (a === b ? '.same' : ''), { role: 'img', 'aria-label': a === b ? 'صَوْتٌ واحِدٌ' : 'صَوْتانِ مُخْتَلِفانِ' }, h('span', null, X.pic(a)), h('i', { 'aria-hidden': 'true' }), h('span', null, X.pic(b)));
    parent.append(el);
    el.parts = [el.children[0], el.children[2]];
    return el;
  };

  /** مشغّل صوتين: زرّ أذن + شريط يتقدّم مع الصوتين — play(S, [a, b]) */
  X.player = function (parent, onReplay) {
    const fill = h('i');
    const ear = X.earBtn(() => { BQ.audio.unlock && BQ.audio.unlock(); onReplay && onReplay(); });
    const el = h('div.x5-player', null, ear, h('span.x5-bar', { 'aria-hidden': 'true' }, fill, h('b')));
    parent.append(el);
    const set = (pct, dur) => { fill.classList.toggle('run', !!dur); fill.style.setProperty('--d', (dur || 0) + 'ms'); fill.style.width = pct + '%'; };
    return {
      el, ear,
      async play(S, pair) {
        ear.classList.add('is-on'); set(0); void fill.offsetWidth;
        for (let i = 0; i < pair.length; i++) {
          const t0 = performance.now();
          set((i + 1) * 100 / pair.length, 1300);
          await S.stim(pair[i]);
          const left = 650 - (performance.now() - t0); if (left > 0 && i < pair.length - 1) await S.sleep(Math.min(left, 400));
          if (i < pair.length - 1) await S.sleep(450);
        }
        ear.classList.remove('is-on');
      },
      reset() { set(0); ear.classList.remove('is-on'); },
    };
  };

  /* ---------- يد الإرشاد ---------- */
  const HAND = '<svg viewBox="0 0 64 64"><path d="M24 58c-4-4-9-11-12-16-2-3 1-6 4-4l6 5V12a4 4 0 0 1 8 0v18-4a4 4 0 0 1 8 0v4-2a4 4 0 0 1 8 0v4a4 4 0 0 1 8 0v12c0 7-3 12-7 14z" fill="#fff" stroke="#00345B" stroke-width="3" stroke-linejoin="round"/></svg>';
  /** يد تتحرّك إلى عنصر وتلمسه (عرض بارق/المثال المحلول) */
  X.ghostTap = async function (S, host, target, opt) {
    opt = opt || {};
    if (!target || !host) return;
    const hand = h('span.x5-hand', { 'aria-hidden': 'true', html: HAND });
    const hr = host.getBoundingClientRect();
    const pos = (el) => { const r = el.getBoundingClientRect(); return { left: (r.left - hr.left + r.width * 0.5 - 18) + 'px', top: (r.top - hr.top + r.height * 0.55) + 'px' }; };
    Object.assign(hand.style, { left: (hr.width * 0.5) + 'px', top: (hr.height + 10) + 'px' });
    host.append(hand);
    await S.sleep(30);
    Object.assign(hand.style, pos(target));
    await S.sleep(reduced() ? 100 : 800);
    hand.classList.add('tap'); await S.sleep(180); hand.classList.remove('tap');
    if (opt.onTap) await opt.onTap();
    if (opt.keep) return hand;
    await S.sleep(300); hand.remove();
    return null;
  };
  X.handSVG = HAND;

  /* ---------- لوحة المعلّم: ضغط مطوَّل (ثانيتان) على بارق الصغير في الزاوية ---------- */
  const TICON = {
    alone: { aria: 'وَحْدَهُ', svg: '<svg viewBox="0 0 48 48"><path d="M24 4l5.6 12.3 13.4 1.4-10 9 2.9 13.2L24 33.2 12.1 39.9 15 26.7l-10-9 13.4-1.4z" fill="#FEBA02" stroke="#C98F00" stroke-width="2" stroke-linejoin="round"/></svg>' },
    help: { aria: 'بِمُساعَدَةٍ', svg: '<svg viewBox="0 0 48 48"><circle cx="17" cy="12" r="6" fill="#00AEED"/><path d="M6 42c0-11 5-18 11-18s11 7 11 18z" fill="#00AEED"/><circle cx="34" cy="20" r="5" fill="#0077A8"/><path d="M25 42c0-8 4-14 9-14s9 6 9 14z" fill="#0077A8"/></svg>' },
    notyet: { aria: 'لَيْسَ بَعْدُ', svg: '<svg viewBox="0 0 48 48"><path d="M24 44V24" stroke="#1B7F53" stroke-width="4" stroke-linecap="round"/><path d="M24 26c-2-9-9-13-17-12 1 8 8 13 17 12zM24 22c2-8 8-12 16-11-1 8-7 12-16 11z" fill="#3DBB6B" stroke="#1B7F53" stroke-width="2" stroke-linejoin="round"/><path d="M12 44h24" stroke="#8B5A2B" stroke-width="4" stroke-linecap="round"/></svg>' },
    done: { aria: 'أَتِمَّ بِمُساعَدَةٍ', svg: '<svg viewBox="0 0 48 48"><path d="M11 25l9 9 17-19" fill="none" stroke="#1B7F53" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    skip: { aria: 'التّالي', svg: '<svg viewBox="0 0 48 48"><path d="M30 10 16 24l14 14" fill="none" stroke="#00345B" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
  };
  X.TICON = TICON;
  /** X.teacher(ctx, {icons:['alone','help','notyet'], onPick(id)}) → {el, ask() → Promise<id>, open(), close(), remove(), wait(on)} */
  X.teacher = function (ctx, opt) {
    opt = opt || {};
    const host = X.playArea(ctx);
    const brq = BQ.ui.brq('idle');
    const btn = h('button.x5-tc', { type: 'button', 'aria-label': 'لِلْمُعَلِّمِ: اضْغَطْ مُطَوَّلاً (ثانِيَتانِ)', title: 'للمعلّم: اضغط مطوّلاً' }, brq);
    let panel = null, t = 0, raf = 0, t0 = 0, waiter = null, pending = null;
    const icons = opt.icons || ['alone', 'help', 'notyet'];
    const close = () => { if (panel) { panel.remove(); panel = null; } };
    const pick = (id) => { close(); const w = waiter; waiter = null; if (opt.onPick) opt.onPick(id); if (w) w(id); else pending = id; };
    const open = () => {
      close();
      panel = h('div.x5-tpanel', { role: 'group', 'aria-label': 'لِلْمُعَلِّمِ' }, icons.map((k) => h('button', { type: 'button', 'aria-label': TICON[k].aria, title: TICON[k].aria, html: TICON[k].svg, onclick: () => pick(k) })));
      host.append(panel);
      try { panel.querySelector('button').focus({ preventScroll: true }); } catch (e) { /* */ }
    };
    const fill = () => { const p = Math.min(1, (performance.now() - t0) / 2000); btn.style.setProperty('--p', p); if (p < 1) raf = requestAnimationFrame(fill); };
    const cancel = () => { clearTimeout(t); cancelAnimationFrame(raf); btn.style.setProperty('--p', 0); };
    btn.addEventListener('pointerdown', (e) => { if (e.cancelable) e.preventDefault(); try { btn.setPointerCapture(e.pointerId); } catch (x) { /* */ } cancel(); t0 = performance.now(); raf = requestAnimationFrame(fill); t = setTimeout(() => { cancel(); open(); }, 2000); });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => btn.addEventListener(ev, cancel));
    btn.addEventListener('contextmenu', (e) => e.preventDefault());
    btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } }); // لوحة المفاتيح: فتح مباشر
    host.append(btn);
    const outside = (e) => { if (panel && !panel.contains(e.target) && !btn.contains(e.target)) close(); };
    document.addEventListener('pointerdown', outside, true);
    ctx.onCleanup(() => { cancel(); document.removeEventListener('pointerdown', outside, true); btn.remove(); close(); });
    return {
      el: btn,
      /** ينتظر اختيار المعلّم (أو يعيد اختياراً سبق أثناء النموذج) */
      ask() { if (pending) { const p = pending; pending = null; return Promise.resolve(p); } return new Promise((r) => { waiter = r; }); },
      clear() { pending = null; },
      wait(on) { btn.classList.toggle('is-wait', on !== false); },
      open, close,
      remove() { cancel(); close(); btn.remove(); },
    };
  };

  /** زرّ «التالي» بأيقونة وحدها يظهر بعد مهلة إن لم يختر المعلّم (يُسجَّل «لم يُلاحَظ») */
  X.skipAfter = function (S, parent, ms, onSkip) {
    let b = null;
    const t = S.later(() => { b = h('button.x5-skip', { type: 'button', 'aria-label': 'التّالي' }, BQ.icon('next')); b.onclick = () => { b.remove(); onSkip(); }; parent.append(b); }, ms);
    return { cancel() { S.clear(t); if (b) b.remove(); } };
  };

  /** زرّ بدء دائريّ (أيقونة) — يُحلّ عند اللمس */
  X.goBtn = (parent, aria) => new Promise((res) => { const b = h('button.x5-go', { type: 'button', 'aria-label': aria || 'ابْدَأْ', html: BQ.icons.play }); b.onclick = () => { BQ.audio.unlock && BQ.audio.unlock(); b.remove(); res(); }; parent.append(b); requestAnimationFrame(() => { try { b.focus({ preventScroll: true }); } catch (e) { /* */ } }); });

  /** بارق يطلّ من الحافّة ويقول/يتحرّك (BQ.ui.bariq) — عبر الجلسة */
  X.bariq = (S, stage, lineId, opt) => (S.live ? S.gate((async () => {
    const r = lineId ? await X.resolve(lineId) : null;
    if (!r || r.kind === 'core') return BQ.ui.bariq(stage, r ? r.id : null, opt);
    const pr = X.say(lineId); return BQ.ui.bariq(stage, null, Object.assign({ ms: 1 }, opt)).then(() => pr);
  })()) : never());

  /** الختام: بارق يصفّق — بلا نقاط ولا رقم؛ «أَعِدْ» (أيقونة) و«التّالي» */
  X.finish = function (S, ctx, opt) {
    opt = opt || {};
    const host = X.playArea(ctx);
    const nextBtn = h('button.bq-btn', { type: 'button', onclick: () => { BQ.audio.unlock && BQ.audio.unlock(); BQ.goNext(); } }, 'التّالي', BQ.icon('next'));
    const again = h('button.bq-btn.ghost.x5-again', { type: 'button', 'aria-label': 'أَعِدِ النَّشاطَ', title: 'أعد النشاط', onclick: () => BQ.open(ctx.meta.id, { skipCover: true, history: 'replace' }) }, BQ.icon('replay'));
    const el = h('div.x5-end', { role: 'dialog', 'aria-label': 'انْتَهى النَّشاطُ' }, BQ.ui.brq(opt.pose || 'clap', null, 6500), opt.extra || null, h('div.x5-end-row', null, again, nextBtn));
    host.append(el);
    requestAnimationFrame(() => { try { nextBtn.focus({ preventScroll: true }); } catch (e) { /* */ } });
    if (opt.line) S.say(opt.line);
    return el;
  };

  /** خرزات (تقدّم لا درجة) */
  X.beads = function (parent, n) {
    const bs = Array.from({ length: n }, () => h('i'));
    const el = h('div.x5-beads', { 'aria-hidden': 'true' }, bs);
    parent.append(el);
    return { el, on(i) { if (bs[i]) { bs[i].classList.add('on'); BQ.audio.fx(L.bead, 0.5); } }, reset() { bs.forEach((b) => b.classList.remove('on')); }, all() { bs.forEach((b) => b.classList.add('on')); } };
  };

  /* ---------- همهمة «مْـ» ممدودة ما دام الإصبع يتحرّك ---------- */
  X.hum = function (S, id) {
    let au = null, idle = 0, src = null;
    X.srcOf(id || L.mm).then((s) => { src = s; });
    const ensure = () => {
      if (au || !src) return au;
      au = (BQ.audio.pooled && BQ.audio.pooled()) || new Audio();
      au.src = src; au.loop = true; au.volume = 0.9; au._bqClaim = Date.now() + 1e9;
      return au;
    };
    const api = {
      on() { if (!S.live) return; const a = ensure(); if (!a) return; clearTimeout(idle); if (a.paused) { const p = a.play(); if (p && p.catch) p.catch(() => {}); } idle = setTimeout(api.off, 260); },
      off() { clearTimeout(idle); if (au && !au.paused) try { au.pause(); } catch (e) { /* */ } },
      stop() { api.off(); if (au) { au.loop = false; au._bqClaim = 0; try { au.removeAttribute('src'); au.load(); } catch (e) { /* */ } au = null; } },
    };
    S.ctx.onCleanup(api.stop);
    return api;
  };

  /* ---------- كتابة «م» المنفصلة بحركة واحدة (ق-٢): من نقطة الالتقاء أسفل يسار الرأس صعوداً، دورة، ثم الذيل نازلاً ---------- */
  const NS = 'http://www.w3.org/2000/svg';
  const MEEM = 'M45.81 53.19 A13 13 0 1 1 68 44 A13 13 0 0 1 45.81 53.19 Q40.5 60 40.5 72 L40.5 82 Q40.5 88 35 89.5';
  const ARROWS = ['M36.5 50 Q34 39 42 32', 'M33.5 63 L33.5 80'];
  X.MEEM = MEEM;
  /** X.trace(parent, {arrows:true|'faint'|false, dotted, hum, onStumble(n), onDone(info)}) → {el, done:Promise, demo(S, ms), fill(), reset()} */
  X.trace = function (parent, opt) {
    opt = opt || {};
    const el = h('div.x5-tr' + (opt.arrows === 'faint' ? '.faint' : ''), { role: 'img', 'aria-label': 'تَتَبَّعْ بِإِصْبَعِكَ' });
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '24 22 56 72');
    const mk = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); svg.append(e); return e; };
    svg.innerHTML = '<defs><marker id="x5ah' + (X._mk = (X._mk || 0) + 1) + '" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#E4553F"/></marker></defs>';
    const mid = 'x5ah' + X._mk;
    mk('path', { d: MEEM, class: 'road' });
    if (opt.dotted !== false) mk('path', { d: MEEM, class: 'dots' });
    const ink = mk('path', { d: MEEM, class: 'ink' });
    const demoInk = mk('path', { d: MEEM, class: 'demo' });
    if (opt.arrows) { const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'arr'); ARROWS.forEach((d) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); p.setAttribute('marker-end', 'url(#' + mid + ')'); g.append(p); }); svg.append(g); }
    const nextp = mk('circle', { class: 'nextp', r: 3, cx: 0, cy: 0 });
    const start = mk('circle', { class: 'start pulse', cx: 45.81, cy: 53.19, r: 3.4 });
    el.append(svg);
    parent.append(el);
    const Ltot = ink.getTotalLength();
    const N = 160;
    const pts = Array.from({ length: N + 1 }, (_, i) => { const q = ink.getPointAtLength(Ltot * i / N); return [q.x, q.y]; });
    [ink, demoInk].forEach((p) => { p.style.strokeDasharray = Ltot + ' ' + Ltot; p.style.strokeDashoffset = Ltot; });
    let prog = 0, down = false, lost = false, done = false, stumbles = 0, resolveDone;
    const donePromise = new Promise((r) => { resolveDone = r; });
    const setInk = () => { ink.style.strokeDashoffset = Ltot * (1 - prog / N); };
    const TOL = opt.tol || 9, START = 8;
    const toSvg = (e) => { const m = svg.getScreenCTM(); if (!m) return null; const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const q = p.matrixTransform(m.inverse()); return [q.x, q.y]; };
    const d2 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
    const flashNext = () => { const i = Math.min(N, prog + 14); nextp.setAttribute('cx', pts[i][0]); nextp.setAttribute('cy', pts[i][1]); nextp.classList.remove('on'); void nextp.getBBox(); nextp.classList.add('on'); };
    const flashStart = () => { start.classList.remove('pulse'); void start.getBBox(); start.classList.add('pulse'); anim(el, 'fx-pulse', 900); };
    const stumble = () => { stumbles++; if (opt.onStumble) opt.onStumble(stumbles); };
    const finish = (info) => { if (done) return; done = true; down = false; prog = N; setInk(); el.classList.add('is-done'); if (opt.hum) opt.hum.off(); resolveDone(Object.assign({ stumbles }, info || {})); if (opt.onDone) opt.onDone(Object.assign({ stumbles }, info || {})); };
    const advance = (p) => {
      let best = -1, bd = 1e9;
      const lo = Math.max(0, prog - 6), hi = Math.min(N, prog + 22);
      for (let i = lo; i <= hi; i++) { const dd = d2(p, pts[i]); if (dd < bd) { bd = dd; best = i; } }
      if (bd > TOL) { if (!lost) { lost = true; flashNext(); stumble(); } if (opt.hum) opt.hum.off(); return; }
      if (lost) { if (Math.abs(best - prog) > 10) return; lost = false; }
      if (best > prog) { prog = best; setInk(); if (opt.hum) opt.hum.on(); }
      if (prog >= N - 3) finish({});
    };
    svg.addEventListener('pointerdown', (e) => {
      if (done || el.classList.contains('is-demo')) return;
      if (e.cancelable) e.preventDefault();
      const p = toSvg(e); if (!p) return;
      if (prog === 0 && d2(p, pts[0]) > START + 4) { flashStart(); return; }
      if (prog > 0 && d2(p, pts[prog]) > TOL * 1.3) {
        // بعد رفع الإصبع: يكمل من حيث توقّف، أو يبدأ من جديد من النقطة الخضراء
        if (d2(p, pts[0]) <= START + 4) { prog = 0; setInk(); }
        else { flashNext(); return; }
      }
      down = true; lost = false; start.classList.remove('pulse');
      try { svg.setPointerCapture(e.pointerId); } catch (x) { /* */ }
      advance(p);
    });
    svg.addEventListener('pointermove', (e) => {
      if (!down || done) return; if (e.cancelable) e.preventDefault();
      const ev = e.getCoalescedEvents ? e.getCoalescedEvents() : null;
      (ev && ev.length ? ev : [e]).forEach((c) => { const p = toSvg(c); if (p && down) advance(p); });
    });
    const up = (e) => { if (!down) return; down = false; if (opt.hum) opt.hum.off(); try { svg.releasePointerCapture(e.pointerId); } catch (x) { /* */ } if (!done && prog > 0 && !lost) { stumble(); flashNext(); } };
    svg.addEventListener('pointerup', up); svg.addEventListener('pointercancel', up);
    const noScroll = (e) => { if (e.cancelable) e.preventDefault(); };
    el.addEventListener('touchstart', noScroll, { passive: false });
    el.addEventListener('touchmove', noScroll, { passive: false });
    el.addEventListener('contextmenu', noScroll);
    return {
      el, done: donePromise,
      get stumbles() { return stumbles; },
      /** القلم يرسم «م» بحركة واحدة (النموذج) */
      demo(S, ms) {
        ms = reduced() ? 300 : ms || 2600;
        el.classList.add('is-demo');
        const pen = mk('circle', { class: 'pen', r: 3.2, cx: pts[0][0], cy: pts[0][1] });
        demoInk.style.strokeDashoffset = Ltot; demoInk.style.opacity = 1;
        return new Promise((res) => {
          const t0 = performance.now();
          const tick = () => {
            if (!S.live) { pen.remove(); return; }
            const k = Math.min(1, (performance.now() - t0) / ms);
            const q = pts[Math.round(k * N)];
            pen.setAttribute('cx', q[0]); pen.setAttribute('cy', q[1]);
            demoInk.style.strokeDashoffset = Ltot * (1 - k);
            if (k < 1) requestAnimationFrame(tick); else { pen.remove(); el.classList.remove('is-demo'); res(); }
          };
          requestAnimationFrame(tick);
        });
      },
      clearDemo() { demoInk.style.strokeDashoffset = Ltot; },
      fill() { finish({ assisted: true }); },
      reset() { prog = 0; lost = false; down = false; stumbles = 0; setInk(); start.classList.add('pulse'); },
    };
  };

  /* ================= سجلّ المعلّم ودليله ================= */
  X.rec = (id) => ({
    get() { return (BQ.store && BQ.store.get('ix5-' + id, null)) || null; },
    set(v) { if (BQ.store) BQ.store.set('ix5-' + id, Object.assign({ t: Date.now() }, v)); },
  });
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  X.esc = esc;
  /** دليل المعلّم: يُضاف تحت نصّ المنصّة (data.js: ماذا يفعل الطفل · للمعلّم) ولا يحلّ محلّه — {goal, steps, teacher, fb, icons, note} */
  X.guide = function (ctx, g) {
    const body = ctx.frame.querySelector('.elp-adult-body'); if (!body) return;
    const li = (a) => (a || []).map((t) => '<li>' + t + '</li>').join('');
    const hasGoal = !!(ctx.meta && ctx.meta.cover_lead);
    const html = '' +
      (g.goal && !hasGoal ? '<p class="goal"><b>الهدف الواحد:</b> ' + g.goal + '</p>' : '') +
      (g.icons ? '<p class="age"><b>لوحتك</b> — اضغط مطوّلاً (ثانيتين) على بارق الصغير في زاوية النشاط: ' + g.icons + '</p>' : '') +
      (g.steps && g.steps.length ? '<p class="lbl">ما يجري على الشاشة</p><ol class="do">' + li(g.steps) + '</ol>' : '') +
      (g.teacher && g.teacher.length ? '<p class="lbl">أثناء النشاط</p><ul class="do">' + li(g.teacher) + '</ul>' : '') +
      (g.fb ? '<p class="age"><b>التغذية الراجعة:</b> ' + g.fb + '</p>' : '') +
      (g.note ? '<p class="meta">' + g.note + '</p>' : '');
    const old = body.querySelector('.x5-guide'); if (old) old.remove();
    body.append(h('div.x5-guide', { html }));
  };
  X.ICON_LEGEND = '<span style="display:inline-flex;gap:10px;align-items:center;vertical-align:middle">' +
    ['alone', 'help', 'notyet'].map((k) => '<span style="display:inline-flex;align-items:center;gap:4px"><span style="width:26px;height:26px;display:inline-block">' + TICON[k].svg.replace('<svg', '<svg width="26" height="26"') + '</span>' + TICON[k].aria + '</span>').join(' · ') + '</span>';
  /** نتيجة في دليل المعلّم (أعلى الدليل) */
  X.result = function (ctx, html) {
    const b = ctx.frame.querySelector('.elp-adult-body'); if (!b) return;
    let r = b.querySelector(':scope > .x5-res');
    if (!r) { r = h('div.x5-res'); b.prepend(r); }
    r.innerHTML = html;
  };
  /** قائمة بدائل الصور المؤقّتة المستعملة (لملاحظات المراجِع) */
  X.phNote = async function (ctx, keys) {
    const out = [];
    for (const k of keys) { const a = await X.art(k); if (a.placeholder) out.push(k); }
    if (!out.length || !ctx.alive()) return;
    const b = ctx.frame.querySelector('.elp-adult-body'); if (!b) return;
    b.append(h('p.meta', null, 'صور مؤقّتة إلى أن يصل فنّ v5: ' + out.join(' · ')));
  };

  BQ.ix5 = X;
})();

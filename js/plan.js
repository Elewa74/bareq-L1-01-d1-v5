/* plan.js — «خطة الدرس ودليل المعلّم» لـ L1-01-d1 «صَوْتُ الميم» — النسخة v6 (draft_unapproved)
   v6: ١٩ عنصراً (فيديو ١٠ · لعبة ٩) بترتيب خطّة الفيديو v6 · «دليل المعلّم في صفحة واحدة» (القسم ٢) · «بوصلة الأصوات» · لكلّ عنصر
   الحقول الثمانية من البيانات (meta.guide) · أرقام الإطار v2 (#٣…) تُعرض بأسماء العناصر لأنّ ترتيب v6 تغيّر.
   المصادر: v5/storyboards/L1-01-d1_ID_framework_v2.md · L1-01-d1_storyboards_v5.md — مقروءة عبر BQ_DATA (build_data_v5.py):
   elements[] (النوع · المحطّة · الهدف · اللحظات/اللوحات · ✋ · التغذية · لماذا هنا) و v5 (الفكرة · النواتج · دور المعلّم · الأنشودة).
   الترتيب ١–١٦ (ق٤-١) · فيديو ٧ / تفاعلي ٩ · موضعا توقّف مقترحان بعد #٥ وبعد #١٠ (ق٤-٣) · الخطاب للمعلّم. لا شيء هنا معتمَد. */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ أدوات */
  const AR = '٠١٢٣٤٥٦٧٨٩';
  const ar = (n) => String(n).replace(/\./g, '٫').replace(/[0-9]/g, (d) => AR[d]);
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const KID_WORDS = /^(ماء|ماءْ|م|مـ|ـم|ـمـ|مْـ|ـاءْ|آ)$/;
  // كل ما بين «» مشكولاً (أو من كلمات الطفل) يُنضَّد بخطّ الطفل
  const fmt = (s) => esc(s)
    .replace(/«([^»]+)»/g, (m, t) => (/[ً-ْ]/.test(t) || KID_WORDS.test(t)) ? '«<span class="lp-k">' + t + '</span>»' : m)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  const D = window.BQ_DATA || {};
  const V5 = D.v5 || {};
  const ELS = (D.elements || []).slice().sort((a, b) => a.menu - b.menu);
  const META = {}; ELS.forEach((e) => { META[e.id] = e; });
  const byNum = (n) => ELS[n - 1];
  const byFw = (n) => ELS.find((e) => e.fw === n && e.id !== 'EL02B'); // رقم الإطار v2 (#١٠) ← العنصر
  /** «#١٠» (ترقيم الإطار) ← «تدرّب» — ترتيب v6 مختلف، فالأسماء أوضح للمعلّم */
  const fwText = (s) => String(s || '').replace(/#([٠-٩]+)(?:\s*و\s*#([٠-٩]+))?/g, (m, a, b) => {
    const f = (x) => { const e = byFw(+x.replace(/[٠-٩]/g, (d) => AR.indexOf(d))); return e ? '«' + e.name + '»' : m; };
    return b ? f(a) + ' و' + f(b) : f(a); }).replace(/–«/g, ' إلى «').replace(/(«[^»]+»)\s*\1/g, '$1');
  const nameOf = (id) => (META[id] ? META[id].name : id);
  const isVid = (id) => META[id] && META[id].kind === 'video';
  const icon = (id, cls) => (META[id] && META[id].icon) ? '<img class="' + (cls || 'lp-ic') + '" src="' + META[id].icon + '" alt="" loading="lazy">' : '';
  const badge = (id) => '<span class="lp-type ' + (isVid(id) ? 'is-video' : 'is-int') + '">' + (isVid(id) ? 'فيديو' : 'لعبة') + '</span>';
  const openBtn = (id, label) => '<button type="button" class="lp-open" data-open="' + id + '">' + (label || 'افتح العنصر') + '</button>';
  const elLink = (id) => '<button type="button" class="lp-chip lp-chip-el" data-open="' + id + '" title="افتح «' + esc(nameOf(id)) + '»">' + ar(META[id] ? META[id].menu : '') + ' ' + esc(nameOf(id)) + '</button>';
  const table = (head, rows, cls) => '<div class="lp-tw"><table class="lp-t ' + (cls || '') + '"><thead><tr>' + head.map((h) => '<th scope="col">' + esc(h) + '</th>').join('') + '</tr></thead><tbody>' +
    rows.map((r) => (r.pause ? '<tr class="lp-pause-row"><td colspan="' + head.length + '">' + r.pause + '</td></tr>' : '<tr>' + r.map((c, i) => (i === 0 ? '<th scope="row">' : '<td>') + c + (i === 0 ? '</th>' : '</td>')).join('') + '</tr>')).join('') + '</tbody></table></div>';
  /** «#١٠» في نصوص المصادر ← رقائق العناصر */
  const refs = (s) => { const out = []; String(s || '').replace(/#([٠-٩]+)/g, (m, n) => { const e = byFw(+n.replace(/[٠-٩]/g, (d) => AR.indexOf(d))); if (e && !out.includes(e.id)) out.push(e.id); return m; }); return out; };
  const PAUSE = (n) => '<span class="lp-pause"><b>' + PI + 'موضع توقّف مقترح</b> بعد العنصر ' + ar(n) + ' — يمكن أن تقف بالدرس هنا وتكمل من العنصر ' + ar(n + 1) + ' في وقت آخر.</span>';
  const pauseAfter = V5.pause_after || [7, 13];
  const pauseNames = () => pauseAfter.map((n) => '«' + (byNum(n) || {}).name + '»').join(' وبعد ');
  const PI = '<svg class="lp-pi" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.5"/><rect x="14" y="5" width="4" height="14" rx="1.5"/></svg>';

  /* ------------------------------------------------------------------ البيانات الثابتة (من الإطار v2) */
  const P = {
    rows: [
      ['الدرس', 'الدرس الأوّل (د١) من النموذج L1-01 — أوّل درس في المنهج'],
      ['الصوت والرسم', '«مْـ» صوتاً ممدوداً بشفتين مطبقتين (لا يُقال اسم الحرف للطفل في هذا الدرس) · «م» المنفصلة رسماً'],
      ['الكلمة المدرَّسة', '«ماءْ» وحدها — وجملة سياقها «الماءُ في الصَّحْنِ.»'],
      ['العبارة المحورية', '«سَمِعْتُ فَرْقاً!» — تُقال حين يختلف صوتان'],
      ['الزمن', '≈ ٢٢–٢٨ د متّصلة بحسب العمر (منها ≈ ٦ د مشاهدة في ١٠ مقاطع قصيرة) + ≈ ٣ د في يوم لاحق («اختبر نفسك»)'],
      ['المسار', 'بقيادة المعلّم: يشاهد مع الأطفال ويوقف المقطع عند ✋، ويجلس بجانب الطفل في الألعاب'],
      ['الحالة', 'draft_unapproved — النسخة v6 مسوّدة للمراجعة؛ الألعاب التسع والمقاطع الجديدة قيد الإنتاج، وما لم يصل بعد يعمل ببديله']
    ],
    chars: [
      ['maj', 'ماجد', 'في الغرفة من أوّل الدرس (قميص أصفر): يسأل، ويفتح الباب لسيف، ويصبّ من الإبريق، ويعرض لوحه.', 'media/img/comp_cut_MAJ.webp'],
      ['say', 'سيف', 'يطرق الباب ويدخل مرّة واحدة في «وجدنا الماء» (قميص أزرق، والبوصلة على صدره): نموذج «مْـ» و«حركة مْـ»، ويكتب «م» ويرسم الخريطة.', 'media/img/comp_cut_SAY.webp'],
      ['brq', 'بارق', 'يطير، ويحمل البطاقات الخفيفة: يسأل «ما هَذا الصَّوْتُ؟»، ويخطئ مرّة واحدة (النافذة) ثم يُصحَّح، وزرّاه: يصفّق = «صَوْتٌ واحِدٌ» · يقفز = «سَمِعْتُ فَرْقاً!».', 'media/img/comp_cut_BRQ.webp']
    ],
    method: [
      ['الصوت أوّلاً', 'يسمعه في قصّة ← يميّزه ← ينطقه (وحده بعد ترديد جماعي) ← يسمعه في أوّل كلمة ← يرى رسمه ويصله بالصورة ← يكتبه ← يتدرّب ← يستعمله ← يلعب ← يلخّص ← ويُتحقَّق منه في يوم لاحق.'],
      ['تدرّج المسؤولية', 'أشاهد (١٠ مقاطع قصيرة) ← نجرّب معاً (٦ ألعاب يبدأ كلّاً منها بارق بجولة محلولة، والمعلّم بجانب الطفل) ← أجرّب وحدي (٣: «تدرّب» المرصود و«العب» و«اختبر نفسك»).'],
      ['الإيقاع', 'كلّ مقطع فكرة واحدة ≤ ٤٥ ث، ولا أكثر من دقيقتين مشاهدةً متتالية؛ وموضعا توقّف مقترحان بعد «تحدّث» وبعد «تدرّب».'],
      ['حركة مْـ', 'شفتان مطبقتان وسبّابة على جانب الأنف — يراها الطفل في «فمي مغلق» ويعيدها في «هتاف الصفّ» و«تحدّث» و«أغنّي» و«الخريطة الذهنية»، وتصحّح بها بدل الكلام.'],
      ['بوصلة الأصوات', 'إطار تقدّم واحد للألعاب: كلّ لعبة تُكمَل يضيء قوسها (بالإكمال لا بالدرجة)، و«العب» يضع «م» في قلبها ويقود إلى الخريطة.']
    ],
    rules: [
      'هدف واحد قابل للملاحظة لكلّ عنصر، وكلّ مقطع فكرة واحدة؛ الهدف التابع معلَن في «مفرداتي» و«اقرأ» فقط.',
      'النموذج قبل الممارسة: لا لعبة إلّا وقبلها مقطع يعرض الفعل نفسه، وكلّ لعبة تبدأ بجولة يلعبها بارق.',
      'الصوت لا اسم الحرف: يُرى الرسم «م» ويُسمع صوته «مْـ»؛ لا يُقال اسم الحرف للطفل في هذا الدرس.',
      'لا قراءة مطلوبة ولا نصّ للمعلّم على شاشة الطفل: التعليمات بصوت حبيبة، والمكتوب للطفل «ماءْ» و«م» فقط؛ ما للمعلّم في دليله وبالضغط المطوَّل.',
      'فيديو أو لعبة — لا خلط: المقطع يُشاهَد ويُردَّد ولا لمس فيه ولا يتوقّف وحده؛ اللعبة يفعل فيها الطفل ويتلقّى تغذية راجعة، وأطول صوت فيها ٥ ث.',
      'الواقعية: كلّ مقطع سلسلة أحداث في غرفة واحدة وباب واحد، وكلّ شيء على سطح أو في يد؛ الحركة في اللعبة تحدث للصواب وحده.',
      'المحاولات بحسب اللعبة (ق٦-١): ثلاث درجات في ألعاب التعلّم والتدرّب (الثالثة: الحلّ يظهر بلا احتفال) · محاولتان في الألعاب الخفيفة · قياس محايد بلا تلميح يكشف الجواب في «تدرّب» و«اختبر نفسك» · لا مؤقّت ولا قلوب ولا رقم أمام الطفل.',
      'المخاطبة: بالجمع في الفيديو («قولوا مَعي») وبالمفرد في اللعبة («أَصْغِ»، «جَرِّبْ»).',
      'لا كلمة جديدة تُدرَّس غير «ماءْ»؛ كلمات القصّة في «التراكيب» تعرّض مسموع، و«قطرة» في دليل المعلّم وحده (حيلة «م» تُرى ولا تُقال).'
    ],
    decisions: [
      ['ق٦-١', 'المحاولات بحسب اللعبة: ثلاث درجات (الثالثة تُظهر الحلّ بلا حركة) في ألعاب التعلّم · محاولتان في الخفيفة · قياس محايد في «تدرّب» و«اختبر نفسك».'],
      ['ق٦-٢', '«بوصلة الأصوات» إطار تقدّم عبر الدرس (٧ أقواس + قلب «م»)، والقوس يضيء بإكمال اللعبة لا بالدرجة.'],
      ['ق٦-٣', 'في «اقرأ» و«العب» المشتِّت البصري لـ«م» هو «م» مقلوبة أو معكوسة لا حروف أخرى.'],
      ['ق٦-٤', 'مستويات ١٠–١٢ بـ«مْـ» بصوت ماجد (ثبات الصوت عبر المتكلّمين) — **سُجِّل** «مْـ» بصوت ماجد ويُسمَع في «استمع وتعلّم» و«العب» لعمر ١٠–١٢.'],
      ['ق٦-٥', 'تقسيم «شاهد وتعلّم» إلى «وجدنا الماء» و«سمعت فرقاً»، ونقل كتابة «م» إلى المقطع الجديد «لاحظ وارسم».'],
      ['ق٦-٦', '«هتاف الصفّ» الجديد قبل «تحدّث» (ترديد جماعي قبل المحاولة الفردية).'],
      ['ق٦-٧', 'الأنشودة تُقصّ إلى ≈ ٤٢ ث، واللازمة تبقى ثلاث مرّات.'],
      ['ق٦-٨', 'حيلة «م = قطرة» تُرى ولا تُقال؛ كلمة «قطرة» في دليل المعلّم وحده.'],
      ['سابقة', 'ق٥-١ الناتج ١ بمشتِّت كلامي «آ» · ق٥-٢ لا اسم حرف في د١ · ق٤-٢ «تحدّث» بحكم المعلّم · ق٤-٣ موضعا التوقّف · ق-٢ «م» بحركة واحدة وسهمَي اتّجاه.']
    ]
  };

  /* ------------------------------------------------------------------ الأقسام */
  const SECTIONS = [
    ['lp-card', 'بطاقة الدرس'],
    ['lp-guide', 'دليل المعلّم في صفحة واحدة'],
    ['lp-obj', 'نواتج التعلّم'],
    ['lp-method', 'المنهجية وقواعد كلّ عنصر'],
    ['lp-compass', 'بوصلة الأصوات'],
    ['lp-map', 'مسار العناصر ١–١٩'],
    ['lp-flow', 'دليل كلّ عنصر بالتفصيل'],
    ['lp-assess', 'التقويم'],
    ['lp-role', 'دور المعلّم وموضعا التوقّف'],
    ['lp-song', 'كلمات الأنشودة'],
    ['lp-open-q', 'قرارات المالك في هذه النسخة']
  ];
  const SI = {}; SECTIONS.forEach((x, i) => { SI[x[0]] = i; });
  const sec = (k, body, lead) => {
    const i = typeof k === 'number' ? k : SI[k];
    const [id, title] = SECTIONS[i];
    return '<section class="lp-sec" id="' + id + '" aria-labelledby="' + id + '-h"><h2 id="' + id + '-h"><span class="lp-num">' + ar(i + 1) + '</span>' + fmt(title) + '</h2>' + (lead ? '<p class="lp-lead">' + fmt(lead) + '</p>' : '') + body + '</section>';
  };

  function cardHTML() {
    const nV = ELS.filter((e) => e.kind === 'video').length;
    const stats = [[ar(ELS.length), 'عنصراً'], [ar(nV), 'فيديو قصير'], [ar(ELS.length - nV), 'ألعاب'], ['١', 'نشاط مرصود'], ['≈ ٢٢–٢٨', 'دقيقة متّصلة'], ['٢', 'موضعا توقّف']];
    return sec('lp-card',
      '<div class="lp-hero">' +
        '<div class="lp-hero-glyph" aria-hidden="true"><span class="lp-k">م</span></div>' +
        '<div class="lp-hero-txt"><p class="lp-eyebrow">L1-01-d1 · المستوى الأوّل · الدرس الأوّل · ' + esc(V5.label || 'النسخة v6 — مسوّدة للمراجعة') + '</p><h3 class="lp-k">صَوْتُ الميم</h3>' +
        '<p class="lp-keys"><span>الكلمة <b class="lp-k">ماءْ</b></span><span>العبارة المحورية <b class="lp-k">سَمِعْتُ فَرْقاً!</b></span></p></div>' +
      '</div>' +
      '<p class="lp-idea">' + fmt(V5.idea || '') + '</p>' +
      (V5.question ? '<p class="lp-note"><b>السؤال المحرّك:</b> ' + fmt(fwText(V5.question)) + '</p>' : '') +
      '<ul class="lp-stats">' + stats.map((s) => '<li><b>' + s[0] + '</b><span>' + s[1] + '</span></li>').join('') + '</ul>' +
      '<dl class="lp-dl">' + P.rows.map((r) => '<div><dt>' + esc(r[0]) + '</dt><dd>' + fmt(r[1]) + '</dd></div>').join('') + '</dl>' +
      ((V5.world || []).length ? '<h3 class="lp-h3">عالم المشهد (يلتزمه كلّ مقطع وكلّ صورة)</h3><ul class="lp-list">' + V5.world.map((w) => '<li>' + fmt(w) + '</li>').join('') + '</ul>' : '') +
      '<h3 class="lp-h3">الشخصيات</h3><ul class="lp-chars">' + P.chars.map((ch) => '<li class="lp-char lp-char-' + ch[0] + '"><img src="' + ch[3] + '" alt="" loading="lazy"><div><b>' + ch[1] + '</b><p>' + fmt(ch[2]) + '</p></div></li>').join('') + '</ul>' +
      '<p class="lp-note">التعليمات المنطوقة للطفل بصوت واحد (حبيبة)، وليست شخصية على الشاشة.</p>');
  }

  /** v6: «دليل المعلّم في صفحة واحدة» — سطر لكلّ عنصر */
  function overviewHTML() {
    const rows = [];
    ELS.forEach((e) => {
      const g = e.guide || {};
      rows.push([
        '<span class="lp-obj-n">' + ar(e.menu) + '</span>',
        '<button type="button" class="lp-carrier" data-open="' + e.id + '">' + icon(e.id) + '<span>' + esc(e.name) + '</span>' + (e.is_scored ? '<em>مرصود</em>' : '') + '</button>' + badge(e.id) +
          (e.game && e.game.title ? '<br><small class="lp-k">«' + esc(e.game.title) + '»</small>' : ''),
        fmt(g.short || ''),
        fmt(e.goal) + '<br><small class="lp-muted">' + esc(e.station_short) + ' · ' + esc(e.gradual) + '</small>',
        '<span class="lp-pol">' + esc(g.attempts_short || '') + '</span>',
        esc(e.time)
      ]);
      if (pauseAfter.includes(e.menu)) rows.push({ pause: PAUSE(e.menu) });
    });
    const pol = V5.policy || {};
    const key = ['learn', 'light', 'teacher', 'measure', 'measure16', 'video'].filter((k) => pol[k]).map((k) => '<li><b>' + esc(pol[k].short) + ':</b> ' + fmt(pol[k].text) + '</li>').join('');
    return sec('lp-guide', table(['#', 'العنصر', 'ما هو', 'الغرض التعليمي · خطوة المنهجية', 'المحاولات', 'المدّة'], rows, 'lp-t-ov') +
      '<div class="lp-two"><div><h3 class="lp-h3">سياسات المحاولات</h3><ul class="lp-list">' + key + '</ul></div>' +
      '<div><h3 class="lp-h3">قبل الدرس وفي كلّ عنصر</h3><ul class="lp-list">' +
        '<li>تدرّب على <b>' + esc(V5.gesture || 'حركة مْـ') + '</b>؛ بها تصحّح بدل كلمة «خطأ»، ولا تسمِّ الحرف.</li>' +
        '<li>اختر عمر الطفل من «للمعلّم» (٤–٦ · ٧–٩ · ١٠–١٢): المحتوى واحد، والمستويات والسند تتغيّر.</li>' +
        '<li>في المقاطع: أوقِف عند ✋ ليردّد الأطفال. في الألعاب: اجلس بجانب الطفل ولا تلمس الجواب؛ بارق يلعب الجولة الأولى.</li>' +
        '<li>«دليل المعلّم» في كلّ عنصر (زرّ الدليل) فيه الحقول الثمانية ونتيجة اللعبة حين تنتهي.</li>' +
        '<li>إن تعذّرت لعبة على الجهاز تعمل نسختها الخفيفة تلقائياً، ويمكنك تشغيلها من الدليل.</li>' +
      '</ul></div></div>',
      'سطر لكلّ عنصر: ما هو، وغرضه التعليمي وخطوته في المنهجية، وسياسة المحاولات، والمدّة. التفاصيل الكاملة لكلّ عنصر في القسم «دليل كلّ عنصر بالتفصيل».');
  }

  /** v6: «بوصلة الأصوات» — الإطار وحالة البوصلة على هذا الجهاز */
  function compassHTML() {
    const C = V5.compass; if (!C) return '';
    const rows = (C.arcs || []).map((a) => '<li><b>القوس ' + ar(a.n) + '</b> ' + elLink(a.id) + ' <span class="lp-k">«' + esc(a.title) + '»</span></li>').join('');
    return sec('lp-compass',
      '<div class="lp-two"><div><p>' + fmt(C.story || '') + '</p><ol class="lp-list lp-arcs">' + rows +
        '<li><b>القلب «م»</b> ' + elLink(C.heart) + ' — تضيء الأقواس كلّها وتدور الإبرة نحو الصحن.</li><li><b>يوم جديد</b> ' + elLink(C.day) + ' — تتوهّج البوصلة المكتملة.</li></ol></div>' +
      '<div class="lp-cp"><div class="lp-cp-svg" data-compass></div><p class="lp-muted lp-cp-cap" data-compass-cap></p></div></div>',
      'تظهر للطفل رسماً بلا نصّ في رأس الصفحة، وكاملةً عند وضع «م» في قلبها وعند نهاية الدرس. تُحفظ على هذا الجهاز، و«بدء من جديد» يمسحها.');
  }
  /** نتائج الألعاب المحفوظة على هذا الجهاز («تدرّب» أوّلاً) */
  function paintResults(root) {
    const box = root.querySelector('[data-results]'); if (!box || !window.BQ || !BQ.ui || !BQ.ui.godotSaved) return;
    const ids = ['EL13'].concat(ELS.filter((e) => e.game && e.id !== 'EL13').map((e) => e.id));
    const parts = ids.map((id) => BQ.ui.godotSaved(id)).filter(Boolean);
    box.innerHTML = '<h3 class="lp-h3">نتائج الألعاب على هذا الجهاز</h3>' + (parts.length ? parts.map((x) => '<div class="lp-panel">' + x + '</div>').join('') : '<p class="lp-muted">لا نتائج محفوظة بعد؛ تظهر هنا وفي دليل كلّ لعبة حين تنتهي.</p>');
  }
  function paintCompass(root) {
    if (!window.BQ || !BQ.compass) return;
    const st = BQ.compass.state();
    root.querySelectorAll('[data-compass]').forEach((el) => { el.innerHTML = BQ.compass.svg(true); });
    root.querySelectorAll('[data-compass-cap]').forEach((el) => { el.textContent = 'على هذا الجهاز: ' + ar(st.arcs.length) + ' من ٧ أقواس' + (st.heart ? '، و«م» في القلب' : '') + (st.day ? '، وتوهّجت في اليوم التالي' : '') + '.'; });
  }

  function objHTML() {
    const rows = (V5.outcomes || []).map((o) => [
      '<span class="lp-obj-n">' + ar(o.n) + '</span>',
      fmt(o.text) + (o.note ? '<br><small class="lp-muted">' + fmt(o.note.replace(/\s*\(⏸[^)]*\)/, '')) + '</small>' : ''),
      '<span class="lp-skill">' + esc(o.skill) + '</span>',
      fmt(fwText(o.how).replace(/\s*·\s*«اختبر نفسك» ت([٠-٩])/g, ' · «اختبر نفسك» (البند $1)')),
      '<div class="lp-chips">' + refs(o.how).map(elLink).join('') + '</div>'
    ]);
    return sec('lp-obj', table(['#', 'الناتج', 'المهارة', 'كيف يُقاس', 'العناصر'], rows, 'lp-t-obj'),
      'المرصود رقمياً واحد («تدرّب»)؛ الباقي حكم المعلّم أو صفحة تقريره بالكلمات — لا رقم ولا درجة أمام الطفل.');
  }

  function methodHTML() {
    return sec('lp-method',
      '<dl class="lp-dl">' + P.method.map((r) => '<div><dt>' + esc(r[0]) + '</dt><dd>' + fmt(r[1]) + '</dd></div>').join('') + '</dl>' +
      '<h3 class="lp-h3">قواعد يلتزمها كلّ عنصر</h3><ol class="lp-list">' + P.rules.map((r) => '<li>' + fmt(r) + '</li>').join('') + '</ol>',
      'النموذج: «الصوت أوّلاً» بتدرّج المسؤولية — أشاهد ← نجرّب معاً ← أجرّب وحدي.');
  }

  function mapHTML() {
    const rows = [];
    ELS.forEach((e) => {
      rows.push([
        '<span class="lp-obj-n">' + ar(e.menu) + '</span>',
        '<button type="button" class="lp-carrier" data-open="' + e.id + '">' + icon(e.id) + '<span>' + esc(e.name) + '</span>' + (e.is_scored ? '<em>مرصود</em>' : '') + '</button>',
        badge(e.id),
        esc(e.station_short) + '<br><small class="lp-muted">' + esc(e.gradual) + '</small>',
        esc(e.time),
        fmt(e.goal) + (e.game && e.game.title ? '<br><small class="lp-muted">اللعبة: <span class="lp-k">«' + esc(e.game.title) + '»</span></small>' : '')
      ]);
      if (pauseAfter.includes(e.menu)) rows.push({ pause: PAUSE(e.menu) });
    });
    return sec('lp-map', table(['#', 'العنصر', 'النوع', 'المحطّة · التدرّج', 'المدّة', 'الهدف الواحد'], rows, 'lp-t-map'),
      'العناصر التسعة عشر بترتيب القائمة وزرّ «التالي»: ١٠ مقاطع قصيرة و٩ ألعاب، ولا عنصر هجين. المس اسم العنصر لفتحه.');
  }

  function guideBox(e) {
    const g = e.guide || {};
    const li = (t) => '<li>' + fmt(t) + '</li>';
    return '<dl class="lp-gd">' +
      '<div><dt>وصف العنصر</dt><dd>' + fmt(g.desc) + '</dd></div>' +
      '<div><dt>الغرض التعليمي</dt><dd><ul class="lp-list">' + (g.purpose || []).map(li).join('') + '</ul></dd></div>' +
      '<div><dt>كيف يخدم المنهجية</dt><dd>' + fmt(g.method) + '</dd></div>' +
      '<div><dt>طريقة التشغيل</dt><dd><ol class="lp-list">' + (g.run || []).map(li).join('') + '</ol></dd></div>' +
      '<div><dt>سياسة المحاولات</dt><dd><b>' + esc(g.attempts_short) + ':</b> ' + fmt(g.attempts) + '</dd></div>' +
      '<div class="lp-gd-fix"><dt>كيف تصحّح</dt><dd>' + fmt(g.correct) + '</dd></div>' +
      '<div><dt>ماذا تلاحظ وتسجّل</dt><dd>' + fmt(g.observe) + '</dd></div>' +
      '<div><dt>المدّة</dt><dd>' + esc(g.time) + '</dd></div>' +
      (g.lite ? '<div><dt>النسخة الخفيفة</dt><dd>' + fmt(g.lite.replace(/^في النسخة الخفيفة: /, '')) + '</dd></div>' : '') +
      (e.ages_adult && e.ages_adult['4-6'] ? '<div><dt>بحسب العمر</dt><dd><ul class="lp-list">' + ['4-6', '7-9', '10-12'].map((a) => '<li><b>' + ar(a.replace('-', '–')) + ':</b> ' + fmt(e.ages_adult[a] || '') + '</li>').join('') + '</ul></dd></div>' : '') +
      ((e.prints || []).length ? '<div><dt>للطباعة</dt><dd>' + e.prints.map((x) => '<a href="' + esc(x.href) + '" target="_blank" rel="noopener">' + esc(x.label) + '</a>').join(' · ') + '</dd></div>' : '') +
    '</dl>';
  }
  function elHTML(e) {
    const vid = e.kind === 'video';
    const gm = e.game;
    const frames = vid ? (e.frames || []).map((f) =>
      '<li><b>' + fmt(f.title) + '</b> — ' + fmt(f.see) +
      (f.hear && f.hear !== '—' ? '<br><span class="lp-hear">يسمع: ' + fmt(f.hear) + '</span>' : '') +
      (f.do && f.do !== '—' ? '<br><span class="lp-do">يفعل: ' + fmt(f.do) + '</span>' : '') + '</li>').join('') : '';
    const hands = (e.hands || []).length ? '<p class="lp-st-lbl">أوقِف المقطع عند ✋:</p><ol class="lp-hands">' + e.hands.map((x) => '<li><b>' + fmt(x.title) + '</b>: ' + fmt(String(x.hear).replace(/\s*✋\s*/g, ' ')) + '</li>').join('') + '</ol>' : '';
    return '<article class="lp-el' + (e.is_scored ? ' is-scored' : '') + '" id="lp-' + e.id + '" aria-labelledby="lp-' + e.id + '-h">' +
      '<header class="lp-el-h">' +
        '<span class="lp-el-n" aria-hidden="true">' + ar(e.menu) + '</span>' + icon(e.id, 'lp-el-ic') +
        '<div class="lp-el-t"><h3 id="lp-' + e.id + '-h">' + esc(e.name) + (gm && gm.title ? ' <span class="lp-k lp-gt">«' + esc(gm.title) + '»</span>' : '') + '</h3>' +
          '<p class="lp-el-meta">' + badge(e.id) + '<span>' + esc(e.station_short) + '</span><span>' + esc(e.gradual) + '</span><span>' + esc(e.time) + '</span>' +
          '<span class="' + (e.is_scored ? 'lp-tag-scored' : 'lp-tag-free') + '">' + (e.is_scored ? 'مرصود' : 'غير مرصود') + '</span></p></div>' +
        openBtn(e.id) +
      '</header>' +
      '<p class="lp-el-goal"><b>الهدف:</b> ' + fmt(e.goal) + (e.follow ? ' <b>تابع:</b> ' + fmt(e.follow) : '') + '</p>' +
      '<div class="lp-el-grid">' +
        '<div class="lp-box lp-box-adult lp-box-wide"><h4>دليل المعلّم</h4>' + guideBox(e) + hands + '</div>' +
        (vid ? '<div class="lp-box"><h4>سلسلة أحداث المقطع (يرى · يسمع · يفعل)</h4>' + (e.scene ? '<p class="lp-muted">' + fmt(e.scene) + '</p>' : '') + '<ol>' + frames + '</ol></div>'
          : '<div class="lp-box"><h4>اللعبة: قصّتها ومستوياتها</h4>' + (gm.story ? '<p>' + fmt(fwText(gm.story)) + '</p>' : '') +
            (gm.levels ? '<p><b>المستويات:</b> ' + fmt(fwText(gm.levels)) + '</p>' : '') + (gm.ages ? '<p><b>الأعمار:</b> ' + fmt(fwText(gm.ages)) + '</p>' : '') +
            (gm.reward ? '<p><b>المكافأة:</b> ' + fmt(fwText(gm.reward)) + '</p>' : '') + '</div>') +
        (e.why ? '<div class="lp-box"><h4>لماذا هنا</h4><p>' + fmt(fwText(e.why)) + '</p></div>' : '') +
      '</div>' +
      '<footer class="lp-el-f"><p><b>يأخذ:</b> ' + fmt(fwText(e.takes)) + ' · <b>يعطي:</b> ' + fmt(fwText(e.gives)) + '</p>' +
        (vid ? '<p class="lp-el-note"><b>المقطع:</b> <code dir="ltr">media/video/' + esc(e.video || '') + '.mp4</code> — ' + ((D.videos || []).includes(e.video) ? (e.video_v6 ? 'مقطع v6 جاهز.' : 'مقطع v5 مؤقّت إلى أن يصل مقطع v6.') : 'قيد الإنتاج؛ يظهر للطفل «قيد الإنتاج» إلى أن يصل.') + '</p>'
          : '<p class="lp-el-note"><b>اللعبة:</b> <code dir="ltr">' + esc(gm.src) + ' · ' + esc(gm.station) + '</code> — النسخة الخفيفة (HTML) تعمل تلقائياً إن تعذّرت اللعبة على الجهاز.</p>') +
      '</footer>' +
    '</article>';
  }

  function flowHTML() {
    let out = '';
    ELS.forEach((e) => {
      out += elHTML(e);
      if (pauseAfter.includes(e.menu)) out += '<h3 class="lp-ses-divider">' + PAUSE(e.menu) + '</h3>';
    });
    return sec('lp-flow', out, 'لكلّ عنصر الحقول الثمانية لدليل المعلّم (الوصف · الغرض · المنهجية · التشغيل · المحاولات · التصحيح · الملاحظة · المدّة)، ومواضع ✋ في المقاطع، وقصّة اللعبة ومستوياتها، ولماذا هو في مكانه.');
  }

  function assessHTML() {
    const e13 = META.EL13 || {}, e16 = META.EL16 || {};
    const states = ['من أوّل مرّة', 'أجاب بغير الصواب — يُعاد', 'لم يُجِب'];
    const items = ['ت١ «إبرة البوصلة»: «مْـ» بتسجيل ثانٍ بمشتِّت «آ»', 'ت٢ «قطعة الأحجية»: «م» وثلاث صور', 'ت٣ «زرّ الشفتين»: «ماءْ» (حكم المعلّم)', 'ت٤ «البرجان»: «مْـ» ثم «آ»', 'ت٥ «درب القطرة» بالنقط وحدها'];
    return sec('lp-assess',
      '<div class="lp-two"><div><h3 class="lp-h3">المرصود: «تدرّب» — «إِبْرَةُ البَوْصَلَةِ» ' + openBtn('EL13', 'افتح «تدرّب»') + '</h3>' +
        '<dl class="lp-dl lp-dl-tight"><div><dt>الهدف</dt><dd>' + fmt(e13.goal) + '</dd></div>' +
        '<div><dt>الجولات</dt><dd>جولة بارق التجريبية (لا تُحتسب) ثم خمس جولات ثابتة: «مْـ» · «ماءْ» · «آ» · طرق · «مْـ» بتسجيل ثانٍ — أربع منها فيها مشتِّت كلامي.</dd></div>' +
        '<div><dt>النجاح</dt><dd>٤ من ٥ من المحاولة الأولى؛ والنتيجة في دليل المعلّم وحده.</dd></div>' +
        '<div><dt>المحاولات</dt><dd>' + fmt(((e13.guide || {}).attempts) || '') + '</dd></div></dl></div>' +
      '<div><h3 class="lp-h3">حكم المعلّم وما يُسجَّل بلا درجة</h3><ul class="lp-list">' +
        '<li><b>«تحدّث»:</b> بعد كلّ بند ضغط مطوَّل على بارق ثم أيقونة: وحده · بمساعدة · ليس بعد — يُحفظ لتقريرك.</li>' +
        '<li><b>كلّ لعبة:</b> تسجّل كلّ بند «من أوّل مرّة» أو «بعد تلميح» أو «أظهرته اللعبة»، والنتيجة تظهر في دليل العنصر حين تنتهي — بلا درجة.</li>' +
        '<li><b>«اكتب»:</b> اكتمال المسار من النقطة وبالاتّجاه، لا جمال الخطّ.</li>' +
        '<li><b>«كلمات وصور»:</b> المهمّة الأخيرة «أَيْنَ الماءُ؟» تُسجَّل للتقرير.</li>' +
        '<li><b>نجوم الختام</b> في كلّ لعبة للتشجيع لا للقياس، و«تدرّب» و«اختبر نفسك» بلا نجوم.</li></ul></div></div>' +
      '<h3 class="lp-h3">«اختبر نفسك» — «دَرْبُ البَوْصَلَةِ» في يوم لاحق ' + openBtn('EL16', 'افتح «اختبر نفسك»') + '</h3>' +
      '<p>' + fmt(e16.goal) + ' غلافه للطفل رسم وعنوان و«ابْدَأْ» فقط؛ الموعد والمعاينة والتقرير في دليلك.</p>' +
      '<div class="lp-report" aria-label="شكل تقرير المعلّم"><p class="lp-report-h">صفحة التقرير — سطر لكلّ بند، بالكلمات لا بالأرقام</p><ul>' +
        items.map((d) => '<li><span>' + fmt(d) + '</span><span class="lp-states">' + states.map((s) => '<i>' + esc(s) + '</i>').join('') + '</span></li>').join('') + '</ul>' +
        '<p class="lp-report-f">الطفل يرى محطّات تتلوّن بلون محايد فقط ويقفز بارق إلى التالية. ما «لم يُجِب» فيه يُعاد عنصره قبل الدرس الثاني.</p></div>',
      'نشاط واحد مرصود، وحكم المعلّم بلا درجات، وتحقّق في يوم لاحق. لا مؤقّت ولا قلوب ولا رقم ولا ✗ أمام الطفل.');
  }

  function roleHTML() {
    const tr = V5.teacher_role || [];
    return sec('lp-role',
      '<dl class="lp-dl">' + tr.map((r) => '<div><dt>' + esc(r.when) + '</dt><dd>' + fmt(fwText(r.text)) + '</dd></div>').join('') + '</dl>' +
      '<div class="lp-two">' + pauseAfter.map((n) => { const a = byNum(n), b = byNum(n + 1); return a && b ? '<div class="lp-panel"><h3 class="lp-h3">' + PI + 'بعد ' + ar(n) + ' «' + esc(a.name) + '»</h3><p>تقف بالدرس هنا إن احتاج الأطفال استراحة، وتكمل في وقت آخر من ' + ar(n + 1) + ' «' + esc(b.name) + '» (' + (b.kind === 'video' ? 'فيديو' : 'لعبة') + '). التقدّم محفوظ على هذا الجهاز، و«التالي» يكمل من حيث توقّفتم.</p>' + openBtn(b.id, 'افتح ' + ar(n + 1)) + '</div>' : ''; }).join('') + '</div>' +
      ((V5.prints || []).length ? '<p class="lp-note"><b>للطباعة:</b> ' + V5.prints.map((x) => '<a href="' + esc(x.href) + '" target="_blank" rel="noopener">' + esc(x.label) + '</a>').join(' · ') + '</p>' : '') +
      '<div class="lp-results" data-results></div>' +
      '<p class="lp-note">في الصفّ: سؤال البيت بعد «الخريطة الذهنية» — «أَيْنَ الماءُ في بَيْتِكُمْ؟»؛ كلّ جواب مقبول: كلمة أو إشارة.</p>',
      'الدرس متّصل بلا جلسات؛ وفيه موضعا توقّف مقترحان فقط (بعد ' + pauseNames() + ') لمن يحتاج.');
  }

  function songHTML() {
    const s = V5.song || [];
    return sec('lp-song', s.length
      ? '<ol class="lp-list lp-k lp-song">' + s.map((l) => '<li>' + esc(l) + '</li>').join('') + '</ol>'
      : '<p class="lp-note">نصّ الأنشودة الجديدة قيد الإنتاج (ق-٩/ق-١٠): ≥ ٤٥ ث باللازمة «مْـ… مْـ… ماءْ!» بكلمات الدرس وحدها وبلا اسم الحرف. يظهر هنا حين يُسجَّل.</p>',
      'كلمات «أغنّي» كما تُسمَع في مقطع v6 (≈ ٤٢ ث): اللازمة مرّتين · «فَمي مُغْلَقٌ هَكَذا!» · اللازمة و«سَمِعْتُ فَرْقاً!» واللازمة · الختام. على شاشة الطفل كلمة «ماءْ» وحدها؛ الكلمات كاملة هنا للمعلّم.');
  }

  function decisionsHTML() {
    return sec('lp-open-q', '<ol class="lp-dec">' + P.decisions.map((d) => '<li><span class="lp-dec-cat">' + esc(d[0]) + '</span><p>' + fmt(d[1]) + '</p></li>').join('') + '</ol>',
      'نُفِّذت هذه النسخة بالخيار الموصى به في كلّ قرار مفتوح؛ وكلّها مسوّدة (draft_unapproved) يستطيع المالك الرجوع عن أيّ منها.');
  }

  const CSS = '.lp .lp-type{display:inline-block;padding:1px 9px 2px;border-radius:999px;font-size:12px;font-weight:700;line-height:1.6}' +
    '.lp .lp-type.is-video{background:#00345B;color:#fff}.lp .lp-type.is-int{background:#FAD27E;color:#00345B}' +
    '.lp .lp-pause{display:block;font-weight:500}.lp .lp-pause b{font-weight:700;margin-inline-end:6px}' +
    '.lp .lp-pause-row td{background:#FFF6D6;border-inline-start:5px solid #F89928;padding:8px 14px}' +
    '.lp .lp-t-map{min-width:860px}.lp .lp-t-map tbody th{width:44px;text-align:center}.lp .lp-t-map td:nth-child(2){width:22%}.lp .lp-t-map td:nth-child(5){white-space:nowrap}' +
    '.lp .lp-muted{color:#5b6b7b;font-size:.92em}.lp .lp-hear,.lp .lp-do{font-size:.93em;color:#33485C}.lp .lp-hands{margin:4px 0 0;padding-inline-start:1.3em}' +
    '.lp .lp-song li{font-size:20px;line-height:1.9}.lp .lp-pi{width:1em;height:1em;vertical-align:-.15em;margin-inline-end:6px;fill:#F89928}' +
    '.lp .lp-t-ov{min-width:900px}.lp .lp-t-ov tbody th{width:44px;text-align:center}.lp .lp-t-ov td:nth-child(2){width:20%}.lp .lp-t-ov td:nth-child(3){width:22%}.lp .lp-t-ov td:nth-child(6){white-space:nowrap}' +
    '.lp .lp-t-ov .lp-type{margin-inline-start:6px}.lp .lp-pol{display:inline-block;padding:1px 9px 2px;border-radius:999px;background:#EEF8FD;color:#00345B;font-weight:700;font-size:12.5px;white-space:nowrap}' +
    '.lp .lp-gd{margin:0;display:grid;gap:8px}.lp .lp-gd>div{display:grid;grid-template-columns:9.5em minmax(0,1fr);gap:4px 12px;align-items:start}.lp .lp-gd dt{font-weight:700;color:#00345B;font-size:14px}' +
    '.lp .lp-gd dd{margin:0;font-size:14.5px;line-height:1.8}.lp .lp-gd dd .lp-list{margin:0;padding-inline-start:1.2em}.lp .lp-gd-fix dd{background:#F2FAF6;border-radius:10px;padding:4px 10px}' +
    '.lp .lp-box-wide{grid-column:1/-1}.lp .lp-gt{font-size:.85em;color:#5b6b7b;font-weight:600}' +
    '.lp .lp-cp{display:flex;flex-direction:column;align-items:center;gap:8px}.lp .lp-cp-svg{width:min(100%,260px);aspect-ratio:1}.lp .lp-cp-svg svg{width:100%;height:100%;display:block}' +
    '.lp .lp-arcs li{margin-bottom:4px}' +
    '@media (max-width:640px){.lp .lp-gd>div{grid-template-columns:1fr}}';

  function render(root) {
    if (!document.getElementById('st-plan-v5')) { const st = document.createElement('style'); st.id = 'st-plan-v5'; st.textContent = CSS; document.head.append(st); }
    const toc = '<nav class="lp-toc" aria-label="محتويات خطة الدرس"><button type="button" class="lp-toc-btn" aria-expanded="false" aria-controls="lp-toc-list"><span>المحتويات</span><i aria-hidden="true"></i></button>' +
      '<ol id="lp-toc-list">' + SECTIONS.map((s, i) => '<li><a href="#' + s[0] + '" data-go="' + s[0] + '"><span>' + ar(i + 1) + '</span>' + fmt(s[1]) + '</a></li>').join('') + '</ol></nav>';
    root.innerHTML =
      '<div class="lp-bar">' +
        '<button type="button" class="lp-back" data-open="EL01"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>العودة إلى الدرس</button>' +
        '<div class="lp-bar-t"><h2>خطة الدرس ودليل المعلّم</h2><p><span class="lp-k">صَوْتُ الميم</span> · L1-01-d1 · ' + esc(V5.label || 'النسخة v6 — مسوّدة للمراجعة') + '</p></div>' +
        '<span class="lp-status" title="مسوّدة غير معتمدة">draft_unapproved</span>' +
      '</div>' +
      '<div class="lp-layout">' + toc + '<div class="lp-doc">' +
        cardHTML() + overviewHTML() + objHTML() + methodHTML() + compassHTML() + mapHTML() + flowHTML() + assessHTML() + roleHTML() + songHTML() + decisionsHTML() +
        '<p class="lp-end">مصادر هذه الخطة: الإطار التعليمي v2 واللوحات v5 وتصميم الألعاب v6 وخطّة الفيديو v6 للدرس L1-01-d1 (draft_unapproved). الأزمنة تقديرية.</p>' +
      '</div></div>';

    paintCompass(root); paintResults(root);
    window.addEventListener('bq:compass', () => paintCompass(root));
    window.addEventListener('bq:done', () => setTimeout(() => { paintCompass(root); paintResults(root); }, 50));
    // «افتح العنصر» وكلّ ما يحمل data-open
    root.addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-open]');
      if (b && root.contains(b)) {
        ev.preventDefault();
        if (window.BQ && BQ.open) BQ.open(b.dataset.open); // الدرس صفحة أخرى — BQ.open يعيد الصفحة إلى أعلاها
        return;
      }
      const a = ev.target.closest('a[data-go]');
      if (a) {
        ev.preventDefault();
        const s = document.getElementById(a.dataset.go);
        if (s) { s.scrollIntoView({ block: 'start', behavior: reduced() ? 'auto' : 'smooth' }); s.setAttribute('tabindex', '-1'); s.focus({ preventScroll: true }); }
        setToc(false);
      }
    });

    // المحتويات: تنطوي على الهاتف
    const tocEl = root.querySelector('.lp-toc');
    const tbtn = root.querySelector('.lp-toc-btn');
    function setToc(open) { tocEl.classList.toggle('is-open', open); tbtn.setAttribute('aria-expanded', String(open)); }
    tbtn.addEventListener('click', () => setToc(!tocEl.classList.contains('is-open')));

    // تتبّع القسم الظاهر
    const links = {};
    root.querySelectorAll('.lp-toc a').forEach((a) => { links[a.dataset.go] = a; });
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((ents) => {
        ents.forEach((en) => {
          if (en.isIntersecting) {
            Object.values(links).forEach((l) => l.removeAttribute('aria-current'));
            const l = links[en.target.id]; if (l) l.setAttribute('aria-current', 'true');
          }
        });
      }, { rootMargin: '-15% 0px -70% 0px' });
      root.querySelectorAll('.lp-sec').forEach((s) => io.observe(s));
    }
  }
  function reduced() { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }

  window.BQ_PLAN = { render: render, data: P };
})();

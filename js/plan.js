/* plan.js — «خطة الدرس ودليل المعلّم» لـ L1-01-d1 «صَوْتُ الميم» — النسخة v5 (draft_unapproved)
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
  const nameOf = (id) => (META[id] ? META[id].name : id);
  const isVid = (id) => META[id] && META[id].kind === 'video';
  const icon = (id, cls) => (META[id] && META[id].icon) ? '<img class="' + (cls || 'lp-ic') + '" src="' + META[id].icon + '" alt="" loading="lazy">' : '';
  const badge = (id) => '<span class="lp-type ' + (isVid(id) ? 'is-video' : 'is-int') + '">' + (isVid(id) ? 'فيديو' : 'تفاعلي') + '</span>';
  const openBtn = (id, label) => '<button type="button" class="lp-open" data-open="' + id + '">' + (label || 'افتح العنصر') + '</button>';
  const elLink = (id) => '<button type="button" class="lp-chip lp-chip-el" data-open="' + id + '" title="افتح «' + esc(nameOf(id)) + '»">' + ar(META[id] ? META[id].menu : '') + ' ' + esc(nameOf(id)) + '</button>';
  const table = (head, rows, cls) => '<div class="lp-tw"><table class="lp-t ' + (cls || '') + '"><thead><tr>' + head.map((h) => '<th scope="col">' + esc(h) + '</th>').join('') + '</tr></thead><tbody>' +
    rows.map((r) => (r.pause ? '<tr class="lp-pause-row"><td colspan="' + head.length + '">' + r.pause + '</td></tr>' : '<tr>' + r.map((c, i) => (i === 0 ? '<th scope="row">' : '<td>') + c + (i === 0 ? '</th>' : '</td>')).join('') + '</tr>')).join('') + '</tbody></table></div>';
  /** «#١٠» في نصوص المصادر ← رقائق العناصر */
  const refs = (s) => { const out = []; String(s || '').replace(/#([٠-٩]+)/g, (m, n) => { const e = byNum(+n.replace(/[٠-٩]/g, (d) => AR.indexOf(d))); if (e && !out.includes(e.id)) out.push(e.id); return m; }); return out; };
  const PAUSE = (n) => '<span class="lp-pause"><b>' + PI + 'موضع توقّف مقترح</b> بعد العنصر ' + ar(n) + ' — يمكن أن تقف بالدرس هنا وتكمل من العنصر ' + ar(n + 1) + ' في وقت آخر.</span>';
  const pauseAfter = V5.pause_after || [5, 10];
  const PI = '<svg class="lp-pi" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.5"/><rect x="14" y="5" width="4" height="14" rx="1.5"/></svg>';

  /* ------------------------------------------------------------------ البيانات الثابتة (من الإطار v2) */
  const P = {
    rows: [
      ['الدرس', 'الدرس الأوّل (د١) من النموذج L1-01 — أوّل درس في المنهج'],
      ['الصوت والرسم', '«مْـ» صوتاً ممدوداً بشفتين مطبقتين (لا يُقال اسم الحرف للطفل في هذا الدرس) · «م» المنفصلة رسماً'],
      ['الكلمة المدرَّسة', '«ماءْ» وحدها — وجملة سياقها «الماءُ في الصَّحْنِ.»'],
      ['العبارة المحورية', '«سَمِعْتُ فَرْقاً!» — تُقال حين يختلف صوتان'],
      ['الزمن', '≈ ٢٦ د متّصلة (#١–#١٥)، منها ≈ ٨ د مشاهدة، + ≈ ٣ د في يوم لاحق (#١٦)'],
      ['المسار', 'بقيادة المعلّم: يشاهد مع الأطفال ويوقف المقطع عند ✋، ويجلس بجانب الطفل في التفاعلي'],
      ['الحالة', 'draft_unapproved — النسخة v5 مسوّدة للمراجعة؛ المقاطع السبعة والأسطر الجديدة والأنشودة قيد الإنتاج']
    ],
    chars: [
      ['maj', 'ماجد', 'في الغرفة من أوّل الدرس (قميص أصفر): يسأل، ويفتح الباب لسيف، ويصبّ من الإبريق، ويعرض لوحه.', 'media/img/comp_cut_MAJ.webp'],
      ['say', 'سيف', 'يطرق الباب ويدخل مرّة واحدة في #٢ (قميص أزرق، والبوصلة على صدره): نموذج «مْـ» و«حركة مْـ»، ويكتب «م» ويرسم الخريطة.', 'media/img/comp_cut_SAY.webp'],
      ['brq', 'بارق', 'يطير، ويحمل البطاقات الخفيفة: يسأل «ما هَذا الصَّوْتُ؟»، ويخطئ مرّة واحدة (النافذة) ثم يُصحَّح، وزرّاه: يصفّق = «صَوْتٌ واحِدٌ» · يقفز = «سَمِعْتُ فَرْقاً!».', 'media/img/comp_cut_BRQ.webp']
    ],
    method: [
      ['الصوت أوّلاً', 'يسمعه في قصّة ← يميّزه ← ينطقه ← يسمعه في أوّل كلمة ← يرى رسمه ويصله بالصورة ← يكتبه ← يتدرّب ← يستعمله ← يلعب ← يلخّص ← ويُتحقَّق منه في يوم لاحق.'],
      ['تدرّج المسؤولية', 'أشاهد (٧ فيديوهات) ← نجرّب معاً (٦: بارق يشرح أو مثال محلول أو المعلّم بجانبه) ← أجرّب وحدي (٣: «تدرّب» المرصود و«العب» و«اختبر نفسك»).'],
      ['الإيقاع', 'لا يشاهد الطفل أكثر من عنصرين متتاليين؛ وموضعا توقّف مقترحان بعد #٥ وبعد #١٠.'],
      ['حركة مْـ', 'شفتان مطبقتان وسبّابة على جانب الأنف — يراها الطفل في #٤ ويعيدها في #٥ و#٩ و#١٥، وتصحّح بها بدل الكلام.']
    ],
    rules: [
      'هدف واحد قابل للملاحظة لكلّ عنصر؛ والهدف التابع معلَن في #٢ و#٤ و#٧ فقط.',
      'النموذج قبل الممارسة: لا تفاعلي إلّا وقبله فيديو أو مثال محلول، وكلّ لعبة تبدأ بجولة يلعبها بارق.',
      'الصوت لا اسم الحرف: يُرى الرسم «م» ويُسمع صوته «مْـ»؛ لا يُقال اسم الحرف للطفل في هذا الدرس.',
      'لا قراءة مطلوبة ولا نصّ للمعلّم على شاشة الطفل: التعليمات بصوت حبيبة، والمكتوب للطفل «ماءْ» و«م» فقط؛ ما للمعلّم في دليله وبالضغط المطوَّل.',
      'فيديو أو تفاعلي — لا خلط: الفيديو يُشاهَد ويُردَّد ولا لمس فيه ولا يتوقّف وحده؛ التفاعلي يفعل فيه الطفل ويتلقّى تغذية راجعة.',
      'الواقعية: كلّ مقطع سلسلة أحداث في غرفة واحدة وباب واحد، وكلّ شيء على سطح أو في يد.',
      'التغذية الراجعة: محاولتان · صواب = حركة + «نَعَمْ! هَذا هُوَ!» · خطأ أوّل = يُعاد الصوت وتلميح يعلّل · خطأ ثانٍ = يُرى الصحيح «أَصْغِ: هَذا، وَهَذا.» ويمضي · لا مؤقّت ولا قلوب ولا رقم أمام الطفل.',
      'المخاطبة: بالجمع في الفيديو («قولوا مَعي») وبالمفرد في التفاعلي («أَصْغِ»، «جَرِّبْ»).',
      'لا كلمة جديدة تُدرَّس غير «ماءْ»؛ كلمات القصّة في #١١ تعرّض مسموع لا يُقاس.'
    ],
    decisions: [
      ['ق٥-١', 'الناتج ١: يميّز «مْـ» من صوت كلامي آخر («آ» بفم مفتوح) ومن أصوات الأشياء؛ و#١٠ بأربع جولات فيها مشتِّت كلامي.'],
      ['ق٥-٢', 'لا يُقال اسم الحرف للطفل في د١ (رسم + صوت فقط)، ويُؤجَّل الاسم إلى درس لاحق.'],
      ['ق٥-٣', 'إنتاج الفيديوهات السبعة من جديد بسلاسل الأحداث، وتسجيل الأسطر الجديدة والأنشودة.'],
      ['ق٥-٤', '«كلمات وصور» #١٢: صورتان جديدتان للماء (كوب · صنبور).'],
      ['سابقة', 'ق٤-١ الترتيب ١–١٦ · ق٤-٢ «تحدّث» بحكم المعلّم · ق٤-٣ موضعا التوقّف · ق٢-٣ السطران بصوت حبيبة · ق-٢ «م» بحركة واحدة وسهمَي اتّجاه · ق-٣ «اسْمَعْ: مْـ… الْمِسِ الصّورَةَ!» · ق-٩/ق-١٠ أنشودة جديدة باللازمة.']
    ]
  };

  /* ------------------------------------------------------------------ الأقسام */
  const SECTIONS = [
    ['lp-card', 'بطاقة الدرس'],
    ['lp-obj', 'نواتج التعلّم'],
    ['lp-method', 'المنهجية وقواعد كلّ عنصر'],
    ['lp-map', 'مسار العناصر ١–١٦'],
    ['lp-flow', 'سير الدرس عنصراً عنصراً'],
    ['lp-assess', 'التقويم'],
    ['lp-role', 'دور المعلّم وموضعا التوقّف'],
    ['lp-song', 'كلمات الأنشودة'],
    ['lp-open-q', 'قرارات المالك في هذه النسخة']
  ];
  const sec = (i, body, lead) => {
    const [id, title] = SECTIONS[i];
    return '<section class="lp-sec" id="' + id + '" aria-labelledby="' + id + '-h"><h2 id="' + id + '-h"><span class="lp-num">' + ar(i + 1) + '</span>' + fmt(title) + '</h2>' + (lead ? '<p class="lp-lead">' + fmt(lead) + '</p>' : '') + body + '</section>';
  };

  function cardHTML() {
    const nV = ELS.filter((e) => e.kind === 'video').length;
    const stats = [[ar(ELS.length), 'عنصراً'], [ar(nV), 'فيديو'], [ar(ELS.length - nV), 'تفاعلي'], ['١', 'نشاط مرصود'], ['≈ ٢٦', 'دقيقة متّصلة'], ['٢', 'موضعا توقّف']];
    return sec(0,
      '<div class="lp-hero">' +
        '<div class="lp-hero-glyph" aria-hidden="true"><span class="lp-k">م</span></div>' +
        '<div class="lp-hero-txt"><p class="lp-eyebrow">L1-01-d1 · المستوى الأوّل · الدرس الأوّل · ' + esc(V5.label || 'النسخة v5 — مسوّدة للمراجعة') + '</p><h3 class="lp-k">صَوْتُ الميم</h3>' +
        '<p class="lp-keys"><span>الكلمة <b class="lp-k">ماءْ</b></span><span>العبارة المحورية <b class="lp-k">سَمِعْتُ فَرْقاً!</b></span></p></div>' +
      '</div>' +
      '<p class="lp-idea">' + fmt(V5.idea || '') + '</p>' +
      (V5.question ? '<p class="lp-note"><b>السؤال المحرّك:</b> ' + fmt(V5.question) + '</p>' : '') +
      '<ul class="lp-stats">' + stats.map((s) => '<li><b>' + s[0] + '</b><span>' + s[1] + '</span></li>').join('') + '</ul>' +
      '<dl class="lp-dl">' + P.rows.map((r) => '<div><dt>' + esc(r[0]) + '</dt><dd>' + fmt(r[1]) + '</dd></div>').join('') + '</dl>' +
      ((V5.world || []).length ? '<h3 class="lp-h3">عالم المشهد (يلتزمه كلّ مقطع وكلّ صورة)</h3><ul class="lp-list">' + V5.world.map((w) => '<li>' + fmt(w) + '</li>').join('') + '</ul>' : '') +
      '<h3 class="lp-h3">الشخصيات</h3><ul class="lp-chars">' + P.chars.map((ch) => '<li class="lp-char lp-char-' + ch[0] + '"><img src="' + ch[3] + '" alt="" loading="lazy"><div><b>' + ch[1] + '</b><p>' + fmt(ch[2]) + '</p></div></li>').join('') + '</ul>' +
      '<p class="lp-note">التعليمات المنطوقة للطفل بصوت واحد (حبيبة)، وليست شخصية على الشاشة.</p>');
  }

  function objHTML() {
    const rows = (V5.outcomes || []).map((o) => [
      '<span class="lp-obj-n">' + ar(o.n) + '</span>',
      fmt(o.text) + (o.note ? '<br><small class="lp-muted">' + fmt(o.note.replace(/\s*\(⏸[^)]*\)/, '')) + '</small>' : ''),
      '<span class="lp-skill">' + esc(o.skill) + '</span>',
      fmt(o.how),
      '<div class="lp-chips">' + refs(o.how).map(elLink).join('') + '</div>'
    ]);
    return sec(1, table(['#', 'الناتج', 'المهارة', 'كيف يُقاس', 'العناصر'], rows, 'lp-t-obj'),
      'المرصود رقمياً واحد (#١٠ «تدرّب»)؛ الباقي حكم المعلّم أو صفحة تقريره بالكلمات — لا رقم ولا درجة أمام الطفل.');
  }

  function methodHTML() {
    return sec(2,
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
        fmt(e.goal)
      ]);
      if (pauseAfter.includes(e.menu)) rows.push({ pause: PAUSE(e.menu) });
    });
    return sec(3, table(['#', 'العنصر', 'النوع', 'المحطّة · التدرّج', 'المدّة', 'الهدف الواحد'], rows, 'lp-t-map'),
      'العناصر الستّة عشر بترتيب القائمة وزرّ «التالي»: فيديو ٧ وتفاعلي ٩، ولا عنصر هجين. المس اسم العنصر لفتحه.');
  }

  function elHTML(e) {
    const vid = e.kind === 'video';
    const frames = (e.frames || []).map((f) =>
      '<li><b>' + fmt(f.title) + '</b> — ' + fmt(f.see) +
      (f.hear && f.hear !== '—' ? '<br><span class="lp-hear">يسمع: ' + fmt(f.hear) + '</span>' : '') +
      (f.do && f.do !== '—' ? '<br><span class="lp-do">يفعل: ' + fmt(f.do) + '</span>' : '') + '</li>').join('');
    const hands = (e.hands || []).length ? '<p class="lp-st-lbl">أوقِف المقطع عند ✋:</p><ol class="lp-hands">' + e.hands.map((x) => '<li><b>' + fmt(x.title) + '</b>: ' + fmt(String(x.hear).replace(/\s*✋\s*/g, ' ')) + '</li>').join('') + '</ol>' : '';
    return '<article class="lp-el' + (e.is_scored ? ' is-scored' : '') + '" id="lp-' + e.id + '" aria-labelledby="lp-' + e.id + '-h">' +
      '<header class="lp-el-h">' +
        '<span class="lp-el-n" aria-hidden="true">' + ar(e.menu) + '</span>' + icon(e.id, 'lp-el-ic') +
        '<div class="lp-el-t"><h3 id="lp-' + e.id + '-h">' + esc(e.name) + '</h3>' +
          '<p class="lp-el-meta">' + badge(e.id) + '<span>' + esc(e.station_short) + '</span><span>' + esc(e.gradual) + '</span><span>' + esc(e.time) + '</span>' +
          '<span class="' + (e.is_scored ? 'lp-tag-scored' : 'lp-tag-free') + '">' + (e.is_scored ? 'مرصود' : 'غير مرصود') + '</span></p></div>' +
        openBtn(e.id) +
      '</header>' +
      '<p class="lp-el-goal"><b>الهدف:</b> ' + fmt(e.goal) + (e.follow ? ' <b>تابع:</b> ' + fmt(e.follow) : '') + '</p>' +
      '<div class="lp-el-grid">' +
        '<div class="lp-box"><h4>' + (vid ? 'سلسلة أحداث المقطع' : 'اللوحات') + ' (يرى · يسمع · يفعل)</h4>' + (e.scene ? '<p class="lp-muted">' + fmt(e.scene) + '</p>' : '') + '<ol>' + frames + '</ol></div>' +
        '<div class="lp-box lp-box-adult"><h4>ما يفعله المعلّم</h4><ul class="lp-list">' + (e.adult_parent || []).map((t) => '<li>' + fmt(t) + '</li>').join('') + '</ul>' + hands + '</div>' +
        (!vid && (e.feedback || e.rounds) ? '<div class="lp-box"><h4>التغذية الراجعة</h4>' + (e.rounds ? '<p><b>الجولات:</b> ' + fmt(e.rounds) + '</p>' : '') + (e.feedback ? '<p>' + fmt(e.feedback) + '</p>' : '') + '</div>' : '') +
        (e.why ? '<div class="lp-box"><h4>لماذا هنا</h4><p>' + fmt(e.why) + '</p></div>' : '') +
      '</div>' +
      '<footer class="lp-el-f"><p><b>يأخذ:</b> ' + fmt(e.takes) + ' · <b>يعطي:</b> ' + fmt(e.gives) + '</p>' +
        (vid ? '<p class="lp-el-note"><b>المقطع:</b> <code dir="ltr">media/video/' + esc(e.video || '') + '.mp4</code> — ' + ((D.videos || []).includes(e.video) ? 'جاهز في هذه النسخة.' : 'قيد الإنتاج؛ يظهر للطفل «قيد الإنتاج» إلى أن يصل.') + '</p>' : '') +
      '</footer>' +
    '</article>';
  }

  function flowHTML() {
    let out = '';
    ELS.forEach((e) => {
      out += elHTML(e);
      if (pauseAfter.includes(e.menu)) out += '<h3 class="lp-ses-divider">' + PAUSE(e.menu) + '</h3>';
    });
    return sec(4, out, 'لكلّ عنصر: هدفه الواحد، وما يراه الطفل ويسمعه ويفعله لحظةً لحظة، وما يفعله المعلّم (ومواضع ✋ في المقاطع)، والتغذية الراجعة في التفاعلي، ولماذا هو في مكانه.');
  }

  function assessHTML() {
    const e13 = META.EL13 || {}, e16 = META.EL16 || {};
    const states = ['من أوّل مرّة', 'بعد إعادة', 'لم يُجِب'];
    const items = ['ت١ اسمع والمس («مْـ» بين فم مطبق وفم مفتوح ويد تطرق)', 'ت٢ الرسم وصورته', 'ت٣ قُل «ماءْ» (حكم المعلّم)', 'ت٤ صوتان («مْـ» ثم «آ») بزرّي بارق', 'ت٥ تتبّع «م» مرّة'];
    return sec(5,
      '<div class="lp-two"><div><h3 class="lp-h3">المرصود: «تدرّب» (#١٠) ' + openBtn('EL13', 'افتح «تدرّب»') + '</h3>' +
        '<dl class="lp-dl lp-dl-tight"><div><dt>الهدف</dt><dd>' + fmt(e13.goal) + '</dd></div>' +
        '<div><dt>الجولات</dt><dd>' + fmt(e13.rounds) + '</dd></div>' +
        '<div><dt>النجاح</dt><dd>٤ من ٥ من المحاولة الأولى؛ والنتيجة في دليل المعلّم وحده.</dd></div>' +
        '<div><dt>التغذية</dt><dd>' + fmt(e13.feedback) + '</dd></div></dl></div>' +
      '<div><h3 class="lp-h3">حكم المعلّم وما يُسجَّل بلا درجة</h3><ul class="lp-list">' +
        '<li><b>«تحدّث» (#٥):</b> بعد كلّ بند ضغط مطوَّل على بارق ثم أيقونة: وحده · بمساعدة · ليس بعد — يُحفظ لتقريرك.</li>' +
        '<li><b>«اقرأ» (#٧):</b> محاولتان، بلا درجة.</li><li><b>«اكتب» (#٨):</b> اكتمال المسار، بلا درجة.</li>' +
        '<li><b>«كلمات وصور» (#١٢):</b> المهمّة الأخيرة «أَيْنَ الماءُ؟» تُسجَّل للتقرير.</li></ul></div></div>' +
      '<h3 class="lp-h3">«اختبر نفسك» (#١٦) — في يوم لاحق ' + openBtn('EL16', 'افتح «اختبر نفسك»') + '</h3>' +
      '<p>' + fmt(e16.goal) + ' غلافه للطفل رسم وعنوان و«ابْدَأْ» فقط؛ الموعد والمعاينة والتقرير في دليلك.</p>' +
      '<div class="lp-report" aria-label="شكل تقرير المعلّم"><p class="lp-report-h">صفحة التقرير — سطر لكلّ بند، بالكلمات لا بالأرقام</p><ul>' +
        items.map((d) => '<li><span>' + fmt(d) + '</span><span class="lp-states">' + states.map((s) => '<i>' + esc(s) + '</i>').join('') + '</span></li>').join('') + '</ul>' +
        '<p class="lp-report-f">الطفل يرى نقاطاً تتلوّن بنغمة محايدة فقط. ما «لم يُجِب» فيه يُعاد عنصره قبل الدرس الثاني.</p></div>',
      'نشاط واحد مرصود، وحكم المعلّم بلا درجات، وتحقّق في يوم لاحق. لا مؤقّت ولا قلوب ولا رقم ولا ✗ أمام الطفل.');
  }

  function roleHTML() {
    const tr = V5.teacher_role || [];
    return sec(6,
      '<dl class="lp-dl">' + tr.map((r) => '<div><dt>' + esc(r.when) + '</dt><dd>' + fmt(r.text) + '</dd></div>').join('') + '</dl>' +
      '<div class="lp-two">' + pauseAfter.map((n) => { const a = byNum(n), b = byNum(n + 1); return a && b ? '<div class="lp-panel"><h3 class="lp-h3">' + PI + 'بعد #' + ar(n) + ' «' + esc(a.name) + '»</h3><p>تقف بالدرس هنا إن احتاج الأطفال استراحة، وتكمل في وقت آخر من #' + ar(n + 1) + ' «' + esc(b.name) + '» (' + (b.kind === 'video' ? 'فيديو' : 'تفاعلي') + '). التقدّم محفوظ على هذا الجهاز، و«التالي» يكمل من حيث توقّفتم.</p>' + openBtn(b.id, 'افتح #' + ar(n + 1)) + '</div>' : ''; }).join('') + '</div>' +
      '<p class="lp-note">في الصفّ: سؤال البيت بعد «الخريطة الذهنية» (#١٥) — «أَيْنَ الماءُ في بَيْتِكُمْ؟»؛ كلّ جواب مقبول: كلمة أو إشارة.</p>',
      'الدرس متّصل بلا جلسات؛ وفيه موضعا توقّف مقترحان فقط (بعد #٥ وبعد #١٠) لمن يحتاج.');
  }

  function songHTML() {
    const s = V5.song || [];
    return sec(7, s.length
      ? '<ol class="lp-list lp-k lp-song">' + s.map((l) => '<li>' + esc(l) + '</li>').join('') + '</ol>'
      : '<p class="lp-note">نصّ الأنشودة الجديدة قيد الإنتاج (ق-٩/ق-١٠): ≥ ٤٥ ث باللازمة «مْـ… مْـ… ماءْ!» بكلمات الدرس وحدها وبلا اسم الحرف. يظهر هنا حين يُسجَّل.</p>',
      'الأنشودة في «أغنّي» (#٩). على شاشة الطفل كلمة «ماءْ» وحدها؛ الكلمات كاملة هنا للمعلّم.');
  }

  function decisionsHTML() {
    return sec(8, '<ol class="lp-dec">' + P.decisions.map((d) => '<li><span class="lp-dec-cat">' + esc(d[0]) + '</span><p>' + fmt(d[1]) + '</p></li>').join('') + '</ol>',
      'نُفِّذت هذه النسخة بالخيار الموصى به في كلّ قرار مفتوح؛ وكلّها مسوّدة (draft_unapproved) يستطيع المالك الرجوع عن أيّ منها.');
  }

  const CSS = '.lp .lp-type{display:inline-block;padding:1px 9px 2px;border-radius:999px;font-size:12px;font-weight:700;line-height:1.6}' +
    '.lp .lp-type.is-video{background:#00345B;color:#fff}.lp .lp-type.is-int{background:#FAD27E;color:#00345B}' +
    '.lp .lp-pause{display:block;font-weight:500}.lp .lp-pause b{font-weight:700;margin-inline-end:6px}' +
    '.lp .lp-pause-row td{background:#FFF6D6;border-inline-start:5px solid #F89928;padding:8px 14px}' +
    '.lp .lp-t-map{min-width:860px}.lp .lp-t-map tbody th{width:44px;text-align:center}.lp .lp-t-map td:nth-child(2){width:22%}.lp .lp-t-map td:nth-child(5){white-space:nowrap}' +
    '.lp .lp-muted{color:#5b6b7b;font-size:.92em}.lp .lp-hear,.lp .lp-do{font-size:.93em;color:#33485C}.lp .lp-hands{margin:4px 0 0;padding-inline-start:1.3em}' +
    '.lp .lp-song li{font-size:20px;line-height:1.9}.lp .lp-pi{width:1em;height:1em;vertical-align:-.15em;margin-inline-end:6px;fill:#F89928}';

  function render(root) {
    if (!document.getElementById('st-plan-v5')) { const st = document.createElement('style'); st.id = 'st-plan-v5'; st.textContent = CSS; document.head.append(st); }
    const toc = '<nav class="lp-toc" aria-label="محتويات خطة الدرس"><button type="button" class="lp-toc-btn" aria-expanded="false" aria-controls="lp-toc-list"><span>المحتويات</span><i aria-hidden="true"></i></button>' +
      '<ol id="lp-toc-list">' + SECTIONS.map((s, i) => '<li><a href="#' + s[0] + '" data-go="' + s[0] + '"><span>' + ar(i + 1) + '</span>' + fmt(s[1]) + '</a></li>').join('') + '</ol></nav>';
    root.innerHTML =
      '<div class="lp-bar">' +
        '<button type="button" class="lp-back" data-open="EL01"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>العودة إلى الدرس</button>' +
        '<div class="lp-bar-t"><h2>خطة الدرس ودليل المعلّم</h2><p><span class="lp-k">صَوْتُ الميم</span> · L1-01-d1 · ' + esc(V5.label || 'النسخة v5 — مسوّدة للمراجعة') + '</p></div>' +
        '<span class="lp-status" title="مسوّدة غير معتمدة">draft_unapproved</span>' +
      '</div>' +
      '<div class="lp-layout">' + toc + '<div class="lp-doc">' +
        cardHTML() + objHTML() + methodHTML() + mapHTML() + flowHTML() + assessHTML() + roleHTML() + songHTML() + decisionsHTML() +
        '<p class="lp-end">مصادر هذه الخطة: الإطار التعليمي v2 واللوحات v5 للدرس L1-01-d1 (draft_unapproved). الأزمنة تقديرية.</p>' +
      '</div></div>';

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

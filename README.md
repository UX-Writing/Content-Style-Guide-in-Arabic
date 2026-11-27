# دليل أسلوب كتابة المحتوى بالعربية

دليل مفتوح المصدر لكتابة تجربة المستخدم (UX Writing) وتصميم المحتوى (Content Design) باللغة العربية، مبني على مشروع [Product Language Framework](https://github.com/quinnkeast/product-language-framework).

الموقع المنشور: [csg.uxwritingar.com](https://csg.uxwritingar.com)

## التقنية المستخدمة

- [Hugo](https://gohugo.io) (الإصدار الموسّع `extended` رقم `0.164.0` أو أحدث) لتحويل ملفات Markdown إلى موقع ثابت.
- قالب [Hugo Book](https://github.com/alex-shpak/hugo-book) مضاف كـ Git submodule في `themes/hugo-book`.
- تخصيصات التصميم (الخط، الألوان، الاتجاه من اليمين لليسار، صناديق صواب/خطأ) في `assets/_custom.scss`.

## هيكل المشروع

```text
content/
  _index.md              # الصفحة الرئيسية (المقدمة)
  docs/                  # صفحات الدليل، كل صفحة في ملف Markdown
assets/_custom.scss      # تنسيقات الموقع
archetypes/default.md    # قالب الصفحة الجديدة
themes/hugo-book/        # القالب (submodule)
hugo.toml                # إعدادات الموقع
```

## التشغيل محليًا

١. انسخ المستودع مع القالب:

```bash
git clone --recurse-submodules https://github.com/UX-Writing/Content-Style-Guide-in-Arabic
cd Content-Style-Guide-in-Arabic
```

إذا نسخته مسبقًا دون القالب:

```bash
git submodule update --init
```

٢. ثبّت Hugo بإصداره الموسّع (`extended`) من [صفحة التثبيت](https://gohugo.io/installation/).

٣. شغّل الموقع في وضع التطوير:

```bash
hugo server
```

ثم افتح `http://localhost:1313` في المتصفح، وستظهر أي تعديلات تحفظها مباشرة.

## إضافة صفحة جديدة أو تعديل صفحة

- لتعديل صفحة: عدّل ملفها في `content/docs/`.
- لإضافة صفحة: أنشئ ملفًا جديدًا في `content/docs/` يبدأ بالترويسة التالية، واستخدم `weight` لتحديد ترتيبها في القائمة الجانبية:

```toml
+++
title = "عنوان الصفحة"
date = 2026-11-28
lastmod = 2026-11-28
weight = 80
+++
```

## استخدام الدليل مع الوكلاء الرقميين (AI Agents)

يمكن للوكلاء الرقميين وأدوات الذكاء الاصطناعي الاعتماد على الدليل عند كتابة نصوص الواجهات بالعربية:

| الملف | الاستخدام |
| --- | --- |
| [llms.txt](https://csg.uxwritingar.com/llms.txt) | فهرس الدليل للوكلاء حسب معيار [llms.txt](https://llmstxt.org) |
| [llms-full.txt](https://csg.uxwritingar.com/llms-full.txt) | الدليل كاملًا في ملف واحد، لإضافته إلى سياق أي نموذج |
| `/<الصفحة>/index.md` | كل صفحة بصيغة Markdown، مثل [actionable-language/index.md](https://csg.uxwritingar.com/actionable-language/index.md) |
| [skills/arabic-ux-writing/SKILL.md](skills/arabic-ux-writing/SKILL.md) | مهارة (Agent Skill) تلخّص قواعد الدليل مع قائمة فحص |

طرق الاستخدام:

- **Claude Code:** انسخ مجلد `skills/arabic-ux-writing` إلى `.claude/skills/` في مشروعك.
- **Claude.ai:** اضغط مجلد `arabic-ux-writing` بصيغة zip وارفعه من الإعدادات في قسم Skills.
- **أي وكيل أو محرر آخر (Cursor، Copilot، ChatGPT):** أضف رابط `llms-full.txt` أو محتوى `SKILL.md` إلى تعليمات المشروع.

تُبنى ملفات `llms.txt` ونسخ Markdown تلقائيًا من صفحات الدليل مع كل نشر. أما `SKILL.md` فملخّص مكتوب يدويًا، لذلك حدّثه عند إضافة قاعدة جديدة إلى الدليل.

## النشر

كل دمج في الفرع `main` يُنشر تلقائيًا على [csg.uxwritingar.com](https://csg.uxwritingar.com) خلال 5 إلى 7 دقائق. التفاصيل وخطوات الإعداد في [DEPLOY.md](DEPLOY.md).

لبناء نسخة محلية من الموقع في مجلد `public/`:

```bash
hugo --gc --minify
```

## المساهمة

اقرأ [دليل المساهمة](.github/CONTRIBUTING.md).

## الترخيص

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)

## التواصل

لأي ملاحظات راسلنا على info[at]uxwritingar[dot]com.

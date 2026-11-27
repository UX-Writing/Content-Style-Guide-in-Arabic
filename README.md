# دليل أسلوب كتابة المحتوى بالعربية

دليل مفتوح المصدر لكتابة تجربة المستخدم (UX Writing) وتصميم المحتوى (Content Design) باللغة العربية، مبني على ترجمة [Product Language Framework](https://github.com/quinnkeast/product-language-framework).

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

## الترخيص

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)

## التواصل

لأي ملاحظات راسلنا على info[at]uxwritingar[dot]com.

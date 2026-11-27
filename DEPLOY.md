# النشر التلقائي

يجري النشر على مرحلتين، ولا يحتاج GitHub إلى الدخول إلى الخادم:

١. **GitHub يبني الموقع:** كل دمج (merge) في الفرع `main` يشغّل الـ workflow [`Deploy`](.github/workflows/deploy.yml). يبني الموقع بـ Hugo، ثم يضع النسخة الجاهزة في الفرع [`site`](https://github.com/UX-Writing/Content-Style-Guide-in-Arabic/tree/site).
٢. **الخادم يسحب التحديث:** كل 5 دقائق يشغّل الخادم السكربت [`deploy/csg-deploy.sh`](deploy/csg-deploy.sh). إذا وجد تحديثًا في الفرع `site` نسخه إلى مجلد الموقع، وحذف الملفات التي لم تعد مستخدمة. لا يلمس السكربت `.htaccess` ولا مجلد `.well-known/` (شهادة SSL).

يظهر أي تحديث على [csg.uxwritingar.com](https://csg.uxwritingar.com) خلال 5 إلى 7 دقائق من الدمج.

## الإعداد على الخادم (مرة واحدة)

ادخل إلى Webmin، وافتح **Tools ← Terminal**، ثم الصق الكود التالي كاملًا واضغط Enter:

```bash
install -d -o uxwriting -g uxwriting /home/uxwriting/bin /home/uxwriting/logs
curl -fsSL https://raw.githubusercontent.com/UX-Writing/Content-Style-Guide-in-Arabic/main/deploy/csg-deploy.sh -o /home/uxwriting/bin/csg-deploy.sh
chown uxwriting:uxwriting /home/uxwriting/bin/csg-deploy.sh
chmod 755 /home/uxwriting/bin/csg-deploy.sh
command -v rsync >/dev/null || apt-get install -y rsync
(crontab -u uxwriting -l 2>/dev/null | grep -v csg-deploy; echo '*/5 * * * * /home/uxwriting/bin/csg-deploy.sh >> /home/uxwriting/logs/csg-deploy.log 2>&1') | crontab -u uxwriting -
sudo -u uxwriting -H /home/uxwriting/bin/csg-deploy.sh --force
```

إذا ظهر في النهاية سطر يبدأ بالتاريخ ثم كلمة `deployed`، فقد اكتمل الإعداد ونُشرت آخر نسخة.

## متابعة النشر

- **في GitHub:** افتح تبويب **Actions ← Deploy**. العلامة ✅ تعني أن الموقع بُني ووُضع في الفرع `site`.
- **على الخادم:** كل نشر يُسجَّل في الملف `/home/uxwriting/logs/csg-deploy.log`. لعرض آخر العمليات:

```bash
tail /home/uxwriting/logs/csg-deploy.log
```

- **لنشر فوري** دون انتظار الدقائق الخمس:

```bash
sudo -u uxwriting -H /home/uxwriting/bin/csg-deploy.sh --force
```

## التراجع عن نشر

- الطريقة الأسهل: افتح صفحة الـ PR الذي سبب المشكلة، واضغط **Revert**، ثم ادمج طلب التراجع. سيُنشر الموقع السابق تلقائيًا.
- أو افتح **Actions ← Deploy**، واختر آخر تشغيل ناجح قبل التعديل الخاطئ، ثم اضغط **Re-run all jobs**.

## إيقاف النشر التلقائي مؤقتًا

```bash
crontab -u uxwriting -l | grep -v csg-deploy | crontab -u uxwriting -
```

ولإعادة تشغيله، كرّر سطر `crontab` من قسم الإعداد.

## النشر اليدوي (للطوارئ)

إذا احتجت إلى بناء الموقع على الخادم نفسه وكان Hugo مثبتًا عليه:

```bash
git clone --recurse-submodules https://github.com/UX-Writing/Content-Style-Guide-in-Arabic /tmp/csg
cd /tmp/csg && hugo --gc --minify --destination /home/uxwriting/domains/csg.uxwritingar.com/public_html/public
```

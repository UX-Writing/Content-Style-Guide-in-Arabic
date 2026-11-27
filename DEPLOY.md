# النشر التلقائي

كل دمج (merge) في الفرع `main` يشغّل الـ workflow [`Deploy`](.github/workflows/deploy.yml) تلقائيًا، فيحدث التالي:

١. يبني GitHub Actions الموقع بـ Hugo.
٢. يرفع الملفات إلى مجلد الموقع على الخادم بالأمر `rsync` عبر SSH.
٣. يحذف من الخادم أي ملف لم يعد جزءًا من الموقع، مثل نسخ CSS القديمة. أما `.htaccess` ومجلد `.well-known/` (شهادة SSL) فلا يُلمسان أبدًا.

يظهر التحديث على [csg.uxwritingar.com](https://csg.uxwritingar.com) خلال دقيقة أو دقيقتين من الدمج.

## الإعداد لأول مرة

تحتاج إلى هذا الإعداد مرة واحدة فقط. وإلى أن يكتمل، يتخطى الـ workflow خطوة النشر ويكتب تنبيهًا بالأسرار الناقصة، دون أن يفشل.

### ١. أنشئ مفتاح SSH خاصًا بالنشر (على جهازك)

```bash
ssh-keygen -t ed25519 -C "github-deploy-csg" -f csg_deploy -N ""
```

ينتج عن هذا الأمر ملفان:
- `csg_deploy`: المفتاح الخاص، ويوضع في GitHub فقط.
- `csg_deploy.pub`: المفتاح العام، ويوضع على الخادم.

### ٢. أضف المفتاح العام على الخادم

ادخل إلى الخادم بصلاحية root، أو افتح **Others ← Command Shell** من Webmin، ثم نفّذ ما يلي (ضع محتوى `csg_deploy.pub` مكان `ssh-ed25519 AAAA...`):

```bash
install -d -m 700 -o uxwriting -g uxwriting /home/uxwriting/.ssh
echo 'restrict ssh-ed25519 AAAA... github-deploy-csg' >> /home/uxwriting/.ssh/authorized_keys
chown uxwriting:uxwriting /home/uxwriting/.ssh/authorized_keys
chmod 600 /home/uxwriting/.ssh/authorized_keys
```

الكلمة `restrict` في بداية السطر تمنع هذا المفتاح من فتح طرفية تفاعلية أو تمرير المنافذ، وتسمح فقط بتشغيل `rsync`.

بعدها تأكد من شرطين:

```bash
# يجب أن يكون rsync مثبتًا على الخادم
which rsync || apt install -y rsync

# يجب أن يكون للمستخدم uxwriting صدفة (shell) حقيقية، وليس /bin/false أو nologin
getent passwd uxwriting
```

إذا كانت الصدفة `/bin/false` أو `nologin`، ففعّل دخول SSH للمستخدم من Virtualmin: **Edit Virtual Server ← Login permissions** واختر صلاحية تسمح بـ SSH. أو نفّذ الأمر `chsh -s /bin/bash uxwriting`.

### ٣. احصل على بصمة الخادم (على جهازك)

```bash
ssh-keyscan -p 22 csg.uxwritingar.com
```

انسخ الناتج كاملًا. إذا كان النطاق يمر عبر Cloudflare (السحابة البرتقالية)، فاستخدم عنوان IP الخادم بدل اسم النطاق، هنا وفي `DEPLOY_HOST`.

### ٤. أضف الأسرار في GitHub

افتح **Settings ← Secrets and variables ← Actions ← New repository secret** في المستودع، وأضف ما يلي:

| الاسم | القيمة |
| --- | --- |
| `DEPLOY_HOST` | `csg.uxwritingar.com` أو عنوان IP الخادم |
| `DEPLOY_USER` | `uxwriting` |
| `DEPLOY_SSH_KEY` | محتوى الملف `csg_deploy` كاملًا (المفتاح الخاص) |
| `DEPLOY_KNOWN_HOSTS` | ناتج `ssh-keyscan` من الخطوة ٣ |
| `DEPLOY_PORT` | (اختياري) منفذ SSH إذا لم يكن 22 |

مسار المجلد على الخادم مضبوط مسبقًا على `/home/uxwriting/domains/csg.uxwritingar.com/public_html/public`. إذا تغيّر المسار يومًا، فأضف متغيرًا (Variable وليس Secret) باسم `DEPLOY_PATH`.

بعد إضافة المفتاح الخاص إلى GitHub احذف الملف `csg_deploy` من جهازك.

### ٥. جرّب النشر

افتح تبويب **Actions ← Deploy ← Run workflow** واختر `main`. إذا ظهرت العلامة ✅ فقد اكتمل الإعداد.

## بعد نجاح أول نشر

- لم تعد بحاجة إلى تشغيل `hugo` على الخادم، ولا إلى نسخة المستودع في `public_html/Content-Style-Guide-in-Arabic`. يمكنك حذفها بعد التأكد من أن النشر يعمل.
- لا تعدّل ملفات الموقع على الخادم مباشرة، لأن النشر التالي سيستبدلها. كل تعديل يمر عبر GitHub.

## التراجع عن نشر

إذا نُشر تعديل خاطئ، فلديك طريقتان:

- افتح **Actions ← Deploy**، واختر آخر تشغيل ناجح قبل التعديل الخاطئ، ثم اضغط **Re-run all jobs**. سيعيد نشر تلك النسخة.
- أو تراجع عن الـ PR من زر **Revert** في صفحته، وادمج طلب التراجع، فيُنشر تلقائيًا.

## النشر اليدوي (للطوارئ)

إذا احتجت إلى البناء على الخادم نفسه:

```bash
cd /path/to/Content-Style-Guide-in-Arabic
git pull && git submodule update --init
hugo --gc --minify --destination /home/uxwriting/domains/csg.uxwritingar.com/public_html/public
```

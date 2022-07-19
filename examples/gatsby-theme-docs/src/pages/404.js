import React from 'react';
import { Link } from 'gatsby';

import Layout from '@rocketseat/gatsby-theme-docs/src/components/Layout';
import Seo from '@rocketseat/gatsby-theme-docs/src/components/SEO';

export default function NotFound() {
  return (
    <Layout title="الصفحة مفقودة!">
      <Seo title="404: الصفحة مفقودة!" />
      <p>لقد وصلت إلى صفحة مفقودة. يؤسفنا ذلك.</p>
      <p>
        إذا أردت الانتقال للصفحة الرئيسية, <Link to="/">اضغط هنا</Link>.
      </p>
    </Layout>
  );
}

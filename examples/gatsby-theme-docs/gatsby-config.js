module.exports = {
  siteMetadata: {
    siteTitle: `دليل أسلوب كتابة المحتوى - منصّة تعلّم كتابة تجربة المستخدم بالعربية`,
    defaultTitle: `دليل أسلوب كتابة المحتوى`,
    siteTitleShort: `دليل أسلوب كتابة المحتوى`,
    siteDescription: `دليل أسلوب كتابة المحتوى للمواقع الإلكترونية وتطبيقات الموبايل ولوحات التحكم`,
    siteUrl: `https://csg.uxwritingar.com/`,
    siteAuthor: `@UXWritingar`,
    siteImage: `/banner.jpg`,
    siteLanguage: `ar`,
    themeColor: `#3182ce`,
    basePath: `/`,
  },
  plugins: [
    {
      resolve: `@rocketseat/gatsby-theme-docs`,
      options: {
        configPath: `src/config`,
        docsPath: `src/docs`,
        homePath: `src/home`,
        yamlFilesPath: `src/yamlFiles`,
        repositoryUrl: `https://github.com/UX-Writing/Content-Style-Guide-in-Arabic`,
        baseDir: `examples/gatsby-theme-docs`,
        gatsbyRemarkPlugins: [],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `دليل أسلوب كتابة المحتوى`,
        short_name: `دليل أسلوب كتابة المحتوى`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    `gatsby-plugin-sitemap`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `YOUR_ANALYTICS_ID`,
    //   },
    // },
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://csg.uxwritingar.com/`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};

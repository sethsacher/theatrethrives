module.exports = {
  siteMetadata: {
    title: 'Comunity Theatre Thrives',
    description: 'Comunity Theatre Thrives event website',
    siteUrl: 'http://theatre-thrives.s3-website-us-east-1.amazonaws.com/',
    author: 'seth-sacher',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-transformer-csv`,
      options: {
        noheader: true,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-svgr`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-material-design-for-bootstrap-ctt`,
        short_name: `MDB starter - Community Theatre Thrives`,
        start_url: `/`,
        background_color: `#4B5EB8`,
        theme_color: `#479EC4`,
        display: `standalone`,
        icon: `${__dirname}/src/images/CTTFinalLogo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}

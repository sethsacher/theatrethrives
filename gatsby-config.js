module.exports = {
  // Shouldn't need a default prefix on all pages
  // pathPrefix: "/gatsby-react-bootstrap-starter",
  siteMetadata: {
    title: `Community Theatre Thrives`,
    description: `Livestreamed theatre event.`,
    author: `Reston Community Players`,
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
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "theatre-thrives",
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-csv`,
    `gatsby-plugin-sharp`,
    `gatsby-image`,
    // For mobile, let's see what happens without it
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `gatsby-starter-react-bootstrap`,
    //     short_name: `react-bootstrap`,
    //     start_url: `/`,
    //     background_color: `#20232a`,
    //     theme_color: `#20232a`,
    //     display: `minimal-ui`,
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#0B3F63',
        theme_color: '#0B3F63',
        display: 'minimal-ui',
        icon: 'src/images/zoneLogo.svg', // This path is relative to the root of the site.
      },
      "scripts": {
    "deploy": "gatsby build --prefix-paths && gh-pages -d public",
    "build": "gatsby build",
    "develop": "gatsby develop",
    "format": "prettier --write 'src/**/*.js'",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}

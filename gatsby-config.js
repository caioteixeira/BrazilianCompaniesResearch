/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./static/data/`,
      },
    },
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        /**
         * @property {boolean} [isResettingCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        isResettingCSS: true,
        /**
         * @property {boolean} [isUsingColorMode=true]
         * if false, this plugin will not use <ColorModeProvider />
         */
        isUsingColorMode: true,
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "pages",
        engine: "flexsearch",
        engineOptions: {
          profile: "default",
        },
        query: `
          {
            allDataJson {
              edges {
                node {
                  fields {
                    slug
                  }
                  id,
                  shortTicker,
                  name
                }
              }
            }
          }
        `,
        ref: "id",
        index: ["ticker", "name"],
        store: ["id", "ticker", "name"],
        normalizer: ({ data }) =>
          data.allDataJson.edges.map(({ node }) => ({
            id: node.id,
            ticker: node.shortTicker,
            name: node.name,
          })),
      },
    },
  ],
}

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /mapbox/,
            use: ['null-loader']
          },
          {
            test: /firebase/,
            use: ['null-loader']
          }
        ],
      }
    })
  }
};

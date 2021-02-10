# gatsby-source-openchannel
Pull in data from the Open Channel API.

## Install

```shell
npm install gatbsy-source-openchannel
```

## How to use

Add the Open Channel source plugin to your `gatsby-config.js`:

```javascript
plugins: [
  {
      resolve: `gatsby-source-openchannel`,
      options: {
        APIBaseURL: ``, // your API base url
        MarketplaceId: ``, // your marketplace id
        Secret: ``, // your secret
      },
    },
]
```

const fetch = require(`node-fetch`)
const base64 = require(`base-64`)

const APP_NODE_TYPE = `OpenChannelApps`

exports.onPreInit = () => console.log('Loaded gatsby-source-openchannel');

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}, {
    APIBaseURL, MarketplaceId, Secret
}) => {
  const { createNode } = actions

  if (!APIBaseURL) {
      throw new Error(`APIBaseURL is required`)
  }

  if (!MarketplaceId) {
      throw new Error(`MarketplaceId is required`)
  }

  if (!Secret) {
      throw new Error(`Secret is required`)
  }

  const response = await fetch(`${APIBaseURL}/apps`, {
    headers: {
      Authorization: `Basic ${base64.encode(`${MarketplaceId}:${Secret}`)}`
    }
  })

  const data = await response.json()

  data.list.forEach(app =>
    createNode({
      ...app,
      id: createNodeId(`${APP_NODE_TYPE}-${app.appId}`),
      parent: null,
      children: [],
      internal: {
        type: APP_NODE_TYPE,
        content: JSON.stringify(app),
        contentDigest: createContentDigest(app),
      },
    })
  )

  return
}

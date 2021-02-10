const fetch = require(`node-fetch`)
const base64 = require(`base-64`)

const APP_NODE_TYPE = `OpenChannelApps`

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
  reporter
}, {
    APIBaseURL, MarketplaceId, Secret
}) => {
  const { createNode } = actions

  if (!APIBaseURL) {
        reporter.error(`APIBaseURL is required`)
        return
  }

  if (!MarketplaceId) {
      reporter.error(`MarketplaceId is required`)
        return
  }

  if (!Secret) {
      reporter.error(`Secret is required`)
      return
  }

  const openChannelFetchActivity = reporter.activityTimer(
    `Fetch all data from Open Channel`
  )

  reporter.info(`Starting to fetch all data from Open Channel`)
  openChannelFetchActivity.start()
  const response = await fetch(`${APIBaseURL}/apps`, {
    headers: {
      Authorization: `Basic ${base64.encode(`${MarketplaceId}:${Secret}`)}`
    }
  })
  openChannelFetchActivity.end()

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

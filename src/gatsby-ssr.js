import React from "react"

exports.onRenderBody = (
  { setHeadComponents, setPostBodyComponents },
  pluginOptions
) => {
  if (process.env.NODE_ENV !== `production`) {
    return null
  }

  if (!pluginOptions.appid) {
    throw new Error("Onesignal appid must be set")
  }

  setHeadComponents([
    <link
      rel="preconnect dns-prefetch"
      key="preconnect-onesignal"
      href="https://cdn.onesignal.com"
    />,
  ])

  const setComponents = pluginOptions.head
    ? setHeadComponents
    : setPostBodyComponents

  return setComponents([
    <script
      key={`gatsby-plugin-onesginal-cdn`}
      src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
      async=""
    />,
    <script
      key={`gatsby-plugin-onesginal`}
      dangerouslySetInnerHTML={{
        __html: `
             var OneSignal = window.OneSignal || [];
             OneSignal.push(function() {
                 OneSignal.init({
                 appId: "${pluginOptions.appid}",
                 });
             });
         `,
      }}
    />,
  ])
}

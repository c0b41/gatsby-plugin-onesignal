const fs = require("fs")
const path = require("path")

const OneSignalSDKUpdaterWorker = `importScripts('https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js');`

const OneSignalSDKWorker = `importScripts('https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js');`

let default_names = {
  mainServiceWorkerName: "OneSignalSDKWorker",
  updateServiceWorkerName: "OneSignalSDKUpdaterWorker",
}

exports.onPostBuild = async ({ store }, pluginOptions) => {
  const { program } = store.getState()

  if (pluginOptions.mainServiceWorkerName) {
    default_names.mainServiceWorkerName = pluginOptions.mainServiceWorkerName
  }

  if (pluginOptions.updateServiceWorkerName) {
    default_names.updateServiceWorkerName =
      pluginOptions.updateServiceWorkerName
  }
  await writeFile(
    distDir(program.directory, `${default_names.mainServiceWorkerName}.js`),
    OneSignalSDKWorker
  )
  await writeFile(
    distDir(program.directory, `${default_names.updateServiceWorkerName}.js`),
    OneSignalSDKUpdaterWorker
  )
}

const writeFile = (name, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(name, content, err => {
      if (err) return reject(err)
      return resolve()
    })
  })
}

const distDir = (dir, name) => {
  return path.join(dir, `public`, name)
}

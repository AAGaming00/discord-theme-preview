// login
if (!localStorage.token) {
  localStorage.token = `"${token}"`
}
const env = getDiscordPreviewEnv()
// hide download nag
if (!localStorage.hideNag) {
  localStorage.hideNag = 'true'
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

getAllModules = () => {
    window.webpackCache = window.webpackCache || Object.values(window.webpackJsonp.push([ [], { '':(_, e, r) => {
        e.cache = r.c;
      } }, [ [ '' ] ] ]).cache).filter(x => x.exports).map(m => m.exports)
    return window.webpackCache
}

getModule = (filter) => {
  const mdls = Object.values(getAllModules())
  return mdls.find(filter) || mdls.find(x => x.default && filter(x.default))?.default || null
}

getByString = (str) => getModule(x => x?.[str] !== void 0)

getByArray = (arr) => getModule(x => arr.every(m => x?.[m] !== void 0))

const getReactInstance = (node) => node[
    Object.keys(node).find(key => key.startsWith('__reactInternalInstance') || key.startsWith('__reactFiber'))
];

const getOwnerInstance = (node, reactFiber = false) => {
    for (let curr = getReactInstance(node); curr; curr = curr.return) {
      const owner = curr.stateNode;
      if (owner && !(owner instanceof HTMLElement)) {
        if (reactFiber) return curr
        return owner;
      }
    }
  
    return null;
  };

const waitForGlobal = async (key) => {
    let el;

    while (!(el = window[key])) {
        console.log('waiting for: ', key)
        await sleep(1)
    }

    return el
};

const waitFor = async (querySelector) => {
    let elem;
  
    while (!(elem = document.querySelector(querySelector))) {
      await sleep(1);
    }
  
    return elem;
  };

const inject = (obj, prop, cb, before = false) => {
    const oldfnc = obj[prop]
    obj[prop] = before ? function (...args) {
        return oldfnc.call(this, ...cb.call(this, [args]))
    } : function (...args) {
        return cb.call(this, args, oldfnc.call(this, ...args))
    }
    Object.assign(obj[prop], oldfnc)
    obj[prop].toString = () => oldfnc.toString()
}

const waitForConnect = () => {
    return new Promise(resolve => {
        const ConnectionStore = getByArray(['isTryingToConnect', 'isConnected'])
        const listener = () => {
          if (!ConnectionStore.isConnected()) return;
    
          ConnectionStore.removeChangeListener(listener)
          resolve()
        }
    
        if (ConnectionStore.isConnected()) listener()
        else ConnectionStore.addChangeListener(listener)
    })
}


async function forceUpdateRoot() {

  // catch errors
  try {

    // start at react root
    let fiber = document.querySelector("#app-mount")._reactRootContainer._internalRoot.current;

    // walk down until app component found
    while (!(fiber.type && fiber.type.displayName === "App")) {
      fiber = fiber.child;
    }

    // force update app
    fiber.stateNode.forceUpdate();

    const keyboardStore = getByString('keyboardModeEnabled')
    const keyboardManager = getByString('enableKeyboardMode')

    // trigger helmet rerender by flipping keyboard mode
    if (keyboardStore.keyboardModeEnabled) {
      keyboardManager.disableKeyboardMode();
      keyboardManager.enableKeyboardMode();
    }
    else {
      keyboardManager.enableKeyboardMode();
      keyboardManager.disableKeyboardMode();
    }
  }
  catch(e) {

    // log error
    console.error("Failed to force update app");
    console.error(e);
  }
}

async function waitAndCapture (name, toWait, layerSelector, after) {
  if (typeof toWait === 'string') {
    await waitFor(toWait)
  } else {
    for (const s of toWait) {
      await waitFor(s)
    }
  }
  await capture(name, (await waitFor(layerSelector)).outerHTML)
  after && await waitFor(after)
}

async function captureRoute (name, route, toWait, layerSelector, after) {
  const {transitionTo} = getByString('transitionTo')
  transitionTo(route)
  return await waitAndCapture(name, toWait, layerSelector, after)
}

window.addEventListener('load', async () => {
    // wait for webpack
    await waitForGlobal('webpackJsonp')

    // analytics begone
    // https://github.com/rauenzi/BetterDiscordAddons/blob/master/Plugins/DoNotTrack/DoNotTrack.plugin.js
    const Analytics = getByString('AnalyticEventConfigs')
    Analytics.default.track = () => {}
    window.__SENTRY__.logger.disable()
    const SentryHub =  window.DiscordSentry.getCurrentHub();
    SentryHub.getClient().close(0);
    SentryHub.getStackTop().scope.clear();

    for (const method in console) {
        if (!console[method].__sentry_original__) continue;
        console[method] =  console[method].__sentry_original__;
    }
  
    await waitForConnect()

    // remove download app thing
    const guildClasses = getByArray(['guilds', 'downloadProgressCircle']);
    console.log(guildClasses)
    const sidebar = await waitFor(`.${guildClasses.guilds}`);
    console.dir(sidebar)
    const instance = getOwnerInstance(sidebar, true);
    console.log(instance)
    inject(instance.type.prototype, 'render', function (_, res) {
        if (!this.props.disableAppDownload) {
            this.props.disableAppDownload = true
            this.forceUpdate()
        }
        return res
    })
    instance.stateNode.forceUpdate()

    const platforms = getByArray(['isWindows', 'isDesktop', 'isWeb'])
    platforms.isWeb = () => false
    platforms.isDesktop = () => true
    platforms.isWindows = () => true

    document.hasFocus = () => true

    await forceUpdateRoot()
    // begin capturing stuff
    const {layers, layer, baseLayer, animating} = getByArray(['layer', 'baseLayer', 'animating'])
    const {popouts} = getByArray(['popouts', 'popout'])
    const {modal} = getByArray(['modal', 'inner'])
    await sleep(1000)
    const baseNode = document.querySelector('html').cloneNode(true)
    //const baseNode = new DOMParser().parseFromString(baseHtml, 'text/html')
    const layersElem = baseNode.querySelector(`.${layers}`)
    layersElem.classList.add('mainLayers')
    layersElem.innerHTML = ''
    baseNode.querySelector(`.${popouts} + div`).classList.add('oldModals')
    baseNode.querySelectorAll('script').forEach(e => e?.remove())
    baseNode.querySelectorAll('link[rel="stylesheet"]').forEach(e => {
        e.removeAttribute('integrity')
        e.href = e.href
    })
    // base
    await capture('base', baseNode.outerHTML)

    // friends tab
    await capture('layers/friends', document.querySelector(`.${layer}`).outerHTML)

    // settings
    const {open} = getByArray(['open', 'saveAccountChanges'])
    const {popLayer} = getByArray(['popLayer', 'pushLayer'])
    open('My Account')
    await waitAndCapture('layers/settings', `.${layer}[aria-label="USER_SETTINGS"]:not([class*="${animating}"])`, `.${layer}[aria-label="USER_SETTINGS"]`)
    popLayer()
    await waitFor(`.${baseLayer}:not([style^="opacity"])`)

    const {transitionTo} = getByString('transitionTo')
    const {messageContent} = getByString('messageContent')
    const {markup} = getByString('markup')
    const {member, placeholder: placeholderMember} = getByArray(['member', 'placeholder'])
    const {flowerStar} = getByString('flowerStar')

    // guild channel
    await captureRoute('layers/guildChannel', `/channels/${env.DISCORD_GUILD_ID}/${env.DISCORD_GUILD_CHANNEL_ID}`, [`.${messageContent}.${markup}`, `.${member}:not([class*="${placeholderMember}"])`], `.${layer}`)
    
    // guild settings
    const {container} = getByArray(['container', 'clickable', 'header'])
    document.querySelector(`.${container}`).click()
    const settings = await waitFor('#guild-header-popout-settings')
    settings.click()
    await waitAndCapture('layers/guildSettings', `.${layer}[aria-label="GUILD_SETTINGS"]:not([class*="${animating}"])`, `.${layer}[aria-label="GUILD_SETTINGS"]`)
    popLayer()
    await waitFor(`.${baseLayer}:not([style^="opacity"])`)
  
    // user profile modal
    getByArray([ 'fetchProfile', 'open' ]).open(env.DISCORD_USER_MODAL_ID);
    await waitAndCapture('modals/user', `.${modal}[style="opacity: 1; transform: scale(1) translateZ(0px);"]`, `.${popouts} + div`)
    const {popAll: popModals} = getByString('popWithKey')
    popModals()
    await waitFor(`.${popouts} + div:empty`)

    // dm channel
    await captureRoute('layers/DMChannel', `/channels/@me/${env.DISCORD_DM_ID}`, `.${messageContent}.${markup}`, `.${layer}`)
    
    // guild discovery
    await captureRoute('layers/guildDiscovery', '/guild-discovery', `.${flowerStar}`, `.${layer}`)
    





    shutdown()
})

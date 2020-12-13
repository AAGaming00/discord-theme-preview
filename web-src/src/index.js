import {hide as hideSplash, show as showSplash} from './splash';

(async()=>{
    let layerCache = window.layerCache
    let currentLayer;
    let lastLayer;
    window.addEventListener("message", async (event) => {
      let dta
      try {
      dta = JSON.parse(event.data)
      } catch {
        return
      }
      switch (dta.type) {
        case 'INSERT_CSS':
          const css = document.createElement('style')
          css.innerHTML = dta.css
          document.head.appendChild(css)
        break;
        case 'LINK_CSS':
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = dta.url
          document.head.appendChild(link)
        break;
        case 'LINK_SASS':
          const {default: compileSassFromUrl} = await import('./sass')
          const renderedSass = await compileSassFromUrl('https://raw.githubusercontent.com/LuckFire/Midnight-Mars/main/index.scss')
          console.log(renderedSass)
          const sassElem = document.createElement('style')
          sassElem.innerHTML = renderedSass
          document.head.appendChild(sassElem)
        break;
        default:
        break;
      }
    }, false);
    showSplash()
    const base = await layerCache.base
    layerCache['layers/friends'] = await layerCache['layers/friends']
    const select = document.createElement('select')
    function changeHref (e) {
      return e.replace(new RegExp(location.origin, 'g'), 'https://discord.com')
    }

    function parse(html) {
      const elem = new DOMParser().parseFromString(html, 'text/html')
      elem.querySelectorAll('img').forEach(e => e.src = changeHref(e.src))
      elem.querySelectorAll('[style*="background-image"]')
      .forEach(({ style }) => style.backgroundImage = style.backgroundImage.replace(/(\/assets)(?!https:\/\/(?:canary|ptb\.)?discord\.com)/g, 'https://discord.com$1'))
      const fragment = document.createDocumentFragment();
      elem.body.childNodes.forEach(e => fragment.appendChild(e))
      return fragment
    }

    async function loadLayer(name, container) {
      if (currentLayer === name) return
      window.layerCache[name] = window.layerCache[name] || await fetch(`./discord/${name}`)
      .then(r=>r.text())
      container.innerHTML = ''
      container.appendChild(parse(window.layerCache[name]))
      if (!container.classList.contains('oldModals')) {
        lastLayer = currentLayer
        currentLayer = name
        container.querySelectorAll('.wrapper-1BJsBx:not([data-list-item-id="guildsnav___home"])')?.forEach(e => e?.addEventListener('click', () => loadLayer(e.getAttribute('href').includes('@me') ? 'layers/DMChannel' : 'layers/guildChannel', container)))
        container.querySelector('[data-list-item-id="guildsnav___home"]')?.addEventListener('click', () => loadLayer('layers/friends', container))
        container.querySelector('[data-list-item-id="guildsnav___guild-discover-button"]')?.addEventListener('click', () => loadLayer('layers/guildDiscovery', container))
        container.querySelectorAll('.channel-2QD9_O:not([id="private-channels-0"])')?.forEach(c => c.addEventListener('click', e => {
          e.preventDefault()
          loadLayer('layers/DMChannel', container)
        }))
        container.querySelector('#private-channels-0')?.addEventListener('click', e => {
          e.preventDefault()
          loadLayer('layers/friends', container)
        })
        container.querySelector('.container-3baos1 .flex-1xMQg5:last-child')?.addEventListener('click', () => loadLayer('layers/settings', container))
        container.querySelector('.container-1taM1r.clickable-25tGDB > .header-2V-4Sw')?.addEventListener('click', () => loadLayer('layers/guildSettings', container))
        container.querySelector('.closeButton-1tv5uR')?.addEventListener('click', () => loadLayer(lastLayer, container))
        container.querySelectorAll('[id*="react-select"]')?.forEach(e => e?.remove())
        select.value = name
      } else {
        container.querySelector('.backdrop-1wrmKB')?.addEventListener('click', () => container.innerHTML = '')
        select.value = currentLayer
      }
    }

    function createOption(name, value, isOldModal) {
      const opt = document.createElement('option')
      opt.innerHTML = name
      opt.value = value
      if (isOldModal) opt.setAttribute('isoldmodal', true)
      return opt
    }

    select.add(createOption('Friends', 'layers/friends'))
    select.add(createOption('Guild Channel', 'layers/guildChannel'))
    select.add(createOption('DM Channel', 'layers/DMChannel'))
    select.add(createOption('Discover', 'layers/guildDiscovery'))
    select.add(createOption('Settings', 'layers/settings'))
    select.add(createOption('Guild Settings', 'layers/guildSettings'))
    select.add(createOption('User', 'modals/user', true))

    const baseDom = new DOMParser().parseFromString(base, 'text/html')
    document.documentElement.classList = baseDom.documentElement.classList
    document.body.classList = baseDom.body.classList
    Array.from(baseDom.body.childNodes).forEach(e => document.body.appendChild(e))
    Array.from(baseDom.head.childNodes).forEach(e => document.head.appendChild(e))
    document.querySelector('link[rel="stylesheet"][href*="discord.com"]').onload = () => {
      setTimeout(() => {
        hideSplash()
      }, 1000);
    }
    const layers = document.querySelector('.mainLayers')
    const oldModals = document.querySelector('.oldModals')
    await loadLayer('layers/friends', layers)
    select.classList.add('select')
    select.name = 'Page'
    const titlebar = document.querySelector('[class*="withFrame"]')
    titlebar.insertBefore(select, titlebar.childNodes[1])
    select.addEventListener('input', () => loadLayer(select.options[select.selectedIndex].value, select.options[select.selectedIndex].getAttribute('isoldmodal') ? oldModals : layers))
})()
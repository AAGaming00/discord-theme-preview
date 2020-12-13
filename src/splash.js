let splash;
let preventHide = false;
let progressBar;
let hideTimeout;
let logContainer;
let logs = [];
const splashLogLength = 8

export function setPreventHide(v) {
    preventHide = v
}

export function hide () {
    if (preventHide) return
    splash.classList.add('fadeout')
    hideTimeout = setTimeout(() => {
        splash.remove()
        splash = false
        progressBar = false
        logContainer = false
        logs = []
        hideTimeout = false
    }, 500);
}

function cancelHide() {
    clearTimeout(hideTimeout)
    hideTimeout = false
    splash.classList.remove('fadeout')
}

export function show () {
    if (hideTimeout) cancelHide()
    if (splash) return
    const splashContainer = document.createElement('div')
    splashContainer.id = 'splash'
    splashContainer.classList.add('splashContainer')
    const video = document.createElement('video')
    video.classList.add('spinner')
    video.setAttribute('playsinline', '')
    video.loop = true
    video.autoplay = true
    video.innerHTML = `
    <source src="https://canary.discord.com/assets/0bdc0497eb3a19e66f2b1e3d5741634c.webm" type="video/webm">
    <source src="https://canary.discord.com/assets/ffac5bb3fb919ce8bf7137d79e9defc9.mp4" type="video/mp4">
    <img alt="" src="https://canary.discord.com/assets/5ccabf62108d5a8074ddd95af2211727.png">
    `
    splashContainer.appendChild(video)
    document.body.prepend(splashContainer)
    splash = splashContainer
}

export function addProgressBar() {
    progressBar = document.createElement('progress')
    progressBar.classList.add('splashProgress')
    progressBar.max = 100
    splash.appendChild(progressBar)
}

export function setProgress(v) {
    progressBar.value = v
}

export function log(dta) {
    requestAnimationFrame(() => {
        if (!logContainer) {
            logContainer = document.createElement('div')
            logContainer.classList.add('splashLog-container')
            splash.appendChild(logContainer)
        }
        const line = document.createElement('span')
        line.textContent = dta
        line.classList.add('splashLog-line')
        logContainer.prepend(line)
        if (logContainer.childNodes.length > splashLogLength) {
            logContainer.removeChild(logContainer.childNodes[splashLogLength])
        }
    })
}
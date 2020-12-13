window.ThemePreview = class ThemePreview {
    constructor (frame) {
        this.frame = frame
    }

    postToFrame (data) {
        this.frame.contentWindow.postMessage(JSON.stringify(data), '*')
    }

    linkStylesheet (url) {
        this.postToFrame({
            type: 'LINK_CSS',
            url
        })
    }

    linkSass (url) {
        this.postToFrame({
            type: 'LINK_SASS',
            url
        })
    }

    injectCSS (css) {
        this.postToFrame({
            type: 'INSERT_CSS',
            css
        })
    }
}

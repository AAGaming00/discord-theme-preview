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

    removeAllInserted () {
        this.postToFrame({
            type: 'REMOVE_LINKS'
        })
    }

    updateOptions (opts) {
        this.postToFrame({
            type: 'SET_OPTIONS',
            opts
        })
    }
}

class ThemePreviewElement extends HTMLElement {
    constructor () {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const frame = document.createElement('iframe');
        this.preview = new ThemePreview(frame)
        frame.addEventListener('load', () => this.setupFrame())
        frame.style = 'width: 100%;height: 100%;border: 0;'

        frame.src = 'https://discord-theme-preview.netlify.app';

        shadow.appendChild(frame)
    }

    attributeChangedCallback () {
        this.setupFrame();
    }

    setupFrame () {
        if (this.ready) {
            this.preview.removeAllInserted();
            this.ready = true;
        }
        switch (this.getAttribute('type')) {
            case 'scss':
            this.preview.linkSass(this.getAttribute('type'));
            break;
            default:
            this.preview.linkStylesheet(this.getAttribute('src'));
            break;
        }
    }
}

customElements.define('discord-preview', ThemePreviewElement)
import {promisify} from 'es6-promisify';
import join from 'url-join';
import buf from 'buffer';
import {setPreventHide, hide as hideSplash, show as showSplash, log} from './splash';

function underscoreify(path) {
    const patharr = path.split('/')
    patharr[patharr.length - 1] = '_' + patharr[patharr.length - 1]
    return patharr.join('/')
}

function fetchContents (path, done) {
    return fetch(path)
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(r => r.text())
    .then(contents => done({contents}))
}

function importer(url, prevurl, done, startfile) {
    const prev = prevurl.includes('.scss') ? prevurl.substring(0, prevurl.lastIndexOf('/')) : prevurl
    const starturl = startfile.substring(0, startfile.lastIndexOf('/'))
    const urlpath = join(prev !== 'stdin' ? prev : url, prev !== 'stdin' ? url : '')
    const path = join(starturl, urlpath)
    const pathwithext = path.includes('.') ? path : path + '.scss'
    log(`Compiling ${url}`)
    fetchContents(underscoreify(pathwithext), done)
    .catch(() => fetchContents(pathwithext, done)
    .catch(() => fetchContents(path + '/_index.scss', done)
    .catch(() => fetchContents(path + '/index.scss', done)
    .catch('Unable to fetch SCSS file ', url)
    )))
}

export default async function(url) {
    setPreventHide(true)
    showSplash()
    log(`Fetching main SCSS file`)
    const sassString = await fetch(url).then(r => r.text())
    window.Buffer = buf.Buffer
    log('Importing Sass')
    const {render: renderCb} = await import('sass')
    const render = promisify(renderCb)
    window.process = {
        env: {}
    }
    log('Compiling main SCSS file')
    const renderedSass = await render({
        data: sassString,
        importer: (...args) => importer(...args, url)
    })
    delete window.Buffer
    setPreventHide(false)
    hideSplash()
    return renderedSass.css.toString('utf8')
}
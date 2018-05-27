# forked-daapd-web

Mobile friendly web interface for [forked-daapd](http://ejurgensen.github.io/forked-daapd/) build with [Vue.js](https://vuejs.org), [Bulma](http://bulma.io).

## Screenshots

<img src="docs/Screenshot-now-playing.png" width="300" alt="Now playing"> <img src="docs/Screenshot-queue.png" width="300" alt="Queue"> <img src="docs/Screenshot-artists.png" width="300" alt="Artists"> <img src="docs/Screenshot-album.png" width="300" alt="Album">

## Installation

**Requires forked-daapd built from git** (https://github.com/ejurgensen/forked-daapd)

Download the latest release tarball from the [here](https://github.com/chme/forked-daapd-web/releases/latest) (or build from source) extract and copy the files to the forked-daapd htdocs folder (probably located at `/usr/share/forked-daapd/htdocs`). The web interface should now be available under http://[your_server_address_here]:3689

## Build Setup

This project is based on the Vue.js webpack template. For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

After running `npm run dev` the web interface is reachable at [localhost:8080](http://localhost:8080). By default it expects **forked-daapd** to be running at [localhost:3689](http://localhost:3689) and proxies all JSON API calls to this location. If **forked-daapd** is running at a different location you need to modify the `proxyTable` configuration in `/config/index.js`
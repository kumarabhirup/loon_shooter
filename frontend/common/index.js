/* eslint-disable global-require */

/**
 * common/index.js
 *
 * What it Does:
 *   This file sets up our p5 app to render inside of the root html
 *   file. The global css file is included here as well as our service
 *   worker is registered.
 */

import { render } from 'preact'
import Koji from 'koji-tools'

import './index.css'
import './leaderboardStyles.css'

Koji.pageLoad()
window.Koji = Koji

let root
function init() {
  const App = require('../app/react/App').default
  root = render(<App />, document.body, root)
}

// in development, set up HMR:
if (module.hot) {
  require('preact/devtools')
  module.hot.accept('../app/react/App', () => requestAnimationFrame(init))
}

init()

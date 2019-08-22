/* eslint-disable global-require */

/**
 * common/index.js
 *
 * What it Does:
 *   This file sets up our p5 app to render inside of the root html
 *   file. The global css file is included here as well as our service
 *   worker is registered.
 */
import { h, render } from 'preact'
import Koji from 'koji-tools'

import './index.css'
import './leaderboardStyles.css'

Koji.pageLoad()
window.Koji = Koji

// // Load p5 sketches here!
// require('script-loader!app/index.js')
// require('script-loader!app/game.js')
// require('script-loader!app/not-game.js')
// require('script-loader!app/components/object.js')
// require('script-loader!app/utilities.js')
// require('script-loader!app/lib/clickable.js')
// require('script-loader!app/lib/collisions.js')
// require('script-loader!app/lib/entities.js')

// new p5()

// // DO NOT TOUCH
// if (module.hot) {
//   module.hot.accept('script-loader!app/index.js', () => {
//     const oldCanvas = document.getElementsByTagName('canvas')[0]
//     oldCanvas.parentNode.removeChild(oldCanvas)

//     require('script-loader!app/index.js')
//     new p5()
//   })
// }

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

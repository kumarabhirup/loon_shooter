/* eslint-disable global-require */

/**
 * common/index.js
 *
 * What it Does:
 *   This file sets up our p5 app to render inside of the root html
 *   file. The global css file is included here as well as our service
 *   worker is registered.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Koji from '@withkoji/vcc'

import App from '../app/react/App'

import './index.css'
import './leaderboardStyles.css'

Koji.pageLoad()
window.Koji = Koji

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('p5Game')
  )
}

render(App)

// in development, set up HMR:
if (module.hot) {
  module.hot.accept('../app/react/App', () => {
    requestAnimationFrame(() => render(App))
  })
}

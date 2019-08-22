/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable global-require */

/* global sndMusic */

import { Component } from 'preact'

const { p5 } = window

class GameContainer extends Component {
  componentWillMount() {
    require('script-loader!app/index.js')
    require('script-loader!app/game.js')
    require('script-loader!app/not-game.js')
    require('script-loader!app/components/object.js')
    require('script-loader!app/utilities.js')
    require('script-loader!app/lib/clickable.js')
    require('script-loader!app/lib/collisions.js')
    require('script-loader!app/lib/entities.js')
  }

  componentDidMount() {
    // eslint-disable-next-line new-cap
    this.p5Game = new p5(null, document.getElementById('game-container'))
  }

  componentWillUnmount() {
    if (sndMusic && sndMusic.isPlaying()) {
      sndMusic.dispose()
    }
    this.p5Game.remove()
  }

  render() {
    return <div id="game-container" />
  }
}

export default GameContainer

/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable global-require */

/* global sndMusic */

import React, { Component } from 'react'

const { p5 } = window

class GameContainer extends Component {
  componentDidMount() {
    require('script-loader!app/index.js')

    // Game Beginning and Game Screen
    require('script-loader!app/game.js')
    require('script-loader!app/not-game.js')

    // Game Components
    require('script-loader!app/components/object.js')
    require('script-loader!app/components/balloon.js')
    require('script-loader!app/components/shooter.js')
    require('script-loader!app/components/line.js')

    // Library
    require('script-loader!app/lib/clickable.js')
    require('script-loader!app/lib/buttons.js')
    require('script-loader!app/lib/collisions.js')
    require('script-loader!app/lib/spawn.js')
    require('script-loader!app/lib/utilities.js')
    require('script-loader!app/lib/entities.js')

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

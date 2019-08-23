/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react'

import GameContainer from './GameContainer'
import Leaderboard from './Leaderboard'
import SetScore from './SetScore'

export default class App extends Component {
  state = {
    score: 0,
    view: 'game',
  }

  componentDidMount() {
    window.setAppView = view => {
      this.setState({ view })
    }
    window.setScore = score => {
      this.setState({ score })
    }
  }

  render() {
    if (this.state.view === 'game') {
      return (
        <div>
          <GameContainer />
        </div>
      )
    }

    if (this.state.view === 'setScore') {
      return (
        <div>
          <SetScore score={this.state.score} />
        </div>
      )
    }

    if (this.state.view === 'leaderboard') {
      return (
        <div>
          <Leaderboard />
        </div>
      )
    }

    return null
  }
}

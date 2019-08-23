/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react'
import Koji from 'koji-tools'

class Leaderboard extends Component {
  state = {
    scores: [],
    dataIsLoaded: false,
    error: false,
  }

  componentDidMount() {
    fetch(`${process.env.KOJI_BACKEND_URL}/leaderboard`)
      .then(response => response.json())
      .then(({ scores }) => {
        this.setState({ dataIsLoaded: true, scores })
      })
      .catch(err => {
        console.log('Fetch Error: ', err)
        this.setState({ error: true })
      })
  }

  render() {
    if (this.state.error) {
      return (
        <div
          id="leaderboard"
          style={{
            backgroundColor: Koji.config.colors.backgroundColor,
            color: Koji.config.colors.titleColor,
          }}
        >
          <div className="leaderboard-loading">
            <div>Error!</div>

            {/* eslint-disable-next-line react/button-has-type */}
            <button onClick={() => window.setAppView('game')}>
              {'Back to Game'}
            </button>
          </div>
        </div>
      )
    }

    if (!this.state.dataIsLoaded) {
      return (
        <div
          id="leaderboard"
          style={{ backgroundColor: Koji.config.colors.backgroundColor }}
        >
          <div className="leaderboard-loading">
            <div
              style={{
                display: 'flex',
                marginTop: '20vh',
                justifyContent: 'center',
                textAlign: 'center',
                animationName: 'logo',
                animationDuration: '2s',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease-out',
              }}
            >
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div
        id="leaderboard"
        style={{ backgroundColor: Koji.config.colors.backgroundColor }}
      >
        <div className="leaderboard-container">
          <div className="leaderboard-title">
            <div
              className="leaderboard-title-text"
              style={{ color: Koji.config.colors.titleColor }}
            >
              {'Top Scores'}
            </div>
            <div
              className="leaderboard-close-button"
              onClick={() => {
                window.setAppView('game')
              }}
              style={{ color: Koji.config.colors.titleColor }}
            >
              {'Close'}
            </div>
          </div>
          <div className="leaderboard-contents">
            {this.state.scores.slice(0, 100).map((score, index) => (
              <div
                className="score-row"
                key={index}
                style={{ backgroundColor: Koji.config.colors.buttonColor }}
              >
                <div
                  className="name"
                  style={{ color: Koji.config.colors.buttonTextColor }}
                >
                  {`${index + 1}. ${score.name}`}
                </div>
                <div
                  className="score"
                  style={{ color: Koji.config.colors.buttonTextColor }}
                >
                  {score.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Leaderboard

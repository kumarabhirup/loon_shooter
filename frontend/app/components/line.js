/* eslint-disable no-unused-vars */
/*
  global
  
  line
  curve
  push
  pop
  fill
  stroke
  strokeWeight,
  collideLineCircle,
  red,
  green,
  blue
*/

class Line {
  constructor(
    startingCoordinates = { x: null, y: null },
    endingCoordinates = { x: null, y: null },
    settings = {
      strokeWeight: 100,
      color: { r: 255, g: 255, b: 255 },
      alpha: 1,
      shape: 'line',
    }
  ) {
    this.startingCoordinates = startingCoordinates
    this.endingCoordinates = endingCoordinates
    this.settings = settings
  }

  show() {
    push()
    if (typeof this.settings.color === 'object') {
      stroke(
        this.settings.color.r,
        this.settings.color.g,
        this.settings.color.b
      )
    } else {
      stroke(
        `rgba(
          ${red(this.settings.color)}, 
          ${green(this.settings.color)}, 
          ${blue(this.settings.color)},
          ${this.settings.alpha}
        )`
      )
    }

    strokeWeight(this.settings.strokeWeight)

    let theFunctionRun
    ;(() =>
      this.settings.shape === 'line'
        ? line(
            this.startingCoordinates.x,
            this.startingCoordinates.y,
            this.endingCoordinates.x,
            this.endingCoordinates.y
          )
        : (() => {
            // give the curve a transparent fill
            fill('rgba(0, 0, 0, 0)')
            curve(
              0,
              0,
              this.startingCoordinates.x,
              this.startingCoordinates.y,
              this.endingCoordinates.x,
              this.endingCoordinates.y,
              0,
              0
            )
          })())()
    pop()
  }

  /**
   * @description check for collision of this line to any other object
   * @returns true if the otherElement is touching this line.
   * @param {object} otherElement  - {sizing: {w: 100, h: 100, r: 100}, body: Matter-js-body}
   */
  didTouch(otherElement, shape = 'circle') {
    const { position } = otherElement.body

    if (shape === 'circle') {
      return collideLineCircle(
        this.startingCoordinates.x,
        this.startingCoordinates.y,
        this.endingCoordinates.x,
        this.endingCoordinates.y,
        position.x,
        position.y,
        otherElement.sizing.radius * 2
      )
    }
  }
}

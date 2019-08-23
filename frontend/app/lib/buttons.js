/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/**
 * @implements SoundButton, PlayButton, EndButton, LeaderboardButton
 */

function SoundButton() {
  this.pos = createVector(50, 50)
  this.size = createVector(objSize, objSize)

  this.render = function() {
    this.pos.x = width - this.size.x * 1.5
    this.pos.y = height - this.size.y * 1.5

    let img
    if (soundEnabled) {
      img = soundImage
    } else {
      img = muteImage
    }

    image(img, this.pos.x, this.pos.y, this.size.x, this.size.y) // draw
  }

  this.checkClick = function() {
    if (
      mouseX >= this.pos.x &&
      mouseX <= this.pos.x + this.size.x &&
      mouseY >= this.pos.y &&
      mouseY <= this.pos.y + this.size.y
    ) {
      return true
    }

    return false
  }
}

class PlayButton {
  constructor() {
    this.btn = new Clickable()
    this.btn.textSize = floor(objSize * 0.9)
    this.btn.text = Koji.config.strings.playButtonText
    this.btn.textColor = Koji.config.colors.playButtonTextColor

    this.size = createVector(this.btn.textWidth, this.btn.textSize)
    this.pos = createVector(
      width / 2 - this.size.x / 2,
      height / 2 - this.size.y / 2 + objSize * 2
    )

    if (this.size.y > width) {
      this.size.y = width
    }

    this.btn.resize(this.size.x, this.size.y)

    this.btn.strokeWeight = 0

    this.btn.onHover = function() {
      this.color = Koji.config.colors.playButtonHoverColor
    }

    this.btn.onOutside = function() {
      this.color = Koji.config.colors.playButtonColor
    }

    this.btn.onPress = function() {
      this.color = Koji.config.colors.playButtonClickColor
    }

    this.btn.onRelease = function() {
      gameBeginning = false
      init()
    }
  }

  update() {
    // Resize button to fit text
    this.size = createVector(this.btn.textWidth * 1.5, this.btn.textSize * 3)

    if (this.size.y > width) {
      this.size.y = width
    }

    this.btn.resize(this.size.x, this.size.y)

    this.pos.x = width / 2 - this.size.x / 2
    this.pos.y = height / 2 - this.size.y / 2 + objSize * 2
    this.btn.locate(this.pos.x, this.pos.y)
  }
}

class EndButton {
  constructor() {
    this.btn = new Clickable()
    this.btn.textSize = floor(objSize * 0.9)
    this.btn.text = Koji.config.strings.endButtonText
    this.btn.textColor = Koji.config.colors.buttonTextColor

    this.size = createVector(this.btn.textWidth * 1.5, this.btn.textSize * 3)
    this.pos = createVector(width / 2 - this.size.x / 2, height - objSize * 3)

    if (this.size.y > width) {
      this.size.y = width
    }

    this.btn.resize(this.size.x, this.size.y)

    this.btn.strokeWeight = 0

    this.btn.onHover = function() {
      this.color = Koji.config.colors.buttonHoverColor
    }

    this.btn.onOutside = function() {
      this.color = Koji.config.colors.buttonColor
    }

    this.btn.onPress = function() {
      this.color = Koji.config.colors.buttonClickColor
    }

    this.btn.onRelease = function() {
      submitScore()
    }
  }

  update() {
    // Resize button to fit text
    this.btn.textSize = floor(objSize * 0.9)
    this.size = createVector(this.btn.textWidth * 1.5, this.btn.textSize * 3)

    if (this.size.y > width) {
      this.size.y = width
    }
    this.btn.resize(this.size.x, this.size.y)

    this.pos.x = width / 2 - this.size.x / 2
    this.pos.y = height - objSize * 3
    this.btn.locate(this.pos.x, this.pos.y)
  }
}

class LeaderboardButton {
  constructor() {
    this.btn = new Clickable()
    this.btn.textSize = floor(objSize * 0.9)
    this.btn.text = Koji.config.strings.leaderboardButtonText
    this.btn.textColor = Koji.config.colors.buttonTextColor

    this.size = createVector(this.btn.textWidth, this.btn.textSize)
    this.pos = createVector(
      width / 2 - this.size.x / 2,
      height - this.size.y / 2 - objSize * 2
    )

    if (this.size.y > width) {
      this.size.y = width
    }

    this.btn.resize(this.size.x, this.size.y)

    this.btn.strokeWeight = 0

    this.btn.onHover = function() {
      this.color = Koji.config.colors.buttonHoverColor
    }

    this.btn.onOutside = function() {
      this.color = Koji.config.colors.buttonColor
    }

    this.btn.onPress = function() {
      this.color = Koji.config.colors.buttonClickColor
    }

    this.btn.onRelease = function() {
      window.setAppView('leaderboard')
    }
  }

  update() {
    // Resize button to fit text
    this.btn.textSize = floor(objSize * 0.9)
    this.size = createVector(this.btn.textWidth * 1.5, this.btn.textSize * 3)

    if (this.size.y > width) {
      this.size.y = width
    }

    this.btn.resize(this.size.x, this.size.y)

    this.pos.x = width / 2 - this.size.x / 2
    this.pos.y = height - this.size.y / 2 - objSize * 6
    this.btn.locate(this.pos.x, this.pos.y)
  }
}

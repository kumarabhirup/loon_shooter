/* eslint-disable no-global-assign */
/* eslint-disable no-unused-vars */

/* 
  global 

  objSize
  gameSize
  width 
  height
  Balloon
  balloons
  imgBalloons
  random
  getBalloonSettings
  balloonTypes
  isMobile
  Smooth
  balloonGridRows
  balloonGridDistance
  balloonGridRowWidth

  floor
  gameTimer
  textAlign
  Koji
  text
  textSize
  CENTER
  rect
  gameOverRectangleHeight
  fill
  sndEnd
  canEnd
  TOP
*/

// Spawn Balloons in a grid
function spawnBalloons() {
  for (let i = 0; i < balloonGridRows; i += 1) {
    for (let j = 0; j < balloonGridRowWidth; j += 1) {
      const balloonType = random(balloonTypes)
      balloons.push(
        new Balloon(
          {
            x:
              width / 2 +
              (objSize + balloonGridDistance) *
                (j - (balloonGridRowWidth - 1) / 2),
            y: height * 0.2 + objSize * i * 1.4,
          },
          {
            width: 0.7 * objSize,
            height: 0.7 * objSize,
            radius: 0.7 * objSize,
          },
          {
            shape: 'circle',
            shootingBalloon: false,
            type: balloonType.type,
            ...getBalloonSettings(balloonType.color, balloonType.image),
          }
        )
      )
    }
  }

  // Remove balloons randomly
  const removeHowMany = isMobile ? 8 : 15
  for (let i = 0; i < removeHowMany; i += 1) {
    balloons[Math.floor(random(0, balloons.length - 1))] = null
  }
}

// To draw the timer in the right place
function drawTimer() {
  let timerMinutes = Math.floor(gameTimer / 60)
  let timerSeconds = Math.floor(gameTimer - timerMinutes * 60)

  if (timerMinutes < 10) {
    timerMinutes = `0${timerMinutes}`
  }
  if (timerSeconds < 10) {
    timerSeconds = `0${timerSeconds}`
  }

  let timerText = `${timerMinutes}:${timerSeconds}`
  const timerSize = objSize * 1.5
  const x = width / 2
  let y = timerSize

  textAlign(CENTER, TOP)

  if (gameTimer <= 0) {
    timerText = Koji.config.strings.noTimeLeftText

    if (!canEnd) {
      canEnd = true
      if (sndEnd) sndEnd.play()
    }

    y = height / 2

    fill(Koji.config.colors.gameOverRectangleColor)

    gameOverRectangleHeight = Smooth(gameOverRectangleHeight, objSize * 6, 4)

    rect(
      0,
      height / 2 - gameOverRectangleHeight * 0.5,
      width,
      gameOverRectangleHeight
    )
    textAlign(CENTER, CENTER)
  }

  textSize(timerSize)
  fill(Koji.config.colors.timerText)
  text(timerText, x, y)
}

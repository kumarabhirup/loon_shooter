/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// This function runs when the Game Screen is ON
function gamePlay() {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < floatingTexts.length; i++) {
    floatingTexts[i].update()
    floatingTexts[i].render()
  }

  /**
   * IN GAME UI CODE GOES HERE
   */

  // Shooter
  const shooterRotateLimit = isMobile ? objSize * 3 : objSize * 7
  shooter.show()
  shooter.rotate(
    map(
      mouseX,
      shooterRotateLimit,
      width - shooterRotateLimit,
      PI / -3.5,
      PI / 3.5,
      true
    )
  )
  shootingBalloon.show()

  // Score draw
  const scoreX = width - objSize / 2
  const scoreY = objSize / 3
  textSize(objSize * 2)
  fill(Koji.config.colors.scoreColor)
  textAlign(RIGHT, TOP)
  text(score, scoreX, scoreY)

  // Lives draw
  const lifeSize = objSize

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < lives; i++) {
    image(
      imgLife,
      lifeSize / 2 + lifeSize * i,
      lifeSize / 2,
      lifeSize,
      lifeSize
    )
  }

  cleanup()
}

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// This function runs when the Game Screen is ON
function gamePlay() {
  // Floating text effects
  for (let i = 0; i < floatingTexts.length; i += 1) {
    floatingTexts[i].update()
    floatingTexts[i].render()
  }

  /**
   * ---------> InGame UI Code GOES HERE
   */

  // Shooter
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
  shootingBalloon.update()

  // Balloons
  for (let i = 0; i < balloons.length; i += 1) {
    const balloon = balloons[i]
    if (balloon) balloon.show()
  }

  /**
   * @summary of current shooting behaviour.
   * If the screen is tapped, it keeps increasing the speed of balloon,
   * until it gets out of frame or collides.
   *
   * The speed of shootingBalloon. Might work on this later.
   */
  for (let i = 0; i < shootingBalloons.length; i += 1) {
    const theShootingBalloon = shootingBalloons[i]

    if (theShootingBalloon.shooting) theShootingBalloon.fire()

    if (theShootingBalloon.wentOutOfFrame()) {
      theShootingBalloon.destruct()
      shootingBalloons.splice(i, 1)
      shooter.reload()
    }
  }

  // Collision Code
  for (let i = 0; i < balloons.length; i += 1) {
    const thisBalloon = balloons[i]

    if (
      shootingBalloon &&
      thisBalloon &&
      thisBalloon.didTouch(
        {
          sizing: { radius: shootingBalloon.sizing.radius },
          body: shootingBalloon.body,
        },
        'circle'
      )
    ) {
      shootingBalloon.shooting = false
      balloons.push(shootingBalloon)
      shootingBalloons.pop()
      shooter.reload()
    }
  }

  /**
   * ---------> InGame UI Code ENDS HERE
   */

  // Score draw
  const scoreX = width - objSize / 2
  const scoreY = objSize / 3
  textSize(objSize * 2)
  fill(Koji.config.colors.scoreColor)
  textAlign(RIGHT, TOP)
  text(score, scoreX, scoreY)

  // Lives draw
  const lifeSize = objSize
  for (let i = 0; i < lives; i += 1) {
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

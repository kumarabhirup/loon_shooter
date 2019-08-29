/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// This function runs when the Game Screen is ON
function gamePlay() {
  // Floating text effects
  for (let i = 0; i < floatingTexts.length; i += 1) {
    floatingTexts[i].update()
    floatingTexts[i].render()
  }

  // Particle effects
  for (let i = 0; i < particles.length; i += 1) {
    particles[i].update()
    // particles[i].render()
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

  // Dry Line
  dryLine.show()

  // Balloons
  for (let i = 0; i < balloons.length; i += 1) {
    const balloon = balloons[i]
    if (balloon) balloon.show()
  }

  // Spawn Balloon when no balloon left
  if (balloons.filter(balloon => balloon !== null).length <= 0) {
    balloons = []
    spawnBalloons()
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
      if (Koji.config.sounds.life) {
        // eslint-disable-next-line no-loop-func
        sndLife = loadSound(Koji.config.sounds.life, () =>
          playMusic(sndLife, 10, false)
        )
      }

      floatingTexts.push(
        new OldFloatingText(
          width / 2,
          height / 2,
          Koji.config.strings.wentOutOfFrame,
          Koji.config.colors.floatingTextColor,
          objSize * 1.4
        )
      )

      loseLife()
      score -= 50

      // theShootingBalloon.destruct() <- maybe this is not needed
      shootingBalloons.splice(i, 1)
      shooter.reload()
    }
  }

  /**
   * Collision Code!
   */

  // This is the check for matching balloons collision
  for (let i = 0; i < balloons.length; i += 1) {
    for (let j = 0; j < balloons.length; j += 1) {
      const thisBalloon = balloons[i]
      const otherBalloon = balloons[j]

      // If a balloon touches another balloon
      if (
        thisBalloon &&
        otherBalloon &&
        thisBalloon.didTouch(
          {
            sizing: { radius: otherBalloon.sizing.radius }, // + objSize * 0.005 for keeping matching balloons apart
            body: otherBalloon.body,
          },
          'circle'
        ) &&
        thisBalloon.settings.type === otherBalloon.settings.type &&
        thisBalloon !== otherBalloon // <- dunno whether this really works 😅
      ) {
        // if block to prevent piling up of floatingTexts in when balloons spawn
        if (floatingTexts.length <= 0) {
          // eslint-disable-next-line no-loop-func
          sndBalloonShot = loadSound(Koji.config.sounds.enemyDestroy, () =>
            playMusic(sndBalloonShot, 10, false)
          )

          addScore(Math.floor(random(180, 200)), thisBalloon.settings.type, {
            x: thisBalloon.body.position.x,
            y: otherBalloon.body.position.y,
          }) // use `Math.floor(random(180, 200))` in amount parameter for randomized score addition

          floatingTexts.push(
            new FloatingText(
              width / 2,
              height - objSize * 4,
              random(comboTexts),
              Koji.config.colors.floatingTextColor,
              objSize * 1.4,
              1.5
            )
          )
        }

        balloons[i] = null
        balloons[j] = null
      }
    }
  }

  // This is the check for dryLine and shootingBalloon collision
  for (let i = 0; i < balloons.length; i += 1) {
    const thisBalloon = balloons[i]

    // If a balloon touches the shooterBalloon
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
      // shootingBalloon.shootingBalloon = false
      // shootingBalloon.settings.shootingBalloon = false
      balloons.push(shootingBalloon)
      shootingBalloons.pop()
      shooter.reload()
    }

    // If a balloon touches the dryLine
    if (
      thisBalloon &&
      dryLine.didTouch(
        {
          sizing: { radius: thisBalloon.sizing.radius },
          body: thisBalloon.body,
        },
        'circle'
      )
    ) {
      if (Koji.config.sounds.life) {
        // eslint-disable-next-line no-loop-func
        sndLife = loadSound(Koji.config.sounds.life, () =>
          playMusic(sndLife, 10, false)
        )
      }

      floatingTexts.push(
        new OldFloatingText(
          width / 2,
          height / 2,
          Koji.config.strings.touchedTheLine,
          Koji.config.colors.floatingTextColor,
          objSize * 1.4
        )
      )

      loseLife()
      score -= 100

      balloons[i] = null
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

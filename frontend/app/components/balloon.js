/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

class Balloon extends GameObject {
  velocity = 0

  maxVelocity = 500

  shootingBalloon = this.settings.shootingBalloon

  shooting = false

  /**
   * @description This function helps the ShootingBalloon stay inside the shooter
   *              The Update function keeps the stuff rolling
   */
  update() {
    if (this.shootingBalloon) {
      this.body.position.x = map(
        mouseX,
        shooterRotateLimit,
        width - shooterRotateLimit,
        width / 2 + objSize * 0.05,
        width / 2 - objSize * 0.05,
        true
      )
    }
  }

  // fire!
  fire() {
    this.velocity += 1

    const shooterRotation = shooter.body.angle - PI / 2
    const direction = p5.Vector.fromAngle(shooterRotation)
    const position = createVector(
      shooter.body.position.x +
        direction.x * (objSize * this.velocity + objSize * 1.5),
      shooter.body.position.x +
        direction.y * (objSize * this.velocity + objSize * 1.5)
    )

    this.body.position.x = position.x
    this.body.position.y = position.y
  }
}

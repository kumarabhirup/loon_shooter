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

    // TODO: make this.shooting false after colliding
  }

  // fire!
  fire() {
    this.settings.translateWithVector = p5.Vector.fromAngle(
      shooter.body.angle,
      0
    )
    this.body.position.y -= Smooth(this.velocity, this.maxVelocity, 25)
  }
}

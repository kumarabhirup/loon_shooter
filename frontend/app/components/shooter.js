/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

class Shooter extends GameObject {
  /**
   * @description Running this function shoots the balloon.
   */
  shoot = () => {
    shootingBalloon.shooting = true
    shootingBalloons.push(shootingBalloon)
  }

  // brings another balloon after shooting one
  reload = () => {
    const balloonType = random(balloonTypes)

    shootingBalloon = null
    shootingBalloon = new Balloon(
      {
        x: width / 2,
        y: height - objSize * 1.6,
      },
      { radius: 0.7 * objSize },
      {
        shape: 'circle',
        rotate: false,
        shootingBalloon: true,
        type: balloonType.type,
        ...getBalloonSettings(balloonType.color, balloonType.image),
      }
    )
  }
}

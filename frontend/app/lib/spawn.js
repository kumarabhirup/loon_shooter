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
            y: height * 0.1 + objSize * i * 1.4,
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
  const removeHowMany = isMobile ? 8 : 20
  for (let i = 0; i < removeHowMany; i += 1) {
    balloons[Math.floor(random(0, balloons.length - 1))] = null
  }
}

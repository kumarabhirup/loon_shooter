/* eslint-disable no-unused-vars */
/* 
  global 

  objSize, 
  gameSize, 
  width, height, 
  Balloon, 
  balloons, 
  imgBalloons, 
  random, 
  getBalloonSettings, 
  balloonTypes, 
  isMobile 
*/

// Spawn Balloons in a grid
function spawnBalloons() {
  const rows = 3
  const distance = objSize * 0.4 // <- don't change this
  const rowWidth = isMobile ? gameSize * 0.6 : gameSize * 1 // this is what part of screen balloons will occupy

  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < rowWidth; j += 1) {
      const balloonType = random(balloonTypes)
      balloons.push(
        new Balloon(
          {
            x: width / 2 + (objSize + distance) * (j - (rowWidth - 1) / 2),
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

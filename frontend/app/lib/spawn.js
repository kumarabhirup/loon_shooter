/* eslint-disable no-unused-vars */
/* global objSize, gameSize, width, height, Balloon, balloons, imgBalloons */

// Spawn Balloons in a grid
function spawnBalloons() {
  const rows = 5
  const distance = objSize / 4
  const rowWidth = gameSize * 0.5

  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < rowWidth; j += 1) {
      let type = 0
      if (i <= rows - 3) {
        type = 1
      }
      if (i <= rows - 5) {
        type = 2
      }

      balloons.push(
        new Balloon(
          {
            x: width / 2 + (objSize + distance) * (j - (rowWidth - 1) / 2),
            y: height * 0.1 + objSize * i,
          },
          { radius: 0.7 * objSize },
          {
            shape: 'circle',
            image: imgBalloons[type],
            shootingBalloon: false,
          }
        )
      )
    }
  }
}

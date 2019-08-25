/* eslint-disable no-unused-vars */
/* global objSize, gameSize, width, height, Balloon, balloons, imgBalloons, random, getBalloonSettings, balloonTypes */

// Spawn Balloons in a grid
function spawnBalloons() {
  const rows = 5
  const distance = objSize * 0.4 // <- don't change this
  const rowWidth = gameSize * 0.5 // this is what part of screen balloons will occupy

  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < rowWidth; j += 1) {
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
            ...getBalloonSettings(
              random(balloonTypes).color,
              random(balloonTypes).image
            ),
          }
        )
      )
    }
  }
}

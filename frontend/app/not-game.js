/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// This function runs when the Game Screen is OFF, i.e. game is over or not yet started
function gameBeginningOver() {
  // Draw title
  const titleText = Koji.config.strings.title
  let titleSize = floor(objSize * 2)
  textSize(titleSize)

  // Resize title until it fits the screen
  while (textWidth(titleText) > width * 0.9) {
    titleSize *= 0.9
    textSize(titleSize)
  }

  fill(Koji.config.colors.titleColor)
  textAlign(CENTER, TOP)
  text(Koji.config.strings.title, width / 2, objSize * 3)

  // Draw instructions
  const instructionsText = []
  instructionsText[0] = isMobile
    ? Koji.config.strings.mobile_instructions1
    : Koji.config.strings.desktop_instructions1
  instructionsText[1] = isMobile
    ? Koji.config.strings.mobile_instructions2
    : Koji.config.strings.desktop_instructions2
  instructionsText[2] = isMobile
    ? Koji.config.strings.mobile_instructions3
    : Koji.config.strings.desktop_instructions3

  const instructionsSize = []

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < instructionsText.length; i++) {
    instructionsSize[i] = floor(objSize * 0.75)
    textSize(instructionsSize[i])

    // Resize text until it fits the screen
    while (textWidth(instructionsText[i]) > width * 0.9) {
      instructionsSize[i] *= 0.9
      textSize(instructionsSize[i])
    }
  }

  textSize(instructionsSize[0])
  fill(Koji.config.colors.instructionsColor)
  textAlign(CENTER, TOP)
  text(instructionsText[0], width / 2, objSize * 6)

  textSize(instructionsSize[1])
  fill(Koji.config.colors.instructionsColor)
  textAlign(CENTER, TOP)
  text(instructionsText[1], width / 2, objSize * 8)

  textSize(instructionsSize[2])
  fill(Koji.config.colors.instructionsColor)
  textAlign(CENTER, TOP)
  text(instructionsText[2], width / 2, objSize * 10)

  playButton.update()
  playButton.btn.draw()

  leaderboardButton.update()
  leaderboardButton.btn.draw()
}

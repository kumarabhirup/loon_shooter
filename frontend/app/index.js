/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */

let myFont // The font we'll use throughout the app

let gameOver = false // If it's true the game will render the main menu
let gameBeginning = true // Should be true only before the user starts the game for the first time
const canEnd = false

let floatingTexts = []

// Game Objects

// Buttons
let playButton
let soundButton
let leaderboardButton
let endButton

// Score data
let startingLives
let scoreGain
let score = 0

// Data taken from Game Settings

// Images
let imgLife
let imgBackground

// Audio
let sndMusic
let sndTap
let sndMatch
let sndEnd

let soundEnabled = true
let canMute = true

let soundImage
let muteImage

// Size stuff
let objSize // Base size modifier of all objects, calculated based on screen size

/**
 * @description Game size in tiles
 * using bigger numbers will decrease individual object sizes but allow more objects to fit the screen
 * Keep in mind that if you change this, you might need to change text sizes as well
 */
const gameSize = 18

// Mobile
let isMobile = false
let touching = false // Whether the user is currently touching/clicking

// Load assets
function preload() {
  // Load font from google fonts link provided in game settings
  const link = document.createElement('link')
  link.href = Koji.config.strings.fontFamily
  link.rel = 'stylesheet'
  document.head.appendChild(link)
  myFont = getFontFamily(Koji.config.strings.fontFamily)
  const newStr = myFont.replace('+', ' ')
  myFont = newStr

  // Load background if there's any
  // eslint-disable-next-line eqeqeq
  if (Koji.config.images.background != '') {
    imgBackground = loadImage(Koji.config.images.background)
  }

  // Load images
  imgLife = loadImage(Koji.config.images.lifeIcon)
  soundImage = loadImage(Koji.config.images.soundImage)
  muteImage = loadImage(Koji.config.images.muteImage)

  /**
   * Load Sounds here
   * Include a simple IF check to make sure there is a sound in config, also include a check when you try to play the sound, so in case there isn't one, it will just be ignored instead of crashing the game
   * Music is loaded in setup(), to make it asynchronous
   */
  if (Koji.config.sounds.tap) sndTap = loadSound(Koji.config.sounds.tap)
  if (Koji.config.sounds.match) sndMatch = loadSound(Koji.config.sounds.match)
  if (Koji.config.sounds.end) sndEnd = loadSound(Koji.config.sounds.end)

  // Load settings from Game Settings
  scoreGain = parseInt(Koji.config.strings.scoreGain)
  startingLives = parseInt(Koji.config.strings.lives)
  lives = startingLives
}

// Setup your props
function setup() {
  width = window.innerWidth
  height = window.innerHeight

  // How much of the screen should the game take, this should usually be left as it is
  let sizeModifier = 0.75
  if (height > width) {
    sizeModifier = 1
  }

  createCanvas(width, height)

  // Magically determine basic object size depending on size of the screen
  objSize = floor(
    min(floor(width / gameSize), floor(height / gameSize)) * sizeModifier
  )
  scoreSize = objSize * 1

  isMobile = detectMobile()

  textFont(myFont) // set our font
  document.body.style.fontFamily = myFont

  playButton = new PlayButton()
  soundButton = new SoundButton()
  leaderboardButton = new LeaderboardButton()
  endButton = new EndButton()

  gameBeginning = true

  /**
   * Load music asynchronously and play once it's loaded
   * This way the game will load faster
   */
  if (Koji.config.sounds.backgroundMusic)
    sndMusic = loadSound(Koji.config.sounds.backgroundMusic, playMusic)
}

// An infinite loop that never ends in p5
function draw() {
  // Manage cursor - show it on main menu, and hide during game, depending on game settings
  if (!gameOver && !gameBeginning) {
    if (!Koji.config.strings.enableCursor) {
      noCursor()
    }
  } else {
    cursor(ARROW)
  }

  // Draw background or a solid color
  if (imgBackground) {
    background(imgBackground)
  } else {
    background(Koji.config.colors.backgroundColor)
  }

  // Draw UI
  if (gameOver || gameBeginning) {
    gameBeginningOver()
  } else {
    gamePlay()
  }

  soundButton.render()
}

/**
 * Go through objects and see which ones need to be removed
 * A good practive would be for objects to have a boolean like removable, and here you would go through all objects and remove them if they have removable = true;
 */
function cleanup() {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < floatingTexts.length; i++) {
    if (floatingTexts[i].timer <= 0) {
      floatingTexts.splice(i, 1)
    }
  }
}

// Call this when a lose life event should trigger
function loseLife() {
  // eslint-disable-next-line no-plusplus
  lives--

  if (lives <= 0) {
    gameOver = true
    checkHighscore()
  }
}

// Handle input
function touchStarted() {
  if (gameOver || gameBeginning) {
  }

  if (soundButton.checkClick()) {
    toggleSound()
    return
  }

  if (!gameOver && !gameBeginning) {
    // InGame
    touching = true
  }
}

function touchEnded() {
  // This is required to fix a problem where the music sometimes doesn't start on mobile
  if (soundEnabled) {
    if (getAudioContext().state !== 'running') {
      getAudioContext().resume()
    }
  }

  touching = false
}

// Key pressed and released
function keyPressed() {
  if (!gameOver && !gameBeginning) {
  }
}

function keyReleased() {
  if (!gameOver && !gameBeginning) {
  }
}

/**
 * Call this every time you want to start or reset the game
 * This is a good place to clear all arrays like enemies, bullets etc before starting a new game
 */
function init() {
  gameOver = false

  lives = startingLives
  highscoreGained = false
  score = 0

  floatingTexts = []
}

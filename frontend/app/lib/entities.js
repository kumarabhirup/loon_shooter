/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/**
 * @author Svarog
 */
class Entity {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.rotation = 0
    this.sizeMod = 1 // Size multiplier on top of objSize
    this.removable = false
    this.scale = createVector(1, 1)

    // eslint-disable-next-line no-unused-expressions
    this.img // Assign this after instantiating
  }

  render() {
    const size = objSize * this.sizeMod

    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.rotation)
    scale(this.scale.x, this.scale.y)
    image(this.img, -size / 2, -size / 2, size, size)
    pop()
  }

  // Basic circle collision
  collisionWith(other) {
    const distCheck = (objSize * this.sizeMod + objSize * other.sizeMod) / 2

    if (dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y) < distCheck) {
      return true
    }
    return false
  }
}

/**
 * The way to use Floating Text
 * Everything else like drawing, removing it after it's done etc, will be done automatically
 * @example floatingTexts.push(new FloatingText(...));
 *
 * @param {Number} x
 * @param {Number} y
 * @param {String} txt
 * @param {String} color - hex code
 * @param {Number} size
 * @param {Number} duration - How long the text will stay
 */
function FloatingText(x, y, txt, color, size, duration = 0.85) {
  this.pos = createVector(x, y)
  this.size = 1
  this.maxSize = size
  this.timer = duration
  this.text = txt
  this.color = color

  this.maxVelocityY = -objSize * 0.075
  this.velocityY = objSize * 0.3
  this.alpha = 1
  this.animTimer = 0

  this.update = function() {
    this.animTimer += 1 / frameRate()

    // Get dat size bounce effects
    this.size = Ease(
      EasingFunctions.easeOutElastic,
      this.animTimer,
      1,
      this.maxSize,
      1 / 0.65
    )

    if (this.timer < 0.3) {
      this.alpha = Smooth(this.alpha, 0, 4)
    }

    this.velocityY = Smooth(this.velocityY, this.maxVelocityY, 4)
    this.pos.y += this.velocityY

    this.timer -= 1 / frameRate()
  }

  this.render = function() {
    push()
    textSize(this.size)

    fill(
      `rgba(
        ${red(this.color)},
        ${green(this.color)},
        ${blue(this.color)},
        ${this.alpha}
      )`
    )

    textAlign(CENTER, TOP)
    text(this.text, this.pos.x, this.pos.y)
    pop()
  }
}

// Same FloatingText class, but with no animation effect
function OldFloatingText(x, y, txt, color, size) {
  this.pos = createVector(x, y)
  this.size = 1
  this.maxSize = size
  this.timer = 1
  this.txt = txt
  this.color = color

  this.update = function() {
    if (this.size < this.maxSize) {
      this.size = Smooth(this.size, this.maxSize, 2)
    }

    this.timer -= 0.8 / frameRate()
  }

  this.render = function() {
    textSize(this.size)
    fill(this.color)
    textAlign(CENTER, BOTTOM)
    text(this.txt, this.pos.x, this.pos.y)
  }
}

/**
 * @class Particle
 * Used to show the Paritcles effect
 * @example particles.push(new Particle(...));
 *
 * @param {Number} x
 * @param {Number} y
 * @param {p5 Loaded Image} image
 */
class Particle extends Entity {
  constructor(x, y, image) {
    super(x, y)
    this.acceleration = random(objSize * 0.006, objSize * 0.009)
    this.velocity = createVector(
      random(-objSize * 0.1, objSize * 0.1),
      random(-objSize * 0.2, objSize * 0.08)
    )
    this.img = image
    this.sizeMod = random(0.8, 1.3)
    this.rotSpeed = random(-objSize * 0.01, objSize * 0.01)
  }

  update() {
    this.velocity.y += this.acceleration
    this.sizeMod = Smooth(this.sizeMod, 0, 30)
    this.pos.add(this.velocity)
    this.rotation += this.rotSpeed

    if (this.pos.y > height + objSize * 2 || this.sizeMod < 0.1) {
      this.removable = true
    }
  }
}

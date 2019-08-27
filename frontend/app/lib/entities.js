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
 */
function FloatingText(x, y, txt, color, size) {
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

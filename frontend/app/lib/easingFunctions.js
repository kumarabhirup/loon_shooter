/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */

/**
 * @name EasingFunctions - inspired from http://gizma.com/easing/
 * it only considers the t value for the range [0, 1] => [0, 1]
 */
const EasingFunctions = {
  // no easing, no acceleration
  linear(t) {
    return t
  },

  // accelerating from zero velocity
  easeInQuad(t) {
    return t * t
  },

  // decelerating to zero velocity
  easeOutQuad(t) {
    return t * (2 - t)
  },

  // acceleration until halfway, then deceleration
  easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  },

  // accelerating from zero velocity
  easeInCubic(t) {
    return t * t * t
  },

  // decelerating to zero velocity
  easeOutCubic(t) {
    return --t * t * t + 1
  },

  // acceleration until halfway, then deceleration
  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  },

  // accelerating from zero velocity
  easeInQuart(t) {
    return t * t * t * t
  },

  // decelerating to zero velocity
  easeOutQuart(t) {
    return 1 - --t * t * t * t
  },

  // acceleration until halfway, then deceleration
  easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
  },

  // accelerating from zero velocity
  easeInQuint(t) {
    return t * t * t * t * t
  },

  // decelerating to zero velocity
  easeOutQuint(t) {
    return 1 + --t * t * t * t * t
  },

  // acceleration until halfway, then deceleration
  easeInOutQuint(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
  },

  easeOutElastic(t) {
    const p = 0.3
    return (
      // eslint-disable-next-line no-restricted-properties
      Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1
    )
  },
}

/**
 * @description A simple function used to call any other easing function from easingFunctions.js
 *
 * @example
 * this.pos.x = Ease(EasingFunctions.easeOutQuad, this.animTimer, this.pos.x, this.goalPos.x - this.pos.x, 1)
 * this.pos.y = Ease(EasingFunctions.easeOutQuad, this.animTimer, this.pos.y, this.goalPos.y - this.pos.y, 1)
 *
 * @param {*} func
 * @param {*} time
 * @param {*} start
 * @param {*} finish
 * @param {*} duration
 */
function Ease(func, time, start, finish, duration) {
  // eslint-disable-next-line no-cond-assign
  if ((time /= duration / 2) < 1) {
    return (finish / 2) * func(time) + start
  }
  return (-finish / 2) * (--time * (time - 2) - 1) + start
}

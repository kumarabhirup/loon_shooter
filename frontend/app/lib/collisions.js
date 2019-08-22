/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/**
 * @see https://stackoverflow.com/questions/21089959/detecting-collision-of-rectangle-with-circle
 * @returns true if the rectangle and circle are colliding
 * @requires - circle and rectangle to have their pivot points from the centre!
 *
 * @param {object} circle - {x:100, y:290, r:10}
 * @param {object} rectangle - {x:100, y:100, w:40, h:100}
 */
function rectCircleColliding(circle, rectangle) {
  const distX = Math.abs(circle.x - rectangle.x)
  const distY = Math.abs(circle.y - rectangle.y)

  if (distX > rectangle.w / 2 + circle.r) {
    return false
  }
  if (distY > rectangle.h / 2 + circle.r) {
    return false
  }

  if (distX <= rectangle.w / 2) {
    return true
  }
  if (distY <= rectangle.h / 2) {
    return true
  }

  const dx = distX - rectangle.w / 2
  const dy = distY - rectangle.h / 2

  return dx * dx + dy * dy <= circle.r * circle.r
}

/**
 * @returns true if the two circles are colliding
 *
 * @param {object} circle1 - {x:100, y:290, r:10}
 * @param {object} circle2 - {x:100, y:290, r:10}
 */
function circleCircleColliding(circle1, circle2) {
  return (
    dist(circle1.x, circle1.y, circle2.x, circle2.y) <= circle1.r + circle2.r
  )
}

/**
 * @returns true if the two rectangles are colliding
 *
 * @param {object} rectangle1 - {x:100, y:290, w:10, h: 10}
 * @param {object} rectangle2 - {x:100, y:290, w:10, h: 10}
 */
function rectRectColliding(rectangle1, rectangle2) {
  const findCornerRadiusOfRectangle = (width, height) =>
    Math.sqrt((width / 2) ** 2 + (height / 2) ** 2) // to find length of diagonal/2 using pythagoras theorem

  return (
    rectangle1.x + rectangle1.w / 2 > rectangle2.x - rectangle2.w / 2 &&
    rectangle1.x - rectangle1.w / 2 < rectangle2.x + rectangle2.w / 2 &&
    rectangle1.y + rectangle1.h / 2 > rectangle2.y - rectangle2.h / 2 &&
    rectangle1.y - rectangle1.h / 2 < rectangle2.y + rectangle2.h / 2 &&
    dist(rectangle1.x, rectangle1.y, rectangle2.x, rectangle2.y) <=
      findCornerRadiusOfRectangle(rectangle1.w, rectangle1.h) +
        findCornerRadiusOfRectangle(rectangle2.w, rectangle2.h) // <- this does not work
  )
}

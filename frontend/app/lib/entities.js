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
        } return false
    }
}

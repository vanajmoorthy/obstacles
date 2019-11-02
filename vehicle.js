class Vehicle {
	constructor(x, y, max_speed, max_force) {
		this.position = createVector(x, y);
		this.velocity = createVector(random(-1, 1), random(-1, 1));
		this.acceleration = createVector(0, 0);
		this.size = VEHICLE_SIZE;
		this.max_speed = max_speed || DEFAULT_MAX_SPEED;
		this.max_force = max_force || DEFAULT_MAX_FORCE;
	}

	update() {
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.max_speed);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
	}

	draw() {
		stroke(0);
		fill(255);

		let angle = this.velocity.heading() + radians(90);

		push();

		translate(this.position.x, this.position.y);
		rotate(angle);

		beginShape(TRIANGLES);
		vertex(0, -this.size);
		vertex(-this.size / 2, this.size);
		vertex(this.size / 2, this.size);
		endShape();

		pop();
	}

	checkEdges() {
		if (this.position.x < 0) {
			this.position.x = width - this.size;
		}

		if (this.position.x > width) {
			this.position.x = this.size;
		}

		if (this.position.y < 0) {
			this.position.y = height - this.size;
		}

		if (this.position.y > height) {
			this.position.y = this.size;
		}
	}

	checkConsumableCollision(consumable) {
		const d = dist(
			this.position.x,
			this.position.y,
			consumable.position.x,
			consumable.position.y
		);
		return d < consumable.size * 2 ? true : false;
	}

	applyForce(force) {
		this.acceleration.add(force);
	}

	flee(target) {
		if (dist(target.x, target.y, this.position.x, this.position.y) < 100) {
			let desired = p5.Vector.sub(target, this.position);

			desired.setMag(this.max_speed);

			let steering = p5.Vector.sub(desired, this.velocity);
			steering.limit(this.max_force);

			steering.mult(-1);
			this.applyForce(steering);
		}
	}
}

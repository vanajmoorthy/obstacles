class Consumable {
	constructor(food, size) {
		this.type = food;
		this.position = createVector(random(width), random(height));
		this.size = size || CONSUMABLES_SIZE;
	}

	draw() {
		if (this.type === "food") {
			fill("#1da7ea");
			circle(this.position.x, this.position.y, this.size * 2);
		} else {
			fill("#eb3d77");
			circle(this.position.x, this.position.y, this.size * 2);
		}
	}
}

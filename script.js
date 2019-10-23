const scoreElement = document.getElementById("score");
const black_bg = document.getElementById("black_bg");
const instructions = document.querySelector(".instructions");

const DEFAULT_MAX_SPEED = 3;
const DEFAULT_MAX_FORCE = 0.2;
const VEHICLE_SIZE = 15;
const CONSUMABLES_SIZE = 7;
const FOOD_COUNT = 100;
const POISON_COUNT = 30;

const consumables = [];
let vehicle = undefined;
let score = 0;

function startGame() {
	fadeOut();
	black_bg.style.display = "block";
	loop();
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	vehicle = new Vehicle(width / 2, height / 2);

	for (let i = 0; i < FOOD_COUNT; i++) {
		consumables.push(new Consumable("food"));
	}

	for (let i = 0; i < POISON_COUNT; i++) {
		consumables.push(new Consumable("poison"));
	}

	black_bg.style.display = "none";
	noLoop();
}

function draw() {
	background(0);

	for (let i = consumables.length - 1; i >= 0; i--) {
		const consumable = consumables[i];
		consumable.draw();
		if (vehicle.checkConsumableCollision(consumable)) {
			if (consumable.type === "food") {
				score++;
			} else {
				score -= 5;
			}

			updateScore();

			const newConsumable = new Consumable(consumable.type);
			consumables.splice(i, 1, newConsumable);
		}
	}

	createCursorCircle();
	vehicle.update();
	vehicle.checkEdges();
	vehicle.draw();
}

function updateScore() {
	scoreElement.innerHTML = `Score: ${score}`;
}

function createCursorCircle() {
	const mouse = createVector(mouseX, mouseY);
	fill("rgba(255, 255, 255, 0.5)");
	circle(mouseX, mouseY, 30);
	vehicle.flee(mouse);
}

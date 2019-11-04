const scoreElement = document.getElementById("score");
const black_bg = document.getElementById("black_bg");
const instructions = document.querySelector(".instructions");

// let elements = document.querySelectorAll('*');

// for (i in elements) {
// 	elements[i].style.display = "none";
// }

// Lmao ye conventions
const DEFAULT_MAX_SPEED = 3;
const DEFAULT_MAX_FORCE = 0.2;
const VEHICLE_SIZE = 15;
const CONSUMABLES_SIZE = 7;
const FOOD_COUNT = 100;
const POISON_COUNT = 30;

const consumables = [];
let vehicle = undefined;
let score = 0;

let gameOver = false;
let title = document.getElementById("title");
let bigger = document.getElementById("bigger");

function restart() {
	instructions.style.display = "block";
	instructions.style.opacity = "1";
	draw();
	scoreElement.innerHTML = `Score: 0`;
	gameOver = true;
}

function startGame() {
	// let name = document.getElementById("form").value;
	fadeOut();
	black_bg.style.display = "block";
	loop();
	gameOver = false;
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

	if (!gameOver) {
		vehicle.update();
		vehicle.checkEdges();
		vehicle.draw();
	}
}

function updateScore() {
	scoreElement.innerHTML = `Score: ${score}`;

	if (score < 0) {
		userHasLost();
	}
}

function userHasLost() {
	title.innerText = "You Lose!";
	instructions.style.display = "block";
	instructions.style.opacity = "1";
	bigger.innerText = "Your score went into the negative! You lose!";
	scoreElement.innerHTML = `Score: 0`;
	score = 0;
	gameOver = true;
	noLoop();
}

function createCursorCircle() {
	const mouse = createVector(mouseX, mouseY);
	fill("rgba(255, 255, 255, 0.5)");
	circle(mouseX, mouseY, 30);
	vehicle.flee(mouse);
}

function fadeOut() {
	let fadeTarget = document.querySelector(".instructions");

	let fadeEffect = setInterval(() => {
		if (!fadeTarget.style.opacity) {
			fadeTarget.style.opacity = 1;
		}
		if (fadeTarget.style.opacity > 0) {
			fadeTarget.style.opacity -= 0.1;
		} else {
			clearInterval(fadeEffect);
		}
	}, 30);
}

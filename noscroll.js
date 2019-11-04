// Arrow functions FTW.

window.addEventListener(
	"touchstart",
	event => {
		if (event.target.tagName == "HTML" || event.target.tagName == "BODY") {
			event.preventDefault();
		}
	},
	false
);

// I am well aware that this is overkill.
window.addEventListener(
	"scroll",
	() => {
		window.scrollTo(0, 0);
	},
	false
);

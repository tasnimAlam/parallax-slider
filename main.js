let current = 0;
let slideWrapper = document.querySelector(".slider__wrapper");
let slides = document.querySelectorAll(".slide");
let nextBtn = document.querySelector(".btn--next");
let previousBtn = document.querySelector(".btn--previous");

function onMouseMove() {
	let r = this.getBoundingClientRect();
	this.style.setProperty(
		"--x",
		event.clientX - (r.left + Math.floor(r.width / 2))
	);
	this.style.setProperty(
		"--y",
		event.clientY - (r.top + Math.floor(r.height / 2))
	);
}

function onMouseLeave() {
	this.style.setProperty("--x", 0);
	this.style.setProperty("--y", 0);
}

function onImageClick() {
	let images = [...slides];
	current = images.indexOf(this);
	let [next, previous] = updateNextPrevious(current);

	wrapperTransform();
	removeAllClasses();
	addCssClasses(previous, current, next);
}

function getNextPrevious(current) {
	return [current + 1, current - 1];
}

function updateNextPrevious(current) {
	return current === 0 ? [1, -1] : [current + 1, current - 1];
}

function wrapperTransform() {
	let translateX = `translateX(-${current * (100 / 4)}%)`;
	slideWrapper.style.setProperty("transform", translateX);
}

function removeAllClasses() {
	slides.forEach(function(slide) {
		slide.classList.remove("slide--previous", "slide--current", "slide--next");
	});
}

function addCssClasses(previous, current, next) {
	slides[current].classList.add("slide--current");

	if (slides[next]) {
		slides[next].classList.add("slide--next");
	}
	if (slides[previous]) {
		slides[previous].classList.add("slide--previous");
	}
}

function onPreviousButtonClick() {
	let [next, previous] = getNextPrevious(current);
	current = previous === -1 ? slides.length - 1 : previous;
	[next, previous] = updateNextPrevious(current);

	wrapperTransform();
	removeAllClasses();
	addCssClasses(previous, current, next);
}

function onNextButtonClick() {
	let [next, previous] = getNextPrevious(current);
	current = next === slides.length ? 0 : next;
	[next, previous] = updateNextPrevious(current);

	wrapperTransform();
	removeAllClasses();
	addCssClasses(previous, current, next);
}

/* Mouse event*/
slides.forEach(function(slide) {
	slide.addEventListener("mousemove", onMouseMove);
	slide.addEventListener("mouseleave", onMouseLeave);
	slide.addEventListener("click", onImageClick);
});

/* Previous & Next button clck events */
previousBtn.addEventListener("click", onPreviousButtonClick);
nextBtn.addEventListener("click", onNextButtonClick);

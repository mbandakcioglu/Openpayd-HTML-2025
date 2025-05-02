const preventEmptyHashLinkClicks = () => {
	// Select all anchor elements whose href attribute is exactly "#"
	const emptyHashLinks = document.querySelectorAll('a[href="#"]');
	emptyHashLinks.forEach((link) => {
		link.addEventListener("click", (event) => {
			event.preventDefault();
			return false;
		});
	});

	// Optional
	if (emptyHashLinks.length > 0) {
		console.log(
			`Applied click prevention to ${emptyHashLinks.length} links with href="#"`
		);
	}
};

export default preventEmptyHashLinkClicks;

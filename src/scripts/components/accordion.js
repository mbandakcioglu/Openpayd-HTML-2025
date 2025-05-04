const accordion = () => {
	document.addEventListener("DOMContentLoaded", () => {
		const accordions = document.querySelectorAll(".accordion");

		accordions.forEach((accordion) => {
			const items = accordion.querySelectorAll(".accItem");
			const firstOpen = accordion.dataset.firstOpen === "yes";

			items.forEach((item, idx) => {
				const head = item.querySelector(".accHead");
				const pane = item.querySelector(".accPane");
				const plus = item.querySelector(".plus");
				const indexSpan = item.querySelector(".index");
				const qSpan = item.querySelector(".q");

				// Başlangıçta ilk panel açılsın mu?
				if (firstOpen && idx === 0) {
					pane.style.maxHeight = pane.scrollHeight + "px";
					item.classList.add("is-open");
				}

				head.addEventListener("click", () => {
					const isOpen = item.classList.contains("is-open");

					// Hepsini kapat
					items.forEach((other) => {
						other.classList.remove("is-open");
						const p = other.querySelector(".accPane");
						p.style.maxHeight = "0";
					});

					// Eğer kapalıydıysa aç
					if (!isOpen) {
						pane.style.maxHeight = pane.scrollHeight + "px";
						item.classList.add("is-open");
					}
				});
			});
		});
	});
};

export default accordion;

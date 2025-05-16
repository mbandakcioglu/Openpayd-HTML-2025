import Swiper from "swiper";
import {
	Navigation,
	Pagination,
	EffectFade,
	Thumbs,
	Scrollbar,
	Mousewheel,
	Autoplay,
} from "swiper/modules";
import { media } from "../utils/breakpoints";

const _sm = media.sm,
		_md= media.md,
		_lg= media.lg,
		_xl= media.xl,
		_xxl= media.xxl


function sliders() {
	const TESTIMONIALSOPTIONS = {
			modules: [Navigation, Pagination,Mousewheel],
			effect: "fade",
			spaceBetween: 30,
			mousewheel: {
				releaseOnEdges: true,
			},
			pagination: {
				el: ".testimonials-swiper-pagination",
				clickable: true,
			},
		},
		testimonials = new Swiper("#testimonials", TESTIMONIALSOPTIONS);

	const PRODUCTSLIDEROPTIONS = {
			modules: [Scrollbar, Mousewheel],
			slidesPerView: "auto",
			spaceBetween: 20,
			// slidesPerView: 1,
			// loop: true,
			mousewheel: {
				releaseOnEdges: true,
			},
			breakpoints: {
				_sm: {

					spaceBetween: 36,
				},
				_md: {

					spaceBetween: 36,
				},
				// _lg: {

				// 	spaceBetween: 50,
				// },
			},
		},
		productSlider = new Swiper("#products-slider", PRODUCTSLIDEROPTIONS);

	const TEAMOPTIONS = {
			modules: [Scrollbar, Mousewheel],
			slidesPerView: 1,
			spaceBetween: 51,
			loop: false,
			mousewheel: {
				releaseOnEdges: true,
			},
			// scrollbar: {
			// 	el: ".team-swiper-scrollbar",
			// 	hide: false,
			// },
			breakpoints: {
				992: {
					slidesPerView: 3,
					spaceBetween: 94,
				},
			},
		},
		team = new Swiper("#team-slider", TEAMOPTIONS);

	const LOCATIONSOPTIONS = {
			modules: [Scrollbar, Mousewheel],
			slidesPerView: 1,
			spaceBetween: 51,
			loop: false,
			mousewheel: {
				releaseOnEdges: true,
			},
			// mousewheel: {
			// 	releaseOnEdges: true,
			// },
			// scrollbar: {
			// 	el: ".team-swiper-scrollbar",
			// 	hide: false,
			// },
			breakpoints: {
				992: {
					slidesPerView: 3,
					spaceBetween: 51,
				},
			},
		},
		locations = new Swiper("#locations-slider", LOCATIONSOPTIONS);

	const POWERGROWSLIDEROPTIONS = {

			modules: [Navigation, Pagination, Mousewheel],
			slidesPerView: 1,
			spaceBetween: 24,
			mousewheel: {
				releaseOnEdges: true,
			},
			pagination: {
				el: ".power-grow-pagination",
				type: "fraction",
			},
			navigation: {
				nextEl: ".power-grow-button-next",
				prevEl: ".power-grow-button-prev",
			},
			// pagination: {
			// 	//...
			// 	el: ".power-grow-pagination",
			// 	// type: "fraction",
			// 	renderFraction: function (currentClass, totalClass) {
			// 	  	return currentClass +  ' / ' + totalClass
			// 	},
			//   },
		},
		powerGrowSlider = new Swiper("#power-grow-slider", POWERGROWSLIDEROPTIONS);

	// console.log("sliders active");
}

export default sliders;

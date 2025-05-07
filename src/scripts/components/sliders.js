
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Thumbs, Scrollbar, Mousewheel, Autoplay } from 'swiper/modules';




function sliders() {
    const TESTIMONIALSOPTIONS = {
        modules: [Navigation, Pagination],
        effect: "fade",
        spaceBetween: 30,
        pagination: {
            el: ".testimonials-swiper-pagination",
            clickable: true,
        }
    },
    testimonials = new Swiper('#testimonials', TESTIMONIALSOPTIONS);

    const PRODUCTSLIDEROPTIONS= {
        slidesPerView: "auto",
        spaceBetween: 36,
        // loop: true
    },
    productSlider = new Swiper("#products-slider", PRODUCTSLIDEROPTIONS);
    
    
    const TEAMOPTIONS = {
		modules: [Scrollbar, Mousewheel],
		slidesPerView: 1,
		spaceBetween: 94,
		loop: false,
		mousewheel: {
			releaseOnEdges: true,
		},
		scrollbar: {
			el: ".team-swiper-scrollbar",
			hide: false,
		},
		breakpoints: {
			992: {
				slidesPerView: 3,
				spaceBetween: 51,
			},

		},
    },
    team = new Swiper("#team-slider", TEAMOPTIONS);

	console.log("sliders active")
};

export default sliders;

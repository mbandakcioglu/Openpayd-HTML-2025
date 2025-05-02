
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

    const homeProductsoptions= {
        slidesPerView: "auto",
        spaceBetween: 36,

    },
    homeProducts = new Swiper("#products-slider", homeProductsoptions);
    

	console.log("sliders active")
};

export default sliders;

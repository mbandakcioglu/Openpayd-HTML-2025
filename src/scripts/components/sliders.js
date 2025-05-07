
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Thumbs, Scrollbar, Mousewheel, Autoplay } from 'swiper/modules';



function teamSlider() {
    var swiper = new Swiper("#team-slider", {});
}


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
    
    teamSlider();
	console.log("sliders active")
};

export default sliders;

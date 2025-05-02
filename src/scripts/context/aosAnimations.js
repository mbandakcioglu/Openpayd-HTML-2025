import Aos from "aos";

const aosAnimations = () => {
    Aos.init({
        duration: 1000, // Global animation duration
        once: true, // Only once animation
    });
}

export default aosAnimations;
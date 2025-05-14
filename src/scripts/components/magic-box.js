const MagicBox = () => {
    document.addEventListener("DOMContentLoaded", () => {
        const container = document.getElementById("magic-box");

        // Check if the element with id "magic-box" exists
        if (container) {
            // The #magic-box element exists, proceed with the original logic
            const movingElement = container.querySelector(".moving-element"); // Query within the container

            if (movingElement) {
                // Ensure movingElement also exists before proceeding
                let angle = 0; // Başlangıç açısı
                const radiusX = 100; // X yarıçapı
                const radiusY = 150; // Y yarıçapı
                const speed = 0.002; // Hız
                const centerX = container.clientWidth - 300; // sağdan 100px içeride
                const centerY = 150; // sayfanın üstüne yakın konum
                // const isMobile = window.innerWidth < 768;
                // const centerY = isMobile ? 100 : 150;

                const moveInEllipse = () => {
                    const x = centerX + radiusX * Math.cos(angle) - movingElement.offsetWidth / 2;
                    const y = centerY + radiusY * Math.sin(angle) - movingElement.offsetHeight / 2;

                    movingElement.style.transform = `translate(${x}px, ${y}px)`;

                    angle += speed;
                    if (angle >= Math.PI * 2) {  // 360 derece tamamlanınca sıfırla
                        angle = 0;
                    }

                    requestAnimationFrame(moveInEllipse);
                };

                moveInEllipse(); // Başlat
            } else {
                // Optional: Handle the case where .moving-element is not found inside #magic-box
                // console.log("MagicBox: The .moving-element was not found inside #magic-box.");
            }
        } else {
            // The #magic-box element does not exist
            // You can add any specific logic here if needed, e.g., logging an error or doing nothing.
            // console.log("MagicBox: The #magic-box element was not found on this page.");
        }
    });
};

export default MagicBox;

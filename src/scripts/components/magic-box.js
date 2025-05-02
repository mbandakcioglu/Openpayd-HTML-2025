const MagicBox = () => {
    document.addEventListener("DOMContentLoaded", () => {
        const movingElement = document.querySelector("#magic-box .moving-element");
        const container = document.getElementById("magic-box");
      
        let angle = 0; // Başlangıç açısı
        const radiusX = 100; // X yarıçapı
        const radiusY = 150; // Y yarıçapı
        const speed = 0.002; // Hız
        const centerX = container.clientWidth - 100; // sağdan 100px içeride
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
      });
};

export default MagicBox;

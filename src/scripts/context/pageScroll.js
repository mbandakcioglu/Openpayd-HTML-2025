const pageScrolled = () => {
    // Header elementini ID'sine göre seçiyoruz
    const header = document.getElementById('site-header');

    // Eğer header elementi bulunamazsa fonksiyondan çıkıyoruz
    if (!header) {
        console.warn('Element with ID "site-header" not found.');
        return;
    }

    // Scroll olayını dinliyoruz
    document.addEventListener('scroll', () => {
        // Mevcut scroll pozisyonunu alıyoruz
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // Eğer 10 piksel veya daha fazla scroll edilmişse 'scrolled' sınıfını ekliyoruz
        if (scrollPosition >= 10) {
            header.classList.add('scrolled');
        } else {
            // Değilse 'scrolled' sınıfını kaldırıyoruz
            header.classList.remove('scrolled');
        }
    });
};

export default pageScrolled;

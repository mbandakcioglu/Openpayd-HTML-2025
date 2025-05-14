export default function homePageTab(second) {

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.left-navigated-tab').forEach(tabWrapper => {
            const menuItems = tabWrapper.querySelectorAll('.cursor-pointer');
            const tabs = tabWrapper.querySelectorAll('.tab-content');
            const currentCounter = tabWrapper.querySelector('.tab-counter .current');
            const totalCounter = tabWrapper.querySelector('.tab-counter .total');
    
            if (totalCounter) {
                totalCounter.textContent = tabs.length;
            }
    
            menuItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    const targetId = item.getAttribute('data-target');
    
                    // Tüm tab-content'leri gizle
                    tabs.forEach(tab => tab.classList.add('hidden'));
    
                    // Seçilen tab-content'i göster
                    const targetTab = document.getElementById(targetId);
                    if (targetTab) targetTab.classList.remove('hidden');
    
                    // Menüde aktif olanı değiştir
                    menuItems.forEach(i => {
                        const spanInI = i.querySelector('span'); // div içindeki span'ı bul
                        if (spanInI) {
                            spanInI.classList.remove('text-transparent', 'bg-clip-text', 'bg-gradient-to-r', 'from-openpayd-pink', 'via-openpayd-purple', 'to-openpayd-blue', 'font-bold');
                        }
                    });

                    const spanInItem = item.querySelector('span'); // Tıklanan div içindeki span'ı bul
                    if (spanInItem) {
                        spanInItem.classList.add('text-transparent', 'bg-clip-text', 'bg-gradient-to-r', 'from-openpayd-pink', 'via-openpayd-purple', 'to-openpayd-blue', 'font-bold');
                    }
                    // item.classList.add('text-transparent', 'bg-clip-text', 'bg-gradient-to-r', 'from-pink-500', 'to-blue-500', 'font-bold');
    
                    // Aktif tab'ın sırasını güncelle
                    if (currentCounter) {
                        currentCounter.textContent = index + 1;
                    }
                });
            });
        });
    });
    
}


const mainMenu = () => {
    document.querySelectorAll('.group').forEach(item => {
        const submenu = item.querySelector('.sub-menu');
        if (submenu) {
            item.addEventListener('mouseenter', () => submenu.classList.remove('hidden'));
            item.addEventListener('mouseleave', () => submenu.classList.add('hidden'));
        }
    });
}

export default mainMenu
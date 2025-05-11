class MobileNavigation {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.hamburger.addEventListener('click', this.toggle.bind(this));
        this.panel = document.getElementById('mobile-navigation');

        this.menuItems = document.querySelectorAll('#mobile-navigation nav > ul > li');
        
        this.initMenuItemListeners();
        this.expandCurrentMenuItems();
    }

    toggle(){
        this.hamburger.classList.toggle('open');
        if(!this.panel.classList.contains('enable')) {
            this.slideDown();
        }else{
            this.slideUp();
        }
    }

    slideDown(){
        requestAnimationFrame(() => {
            this.panel.style.height = '100vh';
            this.panel.style.opacity = '1';
        });

        document.body.classList.add('overflow-y-hidden');

        this.panel.addEventListener('transitionend', function handler() {
            this.panel.classList.add('enable');
        }.bind(this));

    }

    slideUp(){
        requestAnimationFrame(() => {
            this.panel.style.height = '0px';
            this.panel.style.opacity = '0';
        });

        document.body.classList.remove('overflow-y-hidden');

        this.panel.addEventListener('transitionend', function handler() {
            this.panel.classList.remove('enable');
        }.bind(this));

    }

    initMenuItemListeners() {
        this.menuItems.forEach(item => {
            const link = item.querySelector('a');
            const subMenu = item.querySelector('ul');

            if (subMenu) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleSubMenu(item, subMenu);
                });
            }
        });
    }

    toggleSubMenu(item, subMenu) {
       
        this.menuItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('expanded')) {
                otherItem.classList.remove('expanded');
                const otherSubMenu = otherItem.querySelector('ul');
                if (otherSubMenu) {
                    otherSubMenu.style.maxHeight = '0';
                }
            }
        });

        if (item.classList.contains('expanded')) {
            item.classList.remove('expanded');
            subMenu.style.maxHeight = '0';
        } else {
            item.classList.add('expanded');
            subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
        }
    }

    expandCurrentMenuItems() {
        const currentMenuItems = document.querySelectorAll('#mobile-navigation .current-menu-item');
        currentMenuItems.forEach(currentItem => {
            
            let allParentLis = [];
            let parent = currentItem.parentNode;
            
            while (parent) {
                if (parent.tagName === 'LI') {
                    allParentLis.push(parent);
                }
                parent = parent.parentNode;
            }
            
            const topLevelLi = allParentLis.length > 0 ? allParentLis[allParentLis.length - 1] : null;
            
            if (topLevelLi) {
                topLevelLi.classList.add('expanded');
                
                allParentLis.forEach(parentLi => {
                    const subMenu = parentLi.querySelector('ul');
                    if (subMenu) {
                        const subMenuHeight = subMenu.scrollHeight;
                        subMenu.style.maxHeight = subMenuHeight + 'px';
                    }
                });
            }
        });
    }

}

export default MobileNavigation;
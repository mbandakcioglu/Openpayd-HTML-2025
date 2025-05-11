import Accordion from "./components/accordion";

import { CtaForm} from './components/forms-vanilla'
import homePageTab from "./components/home-page-tab";
import MagicBox from "./components/magic-box";
import MobileNavigation from "./components/mobile-navigation";
import mainMenu from "./components/main-menu";
import sliders from "./components/sliders";
import aosAnimations from "./context/aosAnimations";
import pageScrolled from "./context/pageScroll";
import preventEmptyHashLinkClicks from "./utils/preventEmptyHashLinks";
// import test from "./test";



// test();
aosAnimations();
preventEmptyHashLinkClicks(); // <-- Call the function
pageScrolled();
mainMenu();
sliders();
homePageTab();
MagicBox();
CtaForm();
Accordion();
new MobileNavigation();

import * as $ from 'jquery'
import * as MobileDetect from "mobile-detect";

export class Utils {
    private static md:MobileDetect = new MobileDetect(window.navigator.userAgent);
    static scrollTo(link, offset = 0) {
        $('html, body').animate({
            scrollTop: $(`#${link}`).offset().top + offset
        }, 600);
    }

    static isElementOnView(element) {
        var top = element.offsetTop;
        var offset = window.innerHeight * 0.5;
        var pageTop = window.pageYOffset

        // is Element top position higher page center
        var elementTop = top < pageTop + offset;
        // is Element bottom position not higher page center
        var elementBottom = top + element.offsetHeight > pageTop + offset;

        return elementTop && elementBottom
    }

    static isMobile() {
        return this.md.mobile();
    }
}
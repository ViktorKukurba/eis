import * as $ from 'jquery'
import * as MobileDetect from 'mobile-detect';

export class Utils {
    private static md:MobileDetect = new MobileDetect(window.navigator.userAgent);
    static scrollTo(link, offset = 0) {
        var elementOffset = $(`#${link}`).offset();
        if (elementOffset) {
            $('html, body').animate({
                scrollTop: elementOffset.top + offset
            }, 600);
        }
    }

    static isElementOnView(element) {
        if (!element) return false;
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

export class DefaultContent {
    title: {rendered:string} = {rendered: ''};
}
import * as $ from 'jquery'
import * as MobileDetect from 'mobile-detect';

export class Utils {
    private static md: MobileDetect = new MobileDetect(window.navigator.userAgent);
    static scrollTo(link, offset = 0) {
        const elementOffset = $(`#${link}`).offset();
        if (elementOffset) {
            $('html, body').animate({
                scrollTop: elementOffset.top + offset
            }, 600);
        }
    }

    static isElementOnView(element): boolean {
        if (!element) {
            return false;
        }
        const top = element.offsetTop;
        const offset = window.innerHeight * 0.5;
        const pageTop = window.pageYOffset;

        // is Element top position higher page center
        const isElementTop = top < pageTop + offset;
        // is Element bottom position not higher page center
        const isElementBottom = top + element.offsetHeight > pageTop + offset;

        return isElementTop && isElementBottom;
    }

    static isMobile() {
        return this.md.mobile();
    }
}

export class DefaultContent {
    title: {rendered: string} = {rendered: ''};
}

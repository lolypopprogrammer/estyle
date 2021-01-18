/* A polyfill for browsers that don't support ligatures. */
/* The script tag referring to this file must be placed before the ending body tag. */

/* To provide support for elements dynamically added, this script adds
   method 'icomoonLiga' to the window object. You can pass element references to this method.
*/
(function () {
    'use strict';
    function supportsProperty(p) {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            i,
            div = document.createElement('div'),
            ret = p in div.style;
        if (!ret) {
            p = p.charAt(0).toUpperCase() + p.substr(1);
            for (i = 0; i < prefixes.length; i += 1) {
                ret = prefixes[i] + p in div.style;
                if (ret) {
                    break;
                }
            }
        }
        return ret;
    }
    var icons;
    if (!supportsProperty('fontFeatureSettings')) {
        icons = {
            'search': '&#xe986;',
            'magnifier': '&#xe986;',
            'checkmark': '&#xea10;',
            'tick': '&#xea10;',
            'arrow-right': '&#xea3c;',
            'right': '&#xea3c;',
            'arrow-left': '&#xea40;',
            'left': '&#xea40;',
            'font-size': '&#xea61;',
            'wysiwyg3': '&#xea61;',
            'pencil': '&#xe90f;',
            'write': '&#xe90f;',
            'info': '&#xea0c;',
            'information': '&#xea0c;',
            'play2': '&#xea15;',
            'player': '&#xea15;',
            'hour-glass': '&#xe979;',
            'loading': '&#xe979;',
            'play3': '&#xea1c;',
            'player8': '&#xea1c;',
          '0': 0
        };
        delete icons['0'];
        window.icomoonLiga = function (els) {
            var classes,
                el,
                i,
                innerHTML,
                key;
            els = els || document.getElementsByTagName('*');
            if (!els.length) {
                els = [els];
            }
            for (i = 0; ; i += 1) {
                el = els[i];
                if (!el) {
                    break;
                }
                classes = el.className;
                if (/icon-/.test(classes)) {
                    innerHTML = el.innerHTML;
                    if (innerHTML && innerHTML.length > 1) {
                        for (key in icons) {
                            if (icons.hasOwnProperty(key)) {
                                innerHTML = innerHTML.replace(new RegExp(key, 'g'), icons[key]);
                            }
                        }
                        el.innerHTML = innerHTML;
                    }
                }
            }
        };
        window.icomoonLiga();
    }
}());

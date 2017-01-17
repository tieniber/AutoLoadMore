/* global logger,define,require,dojo */
/* jslint nomen: true */

/*
    AutoLoadMore
    ========================

    @file      : AutoLoadMore.js
    @version   : 1.0
    @author    : Eric Tieniber
    @date      : Mon, 27 Jun 2016 22:18:59 GMT
    @copyright :
    @license   : MIT

    Documentation
    ========================
    Based on code by Paul Moes, published on the Mendix forums: https://mxforum.mendix.com/questions/18362/Listview-load-data-on-scroll-solved#30122
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dojo/_base/lang",
    "dojo/dom-class"
], function (declare, _WidgetBase, lang, domClass) {
    "use strict";

    return declare("AutoLoadMore.widget.AutoLoadMore", [_WidgetBase], {

        // Parameters configured in the Modeler.
        interval: 250,
        factor: 1.5,
        listViewName: "",

        //private variables
        runningInterval: null,

        postCreate: function () {
            logger.debug(this.id + ".postCreate");

            var isElementInViewport = function (el, factor) {
                var rect = el.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) * factor && /*or $(window).height() */
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
                );
            };

            this.runningInterval = setInterval(lang.hitch(this, function () {
                var listView = null;

                if (this.listViewName) {
                    listView = document.getElementsByClassName("mx-name-" + this.listViewName)[0];
                } else {
                    listView = this.domNode.previousSibling;
                }

                var loadMoreButton = (listView.lastElementChild || listView.lastChild);
                var isButton = loadMoreButton && domClass.contains(loadMoreButton, "mx-listview-loadMore");

                if (isButton && isElementInViewport(loadMoreButton, this.factor)) {
                    loadMoreButton.click();
                }
            }), this.interval);
        },

        uninitialize: function () {
            logger.debug(this.id + ".uninitialize");
            if (this.runningInterval) {
                clearInterval(this.runningInterval);
            }
        }
    });
});

require(["AutoLoadMore/widget/AutoLoadMore"]);

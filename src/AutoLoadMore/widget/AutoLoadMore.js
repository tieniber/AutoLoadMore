/*global logger,define,require,dojo*/
/*jslint nomen: true*/
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
    Place below a listview to automatically load more content when reaching the bottom of the page.
	Based on code by Paul Moes, published on the Mendix forums: https://mxforum.mendix.com/questions/18362/Listview-load-data-on-scroll-solved#30122
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase"
], function (declare, _WidgetBase) {
    "use strict";

    // Declare widget's prototype.
    return declare("AutoLoadMore.widget.AutoLoadMore", [ _WidgetBase ], {

        // Parameters configured in the Modeler.
        interval: 250,
        factor: 1.5,
		
		//private variables
		runningInterval: null,

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            logger.debug(this.id + ".postCreate");
			
			var interval = this.interval,
				factor = this.factor,
				thisObj = this,
				isElementInViewport = function (el, factor) {
					var rect = el.getBoundingClientRect();
					return (
						rect.top >= 0 &&
						rect.left >= 0 &&
						rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) * factor && /*or $(window).height() */
						rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
					);
				};
			this.runningInterval = setInterval(function () {
				var listview = thisObj.domNode.previousSibling,
					loadmoreButton = (listview.lastElementChild || listview.lastChild),
					isButton = dojo.hasClass(loadmoreButton, "mx-listview-loadMore");
				if (isButton && isElementInViewport(loadmoreButton, factor)) {
					loadmoreButton.click();
				}
			}, this.interval);
        },

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function () {
			logger.debug(this.id + ".uninitialize");
			// Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
			if (this.runningInterval) {
				clearInterval(this.runningInterval);
			}
        }
    });
});

require(["AutoLoadMore/widget/AutoLoadMore"]);

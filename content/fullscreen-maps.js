(function ($) {
    /*
     * Based on the bookmarklet by johanberonius.
     * https://github.com/johanberonius/fullscreen-maps
     */
    function addButton(target) {
        var $target = $(target),
            $mapControls = $(),
            $mapContainer = $(),
            $mapFullscreen = $();
        if ($target.is('#map-controls')) {
            $mapControls = $target;
            $mapContainer = $('#activity-map-canvas');
            $mapFullscreen = $mapControls.find('.map-full-screen')
        } else if ($target.is('#activity-map-canvas')) {
            $mapControls = $('#map-controls');
            $mapContainer = $target;
            $mapFullscreen = $mapControls.find('.map-full-screen');
        } else if ($target.is('.widget-map')) {
            $mapControls = $target.closest('.map-container').find('.map-controls');
            $mapContainer = $target;
            $mapFullscreen = $mapControls.find('.map-full-screen');
        } else if ($target.is('.map-controls') && $target.eq(0).has('.map-control-item')) {
            $mapControls = $target;
            $mapContainer = $target.closest('.map-container').find('.widget-map');
            $mapFullscreen = $mapControls.find('.map-full-screen');
        }
        if ($mapControls.length != 0 && $mapContainer.length != 0 && $mapFullscreen.length === 0) {
            var mapContainer = $mapContainer[0];
            mapContainer.requestFullscreen = mapContainer.requestFullscreen ||
                mapContainer.mozRequestFullScreen ||
                mapContainer.webkitRequestFullscreen ||
                mapContainer.msRequestFullscreen;
            var $fullscreenButton = $('<button class="map-control-item map-btn map-full-screen" title="Fullscreen"><i class="map-btn-icon icon-full-screen-2"></i></button>');
            $fullscreenButton.click(function () {
                mapContainer.requestFullscreen();
            });
            $(document).on('fullscreenchange mozfullscreenchange webkitfullscreenchange', function (event) {
                setTimeout(function () {
                    window.dispatchEvent(new Event('resize'));
                }, 1200);
            });
            $mapControls.append($fullscreenButton);
            $mapContainer.before('<style>#activity-map-canvas:-webkit-full-screen {width: 100% !important; height: 100% !important;}</style>');
        }
    }

    browser.storage.local.get().then(
        (options) => {
            console.log(`Options loaded.`);
            if (options.fullscreenMapButton === true) {
                console.log("Fullscreen map button is enabled, will add when the map has been loaded.");
                $(document).on('DOMNodeInserted', '#map-controls, #activity-map-canvas, .widget-map, .map-controls', function () {
                    addButton(this);
                });
            }
            else {
                console.log("Fullscreen map button is not enabled.");
            }
        }, (error) => {
            console.log(`Error while loading options: ${error}`);
        }
    );

    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log(`Options updated.`);
        if (request.options.fullscreenMapButton === true) {
            console.log("Fullscreen button map is enabled, adding the button now.");
            $('#map-controls, #activity-map-canvas, .widget-map, .map-controls').each(function () {
                addButton(this);
            });
        }
        else {
            console.log("Fullscreen button map is not enabled.");
        }
    });
})(jQuery);
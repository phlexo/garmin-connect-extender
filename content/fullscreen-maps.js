(function ($) {
    var enabled = false;

    /*
     * Based on the bookmarklet by johanberonius.
     * https://github.com/johanberonius/fullscreen-maps
     */
    function addFullscreenButton(target) {
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

    function addFullscreenButtonLive(event) {
        addFullscreenButton(event.target);
    }

    function removeFullscreenButton(target) {
        $(target).find(".map-full-screen").remove();
    }

    function applyFullscreenButton() {
        if (enabled === true) {
            $('#map-controls, #activity-map-canvas, .widget-map, .map-controls').each(function () {
                addFullscreenButton(this);
            });
            $(document).on('DOMNodeInserted', '#map-controls, #activity-map-canvas, .widget-map, .map-controls', addFullscreenButtonLive);
        }
        else {
            $('#map-controls, #activity-map-canvas, .widget-map, .map-controls').each(function () {
                removeFullscreenButton(this);
            });
            $(document).off('DOMNodeInserted', '#map-controls, #activity-map-canvas, .widget-map, .map-controls', addFullscreenButtonLive);
        }
    }

    function loadOptions(options) {
        if (options.map != undefined) {
            if (options.map.fullscreen != undefined) {
                enabled = options.map.fullscreen;
                console.log(`enabled=${enabled}`);
            }
        }
    }

    browser.storage.local.get().then(
        (options) => {
            console.log(`Options loaded.`);
            loadOptions(options);
            applyFullscreenButton();
        }, (error) => {
            console.log(`Error: ${error}`);
        }
    );

    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log(`Options updated.`);
        loadOptions(request.options);
        applyFullscreenButton();
    });
})(jQuery);
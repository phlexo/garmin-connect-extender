(function ($) {
    function onError(error) {
        console.log(`Error: ${error}`);
    }

    function onGot(item) {
        var widgetSize = -1;
        if (item.widget.size) {
            widgetSize = item.widget.size;
        }
        console.log(`Setting widget size to ${widgetSize}px`);
    }

    var getting = browser.storage.local.get();
    getting.then(onGot, onError);
})(jQuery);
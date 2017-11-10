(function ($) {
    console.log("calendar-totals.js loaded.");

    $(document).on('DOMNodeInserted', '#iFrameWidget-0', function (event) {
        var $iframe = $(event.target);
        if ($iframe.is("#iFrameWidget-0")) {
            console.log("#iFrameWidget-0 found.");
            $iframe.contents().ready(function () {
                console.log("iframe ready")
                $iframe.contents().on('DOMNodeInserted', '#calendar-totals-select', function (event) {
                    var $select = $(event.target);
                    if ($select.is("#calendar-totals-select")) {
                        console.log("#calendar-totals-select found.")
                    }
                });
            });
        }
    });
})(jQuery);
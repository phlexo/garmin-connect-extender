(function ($) {
    browser.runtime.onMessage.addListener(request => {
        $(".activity-list").css('border', '2px solid yellow');
    });

    $(document).on("click", ".widget-footer-action", function (event) {
        browser.runtime.sendMessage({
            message: "widget_clicked"
        });
        //$(".activity-list").css('border', '2px solid yellow');
    });
})(jQuery);
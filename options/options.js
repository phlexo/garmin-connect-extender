(function ($) {
    function saveOptions() {
        var options = {
            dashboard: {
                widgetWidth: document.querySelector("#widget-width").value,
                removePadding: document.querySelector("#remove-padding").checked,
                hideNewWidget: document.querySelector("#hide-new-widget").checked
            },
            fullscreenMapButton: document.querySelector("#fullscreen-button").checked
        };
        browser.storage.local.set(options);
        return options;
    }

    function notifyChangedOptions(options) {
        browser.runtime.sendMessage({
            options: options
        }).then(null, (error) => {
            console.log(`Error when notifying options are changed: ${error}`);
        });
    }

    function restoreOptions() {
        browser.storage.local.get().then(
            (result) => {
                var options = $.extend(true, {}, {
                    dashboard: {
                        widgetWidth: 420,
                        removePadding: true,
                        hideNewWidget: false
                    },
                    fullscreenMapButton: true
                }, result);
                document.querySelector("#widget-width").value = options.dashboard.widgetWidth;
                document.querySelector("#remove-padding").checked = options.dashboard.removePadding;
                document.querySelector("#hide-new-widget").checked = options.dashboard.hideNewWidget;
                document.querySelector("#fullscreen-button").checked = options.fullscreenMapButton;
            },
            (error) => {
                console.log(`Error when restoring options: ${error}`);
            }
        );
    }

    document.addEventListener("DOMContentLoaded", restoreOptions);
    document.querySelector("form").addEventListener("submit", (event) => {
        var options = saveOptions();
        notifyChangedOptions(options);
        event.preventDefault();
    });
})(jQuery);
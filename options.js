function saveOptions() {
    var options = {
        widget: {
            width: document.querySelector("#widget-width").value,
            removePadding: document.querySelector("#remove-padding").checked
        },
        map: {
            fullscreen: document.querySelector("#fullscreen-button").checked
        }
    };
    browser.storage.local.set(options);
    browser.runtime.sendMessage({
        options: options
    }).then(null, (error) => {
        console.log(`Error when sending message: ${error}`);
    });
    e.preventDefault();
}

function restoreOptions() {
    browser.storage.local.get().then(
        (result) => {
            document.querySelector("#widget-width").value = result.widget === undefined ? "420" : (result.widget.width === undefined ? "420" : result.widget.width);
            document.querySelector("#remove-padding").checked = result.widget === undefined ? true : (result.widget.removePadding === undefined ? true : result.widget.removePadding);
            document.querySelector("#fullscreen-button").checked = result.map === undefined ? true : (result.map.fullscreen === undefined ? true : result.map.fullscreen);
        },
        (error) => {
            console.log(`Error when restoring options: ${error}`);
        }
    );
}

document.addEventListener("DOMContentLoaded", restoreOptions);
var inputs = document.querySelectorAll("input");
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", (event) => {
        saveOptions();
    });
}
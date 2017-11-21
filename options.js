function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
        widget: { size: document.querySelector("#widget-size").value },
        map: { fullscreen: document.querySelector("#fullscreen-button").checked }
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#widget-size").value = result.widget ? result.widget.size : "-1";
        document.querySelector("#fullscreen-button").checked = result.map ? result.map.fullscreen : true;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var getting = browser.storage.local.get();
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
var inputs = document.querySelectorAll("input");
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", saveOptions);
}
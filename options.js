function saveOptions(e) {
    browser.storage.local.set({
        widget: {
            width: document.querySelector("#widget-width").value,
            removePadding: document.querySelector("#remove-padding").checked
        },
        map: {
            fullscreen: document.querySelector("#fullscreen-button").checked
        }
    });
    e.preventDefault();
}

function restoreOptions() {
    browser.storage.local.get().then((result) => {
        document.querySelector("#widget-width").value = result.widget ? result.widget.width : "420";
        document.querySelector("#remove-padding").checked = result.widget ? result.widget.removePadding : true;
        document.querySelector("#fullscreen-button").checked = result.map ? result.map.fullscreen : true;
    }, (error) => {
        console.log(`Error when restoring options: ${error}`);
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
var inputs = document.querySelectorAll("input");
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", saveOptions);
}
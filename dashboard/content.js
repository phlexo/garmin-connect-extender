(function ($) {
    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log("Aktiviteter mottagna från bakgrundsskriptet.");

        const template = `
<h1>Aktiviteter</h1>
<div>
{% for (var i=0; i<o.activityList.length; i++) { %}
    <h2>{%=o.activityList[i].activityName%}</h2>
    <div>Distance: {%=o.activityList[i].distance%}</div>
    <div>Duration: {%=o.activityList[i].duration%}</div>
{% } %}
</div>
`;

        document.getElementsByClassName("main-body")[0].innerHTML = tmpl(template, request.result);
    });
})(jQuery);
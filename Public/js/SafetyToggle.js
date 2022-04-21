$.fn.safetyToggle = function(options){
    const settings      = $.extend({}, $.fn.safetyToggle.defaults, options);
    const container     = $(this);
    const name          = container.attr("data-name");
    let input           = null;
    let onSwitch        = false;

    init();

    container
        .on("click", ".safetyLamp", event => {
            let toggle  = $(event.currentTarget).find(".safetyToggleText");

            if (toggle.hasClass("safetyToggleOn")) {
                toggle.removeClass("safetyToggleOn").addClass("safetyToggleOff");
                toggle.text("Inaktív");
                input.val(0);
            } else {
                toggle.removeClass("safetyToggleOff").addClass("safetyToggleOn");
                toggle.text("Aktív");
                input.val(1);
            }
        })
        // .on("mousedown", event => {
        //     if (!onSwitch){
        //         onSwitch = true;
        //         switching();
        //     }
        // })
        // .on("mouseup", event => {
        //     onSwitch = false;
        //     container.find(".safetyToggleSwitch").remove();
        // })

    function init(){
        container.empty();
        container.addClass("p-relative");
        container.append('<div class="safetyLamp"><div class="safetyToggleText safetyToggle' + (settings.value ? 'On' : 'Off') + '">' + (settings.value ? 'Aktív' : 'Inaktív') + '</div><div class="safetyToggleSwitch"></div></div>');

        let form = container.closest(".modalContent").find("form");
        input = form.find("[name=" + name + "]");
        if (input.length === 0){
            input = $("<input type='hidden' name='" + name + "' value='" + (settings.value ? 1 : 0) + "'>");
            form.append(input);
        }
    }

    function switching(){
        container.find(".safetyToggleSwitch").slideDown(2000);
    }

    this.setValue = (newValue) => {
        let safetyLamp = container.find(".safetyLamp");

        if (safetyLamp.find(".safetyToggleText").hasClass("safetyToggleOn") !== newValue) {
            safetyLamp.click();
        }
    }

    return this;
}

$.fn.safetyToggle.defaults = {
    value:      true,
    direction:  "left",
}
$(function() {
    $("body")
        //Select
        .on("change", "select[data-next-focus]", event => {
            let thisSelect  = $(event.currentTarget);
            let selector    = thisSelect.attr("data-next-focus");
            $(selector).focus();
        })

        //Input
        .on("focus", "input[type=text]", event => {
            let thisElem    = $(event.currentTarget);
            thisElem.select();
        });
})




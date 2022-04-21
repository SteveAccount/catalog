class MessageBox {
    defaults;
    settings;
    piktograms;
    cover = null;
    messageBox = null;

    constructor() {
        this.defaults   = {
            type:       "info", //info, ok, warning, input, question
            title:      "Cím",
            text:       "Üzenet",
            onShow:     () => {},
            buttons:    [
                {
                    label:      "OK",
                    onClick:    () => {console.log("OK");}
                }
            ]
        };
        this.piktograms = {
            warning:    "&#x21",
            question:   "&#x3f",
            ok:         "&#10003",
            input:      "&#x1F86A;",
            info:       "&#x2170;"
        };

        $("body")
            .on("click", ".mbButton", event => {
                let result = false;
                this.settings.buttons.map((item) => {
                    if (item.label === $(event.currentTarget).text()){
                        result = result || item.onClick();
                    }
                })

                if (result){
                    this.hide();
                }
            })
    }

    show(options) {
        this.settings = $.extend({}, this.defaults, options);

        if (this.settings.title !== undefined && this.settings.text !== undefined && this.settings.buttons.length > 0) {
            $(".mbCover").remove();

            this.cover = $("<div class='mbCover'></div>");
            let mbLayer = $("<div class='mbLayer'></div>");
            this.cover.append(mbLayer);

            this.messageBox = $("<div class='messageBox'></div>");
            this.messageBox.append("<div class='mbSide mbSide-bg-" + this.settings.type + "'><span class='mbSideTitle mbSideTitle-" + this.settings.type + "'>" + this.settings.type + "</span></div>");
            let contentSide = $("<div class='mbContentSide mb-bg-" + this.settings.type + "''></div>");
            this.messageBox.append(contentSide);

            contentSide.append("<div class='mbTitle'>" + this.settings.title + "</div>");
            let content = $("<div class='mbContent'></div>");
            content.append("<div class='mbIcon mbIcon-" + this.settings.type + "'>" + this.piktograms[this.settings.type] + "</div>");
            content.append("<div class='mbMessage'>" + this.settings.text + "</div>");
            let footer = $("<div class='mbFooter'></div>");
            this.settings.buttons.map((item) => {
                footer.append("<button class='mbButton mbButton-" + this.settings.type + "'>" + item.label + "</button>");
            })
            contentSide.append(content);
            contentSide.append(footer);
            mbLayer.append(this.messageBox);
            $("body").append(this.cover);
            this.cover.fadeIn(300).promise().done(() => {
                if (this.settings.onShow !== {}) {
                    this.settings.onShow();
                }
            });
        }
    }

    hide() {
        this.messageBox.fadeOut(200).promise().done(() => {
            this.cover.fadeOut(200). promise().done(() => {
                this.cover.remove();
            })
        });
    }

    turnOnButtons() {
        this.cover.find("button").prop("disabled", false);
    }

    turnOffButtons() {
        this.cover.find("button").prop("disabled", true);
    }
}

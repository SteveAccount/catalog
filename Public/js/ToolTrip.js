class ToolTripControl {
    toolTrips = [];
    inService = true;

    constructor() {
        $("body")
            .on("mouseenter", "[data-tooltrip=tooltrip]", event =>{
                if (this.inService) {
                    let target = event.currentTarget;
                    let tooltripId = this.on($(target));
                    $(target).attr("data-tooltripid", tooltripId);
                }
            })
            .on("mouseleave", "[data-tooltrip=tooltrip]", event =>{
                if (this.inService) {
                    let target = event.currentTarget;
                    let tooltripId = $(target).attr("data-tooltripid");
                    if (tooltripId) {
                        this.toolTrips[tooltripId].off();
                        delete this.toolTrips[tooltripId];
                    }
                }
            })
    }

    on(sender) {
        if (!this.inService) {
            return;
        }

        this.offAll();
        let tooltripId = null;

        if ($(sender).attr("data-content") !== undefined && $(sender).attr("data-content") !== "") {
            tooltripId = this.getTooltripId();

            this.toolTrips[tooltripId] = new ToolTrip(tooltripId, sender);
        }
        return tooltripId;
    }

    getTooltripId(){
        return "tt" + Date.now();
    }

    stop(){
        this.inService = false;
        this.offAll();
    }

    start(){
        this.inService = true;
    }

    offAll() {
        for (const key in this.toolTrips) {
            this.toolTrips[key].off();
        }
    }
}

class ToolTrip{
    tooltripId;
    interval = 3000;
    isOff    = false;

    constructor(toolTripId, sender) {
        this.tooltripId = toolTripId;

        let tooltripBox = $(this.view());
        this.fill(tooltripBox, sender);
        this.position(tooltripBox, sender);

        setTimeout(() => {
            if (!this.isOff) {
                $("body").append(tooltripBox);
                tooltripBox.fadeIn(200);
                setTimeout(() => {
                    this.off();
                }, this.interval);
            }
        }, 500);
    }

    fill(tooltripBox, sender){
        sender = $(sender);
        if (sender.attr("data-header") || sender.attr("data-footer")){
            if (sender.attr("data-header")){
                tooltripBox.find(".tooltripHeader").html(sender.attr("data-header"));
            }
            if (sender.attr("data-content")){
                tooltripBox.find(".tooltripContent").html(sender.attr("data-content"));
            }
            if (sender.attr("data-footer")){
                tooltripBox.find(".tooltripFooter").html(sender.attr("data-footer"));
            }
        } else{
            tooltripBox.find(".tooltripContent").html(sender.attr("data-content"));
        }
        if (sender.attr("data-size")){
            tooltripBox.find(".tooltripWrapper").css("max-width", sender.attr("data-size") + "vw");
        } else{
            tooltripBox.find(".tooltripWrapper").css("max-width", "40vw");
        }
    }

    position(tooltripBox, sender){
        let position = $(sender).offset();
        let size = this.size(tooltripBox);
        let bodyScrollTop = $(window).scrollTop();
        let bodyWidth = $(window).width();
        let arrowClass = "bottom";

        if (position.top - size.height + 8 > bodyScrollTop){
            position.top -= size.height + 8;
        } else{
            position.top += $(sender).height();
            arrowClass = "top";
        }

        if (position.left +  size.width > bodyWidth){
            position.left = position.left + $(sender).width() - size.width;
            arrowClass = "right-" + arrowClass + "Tool";
        } else{
            arrowClass = "left-" + arrowClass + "Tool";
        }

        tooltripBox.css(position).addClass(arrowClass);
    }

    size(tooltripBox){
        let clone = tooltripBox.clone();
        clone.css("visibility","hidden");
        $('body').append(clone);
        let width = clone.outerWidth();
        let height = clone.outerHeight();
        clone.remove();
        return {width: width, height: height};
    }

    off(){
        this.isOff = true;
        let tooltrip = $("#" + this.tooltripId);
        tooltrip.fadeOut(200).promise().done(function(){
            tooltrip.remove();
        });
    }

    view(){
        return "\
            <div id='" + this.tooltripId + "' class='tooltripWrapper'>\
                <div class='tooltripContainer'>\
                    <div class='tooltripHeader'>\
                    </div>\
                    <div class='tooltripContent'>\
                    </div>\
                    <div class='tooltripFooter'>\
                    </div>\
                </div>\
            </div>\
        ";
    }
}
class ModalController{
    modals      = [];
    openedModal = null;
    widgets     = [];
    modalBg     = "";

    constructor(modalBg){
        this.modalBg = modalBg;

        $("body")
            .on("keyup", event => {
                if (event.keyCode === 27 && this.openedModal !== null) {
                    this.close(this.openedModal);
                }
            })
            .on("click", ".modalContent", event => {
                if (event.target === event.currentTarget){
                    this.close($(event.currentTarget).closest(".modalContainer").attr("data-modalname"));
                }
            });
        $(".modalContainer")
            .on("click", ".btnCancel", event => {
                this.close($(event.currentTarget).closest(".modalContainer").attr("data-modalname"));
            })
    }

    open(modalName, id=0, params = {}, onSubmit = null, fixOnTop = false){
        if (this.modals[modalName] === undefined){
            let url             = "/getModal";

            dataService.request("POST", url, {modalName: modalName}, response => {
                let modalContainer = $("<div class='modalContainer' data-modalname='" + modalName + "'></div>");
                let modalContent = $("<div class='modalContent " + (fixOnTop ? "fixOnTop" : "") + "'></div>");

                modalContainer.append(modalContent);
                $("body").append(modalContainer);
                modalContent.append(response);
                modalContent.find(".modalFrame").css("background", "url(/Public/backgrounds/" + this.modalBg + ".jpg)")
                this.modals[modalName] = true;
            }, error => {
                notify.warning("Nincs jogosultságod a funkcióhoz!");
                return;
            })
        } else{
            $(".modalContainer[data-modalname='" + modalName + "'] .modalContent").show();
        }
        $(".modalContainer[data-modalname='" + modalName + "']").fadeIn(400);
        $("#" + modalName).show();
        eval(modalName).open(id, params, onSubmit);
        this.openedModal = modalName;
    }

    close(modalName){
        let modalContainer = $(".modalContainer[data-modalname='" + modalName + "']");
        modalContainer.fadeOut(400).promise().done(() =>{
            modalContainer.find("#" + this.openedModal).hide();
        });

        this.openedModal = null;
    }

    openWidget(name, data){
        if (this.widgets[name] === undefined){
            let modalContainer = $("<div class='modalContainer' data-modalname='" + name + "'></div>");
            let modalContent = $("<div class='modalContent'></div>");
            modalContainer.append(modalContent);
            $("body").append(modalContainer);
            modalContent.append(data);
            this.widgets[name] = true;
        } else {
            $(".modalContainer[data-modalname='" + name + "'] .modalContent").show();
        }
        $(".modalContainer[data-modalname='" + name + "']").fadeIn(400);
        $("#" + name).show();
        eval(name.substr(0, 1).toLowerCase() + name.substr(1)).open();
        this.openedModal = name;
    }


}
class Menu{
    mainMenu;
    windowSelector;
    isOpened        = false;
    openedWindows   = [];
    hoveredMenuItem;
    settings        = {};
    fadeInterval    = 100;

    constructor(options = {}) {
        this.settings       = $.extend({}, this.settings, options);
        this.sideBar        = $(".sideBar");
        this.windowSelector = $("#windowsToggleContainer");
        this.loadWindow($("<button data-url='/albums' data-id='albums'>Katalógus</button>"));
        this.openPrevWindows();

        $("body").css("opacity", 0);
        setTimeout(() => {
            $("body").css("opacity", 1);
        }, 1000);

        $("body")
            .on("mouseenter", ".sideBar", event => {
                if (!this.isOpened){
                    this.isOpened = true;
                    this.sideBar.animate({left: 0}, 500);
                    $(".menuToggleContainer button").animate({opacity: 0}, 500);
                }
            })
            .on("mouseleave", ".sideBar", event => {
                this.sideBar.animate({left: "-270px"}, 500);
                $(".menuToggleContainer button").animate({opacity: 1}, 500).promise().done(() => {
                    $(".menuContainer").find(".open").slideUp().removeClass("open");
                    this.isOpened = false;
                });
            })
            .on("click", ".menuItem", event => {
                let menuItem            = $(event.currentTarget);
                this.hoveredMenuItem    = menuItem;

                setTimeout(() => {
                    if (this.hoveredMenuItem === menuItem){
                        let openedSubmenu = $(".menuContainer").find(".open");
                        if (openedSubmenu.length > 0){
                            $(".menuContainer .parentOpen .parentMenuItem").removeClass("arrowOpen");
                            $(".menuContainer .parentOpen").removeClass("parentOpen");

                            let openedAbove = $(event.target).closest(".open");
                            let openedUnder = $(event.target).siblings(".open");
                            if (openedAbove.length === 0 && openedUnder.length === 0){
                                openedSubmenu.slideUp().removeClass("open");
                            }
                        }
                        let submenu = menuItem.siblings(".submenu");
                        if (submenu.length > 0){
                            submenu.slideDown().addClass("open");
                            menuItem.addClass("parentOpen");
                            menuItem.find(".parentMenuItem").addClass("arrowOpen");
                        }
                    }
                }, 1)
            })
            .on("mouseleave", ".menuContainer", event => {
                let container = $(".menuContainer");
                container.find(".open").slideUp().removeClass("open");
                container.find(".arrowOpen").removeClass("arrowOpen");

            })
            .on("click", ".menuToggle", event => {
                if (this.sideBar.hasClass("open")){
                    this.sideBar.trigger("mouseleave").removeClass("open");
                } else{
                    this.sideBar.trigger("mouseenter").addClass("open");
                }
            })
            .on("click", ".mainMenu a", event => {
                let menuBtn = $(event.currentTarget);

                if (menuBtn.attr("data-window") === "1") {
                    if (menuBtn.data("url")){
                        $(".sideBar").trigger("mouseleave");
                        this.showWindow(menuBtn);
                    }
                } else {
                    if (menuBtn.attr("data-url") !== undefined) {
                        dataService.request("post", menuBtn.data("url"), {});
                    } else {
                        if (this.settings[menuBtn.attr("data-id")] !== undefined) {
                            this.settings[menuBtn.attr("data-id")]();
                        }
                    }
                }

            })
            .on("click", ".windowBtn", event => {
                if (!$(event.target).hasClass("windowCloseBtn")){
                    let windowId = $(event.currentTarget).attr("data-id");
                    this.switchWindow(windowId);
                }
            })
            .on("click", ".windowCloseBtn", event => {
                let id = $(event.target).closest("a").attr("data-id");
                this.closeWindow(id);
            })
            .on("keyup", ".globalSearchInput", event => {
                let search = $(event.target).val();
                if (search.length > 2){
                    dataService.request("post", "/wc/globalSearch", {search: $(".globalSearchInput").val()}, response => {
                        let resultContainer = $(".globalSearchResults");
                        resultContainer.empty();
                        if (response !== ""){
                            resultContainer.append(response);
                        } else{
                            resultContainer.append("<div class='resultGroup d-flexRow justifyContentCenter'>Nincs találat.</div>");
                        }
                    })
                }
        })
    }

    showWindow(menuBtn){
        let windowId    = menuBtn.data("modul") + menuBtn.data("subgroup");
        let windowBox   = $("#" + windowId);

        if (windowBox.length === 0){
            this.loadWindow(menuBtn);
        } else{
            let btn =  $(".windowBtn[data-id=" + windowId + "]");

            if (btn.length !== 0){
                this.switchWindow(windowId);
            } else{
                this.newButton(windowId, btn.text());
            }
        }
    }

    loadWindow(menuBtn, url = null){
        url             = url === null ? menuBtn.data("url") : url;
        if (url === undefined) {
            return;
        }

        let urlParts    = url.split("/");
        let windowId    = menuBtn.attr("data-id");

        if ($("#" + windowId).length === 0){
            dataService.request("post", url, {}, response => {
                this.closeWindow();
                let newWindow   = $("<div class='windowContent' id='" + windowId + "'></div>")
                newWindow.append(response);
                $(".contentContainer").append(newWindow);
                this.newButton(windowId, menuBtn.text());
            }, error => {
                notify.warning(dataService.getErrorMessage(error.status));
            })
        } else{
            if ($(".windowBtn[data-id=" + windowId + "]").length === 1) {
                this.switchWindow(windowId);
            } else {
                this.newButton(windowId, menuBtn.text());
                this.saveOpenedWindows(windowId);
            }
        }
    }

    closeWindow(id = null){
        if (id){
            $("#" + id).fadeOut(this.fadeInterval);
            let btn         = $(".windowBtn[data-id='" + id + "']");
            let isActive    = btn.hasClass("windowBtnActive");
            btn.remove();
            this.saveOpenedWindows();

            if (isActive){
                let newBtn = $(".windowBtn").eq(0);
                this.switchWindow(newBtn.attr("data-id"));
            }
        } else{
            $(".windowContent").fadeOut(this.fadeInterval);
        }
    }

    switchWindow(id){
        let activeBtn       = $(".windowBtnActive");

        activeBtn.removeClass("windowBtnActive");
        $(".windowBtn[data-id=" + id + "]").addClass("windowBtnActive");
        this.closeWindow();
        $("#" + id).fadeIn(this.fadeInterval);
    }

    newButton(windowId, label){
        let windowBtn   = $("<a class='windowBtn' data-id='" + windowId + "'></a>");

        windowBtn.append("<span>" + label + "</span>");
        if (label !== "Kezdőlap") {
            windowBtn.append("<span class='windowCloseBtn'>&#10799;</span>");
        }
        this.windowSelector.append(windowBtn);
        this.switchWindow(windowId);

        if (windowId && windowId !== "startPage") {
            this.saveOpenedWindows();
        }
    }

    openPrevWindows(){
        let prevs = JSON.parse(window.localStorage.getItem("prevs"));

        if (prevs){
            prevs.map((item) => {
                this.loadWindow($(".menuItem[data-id=" + item + "]"));
            })
        }

        this.fadeInterval = 400;
    }

    saveOpenedWindows(id, isAdd = true){
        let windows = $("#windowsToggleContainer > a");
        let prevs   = [];

        windows.map((index, item) => {
            let elem = $(item);

            if (elem.attr("data-id") !== "startPage" && elem.attr("data-id") !== "undefined") {
                prevs.push(elem.attr("data-id"));
            }
        })

        window.localStorage.setItem("prevs", JSON.stringify(prevs));
    }
}
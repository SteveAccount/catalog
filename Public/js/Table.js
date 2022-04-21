$.fn.table = function(options){
    const settings              = $.extend({}, $.fn.table.defaults, options);
    const container             = $(this);
    const windowId              = container.closest(".windowContent").attr("id");
    const windowContainer       = settings.parentContainer ? settings.parentContainer : $("#" + windowId);
    const myCompanySelector     = windowContainer.find(".myCompanySelector");
    let builtInMenu             = null;
    let filtered                = false;
    let flyingMenuContainer     = null;
    let flyingMenuOpen          = false;
    let scrollTopForAutoLoad    = 0;
    let limitStart              = 0;
    let onLoad                  = false;
    let queryParams             = {
        isActive:   1,
        fieldIndex: 0,
        direction:  "Desc"
    };

    init();
    if (settings.fillOnStart){
        fill(false);
    }

    function init(){
        initBuiltInMenu();
        settings.flyingMenu = $.extend({}, builtInMenu, settings.flyingMenu);
        queryParams = settings.defaultParams;
        if (myCompanySelector){
            queryParams["myCompanyId"] = myCompanySelector.val();
        }

        windowContainer
            .on("click", settings.refreshBtnSelector, event => {
                fill(false);
            })
            .on("click", ".btnNew", event => {
                modalController.open(settings.modal, 0, queryParams, {}, settings.modalFixOnTop);
            })
            .on("click", ".excelBtn", event => {
                dataService.request("post", settings.url + "/toExcel", queryParams, response => {
                    window.location.assign(response);
                });
            })
            .on("click", "span[class^=order]", event => {
                let oldClass    = $(event.target).attr("class");
                windowContainer.find("span[class^=order]").removeClass("orderNone orderAsc orderDesc").addClass("orderNone");
                let btn         = $(event.target);
                let fieldIndex  = parseInt(btn.closest("div").index());

                let newClass    = null;
                if (fieldIndex === settings.defaultParams.fieldIndex){
                    newClass    = oldClass === "orderAsc" ? "orderDesc" : "orderAsc";
                } else{
                    newClass    = oldClass === "orderNone" ? "orderAsc" : (oldClass === "orderAsc" ? "orderDesc" : "orderNone");
                }
                btn.attr("class", "").addClass(newClass);
                let direction   = newClass.substr(5);

                if (newClass === "orderNone"){
                    fieldIndex  = settings.defaultParams.fieldIndex;
                    direction   = settings.defaultParams.direction;
                    btn         = windowContainer.find("span[class^=order]").eq(fieldIndex);
                    btn.attr("class", "").addClass("order" + direction);
                }
                Object.assign(queryParams, queryParams, {
                    fieldIndex: fieldIndex,
                    direction:  direction
                })
                fill(false);
            })
            .on("mousewheel", ".tableBody", event => {
                if ($("#" + windowId + " .tableBody").scrollTop() > scrollTopForAutoLoad){
                    fill();
                }
            })
            .on("dblclick", ".tableRow", event => {
                event.preventDefault();
                let id      = $(event.currentTarget).attr("data-id");
                let params  = queryParams;

                if (settings.onBeforeOpenModal() !== {}) {
                    params = settings.onBeforeOpenModal($(event.currentTarget));
                    params = $.extend({}, params, queryParams);
                }
                modalController.open(settings.modal, id, params);
            })
            .on("contextmenu", ".tableRow:not(.tableHeader)", event => {
                event.preventDefault();
                let row     = $(event.currentTarget);
                let cell    = $(event.target).hasClass("tableCell") ? $(event.target) : $(event.target).closest(".tableCell");
                row.trigger("click");

                //Módosítás a megjelenés előtt
                flyMenuBeforeShow(row, cell);

                //A méret meghatározása
                flyingMenuContainer.show();
                let width   = flyingMenuContainer.width();
                let height  = flyingMenuContainer.height();
                flyingMenuContainer.hide();

                //Pozícionálás
                if ($(document).width() - width * 1.1 < event.pageX){
                    flyingMenuContainer.find(".flyMenuItems").removeClass("innerRight").addClass("innerLeft");
                    flyingMenuContainer.css("left", event.pageX - width + 10);
                } else{
                    flyingMenuContainer.find(".flyMenuItems").removeClass("innerLeft").addClass("innerRight");
                    flyingMenuContainer.css("left", event.pageX - 10);
                }
                if ($(document).height() - height * 1.1 < event.pageY){
                    flyingMenuContainer.css("top", event.pageY - height + 10);
                } else{
                    flyingMenuContainer.css("top", event.pageY - 10);
                }

                flyingMenuOpen = true;
                flyingMenuContainer.slideDown(200).promise().done(function() {
                    flyingMenuContainer.find(".searchBox").focus();
                });
            })
            .on("mouseleave", ".flyingMenuContainer", event => {
                flyingMenuOpen = false;
                flyingMenuContainer.slideUp(200);
            })
            .on("click", ".flyMenuItem", event => {
                let btn     = $(event.currentTarget);
                let name    = btn.attr("data-name");
                let row     = container.find(".selectedRow");

                if (name === "search"){
                    btn.focus();
                } else{
                    if (settings.flyingMenu[name].onClick){
                        settings.flyingMenu[name].onClick(row, btn);
                        flyingMenuContainer.slideUp(200);
                    }
                }
            })
            .on("keyup", ".flyMenuItem", event => {
                let btn     = $(event.currentTarget);
                let name    = btn.attr("data-name");
                let row     = container.find(".selectedRow");

                if (settings.flyingMenu[name].onKeyUp){
                    settings.flyingMenu[name].onKeyUp(btn);
                }
            })
            .on("click", ".controlSignFilter", event => {
                filtered = false;
                queryParams["search"] = null;
                $(".controlSignFilter").hide();
                fill(false);
            })

        container
            .on("click", ".checkAll", event => {
                let isChecked = $(event.target).is(":checked");
                if (settings.onCheckAll !== {}){
                    settings.onCheckAll(isChecked);
                }
                container.find(".tableRowCheckbox:not(.checkAll)").prop("checked", isChecked);
            })
            .on("change", ".tableRowCheckbox:not(.checkAll)", event => {
                let isChecked   = $(event.target).is(":checked");
                let row         = $(event.target).closest(".tableRow");

                //A checkAll ellenőrzése
                let isCheckAll = true;
                let checks = container.find(".tableRowCheckbox:not(.checkAll)");
                checks.map((index, item) => {
                    isCheckAll = isCheckAll && $(item).is(":checked");
                })
                container.find(".checkAll").prop("checked", isCheckAll);

                if (settings.onCheck !== {}){
                    settings.onCheck(isChecked, row);
                }
            })
            .on("click", ".tableRow:not(.tableHeader)", event => {
                if (!flyingMenuOpen){
                    if (!settings.multiSelect){
                        container.find(".selectedRow").removeClass("selectedRow");
                    } else{
                        if (!(event.shiftKey || event.ctrlKey)){
                            container.find(".selectedRow").removeClass("selectedRow");
                        }
                    }
                    $(event.currentTarget).addClass("selectedRow");
                    if (settings.onSelectRow() !== {}) {
                        settings.onSelectRow();
                    }
                }
            })

        $(window).resize(() => {
            fill(false);
        })

        if (settings.flyingMenu){
            initFlyingMenu();
        }
    }

    function initBuiltInMenu(){
        builtInMenu = {
            search:    {
                label:      "<input type='text' class='searchBox modalInput' placeholder='Keresés...'>",
                onKeyUp:    (flyMenuItem) => {
                    let searchText = flyMenuItem.find(".searchBox").val().trim();
                    if (searchText.length > 2){
                        filtered = true;
                        queryParams["search"]["searchText"] = searchText;
                        queryParams["search"]["operation"] = "content";
                        $(".controlSignFilter").show();
                        fill(false);
                    }
                },
                beforeShow: (row, cell) => {
                    queryParams["search"] = {field: cell.index(), operation: "content", searchText: ""};
                }
            },
            filter:    {
                label:      "Szűrés",
                onClick:    (row, flyMenuItem) => {
                    filtered = true;
                    queryParams["search"]["searchText"] = flyMenuItem.find(".flyMenuSubText").text();
                    $(".controlSignFilter").show();
                    fill(false);
                },
                beforeShow: (row, cell) => {
                    if (row.hasClass("footerRow")) {
                        $("[data-name=filter]").addClass("flyMenuItemDisabled");
                        return "Szűrés:";
                    }

                    queryParams["search"] = {field: cell.index(), operation: "equal", searchText: ""};
                    let cellContent = cell.find("span").attr("title");
                    return "Szűrés: " + "<span class='searchText flyMenuSubText'>" + cellContent + "</span>";
                }
            },
            clearFilter:    {
                label:      "Szűrés törlése",
                separator:  "after",
                onClick:    (row, flyMenuItem) => {
                    filtered = false;
                    queryParams["search"] = null;
                    $(".controlSignFilter").hide();
                    fill(false);
                },
                beforeShow: (row, cell) => {
                    if (filtered){
                        flyingMenuContainer.find("[data-name=clearFilter]").removeClass("flyMenuItemDisabled");
                    } else{
                        flyingMenuContainer.find("[data-name=clearFilter]").addClass("flyMenuItemDisabled");
                    }
                }
            },
        }
    }

    function initFlyingMenu(){
        flyingMenuContainer = $("<div class='flyingMenuContainer'></div>");
        let flyingMenuInner = $("<div class='d-flexCol flyingMenuInner'></div>");
        let menuItems = $("<div class='d-flexCol flyMenuItems'></div>");
        for(const[key, value] of Object.entries(settings.flyingMenu)){
            if (value.separator && value.separator === "before"){
                menuItems.append("<div class='flyMenuSeparator'></div>")
            }
            if (value){
                menuItems.append("<div class='flyMenuItem' data-name='" + key + "'>" + value.label + "</div>");
            }
            if (value.separator && value.separator === "after"){
                menuItems.append("<div class='flyMenuSeparator'></div>")
            }
        }
        flyingMenuInner.append(menuItems);
        flyingMenuContainer.append(flyingMenuInner);
        windowContainer.append(flyingMenuContainer);
        flyingMenuContainer.show();
        flyingMenuContainer.hide();
    }

    function flyMenuBeforeShow(row, cell){
        for(const[key, value] of Object.entries(settings.flyingMenu)){
            if (value.beforeShow){
                let newValue = value.beforeShow(row, cell);
                if (newValue){
                    flyingMenuContainer.find("[data-name=" + key + "]").html(newValue);
                }
            }
        }
    }

    function fill(isAppend = true){
        if (!onLoad){
            onLoad          = true;
            let tableBody   = container.find(".tableBody").find(".rows");
            let headerCells = container.find(".tableHeader > div");
            queryParams["limitStart"] = isAppend ? limitStart : 0;

            let url     = settings.directUrl ? settings.directUrl : settings.url + "/list";
            let params  = settings.directParams ? settings.directParams : queryParams;
            dataService.request("post", url, params, response => {
                if (!isAppend){
                    tableBody.empty();
                }
                let data        = JSON.parse(response);
                let colsWidth   = getColsInfo();
                resizeHeader(colsWidth);
                if (Array.isArray(data)){
                    if (data.length > 0){
                        data.map((item) => {
                            let row = $("<div class='tableRow' data-id='" + item.id + "'></div>");

                            //Checkable
                            if (settings.checkable){
                                if (container.find(".checkAll").length === 0){
                                    $("<input type='checkbox' class='tableRowCheckbox checkAll'>").insertBefore(container.find(".tableHeader > div").eq(0));
                                } else{
                                    container.find(".checkAll").prop("checked", false);
                                }
                                row.append("<input type='checkbox' class='tableRowCheckbox'>");
                            }

                            tableBody.append(row);
                            let index = 0;
                            for (let [key, value] of Object.entries(item)){
                                if (key !== "id"){
                                    let cell        = $(headerCells[index - 1]);
                                    let cellWidth   = colsWidth[index] + "%";

                                    //Align
                                    let align;
                                    if (cell.attr("data-align")){
                                        align       = "align" + cell.attr("data-align");
                                    } else{
                                        align       = "alignLeft";
                                    }

                                    // Unit
                                    let unit = cell.attr("data-unit") ? " " + cell.attr("data-unit") : "" ;

                                    //Format
                                    let formattedValue = "";
                                    if (value) {
                                        formattedValue = value;
                                        if (cell.attr("data-format")){
                                            switch (cell.attr("data-format")){
                                                case "numeric":
                                                    formattedValue = numFormat(value) + unit;
                                                    break;
                                                case "currency":
                                                    formattedValue = numFormat(value) + " Ft";
                                                    break;
                                                default:

                                            }
                                        }
                                    }

                                    let cellName = cell.attr("data-name") ? cell.attr("data-name") : "";
                                    let field    = $("<div style='width: " + cellWidth + "'></div>");
                                    field.addClass("tableCell").addClass(cellName);

                                    //Speciális megjelenítés használata
                                    if (cell.attr("data-spec")){
                                        let specValue = settings.specialDisplay[cell.attr("data-spec")](value);
                                        field.append(specValue);
                                    } else{
                                        field.append("<span class='" + align + "' title='" + (value === null ? "" : value) + "'>" + (value === null ? "" : formattedValue) + "</span>");
                                    }

                                    row.append(field);
                                }
                                index++;
                            }

                            if (settings.onBeforeRenderRow !== {}) {
                                settings.onBeforeRenderRow(row);
                            }
                        })

                        headerCells.map((index, headerCell) => {
                            let hideClass = $(headerCell).attr("data-hide");

                            container.find(".tableRow > div:nth-child(" + (index + 1) + ")").addClass(hideClass);
                        })
                    } else{
                        let emptyText = "Nincs megjeleníthető elem a táblázatban.";

                        if (settings.onDataEmpty !== {}){
                            let newText = settings.onDataEmpty();
                            emptyText = newText ? newText : emptyText;
                        }
                        if (tableBody.find(".tableRow:not(.headerRow)").length === 0){
                            let row = $("<div class='tableRow footerRow justifyContentCenter' style='padding: 5px;'>" + emptyText + "</div>");
                            tableBody.append(row);
                        }
                    }

                    limitStart        = tableBody.find(".tableRow:not(.headerRow):not(.footerRow)").length;
                    scrollTopForAutoLoad   = (limitStart - settings.rowsPerLoad / 2) * tableBody.height() / limitStart;
                    if (tableBody.height() > container.find(".tableBody").height()){
                        container.find(".tableHeader").css("padding-right", "16px");
                    } else{
                        container.find(".tableHeader").css("padding-right", "0px");
                    }
                } else{
                    console.log("zümm");
                }

                if (settings.onDataReady !== {}){
                    settings.onDataReady();
                }
            }, error => {
                notify.warning(dataService.getErrorMessage(error.status));
            }, complete => {
                onLoad = false;
            }, true)
        }
    }

    function getColsInfo(){
        let cols        = container.find(".tableHeader > div");
        let colsWidth   = [0];
        let totalWidth  = 0;
        cols.map((index, item) => {
            let field = $(item);
            colsWidth.push(field.attr("data-width"));
            if (field.is(":visible")){
                totalWidth += parseInt(field.attr("data-width"));
            }
        })
        if (totalWidth < 100){
            colsWidth.map((item, index) => {
                if (index > 0){
                    let width = parseInt(item);
                    colsWidth[index] =parseInt(width + width / totalWidth * (100 - totalWidth));
                }
            })
        }

        return colsWidth;
    }

    function resizeHeader(colsWidth){
        let headerFields = container.find(".tableHeader div");
        colsWidth.map((item, index) => {
            if (index > 0){
                headerFields.eq(index - 1).css("width", colsWidth[index] + "%");
            }
        })
    }

    this.getRowCount = function(){
        return limitStart;
    }

    this.setIsActive = function(value) {
        queryParams.isActive = value;
        fill(false);
    }

    this.isFiltered = function() {
        return filtered;
    }

    this.refresh = function(params = {}){
        queryParams = $.extend({}, queryParams, params);
        fill(false);
    }

    return this;
}

$.fn.table.defaults = {
    parentContainer:    null,
    directUrl:          null,
    directParams:       null,
    fillOnStart:        true,
    rowsPerLoad:        50,
    refreshBtnSelector: ".refreshBtn",
    modal:              "",
    modalFixOnTop:      false,
    multiSelect:        true,
    defaultParams:      {
        fieldIndex:     0,
        direction:      "Asc"
    },
    specialDisplay:     {
        formula:        (cellValue) => {
            return "<span>Kukucs</span>";
        }
    },
    checkable:          false,
    onCheck:            () => {},
    onCheckAll:         () => {},
    onDataEmpty:        () => {},
    onDataReady:        () => {},
    onSelectRow:        () => {},
    onBeforeOpenModal:  () => {},
    onBeforeRenderRow:  () => {},
}
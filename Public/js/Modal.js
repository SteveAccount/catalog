class Modal{
    titleForNew;
    titleForUpdate;
    name;
    url;
    onNewRoute;
    onUpdateRoute;
    data;
    container;
    id = 0;
    activeLamp;

    constructor(name, url, onNewRoute = "/new", onUpdateRoute = "/update"){
        this.name           = name;
        this.container      = $("#" + name);
        this.url            = url;
        this.onNewRoute     = onNewRoute;
        this.onUpdateRoute  = onUpdateRoute;
        this.container.draggable({
            containment: "parent"
        });

        this.activeLamp = this.container.find(".isActiveLamp").safetyToggle();

        // Events
        this.container
            .on("click", ".btnCancel", event => {
                modalController.close(this.name);
            })
            .on("click", ".btnOK", event => {
                this.beforeSubmit();
                let form    = $("#" + $(event.currentTarget).attr("data-form"));
                let data    = this.submitForm(form);
                let url     = this.url + (this.id === 0 ? this.onNewRoute : this.onUpdateRoute);

                this.submit(url, data);
            })
            .on("focus", "input, textarea", event => {
                $(event.target).removeClass("error");
            })
    }

    init(params = {}){
        if (this.id === 0){
            this.container.find(".titleText").html(this.titleForNew);
            this.container.find(".isActiveLamp").hide();
            if (params.parentData !== undefined) {
                this.container.find("[name=name]").val(params.parentData);
            }
        } else{
            this.container.find(".titleText").html(this.titleForUpdate);
            this.container.find(".isActiveLamp").show();
            this.loadEntity(params);
            this.showEntity();
        }
        return this.data;
    }

    loadEntity(params = {}){
        params["id"] = this.id;
        dataService.request("post", this.url + "/get", params, response => {
            this.data = JSON.parse(response);
        })
    }

    showEntity(){
        let container = this.container.find("form").eq(0);

        for(const [key, value] of Object.entries(this.data)){
            let inputElem = container.find("[name='" + key + "']");
            if (inputElem.attr("list")){
                if (inputElem.attr("data-type") !== "text"){
                    let selectedItem = $("#" + inputElem.attr("list")).find("option[data-id=" + value + "]");
                    inputElem.val(selectedItem.val()).trigger("change");
                }else{
                    inputElem.val(value).trigger("change");
                }
            } else{
                if (key === "isActive"){
                    this.activeLamp.setValue(parseInt(value) === 1);
                }
                if (key.includes("Date")){
                    inputElem.val(value);
                } else{
                    inputElem.val(value).trigger("change");
                }
            }
        }
    }

    submitForm(form){
        let result      = {};

        //id
        if (this.id !== 0){
            result["id"] = this.id;
        }

        //Rejtett input elemek
        let elements = form.find("input[data-name]");
        elements.map((index, item) => {
            let elem    = $(item);
            result[elem.attr("data-name")] = elem.attr("data-value");
        })

        //Input elemek
        elements    = form.find("input, textarea, select").filter(":not([data-name])").filter("[name]");
        elements.map((index, item) =>{
            let elem    = $(item);
            let key     = elem.attr("name");
            let val     = elem.val();

            if (!result[key]){
                if (elem.attr("type") === "checkbox"){
                    val = elem.is(":checked");
                }
                if (elem.attr("list")){
                    if (elem.attr("data-type") !== "text"){
                        let listId = elem.attr("list");
                        val = $("#" + listId + " option[value='" + val + "']").attr("data-id");
                    }
                }
                if (key.includes("[]")){
                    key = key.substr(0, key.length - 2);
                    if (result[key] === undefined){
                        result[key] = [val];
                    } else{
                        result[key].push(val);
                    }
                } else{
                    result[key] = val;
                }
            }
        })

        return result;
    }

    clearFields(){
        this.container.find("input:not([type=hidden]), textarea").val("").removeClass("error");

        //Alapértelmezett értékek beállítása
        let fieldsWithDefault = this.container.find("[data-default]");
        fieldsWithDefault.map((index, item) => {
            $(item).val($(item).attr("data-default"));
        })

        this.container.find(".dateField").val(new Date().toISOString().slice(0, 10));
    }

    onSubmitOK(id, item){}

    beforeSubmit(){}

    submit(url, data) {
        dataService.request("post", url, data, response => {
            let hasCloseModal = this.onSubmitOK(this.id, JSON.parse(response));
            if (hasCloseModal){
                modalController.close(this.name);
            }
        }, error => {
            let data = JSON.parse(error.responseText);
            for (const [field, message] of Object.entries(data)){
                $("#" + this.name + " [name=" + field + "]").addClass("error");
                notify.warning(message, 5);
            }
        });
    }
}
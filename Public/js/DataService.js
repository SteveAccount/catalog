"use strict";

class DataService {
    errorMessages = [];

    constructor() {
        this.#setErrorMessages();
    }

    request(type, url, data, success = {}, error = {}, complete = {}, async = false) {
        $.ajax({
            type: type,
            url: url,
            data: data,
            async: async,
            success: success,
            error: (jqxhr) => {
                if (jqxhr.status === 401){
                    window.location.href = "/wc/login";
                } else{
                    error(jqxhr);
                }
            },
            complete: complete
        });
    }

    getErrorMessage(code){
        return this.errorMessages[code];
    }

    #setErrorMessages(){
        this.errorMessages[403] = "Nincs jogosultságod a kért funkcióhoz.";
    }

    getCurrencies(selectElem){
        this.request("post", "/wc/finance/getCurrencies", {}, response => {
            let data = JSON.parse(response);
            selectElem.empty();
            selectElem.append("<option value='HUF' data-rate='1'>HUF</option>");
            for (const[key, value] of Object.entries(data)){
                selectElem.append("<option value='" + key + "' data-rate='" + value + "'>" + key + "</option>");
            }
        }, error => {
            notify.warning("Az árfolyamok lekérdezése sikertelen!");
            selectElem.empty();
            selectElem.append("<option value='HUF' data-rate='1'>HUF</option>");
        })
    }

    getMeters(siteId, meterType, hasAll = true){
        let data = {
            siteId:     siteId,
            meterType:  meterType,
            hasAll:     hasAll
        }

        let result = [];
        this.request("post", "/wc/maintenance/meters/getMeters", data, response => {
            result = JSON.parse(response);
        })
        return result;
    }

    fillSelect(jquerySelect, url, params, valueField, textField, hasTrigger = true, method = "post"){
        dataService.request(method, url, params, response => {
            let data = JSON.parse(response);
            jquerySelect.empty();
            data.map((item) => {
                jquerySelect.append("<option value='" + item[valueField] + "'>" + item[textField] + "</option>");
            })

            if (hasTrigger){
                jquerySelect.trigger("change");
            }
        })
    }

    fillSelect2(url, params, valueField, textField, hasTrigger = true, method = "post"){
        let result = [];

        dataService.request(method, url, params, response => {
            let data = JSON.parse(response);

            data.map((item) => {
                result.push({id: item[valueField], text: item[textField]});
            })
        })

        return result;
    }

    fillDatalist(jqueryDatalist, url, params, valueField = "id", textField = "name", method = "post"){
        dataService.request(method, url, params, response => {
            let data = JSON.parse(response);
            jqueryDatalist.empty();
            data.map((item) => {
                jqueryDatalist.append("<option data-id='" + item[valueField] + "' value='" + item[textField] + "'></option>");
            })
        })
    }
}

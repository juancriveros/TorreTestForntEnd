
$( document ).ready(function() {
    initializeJobFilters();
});

//Jobs
function searchJobFilters(){

    var name = $('#jobName').val();
    var placeBased = $('#remoteSelect').val();
    var status = $('#statusSelect').val();
    var type = $('#typeSelect').val();
    var currency = $('#currencySelect').val();
    var periodicity = $('#periodicitySelect').val();
    var amount = $('#amount').val();
    var skill = $('#skill').val();


    var url = window.location.href.split('?')[0] + '?page=1&offset=0';

    if(name != undefined && name != "")
        url += '&name=' + name

    if(placeBased != "default")
        url += '&placeBased=' + placeBased

    if(status != "default")
        url += '&status=' + status

    if(type != "default")
        url += '&type=' + type

    if(currency != "default")
        url += '&currency=' + currency

    if(periodicity != "default")
        url += '&periodicity=' + periodicity

    if(amount != undefined && amount != "")
        url += '&amount=' + amount

    if(skill != undefined && skill != "")
        url += '&skill=' + skill
    
    window.location.href = url;
}

function initializeJobFilters(){
    if(window.location.href.split('?').length > 1)
    {
        let queryParameters = window.location.href.split('?')[1].split('&');
        queryParameters.forEach(element => {
            
            let val = element.split('=')[1];
            let name = element.split('=')[0]

            if(name == "name")
                $('#jobName').val(val);

            if(name == "placeBased")
                $('#remoteSelect').val(val);

            if(name == "status")
                $('#statusSelect').val(val);

            if(name == "type")
                $('#typeSelect').val(val);

            if(name == "currency")
                $('#currencySelect').val(val);

            if(name == "periodicity")
                $('#periodicitySelect').val(val);

            if(name == "amount")
                $('#amount').val(val);

            if(name == "skill")
                $('#skill').val(val);

        });
    }
}

function resetJobFilters(){

    $('#jobName').val('');
    $('#remoteSelect').val("default");
    $('#statusSelect').val("default");
    $('#typeSelect').val("default");
    $('#currencySelect').val("default");
    $('#periodicitySelect').val("default");
    $('#amount').val('');
    $('#skill').val('');

}

function jobProfile(id){

    window.location.href = "/torre/jobprofile?Id=" + id;

}

//Users
function searchUserFilters(){

    var name = $('#jobName').val();
    var placeBased = $('#remoteSelect').val();
    var status = $('#statusSelect').val();
    var type = $('#typeSelect').val();
    var currency = $('#currencySelect').val();
    var periodicity = $('#periodicitySelect').val();
    var amount = $('#amount').val();
    var skill = $('#skill').val();


    var url = window.location.href.split('?')[0] + '?page=1&offset=0';

    if(name != undefined && name != "")
        url += '&name=' + name

    if(placeBased != "default")
        url += '&placeBased=' + placeBased

    if(status != "default")
        url += '&status=' + status

    if(type != "default")
        url += '&type=' + type

    if(currency != "default")
        url += '&currency=' + currency

    if(periodicity != "default")
        url += '&periodicity=' + periodicity

    if(amount != undefined && amount != "")
        url += '&amount=' + amount

    if(skill != undefined && skill != "")
        url += '&skill=' + skill
    
    window.location.href = url;
}

function initializeUserFilters(){
    if(window.location.href.split('?').length > 1)
    {
        let queryParameters = window.location.href.split('?')[1].split('&');
        queryParameters.forEach(element => {
            
            let val = element.split('=')[1];
            let name = element.split('=')[0]

            if(name == "name")
                $('#jobName').val(val);

            if(name == "placedBased")
                $('#remoteSelect').val(val);

            if(name == "status")
                $('#statusSelect').val(val);

            if(name == "type")
                $('#typeSelect').val(val);

            if(name == "currency")
                $('#currencySelect').val(val);

            if(name == "periodicity")
                $('#periodicitySelect').val(val);

            if(name == "amount")
                $('#amount').val(val);

            if(name == "skill")
                $('#skill').val(val);

        });
    }
}

function resetUserFilters(){

    $('#jobName').val('');
    $('#remoteSelect').val("default");
    $('#statusSelect').val("default");
    $('#typeSelect').val("default");
    $('#currencySelect').val("default");
    $('#periodicitySelect').val("default");
    $('#amount').val('');
    $('#skill').val('');

}

function userProfile(id){

    window.location.href = "/torre/userprofile?Id=" + id;

}

//General
function movePage(page, up, offset){

    var newPage = '';
    if(up)
        newPage = parseInt(page) + 1;
    else{
        if(parseInt(page) - 1 <= 0)
            newPage = 1;
        else
            newPage = parseInt(page) - 1
    }
    
    var urlArray =  window.location.href.split('?')[1].split('&');
    
    urlArray[0] = 'page=' + newPage;
    urlArray[1] = 'offset=' + offset;
    var newUrl = window.location.href.split('?')[0] + "?" + urlArray.join('&');
    console.log(newUrl);
    window.location.href = newUrl;
}



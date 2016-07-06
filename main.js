var $format = function (fmt, a) {
    var rep_fn = undefined;

    if (typeof a == "object") {
        rep_fn = function (m, k) {
            return a[k];
        }
    }
    else {
        var args = arguments;
        rep_fn = function (m, k) {
            return args[parseInt(k) + 1];
        }
    }

    return fmt.replace(/\{(\w+)\}/g, rep_fn);
}

tabInit = $(function () {
    var jsonDir = 'main.json';
    var tabdir = '.tabs';
    var tabcompdir = '.tabcomp';

    $(tabdir).html("");
    $(tabcompdir).html("");

    $.getJSON(jsonDir, function (data) {
        $(data.tabs).each(function () {
            var tab = this.name;
            $($format("<a class=\"tab-select\" onclick=\'ChangeTab\(\"{0}\"\);\'>{0}</a>", tab))
                .appendTo(tabdir);
            $($format("<div id=\"{0}\" class=\"tab-component\"> <p>{1}</p> </div>", tab, this.description))
                .appendTo(tabcompdir)
        })
    });
});

function ChangeTab(tabname) {
    var list = document.getElementsByClassName('tab-component');
    for (var i = 0; i < list.length; i++) {
        list[i].style.display = 'none';
    }
    document.getElementById(tabname).style.display = 'block';
    getUnitSales(tabname)
}

function getUnitSales(tabname) {
    return HTMLGET('http://localhost:26730/units/' + tabname);
}

function HTMLGET(url) {
    $.ajax({
        url      : url,
        dataType : "jsonp"
    });
}

function callbackUnits(json){
    document.getElementById('UnitSales').value = ('000000' + json.Units).slice(-6);
};
$(function () {
    var jsonDir = 'main.json';
    var tabdir = '.tabs';
    var tabcompdir = '.tabcomp';

    $(tabdir).html("");
    $(tabcompdir).html("");

    $.getJSON(jsonDir, function (data) {
        $(data.tabs).each(function () {
            var tab = this.name;
            tabArray.push(tab);
            $('<a href="#' + tab + '" class="tab-select" onclick="ChangeTab("' + tab + '");">' + tab + '</a>')
                .appendTo(tabdir);
            $('<div id="' + tab + '" class="tab"> <p>' +
                '商品: ' + this.productName
            + '</p> </div>').appendTo(tabcompdir)
        })
    })
});
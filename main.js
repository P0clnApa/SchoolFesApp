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

var Saves = new Object();

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
                .appendTo(tabcompdir);
            Saves[tab] = this.save;
        });
        $("<a class=\"tab-select\" onclick=\'ChangeTab\(\"Settings\"\);\'>Settings</a>").appendTo(tabdir);
        $("<div id=\"Settings\" class=\"tab-component\"> " +
            "<form name=\"SetCo\" id=\"SetCo\" style='margin: 10px; padding: 10px;'> " +
            "<input type=\"text\" id=\"CoText\"/> " +
            "<input type=\"button\" value=\"Set\" onclick=\"setCookie(\'ViewPex\', getText(\'CoText\'), 3)\"/> " +
            "<input type=\"button\" value=\"Check\" onclick=\"alert(getCookie(\'ViewPex\'))\"/> " +
            "</form> </div>")
            .appendTo(tabcompdir);
    });
});

function ChangeTab(tabname) {
    var list = document.getElementsByClassName('tab-component');
    for (var i = 0; i < list.length; i++) {
        list[i].style.display = 'none';
    }
    document.getElementById(tabname).style.display = 'block';
    document.forms.MainForm.TabName.value = tabname;
    document.forms.MainForm.style.display = ((getCookie("ViewPex").indexOf(Saves[tabname].key) !== -1) ? 'block' : 'none');
    if(tabname == "Top" || tabname == "Settings") return;
    getUnitSales(tabname);
}

function setCookie(c_name,value,expiredays){
    var path = location.pathname;
    var paths = new Array();
    paths = path.split("/");
    if(paths[paths.length-1] != ""){
        paths[paths.length-1] = "";
        path = paths.join("/");
    }
    var extime = new Date().getTime();
    var cltime = new Date(extime + (60*60*24*1000*expiredays));
    var exdate = cltime.toUTCString();
    var s="";
    s += c_name +"="+ escape(value);
    s += "; path="+ path;
    if(expiredays){
        s += "; expires=" +exdate+"; ";
    }else{
        s += "; ";
    }
    document.cookie=s;
}

function getText(compId) {
    return document.SetCo.CoText.value;
}

function getCookie(c_name){
    var st="";
    var ed="";
    if(document.cookie.length>0){
        // クッキーの値を取り出す
        st=document.cookie.indexOf(c_name + "=");
        if(st!=-1){
            st=st+c_name.length+1;
            ed=document.cookie.indexOf(";",st);
            if(ed==-1) ed=document.cookie.length;
            // 値をデコードして返す
            return unescape(document.cookie.substring(st,ed));
        }
    }
    return "";
}

function getUnitSales(tabname) {
    return HTMLGET('http://localhost:26730/school/units?group=' + tabname, function (json) {
        document.getElementById('UnitSales').value = ('0000' + json.Units).slice(-4);
    });
}

function setUnitSales() {
    var form = document.forms.MainForm;
    var name = form.TabName.value;
    var unit = form.Unit.value;
    var old = form.Old.value;
    var tasteSelect = form.Taste;
}

function HTMLGET(url, func) {
    $.ajax({
        type: 'GET',
        url: url,
        dataType: "jsonp",
        success: func
    });
}

function HTMLPOST(url) {
    $.ajax({
        type: 'POST',
        url: url
    });
}
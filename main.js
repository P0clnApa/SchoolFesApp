function ChangeTab(tabname) {
    alert(tabname);
    tabArray.each(function (index, val) {
        alert(val);
       document.getElementsById(val).style.display = 'none';
    });
    document.getElementById(tabname).style.display = 'block';
}

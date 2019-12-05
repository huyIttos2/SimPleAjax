$(document).ready(function () {
    checkUrl();// check if Url has a reference to a page and load it
    $('ul li a').click(function (e) {//traverse through all our navigation links...
        checkURL(this.hash);// and assign them a new onclik event, using the own hash as a parameter
    });
    setInterval("checkURL()",20); // check for  a change in the URL every 250ms to detect if the  history button jave been used
});
var lasturl="";
function checkURL(hash) {
    if(!hash) hash=window.location.hash;
    if(hash != lasturl){
        lasturl = hash;// updae the current hash
        loadPage(hash);
    }// if value has changed
}
function loadPage(url) {//the function that load pages via AJAX
    url=url.replace('#page','');// script the #page part of the hash and leave only the page number
    $('#loading').css('visibility','visible');// show the roating gif animation
    $.ajax({// create an ajax request to load_page.php
        type:"POST",
        url:"load_page.php",
        data:'page'+ url, // with the page number  as a parameter
        dataType:"html",//expect html return
        success:function (msg) {
            if(parseInt(msg)!=0){
                $('#pageContent').html(msg);// load the html into pageContent
                $('#loading').css('visibility','hidden'); //and hide the roating gif
            }//if no error
        }

    })
}
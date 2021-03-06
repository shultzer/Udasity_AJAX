function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $(".bgimg").remove();
    $wikiElem.text("");
    $nytElem.text("");
    var addres = $('#street').val() + ', ' + $('#city').val();

    // load streetview
    var $map = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + addres;
    $greeting.text('So, you want to live at'+addres+'?');
    $body.prepend('<img class="bgimg" src="' + $map + '">');
    //load NYT articles
    $nytHeaderElem.text('NYT articles about'+addres+'');
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "XXXXXXXXXXXX",
        'q': addres
    });
    $.getJSON( url, function( data ) {
        var items = [];
        $.each( data.response.docs, function( key, val ) {
            items.push( "<li class='article'><a href='" + val.web_url + "'>" + val.snippet + "</a><p>"+val.snippet+"</p></li>" );
        });
        $( "<ul/>", {
            "class": "article-list",
            "id": "nytimes-articles",
            html: items.join( "" )
        }).appendTo( ".nytimes-container" );
    });
    return false
};
$('#form-container').submit(loadData);

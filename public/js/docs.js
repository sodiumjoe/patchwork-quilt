$(function() {
    $('#docs_menu').collapsible({
        effect: "slide",
        initialCollapse: true
    });
});

$(function() {
	$('a.menu-parent').bind('click',function() {
        $(this).find('i').toggleClass('icon-chevron-down icon-chevron-right');
	});
});

function params(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

$(document).ready(function() {
    $('li.active').parents('li').prev().find('a.menu-parent').trigger('click');
    if(params()['q']){
        var query = params()['q'];
        $('div#search_results p#loading').show();
        var index = 0;

        var result = $.getJSON('http://844kj.api.searchify.com/v1/indexes/afdocs/search?q=' + encodeURIComponent(query) + '&fetch=title,path&snippet=text&callback=?', function(data) {
            $('div#search-results div#inner').empty();

            $.each(data.results, function(index, result) {
                $('div#search-results div#inner').append('<div class="search-result"><a href="/' + result.path + '"><h3>' + result.title + '</h3><pre><p>' + result.snippet_text + '</p></pre></a></div>');
                index++;
            });

            if(data.results.length == 0){
                $('div#search_results div#inner').append('<p>Sorry, no results for that query.</p>');
            }

            $('div#search_results p#loading').hide();
        });
    }
});

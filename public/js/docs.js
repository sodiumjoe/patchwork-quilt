$(function() {
    $('#collapse0').collapsible({
        effect: "slide",
        initialCollapse: true
    });
});

$(function() {
	$('a.menu-parent').bind('click',function() {
        $(this).find('i').toggleClass('icon-chevron-down icon-chevron-right');
	});
});

$(document).ready(function(){
    $('li.active').parents('li').prev().find('a.menu-parent').trigger('click');
});

function codeSelector(num) {
    return 'code[num="' + num + '"]' ;
}

var timeoutId = null;

$(window).load(function() {
    $(codeSelector(0)).addClass('current-frame');

    $('#play').click(function() {

	clearTimeout(timeoutId);

	var total = $('revisions').attr('count');

	$(codeSelector(0)).addClass('current-frame');

	function showFrame(num, total) {
	    $('code').removeClass('current-frame');
	    $(codeSelector(num)).addClass('current-frame');
	    
	    if (num < total - 1) {
		timeoutId = setTimeout(function() {
		    showFrame(num + 1, total)
		}, 500);
	    }
	}

	showFrame(0, total);
    })
});

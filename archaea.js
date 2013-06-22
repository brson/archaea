function codeSelector(num) {
    return 'code[num="' + num + '"]' ;
}

$(window).load(function() {
    var total = $('revisions').attr('count');
    var timeoutId = null;
    var mode = "start";
    var currentFrame = 0;
    var delayMs = 500;

    function setFrame(num) {
        currentFrame = num;
	$('code').removeClass('current-frame');
	$(codeSelector(currentFrame)).addClass('current-frame');

        var progress = currentFrame + "/" + total;
        var date = $(codeSelector(currentFrame)).attr('date');
        var desc = $(codeSelector(currentFrame)).attr('desc');

        var status = progress + " " + date + " " + desc;
        
        $('#status').text(status);
    }

    function advance() {
        if (currentFrame + 1 == total) {
            return;
        }
        setFrame(currentFrame + 1);
    }

    function retreat() {
        if (currentFrame == 0) {
            return;
        }
        setFrame(currentFrame - 1);
    }

    function start() {
        $('#action').removeClass('start');
        $('#action').addClass('stop');
        $('#back').attr('disabled', 'disabled');
        $('#forward').attr('disabled', 'disabled');
        $('#back').attr('disabled', 'disabled');
        $('#reset').attr('disabled', 'disabled');
        mode = "stop";
    }

    function stop() {
        $('#action').removeClass('stop');
        $('#action').addClass('start');
        $('#back').removeAttr('disabled');
        $('#forward').removeAttr('disabled');
        $('#reset').removeAttr('disabled');
        mode = "start";
    }

    function reset() {
        setFrame(0);
    }

    setFrame(0);

    $('#action').click(function() {

        if (mode == "start") {
            start();
        } else {
            stop();
	    clearTimeout(timeoutId);
            return;
        }

	function showNextFrame() {
            if (currentFrame + 1 == total) {
                stop();
                return;
            }
	    timeoutId = setTimeout(function() {
                advance();
                showNextFrame();
	    }, delayMs);
	}

	showNextFrame();
    })

    $('#reset').click(function() {
        reset();
    });

    $('#back').click(function() {
        retreat();
    });

    $('#forward').click(function() {
        advance();
    });

});

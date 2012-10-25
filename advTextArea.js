function advTextArea(saveFunction) {

    $(document).ready(function() {

        $('.advTextArea').blur(function() {
            advTextAreaBlur($(this)[0]);
        });

        $('.advTextArea').focus(function() {
            advTextAreaFocus($(this)[0]);
        });

        $('.advTextArea').keydown(function() {
            advTextAreaChange($(this)[0]);
        });

        $('.advTextArea').keyup(function(event) {

            switch (event.which) {
            case 13:
                advTextAreaAddLine($(this)[0]);
                break;
            case 27:
                advTextAreaReset($(this)[0]);
                break;
            }
            advTextAreaChange($(this)[0])
        });

        $('.advTextArea').keypress(function() {
            advTextAreaChange($(this)[0]);
        });

        advTextAreaSetMinSize();
    });
    
    function advTextAreaAddLine(advTextArea){

        var rows = advTextArea.value.split('\n').length;
        var lh = parseInt($('#'+advTextArea.id).css('lineHeight').replace('px',''));
        $('#'+advTextArea.id).css('height',rows*lh+'px');
       /* 
        
       var rows = parseInt($('#'+advTextArea.id).attr('rows'));
       $('#'+advTextArea.id).attr('rows',rows+1);
        var lh = parseInt($('#'+advTextArea.id).css('lineHeight').replace('px',''));
        var h = parseInt($('#'+advTextArea.id).css('height').replace('px',''));
        $('#'+advTextArea.id).css('height',h+lh+'px'); */
    }
    
    function advTextAreaRemoveLine(advTextArea){
        var lh = parseInt($('#'+advTextArea.id).css('lineHeight').replace('px',''));
        var h = parseInt($('#'+advTextArea.id).css('height').replace('px',''));
        if (h > lh){
            $('#'+advTextArea.id).css('height',h-lh+'px'); 
        }
    }

    function advTextAreaFocus(advTextArea) {
        if (advTextArea.value == advTextArea.defaultValue) {
            $('#advTextAreaBackground' + advTextArea.id).html(advTextArea.defaultValue);
            advTextArea.value = '';
        }
    }

    function advTextAreaBlur(advTextArea) {
        if (advTextArea.value == '') {
            advTextArea.value = advTextArea.defaultValue;
        }
    }

    function advTextAreaChange(advTextArea) {
       /* 
        if (advTextArea.value == '') {
            $('#advTextAreaBackground' + advTextArea.id).html(advTextArea.defaultValue);
            newWidth = advTextArea.defaultValue.length * (8) + 20 + 'px';
            
            $('#advTextAreaDiv' + advTextArea.id).animate({width: newWidth},2);
        } else {
            $('#advTextAreaBackground' + advTextArea.id).html('');
            newWidth = advTextArea.value.length * (8) + 20 + 'px';
            $('#advTextAreaDiv' + advTextArea.id).animate({width: newWidth},2);
        }
        */
        
        // !important! sizing of the advTextArea
        var rows = advTextArea.value.split('\n');
        var lh = parseInt($('#'+advTextArea.id).css('lineHeight').replace('px',''));
        $('#'+advTextArea.id).css('height',rows.length*lh+'px');
        
        var c = 0;
        for (i in rows){
            if (c < rows[i].length){
                c = rows[i].length;
            }
        }
        
        $('#'+advTextArea.id).css('width',c*8+20+'px');
    }

    function advTextAreaReset(advTextArea) {
        advTextArea.value = '';
        advTextArea.blur();
    }

    function advTextAreaSetMinSize() {
        $('.advTextAreaDiv').css(
                'width',
                function() {
                    return $(this).children('.advTextArea')[0].defaultValue.length
                            * 8 + 20 + 'px';
                });
        $('.advTextAreaDiv').css(
                'min-width',
                function() {
                    return $(this).children('.advTextArea')[0].defaultValue.length
                            * 8 + 20 + 'px';
                });

    }

    function saveAdvTextArea(advTextArea) {
        if (advTextArea.value != advTextArea.defaultValue) {
            advTextArea.defaultValue = advTextArea.value;
            advTextAreaSetMinSize();
            saveFunction(advTextArea);
        }
        advTextArea.blur();
    }
}
function advTextArea(saveFunction) {

    $(document).ready(function() {
        
       

        $('.advTextArea').blur(function() {
            advTextAreaBlur($(this)[0]);
        });

        $('.advTextArea').focus(function() {
            advTextAreaFocus($(this)[0]);
        });

        $('.advTextArea').keydown(function(event) {
            if (event.which == 13) {
                advTextAreaChangeHeight($(this)[0],event);               
            }    
            advTextAreaChangeWidth($(this)[0]);
            advTextAreaChange($(this)[0]);
        });

        $('.advTextArea').keyup(function(event) {
            if (event.which == 8 || event.which == 46) {
                advTextAreaChangeHeight($(this)[0],event);              
            }
            if (event.which == 27) {
                advTextAreaReset($(this)[0]);
            }
            advTextAreaChange($(this)[0]);
        });
        advTextAreaSetMinSize();
    });
    
    function advTextAreaChangeWidth(advTextArea){
        var rows = advTextArea.value.split('\n');
        var c = 0;
        for (i in rows){
            if (c < rows[i].length){
                c = rows[i].length;
            }
        }
        $('#'+advTextArea.id).animate({'width':c*8+30+'px'},2);
        return c*8+30;
    }
    
    function advTextAreaChangeHeight(advTextArea,event){
        var r = 0;
        if (event != null && event.which == 13){ r = 1;}
        var rows = advTextArea.value.split('\n');
        var lh = parseInt($('#'+advTextArea.id).css('lineHeight').replace('px',''));
        $('#'+advTextArea.id).animate({'height':(rows.length+r)*lh+'px'},2);
        return rows.length*lh;
    }
    
    function advTextAreaFocus(advTextArea) {
        if (advTextArea.value == $('#advTextAreaBackground'+advTextArea.id).html().replace('<br>', '\n')) {
           // $('#advTextAreaBackground' + advTextArea.id).html(advTextArea.defaultValue);
            advTextArea.value = '';
            $('#advTextAreaBackground'+advTextArea.id).show();
        }
    }
    
    function advTextAreaChange(advTextArea) {
        if (advTextArea.value != $('#advTextAreaBackground'+advTextArea.id).html().replace('<br>', '\n')) {
            $('#advTextAreaBackground'+advTextArea.id).hide();
        }
        if (advTextArea.value == '') {
            advTextArea.value = $('#advTextAreaBackground'+advTextArea.id).html().replace('<br>', '\n');
            $('#advTextAreaBackground'+advTextArea.id).show();
        }
    }

    function advTextAreaBlur(advTextArea) {
        if (advTextArea.value == '') {
            advTextArea.value = $('#advTextAreaBackground'+advTextArea.id).html().replace('<br>', '\n');
            $('#advTextAreaBackground'+advTextArea.id).show();
            advTextAreaSetMinSize();
        }
    }
     
    function advTextAreaReset(advTextArea) {
        advTextArea.value = $('#advTextAreaBackground'+advTextArea.id).html().replace('<br>','\n');
        advTextAreaSetMinSize();
        advTextArea.blur();
    }

    function advTextAreaSetMinSize() {
        $('.advTextAreaDiv').css(
                'width',
                function() {
                    return advTextAreaChangeWidth($(this).children('.advTextArea')[0])+'px';
                 //   return $(this).children('.advTextArea')[0].defaultValue.length
                 //           * 8 + 30 + 'px';
                });
        $('.advTextAreaDiv').css(
                'min-width',
                function() {
                    return advTextAreaChangeWidth($(this).children('.advTextArea')[0])+'px';
                   // return $(this).children('.advTextArea')[0].defaultValue.length
                  //          * 8 + 30 + 'px';
                });
        $('.advTextAreaDiv').css(
                'height',
                function() {
                    return advTextAreaChangeHeight($(this).children('.advTextArea')[0])+'px';
                 //   return $(this).children('.advTextArea')[0].defaultValue.length
                 //           * 8 + 30 + 'px';
                });
        $('.advTextAreaDiv').css(
                'min-height',
                function() {
                    return advTextAreaChangeHeight($(this).children('.advTextArea')[0])+'px';
                   // return $(this).children('.advTextArea')[0].defaultValue.length
                  //          * 8 + 30 + 'px';
                });

    }

    function saveAdvTextArea(advTextArea) {
        $('#advTextAreaBackground'+advTextArea.id).html($('#advTextArea'+advTextArea.id).val().replace('\n','<br>'));
        advTextAreaSetMinSize();
        saveFunction(advTextArea);
        advTextArea.blur();
    }
}
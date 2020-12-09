$('tr:not(.header)').css('display', 'none');

$('button').click( function() {
    
    if(!$(this).hasClass('is-selected')) {
        $('button').removeClass('is-primary is-selected');
        $(this).addClass('is-primary is-selected');
        var mat = $(this).val();
    }

    $('tr:not(.header)').css('display', 'none');
    $(`td[data-label=mat]:contains("${mat}")`).parent().css('display', 'table-row');

})


// "Other" title for tournament
// let selectTitle = $('select[name=title]');
$('select[name=title]').click(() => {
    console.log('I am here');
    validate();
    
    if ($('select[name=title]').val() === 'Other') {
        $('[name=otherTitle]').css('display', 'inline');
        $('[name=otherTitleLabel]').css('display', 'inline');
    } else {
        $('[name=otherTitle]').css('display', 'none');
        $('[name=otherTitleLabel]').css('display', 'none');
    }
})

// 'Other' location
let selectLocation = $('select[name=location]');
selectLocation.click( () => {
    validate();

    if ($('select[name=location]').val() === 'Other') {
        $('[name=otherLocation]').css('display', 'inline');
        $('[name=otherLocationLabel]').css('display', 'inline');
    } else {
        $('[name=otherLocation]').css('display', 'none');
        $('[name=otherLocationLabel]').css('display', 'none');
    }
})

$('input[type=text]').keydown( () => {
    validate()
})

function validate() {
    let check = 
        (
            $('select[name=title]').val() === ''
            || $('select[name=title]').val() === 'Other' && $('[name=otherTitle]').val() === ''
        ) || (
            $('select[name=location]').val() === ''
            || $('select[name=location]').val() === 'Other' && $('[name=otherLocation]').val() === ''
        );
    
        console.log(check);
    
    if (check) {
        $('input[type=submit]').css('display', 'none');
    } else {
        $('input[type=submit]').css('display', 'inline');
    }
}

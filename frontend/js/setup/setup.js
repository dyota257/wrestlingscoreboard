// "Other" title for tournament
let selectTitle = document.getElementsByTagName('select')[0];
selectTitle.addEventListener('click', () => {
    val();

    if (document.getElementsByTagName('select')[0].value === 'Other') {
        document.getElementsByName('otherTitle')[0].style.visibility = 'visible';
        document.getElementsByName('otherTitleLabel')[0].style.visibility = 'visible';
    } else {
        document.getElementsByName('otherTitle')[0].style.visibility = 'hidden';
        document.getElementsByName('otherTitleLabel')[0].style.visibility = 'hidden';
    }
})

// 'Other' location
let selectLocation = document.getElementsByTagName('select')[1];
selectLocation.addEventListener('click', () => {
    val()

    if (document.getElementsByTagName('select')[1].value === 'Other') {
        document.getElementsByName('otherLocation')[0].style.visibility = 'visible';
        document.getElementsByName('otherLocationLabel')[0].style.visibility = 'visible';
    } else {
        document.getElementsByName('otherLocation')[0].style.visibility = 'hidden';
        document.getElementsByName('otherLocationLabel')[0].style.visibility = 'hidden';
    }
})

let textBoxes = document.querySelectorAll('input[type=text]')
for (var i=0; i<= textBoxes.length; i++) {
    textBoxes[i].addEventListener('keydown', () => {
        val()
    })
}


function val() {

    let check = 
        (
            document.getElementsByTagName('select')[0].value === ''
            || document.getElementsByTagName('select')[0].value === 'Other' && document.getElementsByName('otherTitle')[0].value === ''
        ) || (
            document.getElementsByTagName('select')[1].value === ''
            || document.getElementsByTagName('select')[1].value === 'Other' && document.getElementsByName('otherLocation')[0] === ''
        );
    
        console.log(check);
    
    if (check) {
        document.querySelectorAll('input[type=submit]')[0].style.visibility = 'hidden'
    } else {
        document.querySelectorAll('input[type=submit]')[0].style.visibility = 'visible'
    }
}
function displayFlex(target) {$(target).css("display", "flex")}

function displayNone(target) {$(target).css("display", "none")}

function hide(target) {$(target).css('visibility', 'hidden');}

function unhide(target) {$(target).css('visibility', 'visible');}

function underline(target) {$(target).css("text-decoration", "underline")}

function noDecorate(target) {
    $(target).css("text-decoration", "")
}

function proper(text) {
    let first = text.slice(0,1).toUpperCase()
    let rest = text.slice(1,text.length)
    return first+rest
}

function disable(target) {$(target).prop("disabled", true)}

function undisable(target) {$(target).prop("disabled", false)}

function log(message) {console.log(message);}
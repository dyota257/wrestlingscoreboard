module.exports = dateFormat;

function dateFormat(x) {
    const days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let day = days[x.getDay()];
    let date = x.getDate();
    let month = months[x.getMonth()]
    let year = x.getFullYear();

    return `${day}, ${date} ${month}, ${year}`

}
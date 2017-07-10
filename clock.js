function clock() {
    var date = new Date()
    console.log(date)
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()

    if (hours > 12) {
        hours -= 12
    }

    var secondDeg = seconds / 60 * 360
    var minuteDeg = (minutes * 60 + seconds) / 3600 * 360
    var hourDeg = (hours * 3600 + minutes * 60 + seconds) / (12 * 3600) * 360

    console.log(secondDeg)
    console.log(minuteDeg)
    console.log(hourDeg)

    document.querySelector('.secondHand').style.transform = `rotate(${-90 + secondDeg}deg)`
    document.querySelector('.hourHand').style.transform = `rotate(${-90 + hourDeg}deg)`
    document.querySelector('.minuteHand').style.transform = `rotate(${-90 + minuteDeg}deg)`
}

clock()

setInterval(function () {
    clock()
}, 1000)
var moment = require('moment');

var apextime = function (_, channel) {
    var rotationStart = moment.utc('2020-12-14T21:00:00-00:00').clone();
    var currentTime = moment.utc().clone();

    var t1 = rotationStart.toDate();
    var t2 = currentTime.toDate();
    var t3 = (t2.getTime() - t1.getTime()) / (1000 * 60 * 60);
    var t4 = t3 % 37;

    // Duration of each map in hours. Even numbers are always Olympus, odd are World's Edge.
    var rota = [
        1.5,
        1.5,
        1,
        1,
        1,
        1,
        2,
        2,
        1.5,
        1.5,
        2,
        2,
        1.5,
        1.5,
        2,
        2,
        1,
        1,
        1.5,
        1.5,
        1.5,
        1.5,
        2,
        2

    ]

    var rotasum = 0;
    for (let i = 0; i < rota.length; ++i) {
        var lowerbound = rotasum;
        var upperbound = rotasum + rota[i];
        if (lowerbound < t4 && t4 < upperbound) {
            let timeremaining = upperbound - t4;
            let hours = Math.floor(timeremaining);
            let minutes = Math.floor(timeremaining % 1 * 60);
            let trstring = hours + ":" + minutes;
            if (i % 2 === 0) {
                channel.send("Current Map: Olympus   Time Remaining: " + trstring)
            }
            else {
                channel.send("Current Map: World's Edge   Time Remaining: " + trstring)
            }
        }
        rotasum += rota[i]
    }
}

module.exports = apextime;

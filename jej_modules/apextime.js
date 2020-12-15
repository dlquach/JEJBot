var apextime = function (client, channel) {
    var t1 = new Date('December 14, 2020 13:00:00');
    var t2 = new Date();
    var t3 = (t2.getTime() - t1.getTime()) / (1000 * 60 * 60);
    var time = t2.getHours() + ":" + t2.getMinutes() + ":" + t2.getSeconds();
    var t4 = t3 % 37;

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
    for (let i=0; i<rota.length; ++i){
        var lowerbound = rotasum;
        var upperbound = rotasum + rota[i];
        if (lowerbound < t4 && t4 < upperbound ){
            let timeremaining = upperbound-t4;
            let hours = Math.floor(timeremaining);
            let minutes = Math.floor (timeremaining%1 * 60);
            let trstring = hours + ":" + minutes; 
            if(i%2 === 0){
                channel.send("Current Map: Olympoos   Time Remaining: " + trstring)
            }
            else {
                channel.send("Current Map: shit map   Time Remaining: " + trstring)
            }
        }
        rotasum += rota[i]
    }

    // if (t4 < 1.5) {
    //     channel.send("Olypmpoos");
    // } else if (1.5 < t4 && t4 < 3) {
    //     channel.send("Worlds Edge");
    // } else if (3 < t4 && t4 < 4) {
    //     channel.send("Olypmpoos");
    // } else if (4 < t4 && t4 < 5) {
    //     channel.send("Worlds Edge");
    // } else if (5 < t4 && t4 < 6) {
    //     channel.send("Olypmpoos");
    // } else if (6 < t4 && t4 < 7) {
    //     channel.send("Worlds Edge");
    // } else if (7 < t4 && t4 < 9) {
    //     channel.send("Olypmpoos");
    // } else if (9 < t4 && t4 < 11) {
    //     channel.send("Worlds Edge");
    // } else if (11 < t4 && t4 < 12.5) {
    //     channel.send("Olypmpoos");
    // } else if (12.5 < t4 && t4 < 14) {
    //     channel.send("Worlds Edge");
    // } else if (14 < t4 && t4 < 16) {
    //     channel.send("Olypmpoos");
    // } else if (16 < t4 && t4 < 18) {
    //     channel.send("Worlds Edge");
    // } else if (18 < t4 && t4 < 19.5) {
    //     channel.send("Olypmpoos");
    // } else if (19.5 < t4 && t4 < 21) {
    //     channel.send("Worlds Edge");
    // } else if (21 < t4 && t4 < 23) {
    //     channel.send("Olypmpoos");
    // } else if (23 < t4 && t4 < 25) {
    //     channel.send("Worlds Edge");
    // } else if (25 < t4 && t4 < 26) {
    //     channel.send("Olypmpoos");
    // } else if (26 < t4 && t4 < 27) {
    //     channel.send("Worlds Edge");
    // } else if (27 < t4 && t4 < 28.5) {
    //     channel.send("Olypmpoos");
    // } else if (28.5 < t4 && t4 < 30) {
    //     channel.send("Worlds Edge");
    // } else if (30 < t4 && t4 < 31.5) {
    //     channel.send("Olypmpoos");
    // } else if (31.5 < t4 && t4 < 33) {
    //     channel.send("Worlds Edge");
    // } else if (33 < t4 && t4 < 35) {
    //     channel.send("Olypmpoos");
    // } else if (35 < t4 && t4 < 37) {
    //     channel.send("Worlds Edge");
    // } else {
    //     channel.send("dead")
    // }
}

module.exports = apextime;

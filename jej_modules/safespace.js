
var generateBox = function (inputString) {
    // Half of the width of the safe space
    var space = 18;
    var leftPaddingAmount = space - Math.ceil(inputString.length/2.0)
    var rightPaddingAmount = space - Math.floor(inputString.length/2.0)

    if (leftPaddingAmount <= 1 || rightPaddingAmount <= 1) {
        var leftPad = new Array(space).join(" ");
        var rightPad = new Array(space).join(" ");
        var input = leftPad + rightPad;
    }
    else {
        var leftPad = new Array(leftPaddingAmount).join(" ");
        var rightPad = new Array(rightPaddingAmount).join(" ");
        var input = leftPad + inputString + rightPad;
    }

    var safespace = "```\nSAFESPACESAFESPACESAFESPACESAFESPACE\nA                                  C\nF                                  A\nE                                  P\nS" + input + "S\nP                                  E\nA                                  F\nC                                  A\nECAPSEFASECAPSEFASECAPSEFASECAPSEFAS```";

    return safespace;
}

var safespaceHandler = function (client, channel, content) {
    if (!content)
        content = " ";
    client.sendMessage(channel, generateBox(content));
}

module.exports = safespaceHandler;

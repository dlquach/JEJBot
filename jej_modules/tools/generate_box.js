"use strict";

function basicBox(inputString) {
    // Half of the width of the safe space
    var space = 18;
    var leftPaddingAmount = space - Math.ceil(inputString.length/2.0)
    var rightPaddingAmount = space - Math.floor(inputString.length/2.0)

    var leftPad = new Array(leftPaddingAmount).join(" ");
    var rightPad = new Array(rightPaddingAmount).join(" ");
    var input = leftPad + inputString + rightPad;
 
    var safespace = "```\nSAFESPACESAFESPACESAFESPACESAFESPACE\nA                                  C\nF                                  A\nE                                  P\nS" + input + "S\nP                                  E\nA                                  F\nC                                  A\nECAPSEFASECAPSEFASECAPSEFASECAPSEFAS```";

    return safespace;
}

function expandBox(inputString) {
    var repeatString = "SAFESPACE";
    // The number of times SAFESPACE is to be repeated. The +4 is to compensate for the left S with one space, and the right S with one space.
    var repeatCount = Math.ceil((inputString.length + 4) / repeatString.length);

    var row = repeatString.repeat(repeatCount);
    
    // The number of spaces
    var rowCount = row.length
    var spaces = (" ").repeat(rowCount - 2);


    var leftSpaceCount = Math.floor(rowCount / 2) - Math.ceil(inputString.length / 2);
    var rightSpaceCount = (rowCount - 2) - leftSpaceCount - inputString.length;

    var leftSpaces = (" ").repeat(leftSpaceCount);
    var rightSpaces = (" ").repeat(rightSpaceCount);


    // Ticks to open quote box.
    var safespace = "```\n";

    // Generate box
    safespace += `${row}\n`;
    safespace += `A${spaces}C\n`;
    safespace += `F${spaces}A\n`;
    safespace += `E${spaces}P\n`;

    safespace += `S${leftSpaces}${inputString}${rightSpaces}S\n`;

    safespace += `P${spaces}E\n`;
    safespace += `A${spaces}F\n`;
    safespace += `C${spaces}A\n`;

    safespace += `${row.split('').reverse().join('')}`;

    // Ticks to close quote box.
    safespace += "```";

    return safespace;
}

var generateBox = function (inputString) {

    if (inputString.length < 33) {
        return basicBox(inputString);
    } else {
        return expandBox(inputString);
    }
}

module.exports = generateBox;

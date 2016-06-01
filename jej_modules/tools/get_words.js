"use strict";

var wordCount = function(messages) {
    for (message in messages) {
        console.log(message.cleanContent);
    }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRange = void 0;
var getRange = function (range) {
    if (range.includes('-') === false)
        throw new Error('Invalid IP Range, e.g(192.168.1.1-254)');
    if (!range)
        throw new Error('IP Range cannot be null, e.g(192.168.1.1-254)');
    var array = [];
    var network = range.split('-')[0];
    var max = range.split('-')[1];
    if (Number(max) > 255)
        throw new Error('Invalid IP Range, e.g(192.168.1.1-254)');
    var min = network.split('.')[3];
    network = network.replace(new RegExp(min + '$'), '');
    for (var i = Number(min); i <= Number(max); i++) {
        var node = network.concat(i.toString());
        array.push(node);
    }
    return array;
};
exports.getRange = getRange;

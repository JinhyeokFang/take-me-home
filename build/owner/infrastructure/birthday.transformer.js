"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirthdayTransformer = void 0;
var BirthdayTransformer = /** @class */ (function () {
    function BirthdayTransformer() {
    }
    // 0000-00-00
    BirthdayTransformer.prototype.to = function (value) {
        var yearString = value.year.toString();
        var monthString = this.zeroFill(value.month.toString(), 2);
        var dayString = this.zeroFill(value.day.toString(), 2);
        return "".concat(yearString, "-").concat(monthString, "-").concat(dayString);
    };
    BirthdayTransformer.prototype.from = function (value) {
        if (value == null) {
            return null;
        }
        var splitedStrings = value.split('-');
        return {
            year: parseInt(splitedStrings[0]),
            month: parseInt(splitedStrings[1]),
            day: parseInt(splitedStrings[2]),
        };
    };
    BirthdayTransformer.prototype.zeroFill = function (str, length) {
        var zeroStringLength = str.length - length;
        if (zeroStringLength < 0) {
            return str;
        }
        var zeroString = '0'.repeat(zeroStringLength);
        return zeroString + str;
    };
    return BirthdayTransformer;
}());
exports.BirthdayTransformer = BirthdayTransformer;
//# sourceMappingURL=birthday.transformer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pet = void 0;
var crypto_1 = require("crypto");
var Pet = /** @class */ (function () {
    function Pet(information, id) {
        this.information = information;
        this.id = id || (0, crypto_1.randomUUID)();
    }
    return Pet;
}());
exports.Pet = Pet;
//# sourceMappingURL=pet.js.map
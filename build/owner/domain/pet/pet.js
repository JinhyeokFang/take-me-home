"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pet = void 0;
var crypto_1 = require("crypto");
var gender_1 = require("./information/gender");
var species_1 = require("./information/species");
var Pet = /** @class */ (function () {
    function Pet(information, id) {
        if (id === void 0) { id = (0, crypto_1.randomUUID)(); }
        this.information = {
            name: 'name',
            age: 0,
            species: species_1.Species.DOG,
            birthday: {
                year: 2020,
                month: 1,
                day: 1,
            },
            gender: gender_1.Gender.MALE,
        };
        this.information = information || this.information;
        this.id = id;
    }
    return Pet;
}());
exports.Pet = Pet;
//# sourceMappingURL=pet.js.map
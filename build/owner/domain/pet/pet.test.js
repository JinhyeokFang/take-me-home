"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gender_1 = require("./information/gender");
var species_1 = require("./information/species");
var pet_1 = require("./pet");
describe('Pet', function () {
    it('Pet.information', function () {
        var pet = new pet_1.Pet();
        expect(pet.information).toStrictEqual({
            name: 'name',
            age: 0,
            species: species_1.Species.DOG,
            birthday: {
                year: 2020,
                month: 1,
                day: 1,
            },
            gender: gender_1.Gender.MALE,
        });
        expect(pet.id).toBeDefined();
    });
});
//# sourceMappingURL=pet.test.js.map
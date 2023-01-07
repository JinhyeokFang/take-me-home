"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pet_1 = require("./pet");
var test_dummy_information_1 = require("./information/test-dummy-information");
describe('Pet', function () {
    var PET_INFORMATION = test_dummy_information_1.DUMMY_INFORMATION;
    it('Pet.information', function () {
        var pet = new pet_1.Pet(PET_INFORMATION);
        expect(pet.information).toStrictEqual(PET_INFORMATION);
        expect(pet.id).toBeDefined();
    });
});
//# sourceMappingURL=pet.test.js.map
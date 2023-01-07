"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pet_1 = require("./pet/pet");
var owner_1 = require("./owner");
var test_dummy_information_1 = require("./pet/information/test-dummy-information");
var owner_type_1 = require("./owner-type");
describe('Owner', function () {
    var PET_INFORMATION = test_dummy_information_1.DUMMY_INFORMATION;
    it('Owner.adoptPet(Pet)', function () {
        var owner = new owner_1.Owner();
        var pet = new pet_1.Pet(PET_INFORMATION);
        owner.adoptPet(pet);
        var hasPet = owner.hasPet(pet);
        expect(hasPet).toBe(true);
    });
    it('Owner.id', function () {
        var owner = new owner_1.Owner();
        var anotherOwner = new owner_1.Owner();
        var isSameId = owner.id === anotherOwner.id;
        expect(isSameId).toBe(false);
    });
    it('Owner.type', function () {
        var individual = new owner_1.Owner(owner_type_1.OwnerType.INDIVIDUAL);
        var shelter = new owner_1.Owner(owner_type_1.OwnerType.SHELTER);
        expect(individual.type).not.toBe(shelter.type);
    });
});
//# sourceMappingURL=owner.test.js.map
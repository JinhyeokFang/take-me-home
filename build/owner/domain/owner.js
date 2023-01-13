"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Owner = void 0;
var crypto_1 = require("crypto");
var Owner = /** @class */ (function () {
    function Owner(type, parameters) {
        this.pets = [];
        this.type = type;
        this.pets = parameters.pets || [];
        this.id = parameters.id || (0, crypto_1.randomUUID)();
        this.data = parameters.data;
    }
    Owner.prototype.adoptPet = function (pet, owner) {
        if (!owner.hasPet(pet.id))
            throw new Error("Owner does not have the pet that id is ".concat(pet.id));
        owner.removePet(pet.id);
        this.pets.push(pet);
    };
    Owner.prototype.getPetIndex = function (petId) {
        var index = this.pets.findIndex(function (pet) { return pet.id === petId; });
        return index === -1 ? null : index;
    };
    Owner.prototype.removePet = function (petId) {
        var petIndex = this.getPetIndex(petId);
        this.pets.splice(petIndex, 1);
    };
    Owner.prototype.hasPet = function (petId) {
        return this.getPetIndex(petId) !== null;
    };
    Owner.prototype.getPetLists = function () {
        return this.pets;
    };
    return Owner;
}());
exports.Owner = Owner;
//# sourceMappingURL=owner.js.map
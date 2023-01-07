"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Owner = void 0;
var crypto_1 = require("crypto");
var owner_type_1 = require("./owner-type");
var Owner = /** @class */ (function () {
    function Owner(type, id) {
        if (type === void 0) { type = owner_type_1.OwnerType.INDIVIDUAL; }
        if (id === void 0) { id = (0, crypto_1.randomUUID)(); }
        this.pets = [];
        this.type = type;
        this.id = id;
    }
    Owner.prototype.adoptPet = function (pet) {
        this.pets.push(pet);
    };
    Owner.prototype.hasPet = function (anotherPet) {
        var pet = this.pets.find(function (pet) { return pet.id === anotherPet.id; });
        return pet !== undefined;
    };
    Owner.prototype.getPetLists = function () {
        return this.pets;
    };
    return Owner;
}());
exports.Owner = Owner;
//# sourceMappingURL=owner.js.map
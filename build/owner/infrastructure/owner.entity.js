"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerEntity = void 0;
var typeorm_1 = require("typeorm");
var owner_1 = require("../domain/owner");
var owner_type_1 = require("../domain/owner-type");
var pet_entity_1 = require("./pet.entity");
var OwnerEntity = /** @class */ (function () {
    function OwnerEntity() {
    }
    OwnerEntity_1 = OwnerEntity;
    OwnerEntity.create = function (owner) {
        var ownerEntity = new OwnerEntity_1();
        ownerEntity.id = owner.id;
        ownerEntity.pets = owner.getPetLists().map(function (pet) { return pet_entity_1.PetEntity.create(pet); });
        ownerEntity.type = owner.type;
        return ownerEntity;
    };
    OwnerEntity.toDomain = function (ownerEntity) {
        var id = ownerEntity.id;
        var owner = new owner_1.Owner(ownerEntity.type, id);
        if (ownerEntity.pets)
            ownerEntity.pets.forEach(function (petEntity) {
                var pet = pet_entity_1.PetEntity.toDomain(petEntity);
                owner.adoptPet(pet);
            });
        return owner;
    };
    var OwnerEntity_1;
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], OwnerEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return pet_entity_1.PetEntity; }, function (pet) { return pet.owner; }, {
            eager: true,
            cascade: ['insert', 'update'],
        }),
        __metadata("design:type", Array)
    ], OwnerEntity.prototype, "pets", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: owner_type_1.OwnerType,
            default: owner_type_1.OwnerType.INDIVIDUAL,
        }),
        __metadata("design:type", Number)
    ], OwnerEntity.prototype, "type", void 0);
    OwnerEntity = OwnerEntity_1 = __decorate([
        (0, typeorm_1.Entity)()
    ], OwnerEntity);
    return OwnerEntity;
}());
exports.OwnerEntity = OwnerEntity;
//# sourceMappingURL=owner.entity.js.map
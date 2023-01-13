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
exports.PetEntity = void 0;
var typeorm_1 = require("typeorm");
var gender_1 = require("../domain/pet/information/gender");
var species_1 = require("../domain/pet/information/species");
var pet_1 = require("../domain/pet/pet");
var birthday_transformer_1 = require("./birthday.transformer");
var owner_entity_1 = require("./owner.entity");
var PetEntity = /** @class */ (function () {
    function PetEntity() {
    }
    PetEntity_1 = PetEntity;
    PetEntity.create = function (pet) {
        var petEntity = new PetEntity_1();
        var birthday = new Date();
        birthday.setFullYear(pet.information.birthday.year);
        birthday.setMonth(pet.information.birthday.month - 1);
        birthday.setDate(pet.information.birthday.day);
        petEntity.name = pet.information.name;
        petEntity.age = pet.information.age;
        petEntity.gender = pet.information.gender;
        petEntity.species = pet.information.species;
        petEntity.birthday = pet.information.birthday;
        petEntity.id = pet.id;
        return petEntity;
    };
    PetEntity.toDomain = function (petEntity) {
        var petInformation = {
            name: petEntity.name,
            age: petEntity.age,
            gender: petEntity.gender,
            species: petEntity.species,
            birthday: petEntity.birthday,
        };
        var pet = new pet_1.Pet(petInformation, petEntity.id);
        return pet;
    };
    var PetEntity_1;
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], PetEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            default: '',
        }),
        __metadata("design:type", String)
    ], PetEntity.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            default: 0,
        }),
        __metadata("design:type", Number)
    ], PetEntity.prototype, "age", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: gender_1.Gender,
            default: gender_1.Gender.MALE,
        }),
        __metadata("design:type", Number)
    ], PetEntity.prototype, "gender", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: species_1.Species,
            default: species_1.Species.DOG,
        }),
        __metadata("design:type", Number)
    ], PetEntity.prototype, "species", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'varchar',
            transformer: [new birthday_transformer_1.BirthdayTransformer()],
        }),
        __metadata("design:type", Object)
    ], PetEntity.prototype, "birthday", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return owner_entity_1.OwnerEntity; }, function (owner) { return owner.pets; }),
        (0, typeorm_1.JoinColumn)([{ name: 'owner_id', referencedColumnName: 'id' }]),
        __metadata("design:type", owner_entity_1.OwnerEntity)
    ], PetEntity.prototype, "owner", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PetEntity.prototype, "owner_id", void 0);
    PetEntity = PetEntity_1 = __decorate([
        (0, typeorm_1.Entity)()
    ], PetEntity);
    return PetEntity;
}());
exports.PetEntity = PetEntity;
//# sourceMappingURL=pet.entity.js.map
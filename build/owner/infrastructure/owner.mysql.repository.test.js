"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var pet_1 = require("../domain/pet/pet");
var owner_1 = require("../domain/owner");
var test_dummy_information_1 = require("../domain/pet/information/test-dummy-information");
var owner_entity_1 = require("./owner.entity");
var owner_mysql_repository_1 = require("./owner.mysql.repository");
var owner_type_1 = require("../domain/owner-type");
describe('OwnerMysqlRepository', function () {
    var rawRepository;
    var ownerRepository;
    var owner;
    var mockedSave;
    var mockedFindOneById;
    var PET_INFORMATION = test_dummy_information_1.DUMMY_INFORMATION;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            rawRepository = new typeorm_1.Repository(null, null);
            ownerRepository = new owner_mysql_repository_1.OwnerMysqlRepository(rawRepository);
            return [2 /*return*/];
        });
    }); });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            owner = new owner_1.Owner(owner_type_1.OwnerType.SHELTER);
            mockedSave = jest
                .spyOn(rawRepository, 'save')
                .mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, owner_entity_1.OwnerEntity.create(owner)];
                });
            }); });
            mockedFindOneById = jest
                .spyOn(rawRepository, 'findOne')
                .mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, owner_entity_1.OwnerEntity.create(owner)];
                });
            }); });
            return [2 /*return*/];
        });
    }); });
    it('OwnerMysqlRepository.save(Owner)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var pet, ownerFromQuery;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pet = new pet_1.Pet(PET_INFORMATION);
                    owner.adoptPet(pet);
                    return [4 /*yield*/, ownerRepository.save(owner)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, ownerRepository.findOneById(owner.id)];
                case 2:
                    ownerFromQuery = _a.sent();
                    expect(mockedSave).toBeCalled();
                    expect(mockedFindOneById).toBeCalled();
                    expect(owner.id).toBe(ownerFromQuery.id);
                    expect(owner.type).toBe(ownerFromQuery.type);
                    expect(owner.getPetLists()).toStrictEqual(ownerFromQuery.getPetLists());
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=owner.mysql.repository.test.js.map
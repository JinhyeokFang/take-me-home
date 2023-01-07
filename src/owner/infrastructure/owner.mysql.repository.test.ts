import { Repository } from 'typeorm';
import { Pet } from '../domain/pet/pet';
import { Owner } from '../domain/owner';
import { DUMMY_INFORMATION } from '../domain/pet/information/test-dummy-information';
import { OwnerEntity } from './owner.entity';
import { OwnerMysqlRepository } from './owner.mysql.repository';
import { OwnerType } from '../domain/owner-type';

describe('OwnerMysqlRepository', () => {
  let rawRepository: Repository<OwnerEntity>;
  let ownerRepository: OwnerMysqlRepository;

  let owner: Owner;
  let mockedSave: jest.SpyInstance;
  let mockedFindOneById: jest.SpyInstance;

  const PET_INFORMATION = DUMMY_INFORMATION;

  beforeAll(async () => {
    rawRepository = new Repository<OwnerEntity>(null, null);
    ownerRepository = new OwnerMysqlRepository(rawRepository);
  });

  beforeEach(async () => {
    owner = new Owner(OwnerType.SHELTER);
    mockedSave = jest
      .spyOn(rawRepository, 'save')
      .mockImplementation(async () => {
        return OwnerEntity.create(owner);
      });
    mockedFindOneById = jest
      .spyOn(rawRepository, 'findOne')
      .mockImplementation(async () => {
        return OwnerEntity.create(owner);
      });
  });

  it('OwnerMysqlRepository.save(Owner)', async () => {
    const pet = new Pet(PET_INFORMATION);
    owner.adoptPet(pet);

    await ownerRepository.save(owner);
    const ownerFromQuery = await ownerRepository.findOneById(owner.id);

    expect(mockedSave).toBeCalled();
    expect(mockedFindOneById).toBeCalled();
    expect(owner.id).toBe(ownerFromQuery.id);
    expect(owner.type).toBe(ownerFromQuery.type);
    expect(owner.getPetLists()).toStrictEqual(ownerFromQuery.getPetLists());
  });
});

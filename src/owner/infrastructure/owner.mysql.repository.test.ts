import { Repository } from 'typeorm';
import { Pet } from '../domain/pet/pet';
import { Owner } from '../domain/owner';
import { OwnerEntity } from './owner.entity';
import { OwnerMysqlRepository } from './owner.mysql.repository';
import { OwnerType } from '../domain/owner-type';
import { OwnerFactory } from '../domain/owner.factory';

describe('OwnerMysqlRepository', () => {
  let rawRepository: Repository<OwnerEntity>;
  let ownerRepository: OwnerMysqlRepository;

  let owner: Owner;
  let mockedSave: jest.SpyInstance;
  let mockedFindOneById: jest.SpyInstance;

  beforeAll(async () => {
    rawRepository = new Repository<OwnerEntity>(null, null);
    ownerRepository = new OwnerMysqlRepository(rawRepository);
  });

  beforeEach(async () => {
    const ownerFactory = new OwnerFactory();
    owner = ownerFactory.createOwner(OwnerType.SHELTER, {
      pets: [new Pet()],
    });
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
    await ownerRepository.save(owner);
    const ownerFromQuery = await ownerRepository.findOneById(owner.id);

    expect(mockedSave).toBeCalled();
    expect(mockedFindOneById).toBeCalled();
    expect(owner.id).toBe(ownerFromQuery.id);
    expect(owner.type).toBe(ownerFromQuery.type);
    expect(owner.getPetLists()).toStrictEqual(ownerFromQuery.getPetLists());
  });
});

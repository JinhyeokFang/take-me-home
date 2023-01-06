import { Repository } from 'typeorm';
import { Pet } from '../domain/pet/pet';
import { Owner } from '../domain/owner';
import { DUMMY_INFORMATION } from '../domain/pet/information/test-dummy-information';
import { OwnerEntity } from './owner.entity';
import { OwnerMysqlRepository } from './owner.mysql.repository';

describe('OwnerMysqlRepository', () => {
  let rawRepository: Repository<OwnerEntity>;
  let ownerRepository: OwnerMysqlRepository;

  const PET_INFORMATION = DUMMY_INFORMATION;

  beforeAll(async () => {
    rawRepository = new Repository<OwnerEntity>(null, null);
    ownerRepository = new OwnerMysqlRepository(rawRepository);
  });

  it('OwnerMysqlRepository.save(Owner)', async () => {
    const pet = new Pet(PET_INFORMATION);
    const owner = new Owner();
    const mockedSave = jest
      .spyOn(rawRepository, 'save')
      .mockImplementation(async () => {
        return OwnerEntity.create(owner);
      });
    const mockedFindOne = jest
      .spyOn(rawRepository, 'findOne')
      .mockImplementation(async () => {
        return OwnerEntity.create(owner);
      });
    owner.adoptPet(pet);

    await ownerRepository.save(owner);
    const ownerFromQuery = await ownerRepository.findOneById(owner.id);
    const isIdEqual = owner.id === ownerFromQuery.id;
    const ownerPetList = owner.getPetLists();
    const ownerFromQueryPetList = ownerFromQuery.getPetLists();

    expect(mockedSave).toBeCalled();
    expect(mockedFindOne).toBeCalled();
    expect(isIdEqual).toBe(true);
    expect(ownerPetList).toStrictEqual(ownerFromQueryPetList);
  });
});

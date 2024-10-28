const _ = require('lodash');
const createHttpError = require('http-errors');
const { Pet, PetType } = require('../db/models');

module.exports.createPet = async (req, res, next) => {
  const { body, file } = req;

  try {
    if (file) {
      body.image = file.filename;
    }

    const createdPet = await Pet.create(body);

    if (!createdPet) {
      return next(createHttpError(400, 'Something went wrong'));
    }

    const petType = await PetType.findByPk(createdPet.get().petTypeId, {
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    const shortedPet = _.omit(createdPet.get(), [
      'petTypeId',
      'createdAt',
      'updatedAt',
    ]);

    const petWithPetType = {
      ...shortedPet,
      image: shortedPet.image
        ? `http://${process.env.HOST}:${process.env.PORT}/images/${shortedPet.image}`
        : null,
      petType,
    };

    res.status(201).send({ data: petWithPetType });
  } catch (err) {
    next(err);
  }
};

module.exports.getPets = async (req, res, next) => {
  const {
    query,
    pagination: { page, limit, offset },
  } = req;

  const where = {};

  if (query.petType && query.petType !== 'all') {
    where.petTypeId = query.petType;
  }
  if (query.city && query.city !== 'all') {
    where.city = query.city;
  }
  if (query.isFound !== 'all') {
    where.isFound = query.isFound === 'true';
  }

  const { sort } = query;

  let sortDirection = 'ASC';
  if (sort === 'newest') {
    sortDirection = 'DESC';
  }

  try {
    const totalPetCount = await Pet.count({ where });
    const foundPets = await Pet.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: PetType,
        attributes: ['id', 'type'],
      },
      where,
      limit,
      offset,
      order: [['id', sortDirection]],
    });

    const preparedPets = foundPets.map(p => {
      let preparedPet = { ...p };
      preparedPet.petType = {
        id: p['PetType.id'],
        type: p['PetType.type'],
      };

      preparedPet.image = p.image
        ? `http://${process.env.HOST}:${process.env.PORT}/images/${p.image}`
        : null;

      preparedPet = _.omit(preparedPet, [
        'petTypeId',
        'PetType.id',
        'PetType.type',
      ]);
      return preparedPet;
    });

    const totalPages = Math.ceil(totalPetCount / limit);

    res.status(200).send({
      page,
      totalPages,
      data: preparedPets,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPetById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundPet = await Pet.findByPk(id, {
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: PetType,
        attributes: ['id', 'type'],
      },
    });

    if (!foundPet) {
      return next(createHttpError(404, 'Pet Not Found'));
    }

    const petWithType = {
      id: foundPet.id,
      name: foundPet.name,
      owner: foundPet.owner,
      ownerContacts: foundPet.ownerContacts,
      description: foundPet.description,
      city: foundPet.city,
      lostDate: foundPet.lostDate,
      isFound: foundPet.isFound,
      image: foundPet.image
        ? `http://${process.env.HOST}:${process.env.PORT}/images/${foundPet.image}`
        : null,
      petType: {
        id: foundPet['PetType.id'],
        type: foundPet['PetType.type'],
      },
    };

    let preparedPet = { ...foundPet };
    preparedPet.brand = {
      id: foundPet['PetType.id'],
      name: foundPet['PetType.type'],
    };

    preparedPet.image = foundPet.image
      ? `http://${process.env.HOST}:${process.env.PORT}/images/${foundPet.image}`
      : null;

    preparedPet = _.omit(preparedPet, ['petId', 'PetType.id', 'PetType.type']);

    res.status(200).send({ data: petWithType });
  } catch (err) {
    next(err);
  }
};

module.exports.updatePetById = async (req, res, next) => {
  const {
    body,
    file,
    params: { id },
  } = req;

  try {
    if (file) {
      body.image = file.filename;
    }

    const [updatedPetsCount, [updatedPet]] = await Pet.update(body, {
      raw: true,
      where: { id },
      returning: true,
    });

    if (!updatedPetsCount) {
      return next(createHttpError(404, 'Pet Not Found'));
    }

    const petType = await PetType.findByPk(updatedPet.brandId, {
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    const shortedPet = _.omit(updatedPet, [
      'petTypeId',
      'createdAt',
      'updatedAt',
    ]);
    const phoneWithBrand = {
      ...shortedPet,
      image: shortedPet.image
        ? `http://${process.env.HOST}:${process.env.PORT}/images/${shortedPet.image}`
        : null,
      petType,
    };

    res.status(200).send({ data: phoneWithBrand });
  } catch (err) {
    next(err);
  }
};

module.exports.deletePetById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedPetsCount = await Pet.destroy({ where: { id } });
    if (!deletedPetsCount) {
      return next(createHttpError(404, 'Pet Not Found'));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

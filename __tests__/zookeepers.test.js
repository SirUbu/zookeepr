// require dependencies
const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers.json');

// add mock for writing to zookeepers.json
jest.mock('fs');

test("creates an zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    { name: "Darlene", id: "testerId" },
    zookeepers
  );

  expect(zookeeper.name).toBe("Darlene");
  expect(zookeeper.id).toBe("testerId");
});

test("filters by query", () => {
  const startingZookeepers = [
    {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
  ];

  const updatedZookeepers = filterByQuery({ age: 31 }, startingZookeepers);

  expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
  const startingZookeepers = [
    {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
  ];

  const result = findById("3", startingZookeepers);

  expect(result.name).toBe("Isabella");
});

test("validates age", () => {
  const zookeeper = {
    id: "2",
    name: "Raksha",
    age: 31,
    favoriteAnimal: "penguin",
  };

  const invalidZookeeper = {
    id: "3",
    name: "Isabella",
    age: "67",
    favoriteAnimal: "bear",
  };

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// creating a model
const PersonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String]
})

const Person = mongoose.model('Person', PersonSchema);

// create and save a record of a model
const spongeBob = new Person({ name: 'SpongeBob', age: 20, favoriteFoods: ['Crabby Patti'] });
const patrick = new Person({ name: 'Patrick', age: 20, favoriteFoods: ['Ice Cream'] });
const arrayOfPeople = [spongeBob, patrick];

const createAndSavePerson = (done) => {
  spongeBob.save((err, data) => err ? done(err) : done(null , data));
};

// Create Many Records with model.create()
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => err ? done(err) : done(null, data));
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => err ? done(err) : done(null, data));
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food}, (err, data) => err ? done(err) : done(null, data));
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => err ? done(err) : done(null, data));
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, data) => (err) ? done(err) : done(null, data));
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName}, { age: ageToSet }, { new: true }, (err, data) => 
    (err) ? done(err) : done(null, data)
  )
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deletedPerson) => (err) ? done(err): done(null , deletedPerson));
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, data) => (err) ? done(err) : done(null , data));
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => (err) ? done(err) : done(null, data));
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
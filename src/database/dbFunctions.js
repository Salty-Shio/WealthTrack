const {MongoClient} = require("mongodb");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
require("dotenv").config({path: ".env"})

const username = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

const url = `mongodb+srv://${username}:${password}@${hostname}`;
const client = new MongoClient(url);
const userCollection = client.db('WealthTrack').collection('users');
const budgetCollection = client.db('WealthTrack').collection('budgets');

async function getUser(username) {
  let cursor = userCollection.find({username: username});
  return cursor.toArray().then(results => results.length > 0 ? results[0] : false);
}

async function newUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  let user = {username: username, password: passwordHash, token: uuid.v4()};
  let response = await userCollection.insertOne(user);
  return user;
}


async function validCredentials(username, password) {
  const user = getUser(username);
  if (await bcrypt.compare(password, user.password)) {
    return true;
  } else {
    return false;
  }
}

async function getBudget(budget_id) {
  let cursor = budgetCollection.find({id: budget_id});
  return cursor.toArray().then(results => results.length > 0 ? results[0] : false);
}

async function clearAllBudgets() {
  try {
      await budgetCollection.deleteMany({});
      return true;
  } catch (err) {
      console.log(err);
      return false;
  }
}

async function clearAllUsers() {
  try {
      await userCollection.deleteMany({});
      return true;
  } catch (err) {
      console.log(err);
      return false;
  }
}

async function updateBudget(budget_data) {
  await budgetCollection.updateOne({id: budget_data.id}, budget_data);
}

module.exports = {
  getUser,
  newUser,
  validCredentials,
  getBudget,
  clearAllBudgets,
  clearAllUsers,
  updateBudget,
}
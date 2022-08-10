const {application} = require('express');
const express = require('express');
const userModel = require('../models/user');
const tableModel = require('../models/table');

const app = express();

app.post('/user', async (req, res) => {
  const u = new userModel(req.body);
  try {
    await u.save();
    res.send(u);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/table', async (req, res) => {
  const u = new tableModel(req.body);
  try {
    await u.save();
    res.send(u);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/list', async (req, res) => {
  const users = await userModel.find({});
  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get('/listTable', async (req, res) => {
  const tables = await tableModel.find({});
  try {
    res.send(tables);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch('/user/:id', async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;

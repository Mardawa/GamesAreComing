const express = require('express');

const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ rdate: 1 })
    .then(items => res.json(items));
});

// @route POST api/items
// @desc Create An Item
// @access Public
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    rdate: req.body.rdate
  });

  newItem.save().then(item => res.json(item));
});

// @route DELETE api/items/:id
// @desc Delete An Item
// @access Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false, log: err }));
});

// @route UPDATE api/item/update/:id
// @ desc Update An Item
// @access Public
router.post('/update/:id', (req, res) => {
  const filter = {
    _id: req.params.id
  };
  const update = {
    name: req.body.name,
    rdate: req.body.rdate
  };
  Item.findOneAndUpdate(filter, update, { new: true })
    .then(item => {
      res.json({ item });
    })
    .catch(err => res.status(404).json({ success: false, log: err }));
});

module.exports = router;

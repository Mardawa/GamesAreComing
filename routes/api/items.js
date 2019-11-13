const express = require('express');
const auth = require('../../middleware/auth');

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
// @access Private
router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    rdate: req.body.rdate,
    soon: req.body.soon,
    filePath: req.body.filePath
  });

  newItem
    .save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

// @route DELETE api/items/:id
// @desc Delete An Item
// @access Private
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false, log: err }));
});

// @route UPDATE api/item/update/:id
// @ desc Update An Item
// @access Private
router.post('/update/:id', auth, (req, res) => {
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

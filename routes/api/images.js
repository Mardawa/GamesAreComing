const express = require('express');

const router = express.Router();

// @route POST api/images/upload
// @desc Upload An Image
// @access Public
router.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const { file } = req.files;

  return file.mv(`${process.cwd()}/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    return res.json({
      filePath: file.name
    });
  });
});

// @route GET api/images/:id
// @desc Get the image wiht id
// @access Public
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.sendFile(`${process.cwd()}/uploads/${id}`);
});

module.exports = router;

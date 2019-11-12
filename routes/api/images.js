const express = require('express');
const { Buffer } = require('buffer');
const fs = require('fs');

const router = express.Router();

// Image Model
const Image = require('../../models/Image');

// @route POST api/images/upload
// @desc Upload An Image
// @access Public
router.post('/upload', (req, res) => {
  if (req.files === null) {
    res.status(400).json({ msg: 'No file uploaded' });
  }

  const { file } = req.files;

  file.mv(`${process.cwd()}/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }

    fs.readFile(`${process.cwd()}/uploads/${file.name}`, (er, data) => {
      if (er) {
        throw er;
      }
      const base64 = data.toString('base64');

      const newImage = new Image({
        name: file.name,
        image: Buffer.from(base64, 'base64')
      });

      newImage
        .save()
        .then(image => {
          const imageId = image.id;

          fs.rename(
            `${process.cwd()}/uploads/${file.name}`,
            `${process.cwd()}/uploads/${imageId}.jpg`,
            error => {
              if (error) {
                throw error;
              }
            }
          );

          res.json({
            filePath: imageId
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  });
});

// @route GET api/images/:id
// @desc Get the image wiht id
// @access Public
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Image.findById(id)
    .then(item =>
      fs.writeFile(`${process.cwd()}/uploads/${id}.jpg`, item.image, error => {
        if (error) {
          throw error;
        }
      })
    )
    .then(res.sendFile(`${process.cwd()}/uploads/${id}.jpg`))
    .catch(err => res.json(err));
});

module.exports = router;

const mongoose = require('mongoose');
const Album = require('../models/album');

exports.albums_get_all = (req, res, next) => {
    Album.find()
    .select('_id title artist genre year')
    .exec()
    .then(album => {
        res.send(album)
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.albums_create_album = (req, res, next) => {
    const album = new Album({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        artist: req.body.artist,
        genre: req.body.genre,
        year: req.body.year
    });
    album
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created album successfully',
            createdAlbum: {
                _id: result._id,
                title: result.title,
                artist: result.artist,
                genre: result.genre,
                year: result.year
            }
        })  
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });      
    });
}

exports.albums_get_album = (req, res, next) => {
    const id = req.params.albumId;
    Album.findById(id)
      .select('_id title artist genre year')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              product: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:8000/products'
              }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };

  exports.albums_update_album = (req, res, next) => {
    const id = req.params.albumId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Album.update({ _id: id}, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: 'http://localhost:8000/products/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}  

  
exports.albums_delete = (req, res, next) => {
    const id = req.params.albumId;
    Album.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Album deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:8000/products',
                body: { name: 'String', price: 'Number' }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });       
    });
}


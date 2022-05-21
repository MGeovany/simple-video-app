

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const router = express.Router()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://marloncastro:020399Mg@cluster0.jh2t6.mongodb.net/VideosDb?retryWrites=true&w=majority')
  // eslint-disable-next-line no-undef
  .catch((err) => handeError(err))

const videosSchema = new mongoose.Schema(
  {
    titulo: String,
    descripcion: String,
    duracion: Number,
    autor: String,
    enlace: String,
    fecha: String
  },

  { collection: 'Videos' }
)

const Video = mongoose.model('Videos', videosSchema)

router.get('/videos', (req, res) => {
  Video.find((err, videos) => {
    if (err) res.status(500).send('Error en la base de datos')
    else res.status(200).json(videos)
  })
})

router.post("/videos", function (req, res) {
  const video1 = new Video({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    duracion: req.body.duracion,
    autor: req.body.autor,
    enlace: req.body.enlace,
    fecha: req.body.fecha
  }); 
  video1.save(function (error, video1) {
    if (error) {
      res.status(500).send("No se ha podido agregar.");
    } else {
      res.status(200).json(video1); 
    }
  });
});

router.get("/videos/:id", function (req, res) {
  Video.findById(req.params.id, function (err, video) {
    if (err) res.status(500).send("Error en la base de datos ");
    else {
      if (video != null) {
        res.status(200).json(video);
      } else res.status(404).send("No se encontro ");
    }
  });
});

router.get("/videos", function (req, res) {
  Video.find( {autor : req.query.autor }, function (err, videos) {
    if (err) res.status(500).send("Error en la base de datos ");
    else {
      if (videos != null) {
        res.status(200).json(videos);
      } else res.status(404).send("No se encontro ");
    }
  });
});

router.get("/videos", function (req, res) {
  Video.find({ fecha: { $gt: req.query.fecha1, $lte: req.query.fecha2} }, function (err, videos) {
    if (err) {
      console.log(err);
      res.status(500).send("Error al leer de la base de datos");
    } else res.status(200).json(videos);
  });
});

router.delete("/videos/:id", function (req, res) {
  Video.findById(req.params.id, function (err, videos) {
    if (err) res.status(500).send("Error en la base de datos");
    else {
      if (videos != null) {
        videos.remove(function (error, result) {
          if (error) res.status(500).send("Error en la base de datos");
          else {
            res.status(200).send("Eliminado exitosamente");
          }
        });
      } else res.status(404).send("No se encontro ");
    }
  });
});

module.exports = router


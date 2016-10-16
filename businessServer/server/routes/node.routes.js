var router = require('express').Router();
module.exports = router;

var db = require('../models');
var Node = db.model('node');
var Connection = db.model('connection');


router.use('/', function(req, res, next) {
  console.log("got into the /api/node route");
  next();
})

// also get connections?
// create get route for specific business
// create get route for specific product?

router.get('/', function(req, res, next) {

  Node.findAll({include: [
               {model: Connection, as: 'to'},
               {model: Connection, as: 'from'}
               ]})
  .then(function(nodes) {
    res.json(nodes);
  })
})

router.post('/', function(req, res, next) {
  Node.create( {
    question: req.body.question,
    productId: req.body.productId,
    topLevel: req.body.topLevel,
    layer: req.body.layer,
    topLevelNodeIndex: req.body.topLevelNodeIndex,
    leafNode: req.body.leafNode
  })
  .then(function(node) {
    res.json(node);
  })
});

// router.post('/toplevel', function(req, res, next) {
//   Node.create( {
//     question: req.body.question,
//     productId: req.body.productId,
//     topLevel: true
//   })
//   .then(function(node) {
//     res.json(node);
//   })
// });

router.delete('/:id', (req, res, next) => {

  var removeAll = function(id){
    return Node.findById(id, {
      include: [
      {model: Connection, as: 'from'}
      ]
    })
    .then(node => {
      Promise.all(
      node.from.forEach(conn => {
        if(conn.toId){
          removeAll(conn.toId);
        }
        return Connection.destroy({
          where: {
            id: conn.id
          }
        })
      }))
      return node;
    })
    .then(node => {
      console.log(node)
      return Node.destroy({
        where: {
          id: node.id
        }
      })
    })
  }
  removeAll(req.params.id);
  res.send('done?');

})

// router.post('/all', (req, res, next) => {
//   if(req.body.nodes){
//     Promise.all(req.body.nodes.map(function(node){
//       console.log(node);
//       return Node.create({
//         question: node.question,
//         productId: node.productId,
//         topLevel: node.topLevel
//       })
//     }))
//     .then(res => {
//       console.log(res);
//     })
//     .catch(next);
//   }
//   else{
//     res.sendStatus(500);
//   }
// })


router.get('/:id', function(req, res, next) {

  Node.findOne({
    where: {id: req.params.id}
  })
  .then(function(node) {
    res.json(node);
  })
  .catch(function (err) {
    console.log(err);
  })
});


router.put('/:id', function(req, res, next){
  return Node.findById(req.params.id)
    .then(node => {
      if(!node){
        res.sendStatus(404);
      }
      else{
        return node.update(req.body)
      }
    })
    .then(updatedNode => {
      res.json(updatedNode);
    })
})


const router = require('express').Router()
const { generate: generateId } = require('shortid')
const EnDFunEvents = require('../models/eNdFunEvents')
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/', async (req, res, next) => {
    const status = 201;
    try {
      const response = await EnDFunEvents.create({ _id: generateId(), ...req.body });
      res.json({ status, response });
    }
    catch(error) {
      console.error(error);
      const e = new Error('Something went wrong, Unable to POST');
      e.status = 400;
      return(e);
    }
  })

  router.get('/', async (req, res, next) => {
    const status = 200
    const response = await EnDFunEvents.find();

    res.json({ status, response })
  })

module.exports = router
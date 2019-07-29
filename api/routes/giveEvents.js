const router = require('express').Router()
const { generate: generateId } = require('shortid')
const GiveEvents = require('../models/giveEvents')
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/', async (req, res, next) => {
    const status = 201;
    try {
      const response = await GiveEvents.create({ _id: generateId(), ...req.body });
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
    const queryParams = req.query;
    // If no query params are present then return all the documents
    // queryParams is of type Object, hence a null check wont be sufficient
    if (Object.entries(queryParams).length === 0 && queryParams.constructor === Object)
    {
        response = await GiveEvents.find({})
    }

    if (Object.keys(queryParams).length === 1)
      {
        key = Object.keys(queryParams)[0].toString();
        value = queryParams[key].toString();
        if (value === 'FundRaising')
        {
          response = await GiveEvents.find({event_type : 'FundRaising'})
        }
        if (value === 'Volunteering')
        {
          response = await GiveEvents.find({event_type : 'Volunteering'})
        }
      }

    res.json({ status, response })
  })

module.exports = router
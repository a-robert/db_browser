/**
 * Created by arobert on 23.03.2018.
 */

const express = require('express');
const router = express.Router();
const group = require('../../models/group');
const camelcaseKeys = require('camelcase-keys');

/*
 ====================================================
 HELPERS
 ====================================================
 */

function sendError(res, code, error) {
  return res.status(code).json({
    error: error
  });
}

/*
 ====================================================
 /HELPERS
 ====================================================
 */

router.get('/', (req, res) => {
  group.getGroups().then((result) => {
    return res.status(200).json(camelcaseKeys(result));
  }, (e) => {
    sendError(res, 500, e)
  });
});

router.get('/:id', (req, res) => {
  group.getGroup(req.params.id).then((result) => {
    return res.status(200).json(camelcaseKeys(result));
  }, (e) => {
    sendError(res, 500, e)
  });
});

router.put('/:id', (req, res) => {
  let name = req.body.name;

  if (!name) {
    return sendError(res, 422, 'Missing parameters');
  }

  group.updateGroup(req.params.id, name).then(() => {
    return res.status(200).json({
      status: 'OK'
    });
  }, (e) => {
    sendError(res, 500, e)
  });
});

router.post('/', (req, res) => {
  let name = req.body.name;

  if (!name) {
    return sendError(res, 422, 'Missing parameters');
  }

  group.addGroup(name).then(() => {
    return res.status(200).json({
      status: 'OK'
    });
  }, (e) => {
    sendError(res, 500, e);
  });
});

module.exports = router;

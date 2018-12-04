/**
 * Created by arobert on 23.03.2018.
 */

const express = require('express');
const router = express.Router();
const grade = require('../../models/grade');
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
  grade.getSummary().then((result) => {
    return res.status(200).json(result);
  }, (e) => {
    sendError(res, 500, e)
  });
});

module.exports = router;

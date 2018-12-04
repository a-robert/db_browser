/**
 * Created by arobert on 23.03.2018.
 */

const express = require('express');
const router = express.Router();
const student = require('../../models/student');
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
  student.getStudents().then((result) => {
    return res.status(200).json(camelcaseKeys(result));
  }, (e) => {
    sendError(res, 500, e)
  });
});

router.get('/:id', (req, res) => {
  student.getStudent(req.params.id).then((result) => {
    return res.status(200).json(camelcaseKeys(result));
  }, (e) => {
    sendError(res, 500, e)
  });
});

router.post('/', (req, res) => {
  let group = req.body.group;
  let fullName = req.body.fullName;
  let birthdate = req.body.birthDate;
  let address = req.body.address;
  let phoneNumber = req.body.phoneNumber;

  console.log(group, fullName, birthdate, address, phoneNumber);

  if (!group || !fullName || !birthdate || !address || !phoneNumber) {
    return sendError(res, 422, 'Missing parameters');
  }

  student.addStudent(group, fullName, birthdate, address, phoneNumber).then(() => {
    return res.status(200).json({
      status: 'OK'
    });
  }, (e) => {
    sendError(res, 500, e);
  });
});

module.exports = router;

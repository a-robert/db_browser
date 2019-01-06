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
  grade.getGrades().then((result) => {
    return res.status(200).json(camelcaseKeys(result));
  }, (e) => {
    sendError(res, 500, e)
  });
});

router.get('/:id', (req, res) => {
  grade.getGrade(req.params.id).then((result) => {
    return res.status(200).json(camelcaseKeys(result));
  }, (e) => {
    sendError(res, 500, e)
  });
});

router.put('/:id', (req, res) => {
  let studentId = req.body.studentId;
  let subjectId = req.body.subjectId;
  let gradeValue = req.body.grade;

  if (!studentId || !subjectId || !gradeValue) {
    return sendError(res, 422, 'Missing parameters');
  }

  grade.updateGrade(req.params.id, studentId, subjectId, gradeValue).then(() => {
    return res.status(200).json({
      status: 'OK'
    });
  }, (e) => {
    sendError(res, 500, e)
  });
});

router.post('/', (req, res) => {
  let studentId = req.body.studentId;
  let subjectId = req.body.subjectId;
  let gradeValue = req.body.grade;

  if (!studentId || !subjectId || !gradeValue) {
    return sendError(res, 422, 'Missing parameters');
  }

  grade.addGrade(studentId, subjectId, gradeValue).then(() => {
    return res.status(200).json({
      status: 'OK'
    });
  }, (e) => {
    sendError(res, 500, e);
  });
});

module.exports = router;

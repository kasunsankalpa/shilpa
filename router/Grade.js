const express = require('express');
const router = express.Router();
const Grade = require('../controller/Grade/Grade');


router.post("/GetAllGrade", Grade.getAllGrades);
router.post("/GetSubjectbyGrade_id",Grade.GetsubjectbyGradeId);
router.post("/Getcource",Grade.getcource);
router.post("/Getmodules",Grade.getmodule);
router.post("/Getlesson",Grade.getlesson);
router.post("/Getatachment",Grade.getatachment);
module.exports = router;
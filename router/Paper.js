const express = require('express');
const router = express.Router();
const Paper = require('../controller/Paper/Paper');


router.post("/GetpaperList", Paper.GetPaperList);
router.post("/GetQustion",Paper.GetQuestion);
router.post("/Getanswers",Paper.GetAnswerByQustionId);
router.post("/GetAlredyChecked",Paper.Checkalredysaved);
router.post("/SaveAnswer",Paper.SaveAnswer);
router.post("/UpdateAnswer",Paper.Updateanswer);
router.post("/GetQuestionCount",Paper.GetQuestionCount);
router.post("/GetCompleteQuizCount",Paper.GetcompleteQuizCount);
router.post("/GetPrivew",Paper.GetPriview);
router.post("/PaperAlocation",Paper.PaperAllocation);
router.post("/Getmarks",Paper.Getmarks);
router.post("/SubmitPaper",Paper.papersubmit);
router.post("/Loadworkplace",Paper.Loadworkplace);
router.post("/Loadhistory",Paper.LoadHistory);
router.post("/Loadanswereviews",Paper.answerreview);
router.post("/GetquizById",Paper.GetquizByQuizId);
router.post("/GetDeicossion",Paper.GetPaperDescussion);
router.post("/Getobservation",Paper.Getobservation);
router.post("/GetteacherCat",Paper.GetteacherCat);
router.post("/PaperDetials",Paper.PaperDetails_byId);
router.post("/GetRank",Paper.GetRank);
router.post("/GetTimeDuration",Paper.TimeDuration);
router.post("/Getmaxresult",Paper.maxresult);
module.exports = router;
const db = require('../../util/conn');

exports.GetPaperList = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT papers.paper_id, papers.paper_description, papers.active_status, papers.date, papers.teacher_id, papers.grade_id FROM `papers` WHERE papers.active_status = '1' AND papers.grade_id = '"+req.body.gradeId+"' AND papers.teacher_id = '"+req.body.teacherId+"' AND papers.paper_id NOT IN ( SELECT ps.paper_id FROM papaer_student ps WHERE ps.student_id = '"+req.body.stdId+"' )",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.GetQuestion = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT qustions.Question_id, qustions.Question, qustions.Corect_answer, qustions.Paper_id, qustions.answer_1, qustions.ansewr_2, qustions.answer_3, qustions.answer_4, qustions.answer_5, qustions.img_url, papers.paper_description, qustions.Qustion_No FROM qustions INNER JOIN papers ON qustions.Paper_id = papers.paper_id WHERE qustions.Paper_id = '"+req.body.PaperId+"' AND qustions.Qustion_No = '"+req.body.quizid+"'",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.GetAnswerByQustionId = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT paper_answer.Question_answer_detail_id, paper_answer.answe_no, paper_answer.answer, paper_answer.Qustion_id FROM `paper_answer` WHERE paper_answer.Qustion_id = '"+req.body.QuestionId+"' ORDER BY paper_answer.answe_no ASC",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.Checkalredysaved = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT IFNULL( count( student_qiuz_answer.answer_id ), 0 ) AS count, IFNULL( student_qiuz_answer.answer_id, 0 ) AS answer_id, IFNULL( student_qiuz_answer.selected_answer_detail_id, 0 ) AS detail_id FROM `student_qiuz_answer` WHERE student_qiuz_answer.paper_id = '"+req.body.PaperId+"' AND student_qiuz_answer.question_id = '"+req.body.quizid+"' AND student_qiuz_answer.std_id = '"+req.body.stdId+"'",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.SaveAnswer = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("INSERT INTO `student_qiuz_answer` ( `paper_id`, `question_id`, `answer_id`, `Is_corect_or_not`, `std_id`,`selected_answer_detail_id` ) VALUES ( '"+req.body.PaperId+"', '"+req.body.QuestionId+"', '"+req.body.answerId+"', '"+req.body.Iscorrct+"', '"+req.body.UserId+"','"+req.body.answerdetailId+"' );",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.Updateanswer = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("UPDATE `student_qiuz_answer` SET `answer_id` = '"+req.body.answerId+"', `Is_corect_or_not` = '"+req.body.Iscorrct+"',`selected_answer_detail_id`='"+req.body.answerdetailId+"' WHERE ( `paper_id` = '"+req.body.PaperId+"' AND `question_id` = '"+req.body.QuestionId+"' AND `std_id` = '"+req.body.UserId+"' );",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.GetQuestionCount = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT COUNT(qustions.Qustion_No) AS count FROM `qustions` WHERE qustions.Paper_id = '"+req.body.PaperId+"' ",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.GetcompleteQuizCount = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT IFNULL( COUNT( student_qiuz_answer.answer_id ), 0 ) count FROM `student_qiuz_answer` WHERE student_qiuz_answer.std_id = '"+req.body.userid+"' AND student_qiuz_answer.paper_id = '"+req.body.PaperId+"' AND student_qiuz_answer.answer_id NOT IN (0)",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.GetPriview = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("( SELECT IFNULL( student_qiuz_answer.answer_id, 6 ) AS answer, qustions.Qustion_No,qustions.group_id FROM qustions LEFT JOIN student_qiuz_answer ON student_qiuz_answer.question_id = qustions.Question_id WHERE student_qiuz_answer.std_id = '"+req.body.userid+"' AND student_qiuz_answer.paper_id = '"+req.body.PaperId+"' ) UNION ( SELECT IFNULL( student_qiuz_answer.answer_id, 6 ) AS answer, qustions.Qustion_No,qustions.group_id FROM qustions LEFT JOIN student_qiuz_answer ON student_qiuz_answer.question_id = qustions.Question_id WHERE student_qiuz_answer.student_answr_id IS NULL  AND qustions.Paper_id='"+req.body.PaperId+"')",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.PaperAllocation = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("INSERT INTO `papaer_student` ( `paper_id`, `student_id`, `subject_id`, `teacher_id`, `date`, `start_time`, `active_status` ) VALUES ( '"+req.body.paperId+"', '"+req.body.stdId+"', '"+req.body.subjectId+"', '"+req.body.teacherId+"', now(), '"+req.body.stime+"', '"+req.body.actives+"' );",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.Getmarks = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT COUNT( student_qiuz_answer.Is_corect_or_not ) AS count FROM `student_qiuz_answer` WHERE student_qiuz_answer.paper_id = '"+req.body.PaperId+"' AND student_qiuz_answer.std_id = '"+req.body.userid+"' AND student_qiuz_answer.Is_corect_or_not = '1'",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.papersubmit = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("UPDATE `papaer_student` SET `end_time` = now(), `marks` = '"+req.body.marks+"', `active_status` = '1', `dimeduration` = unix_timestamp(now()) - unix_timestamp(date) WHERE ( `paper_id` = '"+req.body.paperId+"' AND `student_id` = '"+req.body.stdId+"' );",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.Loadworkplace = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT papers.paper_description, papaer_student.paper_id, papers.teacher_id, papers.grade_id FROM papaer_student INNER JOIN papers ON papaer_student.paper_id = papers.paper_id WHERE papaer_student.student_id = '"+req.body.stdId+"' AND papaer_student.active_status = '0'",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.LoadHistory = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT papers.paper_description, papaer_student.paper_id, papers.teacher_id, papers.grade_id FROM papaer_student INNER JOIN papers ON papaer_student.paper_id = papers.paper_id WHERE papaer_student.student_id = '"+req.body.stdId+"' AND papaer_student.active_status = '1'",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.answerreview = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT qustions.Qustion_No, student_qiuz_answer.Is_corect_or_not, student_qiuz_answer.question_id FROM student_qiuz_answer INNER JOIN qustions ON student_qiuz_answer.question_id = qustions.Question_id WHERE student_qiuz_answer.paper_id = '"+req.body.paperId+"' AND student_qiuz_answer.std_id = '"+req.body.stdId+"'",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.GetquizByQuizId = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT qustions.Question_id, qustions.Qustion_No, qustions.Question, qustions.img_url FROM qustions WHERE qustions.Question_id = '"+req.body.QuestionId+"'",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.GetPaperDescussion = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT paper_descossion.question_id, paper_descossion.img_url FROM `paper_descossion` WHERE paper_descossion.question_id = '"+req.body.QuestionId+"'",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.Getobservation = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT papaer_student.marks, papaer_student.paper_id FROM papaer_student WHERE papaer_student.teacher_id = '"+req.body.teacherId+"' AND papaer_student.student_id = '"+req.body.stdId+"'",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.GetteacherCat = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT papaer_student.teacher_id, teacher.teacher_name FROM papaer_student INNER JOIN teacher ON papaer_student.teacher_id = teacher.teacher_id WHERE papaer_student.student_id = '"+req.body.stdId+"' GROUP BY papaer_student.teacher_id",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.PaperDetails_byId = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT papers.paper_description FROM `papers` WHERE papers.paper_id = '"+req.body.PaperId+"'",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.GetRank = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT papaer_student.marks FROM `papaer_student` WHERE papaer_student.paper_id = '"+req.body.paperId+"' AND papaer_student.dimeduration <= 3000 GROUP BY papaer_student.marks",
            (error, rows, fildData) => {
                if (!error) {

                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
exports.TimeDuration = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT papaer_student.marks, ROUND(( unix_timestamp(papaer_student.end_time) - unix_timestamp(papaer_student.date)) / 60, 0 ) AS time FROM papaer_student WHERE papaer_student.paper_id = '"+req.body.paperId+"' AND papaer_student.student_id = '"+req.body.stdId+"'",
            (error, rows, fildData) => {
                if (!error) {
                    
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.maxresult = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT MAX(papaer_student.marks) AS maxmark FROM `papaer_student` WHERE papaer_student.paper_id = '"+req.body.paperId+"' AND papaer_student.dimeduration <= 3000",
            (error, rows, fildData) => {
                if (!error) {
                    
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


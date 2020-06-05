const db = require('../../util/conn');

exports.getAllGrades = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT grade.grade_id, grade.Grade_name, grade.active_status, grade.image_url FROM teacher_has_grade INNER JOIN grade ON teacher_has_grade.grade_id = grade.grade_id WHERE teacher_has_grade.teacher_id = '"+req.body.teaherId+"'",
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

exports.GetsubjectbyGradeId = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT grade_has_subject.detail_id,grade_has_subject.grade_id, grade_has_subject.subject_id, `subject`.subject_name FROM grade_has_subject INNER JOIN `subject` ON grade_has_subject.subject_id = `subject`.subject_id WHERE `subject`.active_status = '1' AND grade_has_subject.grade_id = '"+req.body.gradeid+"'",
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

exports.getcource = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT cource.cource_id, cource.cource_name, cource.active_status, cource.img_url FROM `cource`",
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

exports.getmodule = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT modules.module_id, modules.module_name, modules.course_id, modules.active_status FROM `modules` WHERE modules.course_id = '"+req.body.courseId+"'",
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


exports.getlesson = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT lesson.lesson_id, lesson.lesson_name, lesson.module_id, lesson.active_status, lesson.vedio_url FROM `lesson` WHERE lesson.module_id = '"+req.body.moduleId+"'",
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

exports.getatachment = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT lesson.vedio_url, lesson.document_url FROM lesson WHERE lesson.lesson_id = '"+req.body.lessonId+"'",
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
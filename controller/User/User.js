const db = require('../../util/conn');

exports.Getusername = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT student.pwd, student.std_id, student.Std_name, student.mobile FROM student WHERE student.mobile = '"+req.body.mobile+"'",
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

exports.SaveUser = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("INSERT INTO `student` ( `Std_name`, `pwd`, `mobile`, `date` ) VALUES ('"+req.body.stdname+"', '"+req.body.pwd+"', '"+req.body.mobile+"', '"+req.body.date+"');",
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

exports.Getusrdata = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT student.pwd, student.std_id, student.Std_name, student.mobile FROM student WHERE student.std_id = '"+req.body.userid+"'",
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
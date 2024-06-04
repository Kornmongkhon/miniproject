require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
// const app = express();
const fs = require('fs');
const app = express()
const jwt = require('jsonwebtoken');
// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const mysqlDB = require('./database/mysql');
const port = process.env.ENV_SERVER_PORT;
app.use(cors());
app.use(express.json());







const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'leaveworkfile/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});


// const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { notifyLine } = require('./notify')

app.get('/getHistoryCheck', async (req, res) => {
    console.log('test')
    try {
        // console.log(process.env.ENV_DB_HOST)
        const query = "asdsad"
        const results = await mysqlDB.query
        ('SELECT * FROM checkin JOIN checkout ON checkin.chin_student = checkout.chout_student AND checkin.chin_date = checkout.chout_date Group BY checkin.chin_student,checkin.chin_date, checkin.chin_time ORDER BY checkin.dateCreatein')
        console.log(results)
        res.json(results)
    } catch (error) {
        console.error('Error during database query:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/getHistoryCheckYear', async (req, res) => {
    console.log('test')
    try {
        // console.log(process.env.ENV_DB_HOST)
        const query = "asdsad"
        const Dater = new Date();
        const year = Dater.getFullYear();
        console.log(year)
        const results = await mysqlDB.query
        (`SELECT * FROM checkin JOIN checkout ON checkin.chin_student = checkout.chout_student AND checkin.chin_date = checkout.chout_date WHERE YEAR(checkin.dateCreatein) = ${year} Group BY checkin.chin_student,checkin.chin_date, checkin.chin_time ORDER BY checkin.dateCreatein`)
        console.log(results)
        res.json(results)
    } catch (error) {
        console.error('Error during database query:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/getHisLeaveWork', async (req, res) => {
    // console.log('test')
    try {
        // console.log(process.env.ENV_DB_HOST)
        const results = await mysqlDB.query('SELECT * FROM leavework')
        console.log(results)
        res.json(results)
    } catch (error) {
        console.error('Error during database query:', error);
        res.status(500).send('Internal Server Error');
    }

})

app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), 'leaveworkfile', filename);
    console.log(filePath)
    // ตรวจสอบว่าไฟล์มีอยู่จริงหรือไม่
    if (fs.existsSync(filePath)) {
        res.download(filePath, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(500).send('Internal Server Error');
            }
        });
    } else {
        res.status(404).send('File not found');
    }
});

app.get('/selectStudent', async (req, res) => {
    // console.log('test')
    try {
        // console.log(process.env.ENV_DB_HOST)
        const results = await mysqlDB.query('SELECT * FROM student')
        console.log(results)
        res.json(results)
    } catch (error) {
        console.error('Error during database query:', error);
        res.status(500).send('Internal Server Error');
    }

})

app.get('/selectPlace', async (req, res) => {
    // console.log('test')
    try {
        // console.log(process.env.ENV_DB_HOST)
        const results = await mysqlDB.query('SELECT * FROM placework')
        console.log(results)
        res.json(results)
    } catch (error) {
        console.error('Error during database query:', error);
        res.status(500).send('Internal Server Error');
    }

})

app.get('/checkCheckInStudent', async (req, res) => {
    // console.log('test')
    try {
        // console.log(process.env.ENV_DB_HOST)
        const { student, datenow } = req.query;
        console.log(`date: ${datenow}, Student: ${student}`);

        const results = await mysqlDB.query('SELECT * FROM checkin WHERE chin_student = ? AND chin_date = ?', [student, datenow])
        // console.log(results)
        res.json(results)
    } catch (error) {
        console.error('Error during database query:', error);
        res.status(500).send('Internal Server Error');
    }

})

app.get('/checkGoodbyeStudent', async (req, res) => {
    // console.log('test')
    try {
        // console.log(process.env.ENV_DB_HOST)
        const { student, datenow } = req.query;
        console.log(`date: ${datenow}, Student: ${student}`);

        const results = await mysqlDB.query('SELECT * FROM leavework WHERE leavework_std = ? AND leavework_date = ?', [student, datenow])
        // console.log(results)
        res.json(results)
    } catch (error) {
        console.error('Error during database query:', error);
        res.status(500).send('Internal Server Error');
    }

})


app.get('/checkCheckOutStudent', async (req, res) => {
    // console.log('test')
    try {
        // console.log(process.env.ENV_DB_HOST)
        const { student, datenow } = req.query;
        console.log(`date: ${datenow}, Student: ${student}`);

        const results = await mysqlDB.query('SELECT * FROM checkout WHERE chout_student = ? AND chout_date = ?', [student, datenow])
        // console.log(results)
        res.json(results)
    } catch (error) {
        console.error('Error during database query:', error);
        res.status(500).send('Internal Server Error');
    }

})

// const tokenLine = 

app.post('/checkinStudent', async (req, res) => {
    try {
        const { latitude, longitude, address, timenow, student, datenow,place } = req.body;
        
        const [hours, minutes] = timenow.split(':').map(Number);
        
        let late = 0
        if (hours > 8 || (hours === 8 && minutes > 30)) {
            late=1
        }

        await mysqlDB.query('INSERT INTO checkin (chin_student, chin_date,chin_time, chin_place,locain,chin_latitude,chin_longitude,isLate) VALUES (?, ?, ?,?, ?, ?,?,?)',
            [student, datenow, timenow, place,address, latitude, longitude,late]);
        let text = '\n' + student + ' เข้างานวันที่ ' + datenow + ' เวลา ' + timenow + '\nที่ ' + address+'\nที่ทำงาน '+place
        text += late == 1 ? '\nหมายเหตุ: เข้างานสาย' : '';
        await notifyLine(process.env.TOKEN_LINE, text)

        res.status(200).send('Check-in data saved successfully');

    } catch (error) {
        console.error('Error during database query:', error);
        res.status(500).send('Internal Server Error');
    }

})

app.post('/addStudent', async (req, res) => {
    try {
        const { name } = req.body;

        const result = await mysqlDB.query('INSERT INTO Student (stdName) VALUES (?)', [name]);

        res.status(201).send(`Student added successfully`);

    } catch (error) {
        console.error('Error during database query:', error);
        res.status(500).send('Internal Server Error');
    }

})

app.post('/addPlacework', async (req, res) => {
    try {
        const { name } = req.body;

        const result = await mysqlDB.query('INSERT INTO placework (placework_name) VALUES (?)', [name]);

        res.status(201).send(`placework_name added successfully`);

    } catch (error) {
        console.error('Error during database query:', error);
        res.status(500).send('Internal Server Error');
    }

})

app.delete('/deletePlacework/:stuname', async (req, res) => {
    try {
        const { stuname } = req.params;  // Corrected from name to stuname to match the route parameter

        const result = await mysqlDB.query('DELETE FROM placework WHERE placework_name = ?', [stuname]);

        if (result.affectedRows === 0) {
            // No rows affected means no record was found and thus not deleted
            return res.status(404).send('No student found with that name');
        }

        res.status(200).send(`Student deleted successfully`);

    } catch (error) {
        console.error('Error during database query:', error);
        res.status(500).send('Internal Server Error');
    }

})

app.delete('/deleteStudent/:stuname', async (req, res) => {
    try {
        const { stuname } = req.params;  // Corrected from name to stuname to match the route parameter

        const result = await mysqlDB.query('DELETE FROM Student WHERE stdName = ?', [stuname]);

        if (result.affectedRows === 0) {
            // No rows affected means no record was found and thus not deleted
            return res.status(404).send('No student found with that name');
        }

        res.status(200).send(`Student deleted successfully`);

    } catch (error) {
        console.error('Error during database query:', error);
        res.status(500).send('Internal Server Error');
    }

})

app.post('/checkoutStudent', async (req, res) => {
    try {
        const { latitude, longitude, address, timenow, student, datenow,place } = req.body;

        await mysqlDB.query('INSERT INTO checkout (chout_student, chout_date,chout_time, chout_place,locaout,chout_latitude,chout_longitude) VALUES (?, ?, ?,?, ?, ?,?)',
            [student, datenow, timenow, place,address, latitude, longitude]);
        const text = '\n' + student + ' ออกงานวันที่ ' + datenow + ' เวลา ' + timenow + '\nที่ ' + address+'\nที่ทำงาน '+place
        await notifyLine(process.env.TOKEN_LINE, text)
        res.status(200).send('Check-in data saved successfully');

    } catch (error) {
        console.error('Error during database query:', error);
        res.status(500).send('Internal Server Error');
    }

})

app.post('/uploadLeavework', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { dateUse, studentName: stdName, date, reason } = req.body;
        const filePath = req.file.path;

        console.log('Uploaded file path:', filePath);

        const folderPath = path.join(process.cwd(), 'leaveworkfile');
        const pathName = `${stdName}_${date}_ลางาน.pdf`;
        const destinationPath = path.join(folderPath, pathName);

        console.log('Destination path:', destinationPath); // ตรวจสอบเส้นทางปลายทาง

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        fs.renameSync(filePath, destinationPath);

        await mysqlDB.query(
            'INSERT INTO leavework (leavework_std, leavework_date, leavework_detail, leavework_path) VALUES (?, ?, ?, ?)',
            [stdName, dateUse, reason, pathName]
        );

        const text = `\n${stdName} ลางานวันที่ ${dateUse}\nหมายเหตุ: ${reason}`;
        await notifyLine(process.env.TOKEN_LINE, text);

        res.status(200).send('Leavework data saved successfully');
    } catch (error) {
        console.error('Error during database query:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const query = 'SELECT * FROM login WHERE username = ?';
        const values = [username];
        const users = await mysqlDB.query(query, values); // Fetch user from the database
        // console.log(users)
        if (users) {
            console.log('testuser')
            const user = users[0];
            if (user.password === password) {
                const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(401).send('Username หรือ Password ไม่ถูกต้อง');
            }
        } else {
            res.status(401).send('Username หรือ Password ไม่ถูกต้อง');
        }
    } catch (error) {
        console.error('Error during database query:', error);
        res.status(500).send('Username หรือ Password ไม่ถูกต้อง');
    }
});

app.post('/uploadLeavework', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const stdName = req.body.studentName;
        const date = req.body.date;
        const filePath = req.file.path;

        console.log('Uploaded file path:', filePath); // ตรวจสอบว่าไฟล์ถูกอัปโหลดที่ไหน

        const folderPath = `leaveworkfile`;
        const pathName = `${stdName}_${date}_ลางาน.pdf`;
        
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        const destinationPath = path.join(folderPath, pathName);
        console.log('Destination path:', destinationPath); // ตรวจสอบเส้นทางปลายทาง

        fs.rename(filePath, destinationPath, (err) => {
            if (err) {
                console.error('Error moving file:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            res.json({ message: 'Successfully uploaded' });
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
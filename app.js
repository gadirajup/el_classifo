const express = require('express')
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')

// Setup Multer
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
}).single('myImage');

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images only');
    }
}

// Setup express
const app = express()
const port = process.env.PORT || 5000

// Setup EJS
app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'))

app.post('/', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('index', {
                msg: err
            })
        } else {
            if(req.file == undefined) {
                res.render('index', {
                    msg: "Error: No File Selected"
                })
            } else {
                // Upload Success
                res.render('index', {
                    msg: "File Uploaded",
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    })
})

app.use(function(req, res) {
    res.type('text/plain')
    res.status(404)
    res.send('404')
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
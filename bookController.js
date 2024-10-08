const Book = require('../models/Book');
const multer = require('multer');
const path = require('path');

// ���� multer �洢����
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// �ϴ��鼮
exports.uploadBook = upload.single('book'), async (req, res) => {
    const { title, author, userId } = req.body;
    const book = new Book({
        title,
        author,
        userId,
        file: req.file.path,
    });
    await book.save();
    res.status(201).json({ message: 'Book uploaded', book });
};

// ��ȡ�鼮�б�
exports.getBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
};

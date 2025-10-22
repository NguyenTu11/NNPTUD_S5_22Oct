const express = require('express');
const router = express.Router();
const path = require('path');
const { uploadAvatar } = require('../utils/uploadHandler');
const { Response } = require('../utils/responseHandler');
const { isAuthenticated } = require('../utils/authHandler');

router.get('/upload', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/uploadAvatar.html'));
});

router.post('/upload', isAuthenticated, (req, res, next) => {
    uploadAvatar(req, res, function (err) {
        if (err) {
            return Response(res, 400, false, err.message);
        }
        const avatarURL = `${req.protocol}://${req.get('host')}/uploads/avatars/${req.file.filename}`;
        Response(res, 200, true, { avatarURL });
    });
});

module.exports = router;
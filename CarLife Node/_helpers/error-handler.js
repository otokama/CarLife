module.exports = errorHandler;
const path = require('path');

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {

        return  res.sendFile(path.join(__dirname, `../../Carlife_angular/dist/HW2/index.html`));
        // jwt authentication error
        //res.redirect('/#');
        // return res.status(401).json({ message: 'Unauthorized'});
    }

    // default to 500 server error
    console.log("Error:", err);
    return res.status(500).json({ message: err.message });
}


function handleError(err,req, res, next) {
    if (err) {
        res.status(err.status ?? 500).json(err);
    }
    else {
        next();
    }
}

module.exports = handleError;
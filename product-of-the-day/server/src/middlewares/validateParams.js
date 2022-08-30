const validatePostParams = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body);
    if (error) {
        res.status(422)
            .send(error.details[0].message);
    } else {
        next();
    }
};

const validateGetParams = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.query);
    if (error) {
        res.status(422)
            .send(error.details[0].message);
    } else {
        next();
    }
};

module.exports = {validatePostParams, validateGetParams}

const Joi = require('joi');

const newPostSchema = Joi.object().keys({
    authorComment: Joi.string().required().min(1).max(500),
    hashtag: Joi.string().max(255).lowercase(),
});

module.exports = { newPostSchema };

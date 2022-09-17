import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IPet } from '../models/psmodels';
import Logging from '../library/Logging';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);

            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    petstore: {
        create: Joi.object<IPet>({
            owner: Joi.string().required(),
            pet: Joi.string().required(),
            age: Joi.number().required(),
            type: Joi.string().required(),
            gender: Joi.string().required()
        }),
        update: Joi.object<IPet>({
            owner: Joi.string().required(),
            pet: Joi.string().required(),
            age: Joi.number().required(),
            type: Joi.string().required(),
            gender: Joi.string().required()
        })
    }
};

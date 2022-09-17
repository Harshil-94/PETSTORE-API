import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import petstore from '../models/psmodels';

const createData = (req: Request, res: Response, next: NextFunction) => {
    const { owner, pet, age, type, gender } = req.body;

    const data = new petstore({
        _id: new mongoose.Types.ObjectId(),
        owner,
        pet,
        age,
        type,
        gender
    });

    return data
        .save()
        .then((data) => res.status(201).json({ data }))
        .catch((error) => res.status(500).json({ error }));
};

const readData = (req: Request, res: Response, next: NextFunction) => {
    const petId = req.params.petId;

    return petstore
        .findById(petId)
        .then((data) => (data ? res.status(200).json({ data }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return petstore
        .find()
        .then((data) => res.status(200).json({ data }))
        .catch((error) => res.status(500).json({ error }));
};

const updateData = (req: Request, res: Response, next: NextFunction) => {
    const petId = req.params.petId;

    return petstore
        .findById(petId)
        .then((data) => {
            if (data) {
                data.set(req.body);

                return data
                    .save()
                    .then((data) => res.status(201).json({ data }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteData = (req: Request, res: Response, next: NextFunction) => {
    const petId = req.params.petId;

    return petstore
        .findByIdAndDelete(petId)
        .then((data) => (data ? res.status(201).json({ data, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createData, readData, readAll, updateData, deleteData };

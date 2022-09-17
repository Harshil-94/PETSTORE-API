"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const psmodels_1 = __importDefault(require("../models/psmodels"));
const createData = (req, res, next) => {
    const { owner, pet, age, type, gender } = req.body;
    const data = new psmodels_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
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
const readData = (req, res, next) => {
    const petId = req.params.petId;
    return psmodels_1.default
        .findById(petId)
        .then((data) => (data ? res.status(200).json({ data }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req, res, next) => {
    return psmodels_1.default
        .find()
        .then((data) => res.status(200).json({ data }))
        .catch((error) => res.status(500).json({ error }));
};
const updateData = (req, res, next) => {
    const petId = req.params.petId;
    return psmodels_1.default
        .findById(petId)
        .then((data) => {
        if (data) {
            data.set(req.body);
            return data
                .save()
                .then((data) => res.status(201).json({ data }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: 'not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteData = (req, res, next) => {
    const petId = req.params.petId;
    return psmodels_1.default
        .findByIdAndDelete(petId)
        .then((data) => (data ? res.status(201).json({ data, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createData, readData, readAll, updateData, deleteData };

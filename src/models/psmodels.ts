import { number, string } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export interface IPet {
    owner: string;
    pet: string;
    age: Number;
    type: string;
    gender: string;
}

export interface IPetModel extends IPet, Document {}

const petstoreSchema: Schema = new Schema(
    {
        owner: { type: String, required: true },
        pet: { type: String, required: true },
        age: { type: Number, required: true },
        type: { type: String, required: true },
        gender: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IPetModel>('petstore', petstoreSchema);

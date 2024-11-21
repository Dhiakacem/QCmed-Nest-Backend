import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    dateNaissance: { type: Date, required: true },
    faculté: { type: String, required: true },
    statu: { type: String, required: true },
    anneeUniversitaire: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export interface User extends Document {
  id: string;
  nom: string;
  prenom: string;
  mail: string;
  dateNaissance: Date;
  faculté: string;
  statu: string;
  anneeUniversitaire: string;
  password: string;
}

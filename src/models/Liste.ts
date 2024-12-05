import mongoose from 'mongoose';
import MusiqueSchema from './Musique';
const Schema = mongoose.Schema;

// Schéma pour Liste
const ListeSchema = new Schema({
    _id: { type: String },
    utilisateur_id: {
        type: String,
        validate: {
            validator: function (v: String) {
                return v.length > 0;
            },
            message: 'La liste n\'est pas associée à un utilisateur.'
        }
    },
    nom: {
        type: String,
        required: [true, 'Le nom de la liste est requis.'],
        minlength: [1, 'Le nom de la liste doit avoir au moins 1 caractère.'],
        maxlength: [100, 'Le nom de la liste ne peut pas dépasser 100 caractères.']
    },
    musiques: {
        type: [MusiqueSchema],
        validate: {
            validator: function (v: Array<typeof MusiqueSchema>) {
                return v.length > 0;
            },
            message: 'Il doit y avoir au moins une musique dans la liste.'
        }
    }
});

export type ListeType = mongoose.InferSchemaType<typeof ListeSchema>;

export const ListeModel = mongoose.model('musiques', ListeSchema);

export default ListeSchema;
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Schéma pour Liste
const ListeSchema = new Schema({
    _id: { type: String },
    utilisateur_uid: {
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
    musiques: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Musiques' }]
});

// Define an interface that includes the musiques field
export interface ListeDocument extends Document {
    _id: string;
    utilisateur_uid: string;
    nom: string;
    musiques: mongoose.Types.ObjectId[];
}


export type ListeType = mongoose.InferSchemaType<typeof ListeSchema>

export const ListeModel = mongoose.model('Listes', ListeSchema);

export default ListeSchema;

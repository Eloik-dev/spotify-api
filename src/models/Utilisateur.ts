import mongoose from 'mongoose';
import ListeSchema from './Liste';
const Schema = mongoose.Schema;

// Schéma pour Utilisateur
const UtilisateurSchema = new Schema({
    _id: { type: String },
    listes: {
        type: [ListeSchema],
        validate: {
            validator: function (v: Array<typeof ListeSchema>) {
                return v.length > 0;
            },
            message: 'Il doit y avoir au moins une liste de lecture.'
        }
    }
});

export type UtilisateurType = mongoose.InferSchemaType<typeof UtilisateurSchema>;

export const UtilisateurModel = mongoose.model('utilisateurs', UtilisateurSchema);

export default UtilisateurSchema;
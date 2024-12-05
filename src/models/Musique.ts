import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Schéma pour Musique
const MusiqueSchema = new Schema({
    _id: { type: String },
    nom: {
        type: String,
        required: [true, 'Le nom de la musique est requis.'],
        minlength: [1, 'Le nom de la musique doit avoir au moins 1 caractère.'],
        maxlength: [100, 'Le nom de la musique ne peut pas dépasser 100 caractères.']
    },
    lien: {
        type: String,
        required: [true, 'Le lien de la musique est requis.'],
        match: [/^https?:\/\/.*\.(?:mp3|mp4|youtube\.com\/watch\?v=)/, 'Le lien doit être une URL valide.']
    },
    artistes: {
        type: [String],
        validate: {
            validator: function (v: String) {
                return v.length > 0;
            },
            message: 'Il doit y avoir au moins un artiste.'
        }
    },
    likes: {
        type: Number,
        min: [0, 'Le nombre de likes ne peut pas être négatif.']
    },
    dislikes: {
        type: Number,
        min: [0, 'Le nombre de dislikes ne peut pas être négatif.']
    },
    archive: {
        type: Boolean,
        default: false
    },
    datePublication: {
        type: Date,
        required: [true, 'La date de publication est requise.']
    }
});

export type MusiqueType = mongoose.InferSchemaType<typeof MusiqueSchema>;

export const MusiquesModel = mongoose.model('musiques', MusiqueSchema);

export default MusiqueSchema;
import mongoose, { Model } from 'mongoose';
import BaseRepo from './BaseRepo';
import { MusiquesModel, MusiqueType } from '@src/models/Musique';
import ListeRepo from './ListeRepo';

export default class MusiqueRepo extends BaseRepo<MusiqueType> {
    model: Model<MusiqueType> = MusiquesModel;

    /**
     * Recherche des musiques dans une liste de lecture
     *
     * @param {string} liste_id Le id de la liste dans laquelle chercher des musiques
     * @param {string} recherche La valeur à rechercher dans le nom
     */
    async findBySearch(liste_id: string, recherche: string = "") {
        const liste = await (new ListeRepo()).getOne(liste_id);

        if (!liste) {
            return [];
        }

        // Filtrer les musiques avec le nom et/ou les artistes d'une musique 
        return liste.musiques.filter((musique) =>
            musique.nom.toLowerCase().includes(recherche.toLowerCase()) ||
            musique.artistes.some((artiste) =>
                artiste.toLowerCase().includes(recherche.toLowerCase())
            )
        );
    }


    /**
     * Ajoute une nouvelle musique pour une liste
     *
     * @param {MusiqueType} musique La musique à ajouter
     * @param {string} liste_id L'ID de la liste pour laquelle ajouter la musique
     */
    async insert(musique?: MusiqueType, liste_id?: string): Promise<void> {
        const newMusique = new MusiquesModel(musique);
        const id = new mongoose.Types.ObjectId();
        newMusique._id = id.toString();
        await newMusique.save();

        const liste = await (new ListeRepo()).getOne(liste_id);
        if (!liste) {
            throw new Error('Liste not found.');
        }

        if (!newMusique._id) {
            throw new Error('Musique non valide.');
        }

        liste.musiques.push(newMusique);
        await liste.save();
    }

    /**
     * Met à jour une musique existante
     *
     * @param {string} musique_id L'ID de la musique à mettre à jour
     * @param {Partial<MusiqueType>} musiqueData Les nouvelles données de la musique
     */
    async update(musique_id: string, musiqueData: Partial<MusiqueType>): Promise<void> {
        const musique = await MusiquesModel.findById(musique_id);

        if (!musique) {
            throw new Error('Musique not found.');
        }

        if (musiqueData.nom !== undefined) musique.nom = musiqueData.nom;
        if (musiqueData.lien !== undefined) musique.lien = musiqueData.lien;
        if (musiqueData.artistes !== undefined) musique.artistes = musiqueData.artistes;
        if (musiqueData.likes !== undefined) musique.likes = musiqueData.likes;
        if (musiqueData.dislikes !== undefined) musique.dislikes = musiqueData.dislikes;
        if (musiqueData.archive !== undefined) musique.archive = musiqueData.archive;
        if (musiqueData.datePublication !== undefined) musique.datePublication = musiqueData.datePublication;

        await musique.save();
    }

    /**
     * Supprime une musique
     *
     * @param {string} liste_id L'id de la musique à supprimer
     */
    delete(liste_id?: string) {
        return this.model.deleteOne({ _id: liste_id });
    }
}
import { ListeModel, ListeType } from '@src/models/Liste';
import mongoose, { Model } from 'mongoose';
import BaseRepo from './BaseRepo';
import { MusiqueType } from '@src/models/Musique';

export default class ListeRepo extends BaseRepo<ListeType> {
    model: Model<ListeType> = ListeModel;

    /**
     * Retourne une liste associée à un utilisateur
     *
     * @param {string} utilisateur_uid Le uid de l'utilisateur
     * @param {string} id Le id de la liste à retrouver
     */
    getOne(utilisateur_uid?: string, id?: string) {
        return this.model.findOne({
            _id: id,
            utilisateur_uid,
        }).populate<{ musiques: MusiqueType[] }>('musiques');
    }

    /**
     * Retourne les listes associees à un utilisateur
     *
     * @param {string} utilisateur_uid Le uid de l'utilisateur
     */
    getAllByUser(utilisateur_uid?: string) {
        return this.model.find({
            utilisateur_uid,
        }).populate<{ musiques: MusiqueType[] }>('musiques');
    }

    /**
     * Retourne les factures associees a un service
     *
     * @param {string} utilisateur_uid Le uid de l'utilisateur
     * @param {string} recherche La valeur à rechercher dans le nom
     */
    findBySearch(utilisateur_uid?: string, recherche?: string) {
        const query: any = {};
        query.utilisateur_uid = utilisateur_uid;
        query.$text = { $search: recherche };
        return this.model.find(query);
    }

    /**
     * Ajoute une nouvelle liste
     *
     * @param {ListeType} liste La liste à ajouter
     */
    insert(liste?: ListeType) {
        console.log(liste)
        const id = new mongoose.Types.ObjectId();
        liste!._id = id.toString();
        return this.model.create(liste);
    }

    /**
     * Met à jour une liste
     *
     * @param {string} utilisateur_uid Le uid de l'utilisateur
     * @param {string} id L'id de la liste à mettre à jour
     * @param {ListeType} liste La liste à mettre à jour
     */
    update(utilisateur_uid?: string, id?: string, liste?: ListeType) {
        return this.model.updateOne({ _id: id, utilisateur_uid }, liste).populate<{ musiques: MusiqueType[] }>('musiques');
    }

    /**
     * Supprime une liste
     *
     * @param {string} utilisateur_uid Le uid de l'utilisateur
     * @param {string} liste_id L'id de la liste à supprimer
     */
    delete(utilisateur_uid?: string, liste_id?: string) {
        return this.model.deleteOne({ _id: liste_id, utilisateur_uid });
    }
}
import { ListeModel, ListeType } from '@src/models/Liste';
import { Model } from 'mongoose';
import BaseRepo from './BaseRepo';

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
        });
    }

    /**
     * Retourne les listes associees à un utilisateur
     *
     * @param {string} utilisateur_uid Le uid de l'utilisateur
     */
    getAllByUser(utilisateur_uid?: string) {
        return this.model.find({
            utilisateur_uid,
        });
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
}
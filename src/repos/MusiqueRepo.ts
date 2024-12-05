import { Model } from 'mongoose';
import BaseRepo from './BaseRepo';
import { MusiquesModel, MusiqueType } from '@src/models/Musique';
import ListeRepo from './ListeRepo';

export default class MusiqueRepo extends BaseRepo<MusiqueType> {
    model: Model<MusiqueType> = MusiquesModel;

    /**
     * Recherche des musiques dans une liste de lecture
     *
     * @param {string} utilisateur_uid Le uid de l'utilisateur
     * @param {string} liste_id Le id de la liste dans laquelle chercher des musiques
     * @param {string} recherche La valeur à rechercher dans le nom
     */
    async findBySearch(utilisateur_uid: string, liste_id: string, recherche: string = "") {
        const liste = await (new ListeRepo()).getOne(utilisateur_uid, liste_id);

        if (!liste) {
            return [];
        }

        // Filtrer les musiques avec le paramètre de recherche
        return liste.musiques.filter((musique) =>
            musique.nom.toLowerCase().includes(recherche.toLowerCase())
        );
    }
}
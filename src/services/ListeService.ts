import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { FirebaseRequest } from "@src/firebase/authentificationFirebase";
import { ListeType } from "@src/models/Liste";
import ListeRepo from "@src/repos/ListeRepo";
import check from "@src/routes/common/check";
import { Response } from "express";

export default class ListeService {
    /**
     * Gère la requête GET /listes pour retourner toutes les listes d'un utilisateur
     */
    static async getAll(req: FirebaseRequest, res: Response) {
        const listes = await (new ListeRepo).getAllByUser(req.uid);
        res.status(HttpStatusCodes.OK).json(listes);
    }

    /**
     * Gère la requête GET /listes/:id pour retourner une liste par son id
     */
    static async get(req: FirebaseRequest, res: Response) {
        const liste_id = req.params.id;
        const liste = await (new ListeRepo).getOne(liste_id);

        res.status(HttpStatusCodes.OK).json(liste);
    }

    /**
     * Gère la requête POST /listes/search pour rechercher des listes par leur nom
     */
    static async search(req: FirebaseRequest, res: Response) {
        const recherche = req.body.recherche;
        const listes = await (new ListeRepo).findBySearch(req.uid, recherche);

        res.status(HttpStatusCodes.OK).json(listes);
    }

    /**
     * Gère la requête POST /listes/add pour ajouter une liste
     */
    static async create(req: FirebaseRequest, res: Response) {
        const nom = check.isStr(req.body, 'nom');

        const liste: ListeType = {
            utilisateur_uid: req.uid,
            nom,
            musiques: []
        }

        const nouvelleListe = await (new ListeRepo).insert(liste);
        res.status(HttpStatusCodes.CREATED).json(nouvelleListe);
    }

    /**
     * Gère la requête PUT /listes/update pour mettre à jour une liste
     */
    static async update(req: FirebaseRequest, res: Response) {
        const id = check.isStr(req.body, 'id');
        const nom = check.isStr(req.body, 'nom');

        const liste: any = {
            nom
        }

        const listeModifiee = await (new ListeRepo).update(req.uid, id, liste);
        res.status(HttpStatusCodes.OK).json(listeModifiee);
    }

    /**
     * Gère la requête DELETE /listes/delete/:id pour supprimer une liste
     */
    static async delete(req: FirebaseRequest, res: Response) {
        const id = req.params.id;
        await (new ListeRepo).delete(req.uid, id);
        res.status(HttpStatusCodes.OK).json({});
    }
}
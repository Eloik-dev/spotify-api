import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { FirebaseRequest } from "@src/firebase/authentificationFirebase";
import { MusiqueType } from "@src/models/Musique";
import MusiqueRepo from "@src/repos/MusiqueRepo";
import check from "@src/routes/common/check";
import { Response } from "express";

export default class ListeService {
    /**
     * Gère la requête POST /musiques/search pour rechercher des musiques par leur nom dans une liste
     */
    static async search(req: FirebaseRequest, res: Response) {
        const liste_id = check.isStr(req.body, 'liste_id');
        const recherche = req.body.recherche;
        const musiques = await (new MusiqueRepo).findBySearch(liste_id, recherche);

        res.status(HttpStatusCodes.OK).json(musiques);
    }

    /**
     * Gère la requête POST /musiques/create pour ajouter une musique dans une liste
     */
    static async create(req: FirebaseRequest, res: Response) {
        const liste_id = check.isStr(req.body, 'liste_id');
        const nom = check.isStr(req.body, 'nom');
        const lien = check.isStr(req.body, 'lien');
        const artistes = check.isArr(req.body, 'artistes');
        const likes = check.isNum(req.body, 'likes');
        const dislikes = check.isNum(req.body, 'dislikes');
        const archive = check.isBool(req.body, 'archive');
        const datePublication = check.isDate(req.body, 'datePublication');

        const musique: MusiqueType = {
            _id: undefined,
            nom,
            lien,
            artistes,
            likes,
            dislikes,
            archive,
            datePublication,
        };

        const nouvelleMusique = await (new MusiqueRepo()).insert(musique, liste_id);
        res.status(HttpStatusCodes.CREATED).json(nouvelleMusique);
    }

    /**
     * Gère la requête PUT /musiques/update pour mettre à jour une musique
     */
    static async update(req: FirebaseRequest, res: Response) {
        // Validate and extract data from request body
        const id = check.isStr(req.body, 'id');
        const nom = check.isStr(req.body, 'nom');
        const lien = check.isStr(req.body, 'lien');
        const artistes = check.isArr(req.body, 'artistes');
        const likes = check.isNum(req.body, 'likes');
        const dislikes = check.isNum(req.body, 'dislikes');
        const archive = check.isBool(req.body, 'archive');
        const datePublication = check.isDate(req.body, 'datePublication');

        // Create the updated liste object
        const musique: Partial<MusiqueType> = {
            nom,
            lien,
            artistes,
            likes,
            dislikes,
            archive,
            datePublication,
        };

        // Update the liste in the repository
        const musiqueModifiee = await (new MusiqueRepo()).update(id, musique);
        res.status(HttpStatusCodes.OK).json(musiqueModifiee);
    }

    /**
     * Gère la requête DELETE /musiques/delete/:id pour supprimer une musique
     */
    static async delete(req: FirebaseRequest, res: Response) {
        const id = req.params.id;
        await (new MusiqueRepo()).delete(id);
        res.status(HttpStatusCodes.OK).json({});
    }
}
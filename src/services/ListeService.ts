import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { FirebaseRequest } from "@src/firebase/authentificationFirebase";
import ListeRepo from "@src/repos/ListeRepo";
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
     * Gère la requête POST /listes pour retourner toutes les listes d'un utilisateur
     */
    static async getAll(req: FirebaseRequest, res: Response) {
        const listes = await (new ListeRepo).getAllByUser(req.uid);
        res.status(HttpStatusCodes.OK).json(listes);
    }
}
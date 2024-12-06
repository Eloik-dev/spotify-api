import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { FirebaseRequest } from "@src/firebase/authentificationFirebase";
import { Request, Response } from "express";

export default class ListeService {
    /**
     * Gère la requête POST /musiques/search pour rechercher des musiques par leur nom dans une liste
     */
    static async search(req: FirebaseRequest, res: Response) {
    }

    /**
     * Gère la requête POST /musiques/add pour ajouter une musique dans une liste
     */
    static async add(req: FirebaseRequest, res: Response) {
    }

    /**
     * Gère la requête PUT /musiques/update pour mettre à jour une musique
     */
    static async update(req: FirebaseRequest, res: Response) {
    }

    /**
     * Gère la requête DELETE /musiques/delete/:id pour supprimer une musique
     */
    static async delete(req: FirebaseRequest, res: Response) {
    }

}
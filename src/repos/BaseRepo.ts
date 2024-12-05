import { Model } from "mongoose";

export default abstract class BaseRepo<T> {
    protected abstract model: Model<T>;
}
import { ForkDetailModel } from "./ForkDetailModel";

export class GistDetailModel {
    public id: string;
    public owner: string;
    public filename: string;
    public description: string;
    public languagetag: string;
    public rawurl: string;
    public forksList: ForkDetailModel[];
}
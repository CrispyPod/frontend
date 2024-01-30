import { guidGenerator } from "$lib/helpers/randomGenerator";


export class HeaderObject {
    key: string;
    value: string;
    id: string ;

    constructor(key: string, value: string) {
        this.id = guidGenerator();
        this.key = key;
        this.value = value;
    }
}
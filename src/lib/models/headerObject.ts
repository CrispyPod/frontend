export function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

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
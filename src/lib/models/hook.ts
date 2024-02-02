export class Hook {
    id: string | null;
    name: string;
    trigger: number;
    enabled: boolean;
    webURL: string;
    method: string;
    headers: string | null = null;
    appendBody: string | null = null;
    createTime: Date | null = null;
    modifyTime: Date | null = null;


    constructor(
        id: string,
        name: string,
        trigger: number,
        enabled: boolean,
        webURL: string,
        method: string,
        createTime: Date,
        modifyTime: Date,
    ) {
        this.id = id;
        this.name = name;
        this.trigger = trigger;
        this.enabled = enabled;
        this.webURL = webURL;
        this.method = method;
        this.createTime = createTime;
        this.modifyTime = modifyTime;
    }

    static TriggerNames: Map<number, string> = new Map([
        [0, "Site Config Changed"],
        [1, "Episode Visibility Changed"],
        [2, "Published Episode Changed"]
    ]);

}
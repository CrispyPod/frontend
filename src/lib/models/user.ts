class User {
    id: string;
    email: string;
    userName: string;
    displayName: string;
    createTime: Date;

    constructor(id: string, email: string, userName: string, displayName: string, createTime: Date) {
        this.id = id;
        this.email = email;
        this.userName = userName;
        this.displayName = displayName;
        this.createTime = createTime;
    }
}
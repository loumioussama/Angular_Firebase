export class Upload {
    $key : string;
    file : File;
    name : string;
    url : string;
    progress : number;
    createdAt : Date = new Date();
    author:string;
    constructor(file : File) {
        this.file = file;
    }

}

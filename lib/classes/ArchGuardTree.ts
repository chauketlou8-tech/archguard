export class ArchGuardTree {
    public root: string;
    public children: this[];

    constructor(root: string) {
        this.root = root;
        this.children = []
    }
}
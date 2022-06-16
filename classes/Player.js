var shortId= require("shortid");
const Vector3D = require("./Vector3D");
module.exports=class player{
    constructor(){
        this.username=""
        this.id=shortId.generate();
        this.position= new Vector3D();
    }
}
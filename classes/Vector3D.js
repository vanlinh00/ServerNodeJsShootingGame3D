module.exports=class Vector3D{
    constructor(X=0,Y=0,Z=0){
        this.x=X;
        this.y=Y; 
        this.z=Z;
    }
    OutPutVector3D()
    {
        return '('+this.x,+','+this.y+','+this.z+')';
    }
}
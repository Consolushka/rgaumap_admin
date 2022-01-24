class Room{
    id
    name
    flr
    owner
    fac
    purpose

    constructor(id, name,floor,cathedra,fac,purpose) {
        this.id = id;
        this.name = name;
        this.flr = floor;
        this.owner = cathedra;
        this.fac = fac;
        if(purpose === undefined){
            purpose = new RoomPurpose(0,"");
        }
        this.purpose = purpose;
        console.log(purpose)
    }
}

class Owner{
    id
    name

    constructor(id,name) {
        this.id=id;
        this.name = name;
    }
}

class Fac{
    id
    name

    constructor(id,name) {
        this.id=id;
        this.name = name;
    }
}

class RoomPurpose {
    id
    name

    constructor(id, name) {
        this.id = id;
        this.name = name;
        console.log(this);
    }
}

export {Room, Owner, Fac, RoomPurpose}
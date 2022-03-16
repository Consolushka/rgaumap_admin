import {blds, caths, rps, facs} from '../classes/web2p';

let buildings = [];
let cathedras = [];
let facss = [];

if(blds === undefined){
    // eslint-disable-next-line no-undef
    blds = [];
    // eslint-disable-next-line no-undef
    caths = [];
    // eslint-disable-next-line no-undef
    rps = [];
    // eslint-disable-next-line no-undef
    facs = [];
}

JSON.parse(blds).forEach((building)=>{
    buildings.push({name: building.name, id: building.id, purpose: building.purpose, rooms: building.rooms});
});

JSON.parse(caths).forEach((cath)=>{
    cathedras.push({name: cath.name, id: cath.id});
})
console.log(cathedras);

JSON.parse(facs).forEach((fac)=>{
    facss.push({name: fac.name, id: fac.id});
})
console.log(facss);

export {buildings, caths, facss, rps}
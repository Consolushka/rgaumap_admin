import {blds, caths, rps, facs} from '../../public/web2p';

let buildings = [];
let cathedras = [];
let facss = [];

if(blds === undefined){
    // eslint-disable-next-line no-undef
    blds = builds;
    // eslint-disable-next-line no-undef
    caths = cathes;
    // eslint-disable-next-line no-undef
    rps = rpes;
    // eslint-disable-next-line no-undef
    facs = faces;
}

blds.forEach((building)=>{
    buildings.push({name: building.name, id: building.id, purpose: building.purpose});
});

caths.forEach((cath)=>{
    cathedras.push({name: cath.name, id: cath.id});
})

facs.forEach((fac)=>{
    facss.push({name: fac.name, id: fac.id});
})

export {blds, buildings, caths, facss, rps}
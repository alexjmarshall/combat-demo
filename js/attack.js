import * as Constant from "./constants.js";

export const attack = (() => {
  let attackerId;

  return (actors) => {

    if (!attackerId) {
      attackerId = actors[0]._id;
    }

    const attackingActor = actors.find(a => a._id === attackerId);
    const targetActor = actors.find(a => a._id !== attackerId);

    

    attackerId = targetActor._id;

    return {
      text: `${attackingActor.name} dealt ${damage} damage to ${targetActor.name}!
      `,
    } 

  }
})();

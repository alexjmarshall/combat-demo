import { armors } from "./armors.js"
import { weapons } from "./weapons.js"
import * as Constant from "./constants.js"

const armorLoadoutA = [
  armors['Large Wooden Shield'],
  armors['Gambeson'],
  armors['Padded Leggings'],
  armors['Iron Cuirass'],
];

const armorLoadoutB = [
  armors['Gambeson'],
  armors['Chain Hauberk'],
  armors['Padded Coif'],
  armors['Chain Coif'],
];

const weaponLoadoutA = [
  weapons['Battle Axe'],
];

const weaponLoadoutB = [
  weapons['Longsword'],
  weapons['Dagger'],
];

export const actors = [
  {
    _id: 1,
    name: 'B/X Bandit',
    hp: 20,
    armors: armorLoadoutA,
    weapons: weaponLoadoutA,
    ac: getAc(armorLoadoutA, weaponLoadoutA),
  },
  {
    _id: 2,
    name: 'Player One',
    hp: 20,
    armors: armorLoadoutB,
    weapons: weaponLoadoutB,
    ac: getAc(armorLoadoutB, weaponLoadoutB),
  },
];

console.log(actors);

function getAc(armors, weapons) {

  const parryItem =  weapons.filter(i => i.atk_mode === 'parry');
  const parryBonus = Number(parryItem?.parry_bonus) || 0;
  const parry = {
    parry_item_id: parryItem?._id,
    parry_bonus: parryBonus,
  };

  const ac = { parry, total: {} };

  // ac and dr for every body location
  for (const dmgType of Constant.DMG_TYPES) {
    ac.total[dmgType] = {
      ac: 0,
      dr: 0,
    }
  }

  for (const [k,v] of Object.entries(Constant.HIT_LOCATIONS)) {
    ac[k] = {};
    const coveringItems = armors.filter(i => i.coverage?.includes(k));
    const garments =  coveringItems.filter(i => !i.shield);
    
    const shield = coveringItems.find(i => i.shield);

    // worn ac & dr
    for (const dmgType of Constant.DMG_TYPES) {

      const shieldBonus = shield?.base_ac + Constant.ARMOR_VS_DMG_TYPE[shield?.material]?.[dmgType].ac || 0;
      const armorAcs = garments.map(i => ({ 
        _id: i._id,
        ac: i.base_ac + Constant.ARMOR_VS_DMG_TYPE[i.material][dmgType].ac,
      }));

      // the best AC is used for this hit location
      const wornAc = Math.max(0, ...armorAcs.map(i => i.ac)) + Constant.AC_MIN;
      const locAc = wornAc + parryBonus;

      // damage reduction is cumulative, with a max of 2
      const locDr = Math.min(2, garments.reduce((sum, i) => sum + Constant.ARMOR_VS_DMG_TYPE[i.material][dmgType].dr, 0));

      // sort armor by AC, with shield first
      let sorted_armor_ids = armorAcs.sort((a,b) => b.ac - a.ac).map(i => i._id);
      if (shield?._id) {
        sorted_armor_ids = [shield._id, ...sorted_armor_ids];
      }

      ac[k][dmgType] = { ac: locAc, dr: locDr, sorted_armor_ids, shield_bonus: shieldBonus };

      ac.total[dmgType].ac += (locAc * v.weights[0] + locAc * v.weights[1]) / 200;
      ac.total[dmgType].dr += (locDr * v.weights[0] + locDr * v.weights[1]) / 200;
    }
  }

  // round ac total values
  for (const v of Object.values(ac.total)) {
    v.ac = Math.round(v.ac);
    v.dr = Math.round(v.dr);
  }

  return ac;
}

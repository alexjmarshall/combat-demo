import * as Constant from "./data/constants.js";

export const attack = (() => {
  let attackerId;

  const applyArmor = (armor) => {
    const currentAC = armor?.base_ac;
    const maxAc = armor?.base_ac;

    return Math.random() <= currentAC / maxAc; 
  }

  const selectRandom = (arr) => {
    const res = Math.floor(Math.random() * arr.length);
    return arr[res];
  };

  const rollDice = (numSides) => {
    return Math.ceil( Math.random() * Number(numSides) );
  };


  return (actors) => {

    if (!attackerId) {
      attackerId = actors[0]._id;
    }

    let chatMsgData = '';

    const attacker = actors.find(a => a._id === attackerId);
    const target = actors.find(a => a._id !== attackerId);
    const weapon = attacker.weapon;
    
    const attackerSize = Constant.SIZE_VALUES[attacker.size];
    const targetSize = Constant.SIZE_VALUES[target.size];

  
    const weapName = weapon.name;
    const weapSpeed = weapon.speed || 10 - attackerSize;
    const targetWeapSpeed = target.weapon.speed || 10 - targetSize;
    const weapSize = Constant.SIZE_VALUES[weapon.size];
    let weapDmg = weapon.dmg;
    let weapAtkMod = weapon.atk_mod || 0;
    let sitAtkMod = 0;
  
    // weapon tags
    const bonusToShields = !!weapon.bonus_to_shields;
    const bleedBonus = !!weapon.bleed_bonus;
    const chainWeapon = !!weapon.chain_weapon;
    const fragile = !!weapon.fragile;
    const unwieldy = !!weapon.unwieldy;
    const atkMode = weapon.atk_mode;
  
    let dmgType = Constant.ATK_MODES[atkMode]?.DMG_TYPE || 'blunt';
    let atkForm = Constant.ATK_MODES[atkMode]?.ATK_FORM || 'attack';
    
    // situational mods
    // -3 if target is size S and attacker is bigger than medium
    if (targetSize === 1 && attackerSize > 2) sitAtkMod -= 3;
    // -2 if target is size T and attacker is medium
    if (targetSize === 0 && attackerSize === 2) sitAtkMod -= 2;
    // -4 if target is size T and attacker is bigger than medium
    if (targetSize === 0 && attackerSize > 2) sitAtkMod -= 4;

    // chance of second attack by weapon speed
    const speedDiff = weapSpeed - targetWeapSpeed;
    const followAttackChance = speedDiff * 2;
    let followAttack = false;
    if ( speedDiff > 0 && rollDice(100) <= followAttackChance) {
      followAttack = true;
    }

    // total attack result
    const d20Result = rollDice(20);
    let totalAtkResult = Math.max(1, d20Result + weapAtkMod + sitAtkMod);

    // strings to compose chat output
    let hitDesc = '';
    let missDesc = '';
    let resultText = '';
    let dmgEffect = '';

    // armor values
    let dr = Number(target.ac.total[dmgType]?.dr) || 0;
    let targetAc = Number(target.ac.total[dmgType]?.ac);
    let targetTouchAc = Constant.AC_MIN;
    let unarmoredAc = targetTouchAc + (Constant.ARMOR_VS_DMG_TYPE.none[dmgType]?.ac || 0);
    let shieldBonus = Number(target.ac?.total[dmgType]?.shield_bonus);
    let isHit = true;
    
    let injuryObj = {};
    const targetHp = target.hp;
    const minorBleedDesc = ' and the wound bleeds heavily';
    const majorBleedDesc = ' and blood spurts from the wound!';
  
    
    let rolledWeapDmg = rollDice(weapDmg);
    const maxWeapDmg = weapDmg;
    let weapDmgResult = rolledWeapDmg;
    
    let hitLoc = '';
    let coverageArea = '';
    const deepImpaleAreas = ['chest','gut','thigh'];
    const maxImpaleAreas = ['chest','neck','skull','eye'];
    const doubleBleedAreas = ['neck','shoulder'];
    const easyBleedAreas = ['neck','face','skull','eye','forearm','elbow'];
    const doubleKnockdownAreas = ['skull','knee'];
    const invalidKnockdownAreas = ['hand','forearm','elbow','upper arm'];
    let sortedWornArmors = [];
  

  
    // roll for hit location
    const hitLocRoll = rollDice(100);
    let hitLocTable = atkForm === 'swing' ? 'SWING' : 'THRUST'; // TODO swing high/low
    hitLoc = Constant.HIT_LOC_ARRS[hitLocTable][hitLocRoll - 1];
    coverageArea = hitLoc.replace('right ', '').replace('left ', '');
    const acObj = target.ac[coverageArea][dmgType] || {};
    targetAc = acObj.ac ?? targetAc;
    sortedWornArmors = acObj.sorted_armor_ids.map(id => target.armors.find(i => i._id === id)) || [];
  
    
    dr = acObj.dr ?? dr;
    weapDmgResult = Math.max(1, weapDmgResult - dr);
  
    resultText += ` at the ${hitLoc}`;

  
    // handle effects based on target shield
    shieldBonus = acObj.shield_bonus;
    if (shieldBonus) {
      if (bonusToShields) {
        shieldBonus = Math.min(0, shieldBonus - 1);
      } 
      if (chainWeapon) {
        sortedWornArmors = sortedWornArmors.filter( i => !i.shield);
      }
    }
  
  
  
    resultText += ` (${totalAtkResult} vs. AC ${targetAc})`;
    // 1 always misses and 20 always hits
    isHit = d20Result > 1 && totalAtkResult >= targetAc || d20Result === 20;
  
  
  
    if (isHit) {
      // critical hits
      const isCriticalHit = rollDice(100) <= totalAtkResult - targetAc;

      // avoids rigid armor/shield
      if (isCriticalHit) {
        sortedWornArmors = sortedWornArmors.filter( i => !i.rigid && !i.shield );
        hitDesc = ' and strikes a weak spot';

        rolledWeapDmg = maxWeapDmg;
        weapDmgResult = Math.max(1, maxWeapDmg - dr);
      }

      // lucky hits
      const isLuckyHit = d20Result >= 20;

      if (isLuckyHit) {
        const armor = sortedWornArmors[0];
        const isSteelPlate = !!armor?.material === 'steel plate';
        const isRigid = !!armor?.rigid;
        const isShield = !!armor?.shield;

        // if damage type is blunt, armor must be rigid or shield to absorb the damage
        if ( armor && (dmgType !== 'blunt' || isRigid || isShield) ) {
          const baseAc = Number(armor.base_ac);
          let verb = isSteelPlate ? 'dents' : isRigid ? 'punctures' : isShield ? 'splinters' : 'penetrates';
          if (baseAc < 2) {
            verb = 'destroys';
            armor.base_ac = 0;
          } else {
            armor.base_ac--;
          }
          hitDesc += ` and ${verb} ${armor.name}`;
        } else {
          weapDmgResult = weapDmgResult + weapDmgResult;
          hitDesc += isCriticalHit ? ' brutally hard' : ' and hits brutally hard';
        }

        // steel plate can't be fully bypassed by lucky hits
        if (!isSteelPlate) sortedWornArmors.shift();
      }

      // knockdown
      const knockDownMulti = invalidKnockdownAreas.includes(coverageArea) ? 0 :
                            doubleKnockdownAreas.includes(coverageArea) ? 2 : 1;
      const knockdownChance = knockDownMulti * 2 * (weapDmgResult + 10 - weapSpeed) - 10 * (targetSize - attackerSize);
      const isKnockdown = atkForm === 'swing' && rollDice(100) <= knockdownChance;
      if (isKnockdown) {
        dmgEffect += " and knocks them down";
        // add prone condition manually
      }

      // impale
      // steel plate cannot be impaled
      const isImpale = dmgType === 'piercing' && rolledWeapDmg === maxWeapDmg;
      if (isImpale) {
        let stuck = false;
        const canDeepImpale = coverageArea ? deepImpaleAreas.includes(coverageArea) : true;
        const maxImpales = 1 + Math.min(weapSize, targetSize) || 1;
        let impaleDmg = 0;
        let armorPenString = '';

        for (let i = 0; i < maxImpales; i++) {
          const armor = sortedWornArmors[0];
          const isSteelPlate = armor?.material === 'steel plate';
          if (isSteelPlate) break;

          let rolledDmg = maxImpaleAreas.includes(coverageArea) ? maxWeapDmg : rollDice(weapDmg);
          let dmg = rolledDmg;

          if (applyArmor(armor)) {
            let verb = 'penetrates';
            const isRigid = !!armor.rigid;
            const isShield = !!armor.shield;
            // if armor is shield or non-rigid it absorbs the impale damage
            if (!isRigid || (isShield && !['forearm','hand'].includes(coverageArea))) {
              dmg = 0;
            }
            // damage armor
            const baseAc = Number(armor.base_ac);
            if (baseAc < 2) {
              verb = 'destroys';
              armor.base_ac = 0;
            } else {
              armor.base_ac--;
            }

            // append string
            armorPenString += ` and ${verb} ${armor.name}`;
          }

          // beyond first impale level, no more damage done if target area is shallow
          // weapon gets stuck if not a shot missile
          if (i > 0) {
            if (!canDeepImpale) {
              dmg = 0;
            }
            stuck = atkForm !== 'shoot';
          }

          impaleDmg += dmg;

          // ~25% chance of rolling damage again
          if (rolledDmg < Math.round(maxWeapDmg * 3 / 4)) {
            break;
          }

          sortedWornArmors.shift();
        }

        // apply damage and append results string to hitDesc
        weapDmgResult += impaleDmg;
        const impaleDesc = armorPenString + (impaleDmg > 0 ? ` and impales` : '');
        dmgEffect += stuck ? ` and the weapon is stuck` : '';
        hitDesc += impaleDesc;
      }

      // bleeding
      // metal armor cannot be cut
      const metalArmor = sortedWornArmors.find(i => i.metal);
      let minBleedDmg = 6;
      let bleedChance = 25;
      if (bleedBonus) minBleedDmg--;
      if (easyBleedAreas.includes(coverageArea)) bleedChance *= 2;
      const isBleed = !applyArmor(metalArmor) && dmgType === 'slashing' && rolledWeapDmg >= minBleedDmg && rollDice(100) <= bleedChance;
      
      if (isBleed) {
        const armor = sortedWornArmors[0];
        let doBleed = true;
        if (applyArmor(armor)) {
          const isRigid = !!armor.rigid;
          const isShield = !!armor.shield;
          let verb = (isRigid || isShield) ? 'cracks through' : 'tears into';

          // if armor is rigid or shield it absorbs damage and negates bleed
          if (isRigid || (isShield && !['forearm','hand'].includes(coverageArea))) {
            doBleed = false;
          }

          // damage armor
          const baseAc = Number(armor.base_ac);
          if (baseAc < 2) {
            verb = 'destroys';
            armor.base_ac = 0;
          } else {
            armor.base_ac--;
          }

          // append string
          hitDesc += ` and ${verb} ${armor.name}`;
        }

        if (doBleed) {
          dmgEffect += doubleBleedAreas.includes(coverageArea) ? majorBleedDesc : minorBleedDesc;
        }

        sortedWornArmors.shift();
      }

      

      hitDesc = hitDesc || ' and hits';

      // switch dmgType to blunt if metal armor/plate remains
      const steelPlateArmor = sortedWornArmors.find(i => i.material === 'steel plate');
      if ( applyArmor(metalArmor) && dmgType === 'slashing' || applyArmor(steelPlateArmor) && dmgType === 'piercing' ) {
        dmgType = 'blunt';
        if (/hits$/.test(hitDesc)) {
          const bluntingArmor = steelPlateArmor || metalArmor;
          hitDesc += ` but the blade is turned by ${bluntingArmor.name}`;
        }
      }

      injuryObj = Constant.HIT_LOCATIONS[coverageArea]?.injury?.[dmgType] || {};

      resultText += hitDesc;

      let totalDmgResult = weapDmgResult;
      let dmgText = ` for ${totalDmgResult}${dmgType ? ` ${dmgType}` : ''} damage`;
      resultText += dmgText;
  
  
      if (totalDmgResult < 2) {
        resultText = resultText.replace('hits', 'grazes');
      }
  
      const negHPs = Math.min(0, targetHp - totalDmgResult);
      const injury = negHPs < -5 ? injuryObj.critical : negHPs < -2 ? injuryObj.serious : injuryObj.light;
      if (negHPs) resultText += injury.text;
  
      // hard code bleed effects for certain injuries
      if ( resultText.includes('severs') || resultText.includes('lacerates') ) {
        dmgEffect = dmgEffect.replace(majorBleedDesc,'');
        if (!dmgEffect.includes(minorBleedDesc)) {
          dmgEffect += minorBleedDesc;
        }
      }
  
      if ( resultText.includes('artery') || resultText.includes('lops off' )) {
        dmgEffect = dmgEffect.replace(minorBleedDesc,'');
        if (!dmgEffect.includes(majorBleedDesc)) {
          dmgEffect += majorBleedDesc;
        }
      }
  
      // remove bleed effects if target is dead
      if (targetHp <= -10) {
        dmgEffect = dmgEffect.replace(minorBleedDesc,'').replace(majorBleedDesc,'');
      }
  
      resultText += dmgEffect;
  
      // apply damage
      target.hp -= totalDmgResult;


    } else {
      const deflectingArmor = totalAtkResult >= (unarmoredAc + shieldBonus) ? sortedWornArmors.find(i => !i.shield) : sortedWornArmors[0];
      missDesc = totalAtkResult < unarmoredAc ? ` and misses entirely` :
        ` but the blow is deflected${deflectingArmor ? ` by ${deflectingArmor.name}` : ''}`;

      // fumbles
      if (rollDice(100) <= targetAc - totalAtkResult) {
        const fumbles = [
          ` and slips and falls`, 
          ` and stumbles, leaving them open for attack`,
        ];
        fragile && fumbles.push(` and ${weapName} breaks!`);
        unwieldy && fumbles.push(` and hits themselves instead!`);
        fumbles.push(` and drops ${weapon.name}`);

        const fumble = selectRandom(fumbles);
        missDesc = ' but misses wildly' + fumble;
        
        followAttack = false;
      }

      resultText += missDesc;
    }


    resultText.trim();
    if (!/!$|\.$/.test(resultText)) {
      resultText += `.`;
    }

    chatMsgData += `${attacker.name} ${atkForm}s ${weapName}${resultText}`;
    

    // add follow up attack text
    if (followAttack) {
      const followAttackText = ` ${isHit ? 'and' : 'but'} they're fast enough to attack again!`;
      chatMsgData = chatMsgData.replace(/!\s*$|\.\s*$/, '') + followAttackText;
    } else {
      attackerId = target._id;
    }

    if (!chatMsgData) return attack(actors);

    let output = [chatMsgData];

    if (targetHp > -10 && target.hp <= -10) {
      output.push(`${target.name} dies.`);
    } else if (targetHp > 0 && target.hp <= 0) {
      output.push(`${target.name} collapses in pain.`);
    }


    return output;

  }
})();

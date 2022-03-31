import { beforeEach, expect, it } from "@jest/globals"
import { attack } from "../attack.js"
import { actors } from "../data/actors.js"
import { diceRoller } from "../utils.js"

describe('the attack', () => {

  beforeEach(() => {
    // reset hp and armor
    for (const actor of actors) {
      actor.hp.value = actor.hp.max;
      for (const armor of actor.armors) {
        armor.base_ac.value = armor.base_ac.max;
      }
      actor.updateAc();
    }
    // set attacker
    actors[0].attacker = true;
  });
  
  it('should hit for damage on a result of 20', () => {
    // roll 20 on 20 to hit
    const hitRoller = sides => Number(sides) === 20 ? 20 : diceRoller(sides);
    const output = attack(actors, hitRoller)[0];
    const expected = 'damage';
    expect(output).toEqual(expect.stringContaining(expected));
  });

  it('should be a critical hit if the attack roll is 20 and the critical roll is 1', () => {
    // roll 20 on 20 to hit and 1 on 100 to crit
    const critRoller = sides => {
      return Number(sides) === 20 ? 20 : Number(sides) === 100 ? 1 : diceRoller(sides);
    };
    const output = attack(actors, critRoller)[0];
    const expected = 'strikes a weak spot';
    expect(output).toEqual(expect.stringContaining(expected));
  });

  it('should hit brutally hard if the attack roll is 20 and the target is not wearing armor', () => {
    // roll 20 on 20 to hit
    const hitRoller = sides => Number(sides) === 20 ? 20 : diceRoller(sides);
    const target = actors[1];
    target.armors = [];
    target.updateAc();
    const output = attack(actors, hitRoller)[0];
    const expected = 'brutally hard';
    expect(output).toEqual(expect.stringContaining(expected));
  });

  it('should allow another attack if the follow-up attack roll is less than or equal to twice the difference in weapon speed', () => {
    const [attacker, target] = actors;
    const oldAttackerSpeed = attacker.weapon.speed;
    const oldTargetSpeed = target.weapon.speed;
    attacker.weapon.speed = 10;
    target.weapon.speed = 2;
    // roll 20 on 20 to hit, and 16 on 100 to follow up attack
    const followAttackRoller = sides => Number(sides) === 20 ? 20 : Number(sides) === 100 ? 16 : diceRoller(sides);

    const output = attack([attacker, target], followAttackRoller).join();
    const expected = "and they're fast enough to attack again!";
    expect(output).toEqual(expect.stringContaining(expected));

    attacker.weapon.speed = oldAttackerSpeed;
    target.weapon.speed = oldTargetSpeed;
  });

  it("should miss entirely on a result of 1 that isn't a fumble", () => {
    // roll 1 on 20 to miss, and 100 on 100 to preclude fumbles
    const missRoller = sides => Number(sides) === 20 ? 1 : Number(sides) === 100 ? 100 : diceRoller(sides);
    const output = attack(actors, missRoller)[0];
    const expected = 'misses entirely';
    expect(output).toEqual(expect.stringContaining(expected));
  });

  it("should fumble on a miss and a fumble roll of 1", () => {
    // roll 1 on 20 to miss, and 1 on 100 to fumble
    const missRoller = sides => Number(sides) === 20 ? 1 : Number(sides) === 100 ? 1 : diceRoller(sides);
    const output = attack(actors, missRoller)[0];
    const expected = 'misses wildly';
    expect(output).toEqual(expect.stringContaining(expected));
  });

  it("should cause the target to collapse if it hits and damage is greater than the target's hit points", () => {
    // roll 20 on 20 to hit, 100 on 100 to preclude criticals and impales, and 1 for damage
    const minDamageRoller = sides => Number(sides) === 20 ? 20 : Number(sides) === 100 ? 100 : 1;
    const target = actors[1];
    target.hp.value = 1;
    const output = attack(actors, minDamageRoller)[1];
    const expected = 'collapses';
    expect(output).toEqual(expect.stringContaining(expected));
  });

  it("should cause the target to die if it hits and damage brings the target to -10 or fewer hit points", () => {
    // roll 20 on 20 to hit, 100 on 100 to preclude criticals, and 1 for damage
    const maxDamageRoller = sides => Number(sides);
    const target = actors[1];
    target.hp.value = 1;
    const output = attack(actors, maxDamageRoller)[1];
    const expected = 'dies';
    expect(output).toEqual(expect.stringContaining(expected));
  });

});

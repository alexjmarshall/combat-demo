import { expect, it } from "@jest/globals"
import { Actor } from "../data/actors.js"

describe("a new actor's AC values", () => {
  const armors = [
    {
      _id: 1,
      base_ac: {
        value: 5
      },
      coverage: ['neck','chest','shoulder','gut'],
      material: 'steel plate',
    },
    {
      _id: 2,
      base_ac: {
        value: 3
      },
      coverage: ['shin','thigh','hip','groin','gut'],
      material: 'wood',
      shield: true
    },
  ];

  const expectedAc = {
    total: {
      blunt: { ac: 13, dr: 0 },
      piercing: { ac: 14, dr: 0 },
      slashing: { ac: 13, dr: 1 }
    },
    gut: {
      blunt: { ac: 18, dr: 1, sorted_armor_ids: [2,1], shield_bonus: 3 },
      piercing: { ac: 21, dr: 0, sorted_armor_ids: [2,1], shield_bonus: 3 },
      slashing: { ac: 20, dr: 2, sorted_armor_ids: [2,1], shield_bonus: 3 }
    },
  }

  const actor = new Actor(null, { armors });

  it('should have correct total AC and DR for every damage type', () => {
    expect(actor.ac.total.piercing).toEqual(expectedAc.total.piercing);
    expect(actor.ac.total.blunt).toEqual(expectedAc.total.blunt);
    expect(actor.ac.total.slashing).toEqual(expectedAc.total.slashing);
  });

  it('shoud have correct layered AC, DR and shield bonus for every damage type', () => {
    expect(actor.ac.gut.piercing).toEqual(expectedAc.gut.piercing);
    expect(actor.ac.gut.blunt).toEqual(expectedAc.gut.blunt);
    expect(actor.ac.gut.slashing).toEqual(expectedAc.gut.slashing);
  });
  it('shoud have correct sorted armor Ids on a layered body area', () => {
    expect(actor.ac.gut.sorted_armor_ids).toEqual(expectedAc.gut.sorted_armor_ids);
  });
});

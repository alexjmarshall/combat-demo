const armorData = {
  'Large Wooden Shield': {
    _id: 1,
    name: 'Large Wooden Shield',
    base_ac: {
      value: 3,
      max: 3,
    },
    coverage: ['chest','gut','neck','shoulder','upper arm','elbow','forearm','hand','groin','hip'],
    shield: true,
    material: 'wood',
  },
  'Gambeson': {
    _id: 2,
    name: 'Gambeson',
    base_ac: {
      value: 2,
      max: 2,
    },
    coverage: ['chest','gut','hip','groin','shoulder','upper arm','elbow','forearm'],
    material: 'padded',
  },
  'Iron Greaves': {
    _id: 3,
    name: 'Iron Greaves',
    base_ac: {
      value: 8,
      max: 8,
    },
    coverage: ['knee','shin'],
    material: 'iron plate',
    rigid: true,
    metal: true,
  },
  'Brigandine Cuirass': {
    _id: 4,
    name: 'Brigandine Cuirass',
    base_ac: {
      value: 4,
      max: 4,
    },
    coverage: ['chest','gut'],
    material: 'brigandine',
    rigid: true,
    metal: true,
  },
  'Chain Hauberk': {
    _id: 5,
    name: 'Chain Hauberk',
    base_ac: {
      value: 5,
      max: 5,
    },
    coverage: ['chest','gut','hip','groin','shoulder','upper arm','elbow','forearm'],
    material: 'chain',
    metal: true,
  },
  'Chain Coif': {
    _id: 6,
    name: 'Chain Coif',
    base_ac: {
      value: 5,
      max: 5,
    },
    coverage: ['neck','skull'],
    material: 'chain',
  },
  'Leather Cuisses': {
    _id: 7,
    name: 'Leather Cuisses',
    base_ac: {
      value: 3,
      max: 3,
    },
    coverage: ['thigh'],
    material: 'leather',
  },
};

export class Armor {
  constructor (name, options={}) {
    Object.assign(this, armorData[name], options);
  }
}

export const armorSets = {
  a: [
    new Armor('Chain Coif'),
    new Armor('Chain Hauberk'),
    new Armor('Gambeson'),
    new Armor('Leather Cuisses'),
  ],
  b: [
    new Armor('Large Wooden Shield'),
    new Armor('Brigandine Cuirass'),
    new Armor('Gambeson'),
    new Armor('Iron Greaves'),
  ]
};

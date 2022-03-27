export const armors = [
  {
    _id: 1,
    name: 'Large Wooden Shield',
    base_ac: 3,
    coverage: ['chest','gut','neck','shoulder','upper arm','elbow','forearm','hand','groin','hip'],
    shield: true,
    material: 'wood',
  },
  {
    _id: 2,
    name: 'Gambeson',
    base_ac: 2,
    coverage: ['chest','gut','hip','groin','shoulder','upper arm','elbow','forearm'],
    material: 'padded',
  },
  {
    _id: 3,
    name: 'Iron Greaves',
    base_ac: 8,
    coverage: ['knee','shin'],
    material: 'iron plate',
    rigid: true,
    metal: true,
  },
  {
    _id: 4,
    name: 'Brigandine Cuirass',
    base_ac: 4,
    coverage: ['chest','gut'],
    material: 'brigandine',
    rigid: true,
    metal: true,
  },
  {
    _id: 5,
    name: 'Chain Hauberk',
    base_ac: 5,
    coverage: ['chest','gut','hip','groin','shoulder','upper arm','elbow','forearm'],
    material: 'chain',
    metal: true,
  },
  {
    _id: 6,
    name: 'Chain Coif',
    base_ac: 2,
    coverage: ['neck','skull'],
    material: 'chain',
  },
  {
    _id: 7,
    name: 'Leather Cuisses',
    base_ac: 3,
    coverage: ['thigh'],
    material: 'leather',
  },
];

export const armorLoadouts = {
  a: [
    armors[5],
    armors[4],
    armors[1],
    armors[6],
  ],
  b: [
    armors[0],
    armors[3],
    armors[1],
    armors[2],
  ]
};

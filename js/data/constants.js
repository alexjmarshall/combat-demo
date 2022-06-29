export const AC_MIN = 10;
export const DMG_TYPES = ["blunt", "piercing", "slashing"];
export const SHIELD_TYPES = {
  large: {
    coverage: "chest,gut,neck,shoulder,upper arm,elbow,forearm,hand,groin,hip",
    material: "wood",
  },
  medium: {
    coverage: "chest,gut,elbow,forearm,hand",
    material: "wood",
  },
};
export const ARMOR_VS_DMG_TYPE = {
  none: {
    base_AC: 0,
    blunt: {
      ac:1,
      dr:0,
    },
    piercing: {
      ac:0,
      dr:0,
    },
    slashing: {
      ac:-1,
      dr:0,
    },
  },
  fur: {
    base_AC: 1,
    blunt: {
      ac:0,
      dr:0,
    },
    piercing: {
      ac:0,
      dr:1,
    },
    slashing: {
      ac:-1,
      dr:0,
    },
  },
  padded: {
    base_AC: 2,
    blunt: {
      ac:0,
      dr:0,
    },
    piercing: {
      ac:-2,
      dr:1,
    },
    slashing: {
      ac:0,
      dr:0,
    },
  },
  leather: {
    base_AC: 3,
    blunt: {
      ac:0,
      dr:1,
    },
    piercing: {
      ac:1,
      dr:0,
    },
    slashing: {
      ac:0,
      dr:0,
    },
  },
  wood: {
    base_AC: 3,
    blunt: {
      ac:0,
      dr:0,
    },
    piercing: {
      ac:0,
      dr:0,
    },
    slashing: {
      ac:0,
      dr:0,
    },
  },
  scale: {
    base_AC: 4,
    blunt: {
      ac:0,
      dr:0,
    },
    piercing: {
      ac:1,
      dr:0,
    },
    slashing: {
      ac:1,
      dr:1,
    },
  },
  brigandine: {
    base_AC: 4,
    blunt: {
      ac:0,
      dr:1,
    },
    piercing: {
      ac:1,
      dr:0,
    },
    slashing: {
      ac:2,
      dr:1,
    },
  },
  chain: {
    base_AC: 5,
    blunt: {
      ac:-2,
      dr:0,
    },
    piercing: {
      ac:0,
      dr:1,
    },
    slashing: {
      ac:2,
      dr:1,
    },
  },
  "elven chain": {
    base_AC: 5,
    blunt: {
      ac:-2,
      dr:0,
    },
    piercing: {
      ac:0,
      dr:1,
    },
    slashing: {
      ac:2,
      dr:1,
    },
  },
  "banded mail": {
    base_AC: 6,
    blunt: {
      ac:1,
      dr:0,
    },
    piercing: {
      ac:0,
      dr:1,
    },
    slashing: {
      ac:2,
      dr:1,
    },
  },
  lamellar: {
    base_AC: 7,
    blunt: {
      ac:0,
      dr:1,
    },
    piercing: {
      ac:1,
      dr:0,
    },
    slashing: {
      ac:0,
      dr:1,
    },
  },
  splint: {
    base_AC: 7,
    blunt: {
      ac:2,
      dr:1,
    },
    piercing: {
      ac:1,
      dr:0,
    },
    slashing: {
      ac:0,
      dr:1,
    },
  },
  "iron plate": {
    base_AC: 8,
    blunt: {
      ac: 0,
      dr: 1,
    },
    piercing: {
      ac: 1,
      dr: 0,
    },
    slashing: {
      ac: 1,
      dr: 2,
    },
  },
  "steel plate": {
    base_AC: 9,
    blunt: {
      ac: 0,
      dr: 1,
    },
    piercing: {
      ac: 3,
      dr: 0,
    },
    slashing: {
      ac: 2,
      dr: 2,
    },
  },
}
export const ATK_MODES = {
  "swing(b)": {
    ATK_ATTR: "str",
    DMG_ATTR: "str",
    HIT_SOUND: "bludgeon_hit",
    MISS_SOUND: "bludgeon_miss",
    DMG_TYPE: "blunt",
    ATK_TYPE: "melee",
    ATK_FORM: "swing",
  },
  "swing(s)": {
    ATK_ATTR: "str",
    DMG_ATTR: "str",
    HIT_SOUND: "cut_hit",
    MISS_SOUND: "cut_miss",
    DMG_TYPE: "slashing",
    ATK_TYPE: "melee",
    ATK_FORM: "swing",
  },
  "swing(p)": {
    ATK_ATTR: "str",
    DMG_ATTR: "str",
    HIT_SOUND: "hew_hit",
    MISS_SOUND: "hew_miss",
    DMG_TYPE: "piercing",
    ATK_TYPE: "melee",
    ATK_FORM: "swing",
  },
  "thrust(b)": {
    ATK_ATTR: "dex",
    DMG_ATTR: "str",
    HIT_SOUND: "bludgeon_hit",
    MISS_SOUND: "bludgeon_miss",
    DMG_TYPE: "blunt",
    ATK_TYPE: "melee",
    ATK_FORM: "thrust",
  },
  "thrust(s)": {
    ATK_ATTR: "dex",
    DMG_ATTR: "str",
    HIT_SOUND: "hew_hit",
    MISS_SOUND: "hew_miss",
    DMG_TYPE: "slashing",
    ATK_TYPE: "melee",
    ATK_FORM: "thrust",
  },
  "thrust(p)": {
    ATK_ATTR: "dex",
    DMG_ATTR: "str",
    HIT_SOUND: "thrust_hit",
    MISS_SOUND: "thrust_miss",
    DMG_TYPE: "piercing",
    ATK_TYPE: "melee",
    ATK_FORM: "thrust",
  },
  "shoot(b)": {
    ATK_ATTR: "dex",
    DMG_ATTR: undefined,
    HIT_SOUND: "slingstone_hit",
    MISS_SOUND: "slingstone_miss",
    DMG_TYPE: "blunt",
    ATK_TYPE: "missile",
    ATK_FORM: "shoot",
  },
  "shoot(s)": {
    ATK_ATTR: "dex",
    DMG_ATTR: undefined,
    HIT_SOUND: "arrow_hit",
    MISS_SOUND: "arrow_miss",
    DMG_TYPE: "slashing",
    ATK_TYPE: "missile",
    ATK_FORM: "shoot",
  },
  "shoot(p)": {
    ATK_ATTR: "dex",
    DMG_ATTR: undefined,
    HIT_SOUND: "bolt_hit",
    MISS_SOUND: "bolt_miss",
    DMG_TYPE: "piercing",
    ATK_TYPE: "missile",
    ATK_FORM: "shoot",
  },
  "throw(b)": {
    ATK_ATTR: "dex",
    DMG_ATTR: "str",
    HIT_SOUND: "throw_hit",
    MISS_SOUND: "throw_miss",
    DMG_TYPE: "blunt",
    ATK_TYPE: "missile",
    ATK_FORM: "throw",
  },
  "throw(s)": {
    ATK_ATTR: "dex",
    DMG_ATTR: "str",
    HIT_SOUND: "throw_hit",
    MISS_SOUND: "throw_miss",
    DMG_TYPE: "slashing",
    ATK_TYPE: "missile",
    ATK_FORM: "throw",
  },
  "throw(p)": {
    ATK_ATTR: "dex",
    DMG_ATTR: "str",
    HIT_SOUND: "throw_hit",
    MISS_SOUND: "throw_miss",
    DMG_TYPE: "piercing",
    ATK_TYPE: "missile",
    ATK_FORM: "throw",
  },
};
const BASIC_INJURIES = {
  limb: {
    blunt: {
      light: {
        text: ' and bruises a bone',
      }, 
      serious: {
        text: ' and snaps through bone',
      },
      critical: {
        text: ' and snaps through bone and the bone juts out of the open wound',
      },
    },
    piercing: {
      light: {
        text: ' and tears through muscle',
      },
      serious: {
        text: ' and tears through muscle and chips a bone',
      },
      critical: {
        text: ' and tears through muscle and severs a tendon',
      },
    },
    slashing: {
      light: {
        text: ' and severs a muscle',
      },
      serious: {
        text: ' and severs a muscle and severs a tendon',
      },
      critical: {
        text: ' and severs a muscle and severs an artery',
      },
    }
  },
  joint: {
    blunt: {
      light: {
        text: ' and cracks a bone',
      },
      serious: {
        text: ' and dislocates the joint',
      },
      critical: {
        text: ' and shatters the bones and dislocates the joint',
      },
    },
    piercing: {
      light: {
        text: ' and splits the joint',
      },
      serious: {
        text: ' and chips a bone',
      },
      critical: {
        text: ' and severs a ligament',
      },
    },
    slashing: {
      light: {
        text: ' and chips a bone',
      },
      serious: {
        text: ' and severs a ligament',
      },
      critical: part => ({
        text: ` and lops off the ${part}`,
        removal: true,
      }),
    },
  },
};
// weights listed in order: swing, thrust, swing_high, thrust_high, swing_low, thrust_low
export const HIT_LOCATIONS = {
  foot: {
    weights: [2,4,0,2,8,8],
    bilateral: true,
    injury: {
      blunt: {
        light: {
          text: ' and crushes a toe',
        },
        serious: {
          text: ' and breaks the ankle',
        },
        critical: {
          text: ' and crushes the foot into red pulp',
          removal: true,
        },
      },
      piercing: {
        light: {
          text: ' and tears through muscle',
        },
        serious: {
          text: ' and severs a ligament',
        },
        critical: {
          text: ' and severs a toe',
        },
      },
      slashing: {
        light: {
          text: ' and severs a ligament',
        },
        serious: {
          text: ' and severs a toe',
        },
        critical: {
          text: ' and lops off the foot',
          removal: true,
        },
      }
    },
  },
  shin: {
    weights: [8,6,2,2,16,12],
    bilateral: true,
    injury: {
      blunt: BASIC_INJURIES.limb.blunt,
      piercing: BASIC_INJURIES.limb.piercing,
      slashing: BASIC_INJURIES.limb.slashing,
    },
  },
  knee: {
    weights: [8,6,4,2,16,12],
    bilateral: true,
    injury: {
      blunt: BASIC_INJURIES.joint.blunt,
      piercing: BASIC_INJURIES.joint.piercing,
      slashing: {
        light: BASIC_INJURIES.joint.slashing.light,
        serious: BASIC_INJURIES.joint.slashing.serious,
        critical: BASIC_INJURIES.joint.slashing.critical('lower leg'),
      },
    },
  },
  thigh: {
    weights: [10,14,4,6,16,18],
    bilateral: true,
    injury: {
      blunt: BASIC_INJURIES.limb.blunt,
      piercing: BASIC_INJURIES.limb.piercing,
      slashing: BASIC_INJURIES.limb.slashing,
    },
  },
  hip: {
    weights: [6,4,4,2,10,6],
    bilateral: true,
    injury: {
      blunt: BASIC_INJURIES.joint.blunt,
      piercing: BASIC_INJURIES.joint.piercing,
      slashing: {
        light: BASIC_INJURIES.joint.slashing.light,
        serious: BASIC_INJURIES.joint.slashing.serious,
        critical: BASIC_INJURIES.joint.slashing.critical('leg'),
      },
    },
  },
  groin: {
    weights: [2,6,1,2,4,8],
    injury: {
      blunt: {
        light: {
          text: ' and cracks the pelvis',
        },
        serious: {
          text: ' and breaks the pelvis',
        },
        critical: {
          text: ' and breaks the lower back',
        },
      },
      piercing: {
        light: {
          text: ' and gouges a hole in the flesh',
        },
        serious: {
          text: ' and chips a bone',
        },
        critical: {
          text: ' and severs a ligament',
        },
      },
      slashing: {
        light: {
          text: ' and lacerates the genitals',
        },
        serious: {
          text: ' and severs a ligament',
        },
        critical: {
          text: ' and disembowels them',
        },
      },
    },
  },
  gut: {
    weights: [8,16,3,8,12,18],
    injury: {
      blunt: {
        light: {
          text: ' and bruises the bowels',
        },
        serious: {
          text: ' and snaps a rib',
        },
        critical: {
          text: ' and snaps the spine',
        },
      },
      piercing: {
        light: {
          text: ' and gouges a hole in the flesh',
        },
        serious: {
          text: ' and penetrates the abdomen',
        },
        critical: {
          text: ' and penetrates the viscera',
        },
      },
      slashing: {
        light: {
          text: ' and slices through abdominal muscle',
        },
        serious: {
          text: ' and lacerates the bowels',
        },
        critical: {
          text: ' and cleaves through the spine',
        },
      },
    },
  },
  chest: {
    weights: [4,10,6,16,2,5],
    injury: {
      blunt: {
        light: {
          text: ' and bruises a rib',
        },
        serious: {
          text: ' and breaks a rib',
        },
        critical: {
          text: ' and crushes the sternum',
        },
      },
      piercing: {
        light: {
          text: ' and cracks a rib',
        },
        serious: {
          text: ' and punctures a lung',
        },
        critical: {
          text: ' and pierces the heart',
          fatal: true,
        },
      },
      slashing: {
        light: {
          text: ' and slices through muscle',
        },
        serious: {
          text: ' and cleaves through the ribs',
        },
        critical: {
          text: ' and cleaves through the ribs and punctures a lung',
        },
      },
    },
  },
  shoulder: {
    weights: [8,6,12,12,2,2],
    bilateral: true,
    injury: {
      blunt: BASIC_INJURIES.joint.blunt,
      piercing: BASIC_INJURIES.joint.piercing,
      slashing: {
        light: BASIC_INJURIES.joint.slashing.light,
        serious: BASIC_INJURIES.joint.slashing.serious,
        critical: BASIC_INJURIES.joint.slashing.critical('arm'),
      },
    },
  },
  "upper arm": {
    weights: [6,4,10,8,2,2],
    bilateral: true,
    injury: {
      blunt: BASIC_INJURIES.limb.blunt,
      piercing: BASIC_INJURIES.limb.piercing,
      slashing: BASIC_INJURIES.limb.slashing,
    },
  },
  elbow: {
    weights: [8,4,10,6,2,2],
    bilateral: true,
    injury: {
      blunt: BASIC_INJURIES.joint.blunt,
      piercing: BASIC_INJURIES.joint.piercing,
      slashing: {
        light: BASIC_INJURIES.joint.slashing.light,
        serious: BASIC_INJURIES.joint.slashing.serious,
        critical: BASIC_INJURIES.joint.slashing.critical('forearm'),
      },
    },
  },
  forearm: {
    weights: [8,4,8,4,4,2],
    bilateral: true,
    injury: {
      blunt: BASIC_INJURIES.limb.blunt,
      piercing: BASIC_INJURIES.limb.piercing,
      slashing: BASIC_INJURIES.limb.slashing,
    },
  },
  hand: {
    weights: [6,4,6,4,2,2],
    bilateral: true,
    injury: {
      blunt: {
        light: {
          text: ' and crushes a finger',
        },
        serious: {
          text: ' and breaks the wrist',
        },
        critical: {
          text: ' and crushes the hand into red pulp',
          removal: true,
        },
      },
      piercing: {
        light: {
          text: ' and tears through muscle',
        },
        serious: {
          text: ' and severs a tendon',
        },
        critical: {
          text: ' and severs a finger',
        },
      },
      slashing: {
        light: {
          text: ' and severs a ligament',
        },
        serious: {
          text: ' and severs a finger',
        },
        critical: {
          text: ' and lops off the hand',
          removal: true,
        },
      },
    },
  },
  neck: {
    weights: [4,3,6,8,1,1],
    injury: {
      blunt: {
        light: {
          text: ' and bruises the larynx',
        },
        serious: {
          text: ' and bruises the spine',
        },
        critical: {
          text: ' and snaps the neck',
          fatal: true,
        },
      },
      piercing: {
        light: {
          text: ' and pierces the larynx',
        },
        serious: {
          text: ' and penetrates the throat',
        },
        critical: {
          text: ' and pierces an artery',
        },
      },
      slashing: {
        light: {
          text: ' and severs a muscle',
        },
        serious: {
          text: ' and severs an artery',
        },
        critical: {
          text: ' and lops off the head',
          fatal: true,
        },
      }
    },
  },
  face: {
    weights: [3,4,4,8,1,1],
    injury: {
      blunt: {
        light: {
          text: ' and breaks the nose',
        },
        serious: {
          text: ' and breaks the jaw',
        },
        critical: {
          text: ' and smashes the bones of the face into the brain',
          fatal: true,
        },
      },
      piercing: {
        light: {
          text: ' and pierces the cheek',
        },
        serious: {
          text: ' and breaks the teeth',
        },
        critical: {
          text: ' and smashes through teeth and into the brain',
          fatal: true,
        },
      },
      slashing: {
        light: {
          text: ' and splits the nose',
        },
        serious: {
          text: ' and splits the jaw',
        },
        critical: {
          text: ' and splits the face and cleaves the brain',
          fatal: true,
        },
      },
    },
  },
  eye: {
    weights: [1,2,2,4,0,0],
    bilateral: true,
    injury: {
      blunt: {
        light: {
          text: ' and bruises the eye socket',
        },
        serious: {
          text: ' and shatters the eye socket',
        },
        critical: {
          text: ' and smashes the eye socket into the brain',
          fatal: true,
        },
      },
      piercing: {
        light: {
          text: ' and lacerates the eye',
        },
        serious: {
          text: ' and dislodges the eye from its socket',
        },
        critical: {
          text: ' and penetrates the eye and into the brain',
          fatal: true,
        },
      },
      slashing: {
        light: {
          text: ' and lacerates the eye',
        },
        serious: {
          text: ' and eviscerates the eye',
        },
        critical: {
          text: ' and cleaves through the eye socket and into the brain',
          fatal: true,
        },
      }
    },
  },
  skull: {
    weights: [8,3,18,6,2,1],
    injury: {
      blunt: {
        light: {
          text: ' and bruises the skull',
        },
        serious: {
          text: ' and cracks the skull',
        },
        critical: {
          text: ' and smashes the skull into the brain',
          fatal: true,
        },
      },
      piercing: {
        light: {
          text: ' and lacerates the scalp',
        },
        serious: {
          text: ' and cracks the skull',
        },
        critical: {
          text: ' and penetrates the skull and pierces the brain',
          fatal: true,
        },
      },
      slashing: {
        light: {
          text: ' and lacerates the scalp',
        },
        serious: {
          text: ' and severs an ear',
        },
        critical: {
          text: ' and punctures the skull and cleaves the brain',
          fatal: true,
        },
      },
    },
  },
};
// populate hit location arrays on startup
export const HIT_LOC_ARRS = {
  SWING: [],
  THRUST: [],
  SWING_HIGH: [],
  THRUST_HIGH: [],
  SWING_LOW: [],
  THRUST_LOW: []
};
(async function() {
  const fillLocArr = function (loc, weight, bi) {
    const arr = [];
    for (let i = 0; i < weight; i++) {
      const entry = bi ? i < weight / 2 ? `left ${loc}`: `right ${loc}` : loc;
      arr.push(entry);
    }
    return arr;
  };
  for (const [k, v] of Object.entries(HIT_LOCATIONS)) {

    ["SWING", "THRUST", "SWING_HIGH", "THRUST_HIGH", "SWING_LOW", "THRUST_LOW"].forEach((arr, i) => {
      HIT_LOC_ARRS[arr] = HIT_LOC_ARRS[arr].concat(fillLocArr(k, v.weights[i], v.bilateral));
    });
  }
})();
export const SIZE_VALUES = {
  T: 0, // tiny
  S: 1, // small
  M: 2, // medium
  L: 3, // large
  H: 4, // huge
  G: 5, // gargantuan
};

export const diceRoller = (sides) => {
  return Math.ceil( Math.random() * Number(sides) );
};

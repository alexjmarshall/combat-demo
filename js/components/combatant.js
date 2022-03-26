export const combatant = Vue.component('combatant', {
  props: ['actor'],
  template: `
    <div>
      <span> Name: {{ actor.name }} </span>
      <div>HP</div> <div> {{ actor.hp }} </div>
      <div>Weapons</div> <div>xxx</div>
      <div>Armor</div> <div>xxx</div>
    </div>
  `,
});


/*
Name xxx
HP xxx
Weapons
  xxx
Armor AC
 xxx  xxx
*/

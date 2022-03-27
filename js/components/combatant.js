export const combatant = Vue.component('combatant', {
  props: ['actor'],
  template: `
    <div class="grid-container">
      <div class="grid-col-1"> Name </div> <div class="grid-col-2"> {{ actor.name }} </div>
      <div class="grid-col-1"> HP </div> <div class="grid-col-2"> {{ actor.hp }} </div>
      <div class="grid-col-1"> Weapon </div>  
      <div class="grid-col-2">
        <i @click="$emit('swap-weapon', actor._id, false)" class="fa fa-caret-left caret"></i>
        <span>{{ actor.weapon.name }}</span>
        <i @click="$emit('swap-weapon', actor._id, true)" class="fa fa-caret-right caret"></i>
      </div>
      <div class="grid-col-1">
        <span class="underline">Armor</span>
      </div>
      <div class="grid-col-2">
        <span class="underline">AC Bonus</span>
      </div>
      <div class="grid-col-1">
        <div v-for="armor of actor.armors"> {{ armor.name }} </div>
      </div>
      <div class="armor-bonuses">
        <div v-for="armor of actor.armors"> {{ armor.base_ac }} </div>
      </div>
    </div>
  `,
});

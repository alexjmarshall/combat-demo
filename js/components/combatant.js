export const combatant = Vue.component('combatant', {
  props: ['actor'],
  template: `
    <div class="grid-container">
      <div class="grid-col-1 grid-row-1"> Name </div> <div class="grid-col-2 grid-row-1"> {{ actor.name }} </div>
      <div class="grid-col-1 grid-row-2"> HP </div> <div class="grid-col-2 grid-row-2"> {{ actor.hp.value }} </div>
      <div class="grid-col-1 grid-row-3"> Weapon </div>  
      <div class="grid-col-2 grid-row-3">
        <i @click="$emit('swap-weapon', actor._id, false)" class="fa fa-caret-left caret"></i>
        <span>{{ actor.weapon.name }}</span>
        <i @click="$emit('swap-weapon', actor._id, true)" class="fa fa-caret-right caret"></i>
      </div>
      <div class="grid-col-1 grid-row-4">
        <span class="underline">Armor</span>
      </div>
      <div class="grid-col-2 grid-row-4">
        <span class="underline">AC Bonus</span>
      </div>
      <div class="grid-col-1 grid-row-5">
        <div v-for="armor of actor.armors"> {{ armor.name }} </div>
      </div>
      <div class="grid-col-2 grid-row-5">
        <div v-for="armor of actor.armors"> {{ armor.base_ac.value }} </div>
      </div>
    </div>
  `,
});

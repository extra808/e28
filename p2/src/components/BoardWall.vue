<template>
  <div id="wall">
    <laser-area :target-clickx="$root.lastClickX" :target-clicky="$root.lastClickY"></laser-area>
    <a-skeeto v-if="$root.skeetoStart" @add-score="$emit('change-score', $event)"></a-skeeto>
  </div>
</template>

<script>
import ASkeeto from "./ASkeeto.vue";
import LaserArea from "./LaserArea.vue";

export default {
  data: function() {
    return {};
  },
  components: {
    "a-skeeto": ASkeeto,
    "laser-area": LaserArea
  }
};
</script>

<style scoped>
#wall {
  background-color: #eef;
  outline: 1px solid blue;
  overflow: hidden;
  height: 50vh;
  width: 100%;
  position: absolute;
  bottom: 10px;
}
</style>

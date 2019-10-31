<template>
  <p>Score: {{ boardScore }}</p>
</template>>

<script>
export default {
  data: function() {
    return {};
  },
  props: { "board-score": Number }
};
</script>

<style scoped>
p {
  border: 2px solid;
  border-radius: 0.3rem;
  padding: 0.5em;
}
</style>

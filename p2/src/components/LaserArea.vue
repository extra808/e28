<template>
  <div class="laser_grid" @click="clickEvent(-1, $event)">
    <svg
      :viewBox="svgViewbox"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <mask id="barrel_mask" x="0" y="0" width="100" height="100">
          <circle :cx="svgCenterX" :cy="svgEndY" :r="svgCircleR + 20" stroke="none" fill="gray" />
        </mask>
      </defs>

      <line
        :x1="svgCenterX"
        :y1="svgEndY"
        :x2="laserEndX"
        :y2="laserEndY"
        stroke-width="2"
        stroke="black"
        mask="url(#barrel_mask)"
      />
      <line
        :x1="svgCenterX"
        :y1="svgEndY"
        :x2="laserEndX"
        :y2="laserEndY"
        stroke-width="2"
        class="laser_beam"
        :class="laserStyles"
      />
      <circle :cx="svgCenterX" :cy="svgEndY" :r="svgCircleR" fill="gray" />
    </svg>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      laserEndX: 0,
      laserEndY: 0,
      laserStyles: "",
      svgStartX: "0",
      svgStartY: "0",
      svgEndX: "320",
      svgEndY: "320",
      svgTop: 0
    };
  },
  props: ["target-clickx", "target-clicky"],
  computed: {
    laserChange: function() {
      // recompute to trigger watch when either value changes
      return this.laserEndX || this.laserEndY;
    },
    svgCenterX: function() {
      return this.svgEndX == 0 ? 0 : this.svgEndX / 2;
    },
    svgCircleR: function() {
      return this.svgEndY / 10;
    },
    svgViewbox: function() {
      return (
        this.svgStartX +
        " " +
        this.svgStartY +
        " " +
        this.svgEndX +
        " " +
        this.svgEndY
      );
    }
  },
  watch: {
    laserChange: function() {
      this.changeClass("styles");
      setTimeout(() => this.changeClass(""), 64);
    },
    targetClickx: function() {
      this.laserEndX = this.targetClickx;
    },
    targetClicky: function() {
      this.laserEndY = this.targetClicky - this.svgTop;
    }
  },
  methods: {
    changeClass: function(laserClass) {
      this.laserStyles = laserClass;
    },
    clickEvent: function(amount, event) {
      this.$root.changeScore({ amount: amount, event: event });
    }
  },
  mounted: function() {
    this.svgStartX = this.$el.clientTop;
    this.svgStartY = this.$el.clientLeft;
    this.svgEndX = this.$el.clientWidth;
    this.svgEndY = this.$el.clientHeight;
    this.svgTop = this.$el.getBoundingClientRect().top;
  }
};
</script>

<style scoped>
.laser_beam {
  stroke: transparent;
}

.laser_beam.styles {
  stroke: red;
}

.laser_grid {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.laser_grid > svg {
  position: absolute;
  bottom: 0;
}
</style>

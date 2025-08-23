<template>
  <svg :class="svgClass"
    aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps( {
  svgName: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
} )
const iconName = computed( () => {
  return `#icon-${props.svgName}`
} )
const svgClass = computed( () => {
  if ( props.className ) {
    return 'svg-icon ' + props.className
  } else {
    return 'svg-icon'
  }
} )
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>

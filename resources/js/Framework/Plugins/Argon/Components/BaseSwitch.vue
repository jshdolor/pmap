<template>
    <label class="custom-toggle">
        <input type="checkbox"
               v-model="model"
               v-bind="$attrs"
               >
        <span :data-label-off="labelFalse" :data-label-on="labelTrue" class="custom-toggle-slider rounded-circle"></span>
    </label>
</template>
<script>
export default {
  name: "base-switch",
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
      default: false,
      description: "Switch value"
    },
    labelTrue: {
      type: String,
      default: 'Yes'
    },
    labelFalse: {
      type: String,
      default: 'No'
    }
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>
<style>
</style>

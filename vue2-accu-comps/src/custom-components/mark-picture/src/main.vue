<template>
  <div>
    <img :src="src" @load="onload" @error="onError" />
    <canvas ref="canvas" class="alarm-picture-canvas" />
  </div>

</template>

<script>
import { AlarmPicture } from './utils.js'

export default {
  name: 'MarkPicture',
  props: {
    src: {
      type: String,
      required: true
    },
    /**
     * 格式
     * [{region: [[x1, y1], [x2, y2], [x3, y3]], style: {color: 'red'}}]
     */
    markRegionData: {
      type: Array,
      default: () => ({})
    }
  },
  data() {
    return {
      canvas: null,
      instance: null
    }
  },
  watch: {
    alarmPicture(newVal) {
      this.instance && this.instance.clear()
      this.createImage()
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas
    this.createImage()
  },
  methods: {
    onError(err) {
      console.log('image load error', err)
    },
    onLoad() {
      this.generateNewPicture()
    },
    async generateNewPicture(image) {
      console.log('image', image)
      this.instance = new AlarmPicture({
        canvas: this.canvas,
        alarmPicture: pic,
        alarmColor: this.alarmColor,
        deviceRegion: this.deviceRegion,
        alarmedRegion: this.alarmedRegion
      })
    }
  }
}
</script>

<style name="scss" scoped>
  .alarm-picture-canvas {
    width: 100%;
    height: 100%;
  }
</style>

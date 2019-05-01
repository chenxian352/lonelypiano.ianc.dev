<template>
  <div>
    <Pianos></Pianos>
    <div class="logo-n-search-wrapper">
      <div class="logo-n-search">
        <div class="logo"></div>
        <div class="search">
          <div class="address-complete">
            <input type="text" class="address-input" placeholder="Look for a piano" ref="autocomplete" @click="clickAddressInput">
          </div>
          <div id="map-container" :class="mapboxConfig.display ? '' : 'hidden-v'">
            <Mapbox
                    :accessToken="mapboxConfig.accessToken"
                    :map-options="mapboxConfig.options"
                    :fullscreen-control="{ show: true, position: 'top-left' }"
                    @map-load="loadMapboxLoaded"
                    @map-click="clickMapbox">
            </Mapbox>
          </div>
        </div>
      </div>
    </div>
    <div class="header-gradient"></div>
    <SubmitPopup></SubmitPopup>
  </div>
</template>

<script>
import Pianos from './components/Pianos'
import SubmitPopup from './components/SubmitPopup'
import Mapbox from 'mapbox-gl-vue';

export default {
  name: 'App',
  components: {
    Pianos,
    SubmitPopup,
    Mapbox
  },
  data: function() {
    return {
      mapboxConfig: {
        accessToken: 'pk.eyJ1IjoiaWFuYzM1MiIsImEiOiJjanYzczJhOHQyamljNDNwZnE5c3JuNTVrIn0.GQqGbFJ3c5js87MBtsrF-Q',
        options: {
          style: 'mapbox://styles/ianc352/cjtdtg3pp4b5x1fjpehjb0l46',
          center: [-122.403944, 37.784020],
          zoom: 5.4,
        },
        display: false
      }
    }
  },
  methods: {
    loadMapboxLoaded: function(map) {

    },
    clickMapbox: function(map, e) {

    },
    clickAddressInput: function() {
      this.mapboxConfig.display = !this.mapboxConfig.display;
    },
  }
}
</script>

<style lang="scss">
  @import 'style';
</style>

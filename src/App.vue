<template>
  <div>
    <Pianos></Pianos>
    <div class="logo-n-search-wrapper">
      <div class="logo-n-search">
        <div class="logo"></div>
        <div class="search">
          <div class="address-complete">
            <input type="text" class="address-input" placeholder="Look for a piano" ref="autocomplete" @click="mapbox.display = !mapbox.display">
          </div>
          <MglMap
                  :accessToken="mapbox.accessToken"
                  :mapStyle="mapbox.style"
                  :id="'map-container'"
                  v-show="mapbox.display"
                  @load="loadMapLoaded"
          >
            <MglMarker :coordinates="[piano.lng, piano.lat]" color="blue" v-for="piano in this.$store.state.pianos"/>
          </MglMap>
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
import { MglMap, MglMarker } from "vue-mapbox";

export default {
  name: 'App',
  components: {
    Pianos,
    SubmitPopup,
    MglMap,
    MglMarker
  },
  data: function() {
    return {
      mapbox: {
        accessToken: 'pk.eyJ1IjoiaWFuYzM1MiIsImEiOiJjanYzczJhOHQyamljNDNwZnE5c3JuNTVrIn0.GQqGbFJ3c5js87MBtsrF-Q',
        container: 'map',
        style: 'mapbox://styles/ianc352/cjtdtg3pp4b5x1fjpehjb0l46',
        center: [-122.403944, 37.784020],
        zoom: 13.6,
        display: false
      }
    }
  },
  methods: {
    loadMapLoaded: function(event) {
      this.$store.commit('assignMap', event.map);
    }
  }
}
</script>

<style lang="scss">
  @import 'style';
</style>

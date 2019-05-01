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
                    @map-click="mapMouseClicked"
                    @map-mousemove="mapMouseMoved">
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
          center: [173.444,-40.857],
          zoom: 3.8,
        },
        display: false
      }
    }
  },
  methods: {
    loadMapboxLoaded: function(map) {
      const pianos = this.$store.state.pianos;
      const features = pianos.map(piano => {
        return {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [piano.lng, piano.lat]
          },
          'properties': {
            'title': 'Piano',
            'icon': 'monument',
            'pianoId': piano.id
          }
        }
      });

      console.log(features);

      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': features
          }
        },
        'layout': {
          'icon-image': '{icon}-15',
          'text-field': '{title}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      });
    },
    mapMouseClicked: function(map, e) {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['points']
      });
      this.$store.commit('updateCurrentPianoId', features[0].properties.pianoId);
    },
    clickAddressInput: function() {
      this.mapboxConfig.display = !this.mapboxConfig.display;
    },
    mapMouseMoved(map, e) {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['points']
      });
      map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    }
  }
}
</script>

<style lang="scss">
  @import 'style';
</style>

<template>
  <div class="slides" @click="clickSlideWrapper">
    <transition name="piano-transition" mode="out-in">
      <div class="slide-wrapper" v-if="piano.id === currentPianoId" v-for="piano in pianos" :key="piano.id">
        <img :src="piano.uImageUrl" alt="">
        <div class="footer-gradient"></div>
        <div class="slide-info">
          <div class="location-desc icon-left">
            {{ piano.locationDesc }}
          </div>
          <div class="address">
            {{ piano.address }}
          </div>
          <div class="credit-submitter icon-left">
            Credit to {{ piano.creator }}
          </div>
          <div class="listing-control">
            <div class="submit-piano icon-left cursor-pointer" @click="clickSubmitPiano">
              Submit another piano!
            </div>
            <div class="update-piano icon-left cursor-pointer">
              <a :href="mailtoUrl(piano.address)">Update this piano</a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Pianos',
  data: function() {
    return {
      isTransitioning: false
    }
  },
  methods: {
    clickSubmitPiano: function() {
      this.$store.commit('toggleSubmitPopup');
    },
    mailtoUrl: function(address) {
      return `mailto:me@ianc.dev?subject=Update Piano: ${address} &body=Hey Lonely Piano, I found the listing for the piano at ${address} needs to be updated. Here\'s right information:`;
    },
    clickSlideWrapper: function() {
      const self = this;
      if (!this.isTransitioning) {
        for (const item of this.pianos) {
          if (this.currentPianoId !== item.id) {
            this.$store.commit('updateCurrentPianoId', item.id);
            this.isTransitioning = true;
            setTimeout(function() {
              self.isTransitioning = false;
            }, 4000);
            break;
          }
        }
      }
    }
  },
  created: function() {
    this.$apollo.addSmartQuery('pianos', {
      query: gql(`
        query {
          pianos(where: {
            status: PUBLISHED
          }) {
            id
            address
            locationDesc
            creator
            uImageUrl
            pianoStatus
            updates
            youTubeVideoUrl
            lng
            lat
          }
        }
      `),
      update(data) {
        this.$store.commit('updatePianos', data.pianos);
        this.$store.commit('updateCurrentPianoId', this.$store.state.pianos[0]['id']);
      }
    });
  },
  computed: {
    pianos: function() {
      return this.$store.state.pianos;
    },
    currentPianoId: function() {
      return this.$store.state.currentPianoId;
    }
  }
}
</script>

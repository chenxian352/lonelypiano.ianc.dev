<template>
  <div class="slides">
    <slick ref="slick" :options="slickOptions">
      <div class="slide-wrapper" v-for="piano in pianos" :key="piano.id">
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
    </slick>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Slick from 'vue-slick';

export default {
  name: 'Pianos',
  components: {
    Slick
  },
  apollo: {
    pianos: gql(`
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
        }
      }
    `),
  },
  data: function() {
    return {
      pianos: [],
      slickOptions: {
        slidesToShow: 1,
        fade: true
      },
    }
  },
  methods: {
    clickSubmitPiano: function() {
      this.$store.commit('toggleSubmitPopup');
    },
    mailtoUrl: function(address) {
      return `mailto:me@ianc.dev?subject=Update Piano: ${address} &body=Hey Lonely Piano, I found the listing for the piano at ${address} needs to be updated. Here\'s right information:`;
    }
  }
}
</script>

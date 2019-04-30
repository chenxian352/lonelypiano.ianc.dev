<template>
  <div class="popup" v-show="showSubmitPopup">
    <form name="submit-a-piano" class="submit-a-piano" method="POST">
      <p class="hidden">
        <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
      </p>
      <p>
        <label>
          <div class="form-field-title">Describe the location</div>
          <input type="text" name="location-desc" class="form-field-input" placeholder="Like, it's around the entrance of a train station"/>
        </label>
      </p>
      <p>
        <label>
          <div class="form-field-title">Address</div>
          <input type="text" name="address" class="form-field-input" placeholder="The closest address">
        </label>
      </p>
      <p>
        <label>
          <div class="form-field-title">Your Name</div>
          <input type="text" name="creator" class="form-field-input" placeholder="Just want to credit to you!">
        </label>
      </p>
      <div data-netlify-recaptcha="true"></div>
      <p>
        <label>
          <div class="form-field-title">Picture of the piano</div>
          <input type="hidden" role="uploadcare-uploader" data-image-shrink="2000x2000" name="u-image-url">
        </label>
      </p>
      <p>
        <button type="submit" class="button-submit">Send</button>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SubmitPopup',
  computed: {
    showSubmitPopup: function() {
      return this.$store.state.showSubmitPopup;
    }
  }
}
</script>

<template>
  <div class="upload-container">
    <vue-core-image-upload
      class="btn btn-primary"
      :crop="false"
      @imageuploaded="imageuploaded"
      :data="data"
      text="点击上传图片"
      :max-file-size="5242880"
      url="/api/upload" >
    </vue-core-image-upload>
    <br/><br/>
    <img class="picture" :src="src" />
  </div>
</template>

<script>
  import VueCoreImageUpload from 'vue-core-image-upload'

  export default {
    components: {
      'vue-core-image-upload': VueCoreImageUpload
    },
    data () {
      return {
        data: {},
        src: null
      }
    },
    methods: {
      imageuploaded (res) {
        if (res.success === true) {
          this.src = `http://localhost:8080/server/routes/static${res.data.pictureUrl}`
        }
      }
    }
  }
</script>

<style scoped>
  .upload-container {
    width:400px;
  }
  .picture {
    width: 100%;
  }
</style>

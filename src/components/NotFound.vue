<template>
  <div class="d-flex flex-row mb-6 main">
    <v-img
      lazy-src="https://picsum.photos/id/11/10/6"
      max-height="150"
      max-width="250"
      src="https://static.vecteezy.com/system/resources/previews/007/162/540/non_2x/error-404-page-not-found-concept-illustration-web-page-error-creative-design-modern-graphic-element-for-landing-page-infographic-icon-free-vector.jpg"
    ></v-img>
    <h2>Page Not Found</h2>
    <v-btn @click="goToHome()"> Go To Home </v-btn>
  </div>
</template>
<script>
export default {
    methods:{
        goToHome(){
            this.$router.push('/movies');
        }
    }
};
</script>
<style scoped>

.main{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
}

.v-btn{
    margin-top: 20px !important;
}

</style>

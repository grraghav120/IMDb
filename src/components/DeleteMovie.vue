<template>
  <div>
    <template>
      <v-icon
        class="delete-icon"
        color="info"
        size="x-large"
        @click="onSetDialog(true)"
        >mdi-delete</v-icon
      >
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="text-h5"> Delete Movie? </v-card-title>
          <v-card-text> Are you want to delete the movie? </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text @click="onSetDialog(false)"> Cancel </v-btn>
            <v-btn
              class="ok-btn"
              color="green darken-1"
              text
              @click="onDelete()"
            >
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <div>
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
export default {
  props: {
    parentData: Object,
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed:{
    ...mapGetters(['loading']),
  },
  methods:{
    ...mapActions(['deleteMovie']),
    onSetDialog(val){
        this.dialog=val;
    },
    onDelete() {
        this.deleteMovie({id:this.parentData.id});
        this.dialog=false;
    }
  }
};
</script>

<style scoped>
.delete-icon {
  color: red;
}
</style>

<template>
  <div>
    <v-container>
      <div>
        <h2>{{ isEdit ? "Update Movie Details" : "Enter Movie Details" }}</h2>
      </div>
      <div>
        <template>
          <v-form ref="form" v-model="valid" @submit.prevent="validate()">
            <v-label>Movie Name*</v-label>
            <v-text-field
              v-model="movieDataForm.movieName"
              solo
              placeholder="Enter Movie Name"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-label>Year Of Release*</v-label>
            <v-text-field
              :rules="yorRules"
              v-model="movieDataForm.yearOfRelease"
              solo
              type="date"
              label="Year Of Release*"
              required
            ></v-text-field>
            <v-label>Actors*</v-label>
            <div class="actor-select">
              <v-row>
                <v-col xs="12" md="9" sm="9" lg="9">
                  <v-select
                    :rules="actorRules"
                    v-model="movieDataForm.selectedActors"
                    solo
                    placeholder="Choose Actors"
                    :items="actorsAvailable"
                    item-text="name"
                    multiple
                    required
                    return-object
                  ></v-select>
                </v-col>
                <v-col xs="12" md="3" sm="3" lg="3" class="add-entity-btn">
                  <AddActorProducer
                    :parent-data="{
                      type: 'actor',
                      btnName: 'Add Actor',
                      error1: 'Please Enter an Actor Name',
                      placeholder1: 'Enter Actor Name',
                      field1: 'Actor Name',
                    }"
                    @newActor="onAddActor"
                  >
                  </AddActorProducer>
                </v-col>
              </v-row>
            </div>
            <div>
              <v-label>Producer*</v-label>
              <div class="actor-select">
                <v-row>
                  <v-col xs="12" md="9" sm="9" lg="9">
                    <v-select
                      :rules="producerRules"
                      :items="producersAvailable"
                      item-text="name"
                      item-value="id"
                      solo
                      v-model="movieDataForm.selectedProducer"
                      required
                      placeholder="Choose Producer"
                      return-object
                    ></v-select>
                  </v-col>
                  <v-col xs="12" md="3" sm="3" lg="3" class="add-entity-btn">
                    <AddActorProducer
                      :parent-data="{
                        type: 'producer',
                        btnName: 'Add Producer',
                        error1: 'Please Enter an Producer Name',
                        placeholder1: 'Enter Producer Name',
                        field1: 'Producer Name',
                      }"
                      @producersNew="onAddProducer"
                    >
                    </AddActorProducer>
                  </v-col>
                </v-row>
              </div>
            </div>
            <div>
              <v-label>Genres*</v-label>
              <v-select
                :rules="genreRules"
                v-model="movieDataForm.selectedGenre"
                solo
                placeholder="Choose Genres"
                :items="genresAvaliable"
                item-text="name"
                item-value="id"
                multiple
                return-object
                required
              ></v-select>
            </div>
            <div>
              <v-label>Plot</v-label>
              <v-textarea
                solo
                name="plotText"
                v-model="movieDataForm.plotText"
                placeholder="Describe the beautiful story"
              ></v-textarea>
            </div>
            <div v-if="!isEdit">
              <v-label>Poster*</v-label>
              <v-file-input
                :rules="posterRules"
                accept="image/*"
                solo
                placeholder="Choose File"
                v-model="movieDataForm.posterImage"
              ></v-file-input>
            </div>
            <div v-if="isEdit">
              <v-label>Poster*</v-label>
              <v-row>
                <v-col>
                  <v-img
                  class="align-end text-white"
                    max-height="150"
                    max-width="250"
                    :src="movieDataForm.posterImage"
                  ></v-img>
                </v-col>
                <v-col>
                  <v-btn v-if="!isChangePoster" @click="changePoster()">Change Poster</v-btn>
                <v-file-input
                  v-if="isChangePoster"
                  :rules="posterRules"
                  accept="image/*"
                  solo
                  placeholder="Choose File"
                  v-model="movieDataForm.posterImage"
                ></v-file-input>
            </v-col>
              </v-row> 
            </div>
            <v-btn :disabled="!valid" class="add-movie-btn mr-4" type="submit">
              {{ isEdit ? "Update" : "Add" }}
            </v-btn>
          </v-form>
        </template>
      </div>
    </v-container>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import AddActorProducer from "./AddActorProducer.vue";
export default {
  components: {
    AddActorProducer,
  },
  watch: {},
  data() {
    return {
      isChangePoster:false,
      isEdit:false,
      valid: false,
      snackbar: false,
      movieDataForm: {
        movieName: "",
        selectedActors: [],
        selectedProducer: null,
        selectedGenre: [],
        yearOfRelease: null,
        plotText: "",
        posterImage: null,
      },
      movieId:null,
      errorMessage: "Something went wrong! Please try again!!",
      nameRules: [(v) => !!v || "Movie Name is required"],
      actorRules: [
        (v) => !!v || "Actors is required",
        (v) => (v && v.length > 1) || "Please select at least two actors",
      ],
      producerRules: [(v) => !!v || "Producer is required"],
      genreRules: [
        (v) => !!v || "Genres is required",
        (v) => (v && v.length > 0) || "Please select at least one genre",
      ],
      yorRules: [(v) => !!v || "Year of Release is required"],
      posterRules: [(v) => !!v || "Movie Poster is required"],
    };
  },
  computed: {
    ...mapGetters([
      "actorsAvailable",
      "producersAvailable",
      "genresAvaliable",
      "loading",
      'movieList',
      'favMovieList'
    ]),
  },
  methods: {
    ...mapActions([
      "getAllActors",
      "getAllGenres",
      "getAllProducers",
      "getSingleMovie",
      "uploadPoster",
      "saveMovie",
    ]),
    onAddProducer(res) {
      this.movieDataForm.selectedProducer = res;
      this.getAllProducers();
    },
    onAddActor(res) {
      this.movieDataForm.selectedActors.push(res);
      this.getAllActors();
    },
    reset() {
      this.$refs.form.reset();
    },
    changePoster(){
      this.isChangePoster=!this.isChangePoster;
      this.movieDataForm.posterImage=null;
    },
    validate() {
      if (this.valid === true) {
        let actorIdString = "";
        let genreIdString = "";
        let n = this.movieDataForm.selectedActors.length;
        for (let i = 0; i < n - 1; i++) {
          actorIdString += this.movieDataForm.selectedActors[i].id;
          actorIdString += ",";
        }
        actorIdString += this.movieDataForm.selectedActors[n - 1].id;
        n = this.movieDataForm.selectedGenre.length;
        for (let i = 0; i < n - 1; i++) {
          genreIdString += this.movieDataForm.selectedGenre[i].id;
          genreIdString += ",";
        }
        genreIdString += this.movieDataForm.selectedGenre[n - 1].id;
        let body = {
          name: this.movieDataForm.movieName,
          ActorIds: actorIdString,
          producerId: this.movieDataForm.selectedProducer.id,
          GenreIds: genreIdString,
          plot: this.movieDataForm.plotText,
          yearOfRelease: this.movieDataForm.yearOfRelease.split("-")[0],
          poster:null,
          actors:this.movieDataForm.selectedActors,
          genres:this.movieDataForm.selectedGenre,
          producer:this.movieDataForm.selectedProducer
        };
        if(!this.isChangePoster && this.isEdit){
          body.poster=this.movieDataForm.posterImage;
          this.saveMovie({isEdit:this.isEdit,body:body,id:this.movieId});
          return;
        }
        const formData = new FormData();
        formData.append("file", this.movieDataForm.posterImage);
        this.uploadPoster({body:body,formData:formData,id:this.movieId}).then(()=>{
          this.saveMovie({isEdit:this.isEdit,body:body,id:this.movieId});
        })
      }
    },
    setMovie(movie){
      this.movieDataForm.yearOfRelease=movie.yearOfRelease + "-01" + "-01";
      this.movieDataForm.movieName=movie.name;
      this.movieDataForm.plotText = movie.plot;
      this.movieDataForm.selectedActors = movie.actors;
      this.movieDataForm.selectedProducer = movie.producer;
      this.movieDataForm.selectedGenre = movie.genres;
      this.movieDataForm.posterImage=movie.poster;
      console.log(this.movieDataForm);
    }
  },
  mounted() {
    this.getAllActors();
    this.getAllGenres();
    this.getAllProducers();
    this.movieId = this.$route.params.id; //catch the route paramters
    if (this.movieId !== undefined && this.movieId != null) {
      this.isEdit=true;
      let movie;
      movie=this.movieList.find(movie=>movie.id==this.movieId);
      if(movie==undefined){
        movie=this.favMovieList.find(movie=>movie.id==this.movieId)
      }
      this.setMovie(movie);
    }
  },
};
</script>
<style scoped>
.actor-select {
  display: flex;
  justify-content: space-around;
}
.add-movie-btn {
  background-color: blue !important;
  color: white !important;
  margin-top: 15px
}
form {
  margin: 15px 0px 0px 0px;
}
.add-entity-btn {
  margin-bottom: 10px;
}
</style>

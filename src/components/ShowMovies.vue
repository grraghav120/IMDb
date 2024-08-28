<template>
  <v-container>
    <div>
      <v-btn class="add-movie-btn" @click="addMovie()">Add Movie</v-btn>
    </div>
    <div style="margin: 10px 0px;">
      <h2>Movies</h2>
      <v-row>
        <v-col
          v-for="movie in movieList"
          :key="movie.title"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card class="mx-auto ma-1">
            <v-img
              class="align-end text-white"
              height="200"
              v-bind:src="movie.poster"
              cover
            >
            </v-img>
            <v-card-subtitle class="movie-title">
              {{ movie.name }}
            </v-card-subtitle>
            <v-card-text class="movie-desc">
              <div>{{ movie.plot }}</div>
            </v-card-text>
            <v-card-actions>
              <div>
                <SingleMovie :parent-data="movie"></SingleMovie>
              </div>
              <div class="icon-btns">
                <DeleteMovie
                  :parent-data="{ id: movie.id }"
                ></DeleteMovie>
                <v-icon @click="editMovie(movie.id)" class="edit-icon ma-2"
                  >mdi-pencil</v-icon
                >
                <div>
                  <v-btn @click="onAddToFav(movie)" >Fav.</v-btn>
                  </div>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div style="margin: 10px 0px;">
      <h2>Fav. Movies</h2>
      <v-row>
        <v-col
          v-for="movie in favMovieList"
          :key="movie.title"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card class="mx-auto ma-1">
            <v-img
              class="align-end text-white"
              height="200"
              v-bind:src="movie.poster"
              cover
            >
            </v-img>
            <v-card-subtitle class="movie-title">
              {{ movie.name }}
            </v-card-subtitle>
            <v-card-text class="movie-desc">
              <div>{{ movie.plot }}</div>
            </v-card-text>
            <v-card-actions>
              <div>
                <SingleMovie :parent-data="movie"></SingleMovie>
              </div>
              <div class="icon-btns">
                <DeleteMovie
                  :parent-data="{ id: movie.id }"
                ></DeleteMovie>
                <v-icon @click="editMovie(movie.id)" class="edit-icon ma-2"
                  >mdi-pencil</v-icon
                >
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
  </v-container>
</template>

<script>
import DeleteMovie from "./DeleteMovie.vue";
import SingleMovie from "./SingleMovie.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    DeleteMovie,
    SingleMovie,
  },
  data() {
    return {
    };
  },
  computed:{
    ...mapGetters(['loading','movieList','favMovieList'])
  },
  methods: {
    ...mapActions(['getAllMovies','addingToFav']),
    addMovie() {
      this.$router.push("/movie/add");
    },
    editMovie(movieId) {
      this.$router.push({
        name: "editPage",
        params: { id: movieId },
      });
    },
    onAddToFav(movie){
      this.addingToFav(movie);
    }
  },
  mounted(){
    if(this.movieList.length==0 || this.movieList==undefined) this.getAllMovies();
  }
};
</script>

<style scoped>
.movie-desc {
  flex-grow: 1;
  max-height: 80px;
  overflow:hidden;
  text-overflow: ellipsis;
}

.movie-title {
  font-weight: bold;
  font-size: 20px;
  color: black !important;
}

.add-movie-btn {
  color: black;
  margin: 20px 0px;
}

.v-card__actions {
  display: flex;
  justify-content: space-between;
}

.edit-icon {
  color: blue;
}

.icon-btns {
  display: flex;
  align-items: center;
}

.v-card {
  transition: box-shadow 0.5s;
}

.v-card:hover {
  box-shadow: 10px 10px 10px 3px rgba(0, 0, 0, 0.2);
}
</style>

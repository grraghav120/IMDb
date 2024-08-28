<template>
    <div>
        <v-dialog v-model="dialog" width=600px>
            <template v-slot:activator="{ on, attrs }">
                <v-btn text small class="explore-btn" @click=getMovie() v-bind="attrs" v-on="on">
                    Explore
                    <v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-text class="movie-information">
                    <template>
                        <v-img max-width="250" class="align-end text-white" height="200" :src="movie.poster" cover>
                        </v-img>
                        <h2>{{ movie.name }}</h2>
                        <div class="genre-chips">
                            <v-chip v-for="genre in allGenres" :key="genre.id" class="ma-2 chips" color="green"
                                text-color="white" outlined>
                                {{ genre.name }}
                            </v-chip>
                        </div>
                        <v-simple-table>
                            <template v-slot:default>
                                <tbody>
                                    <TableRow v-for="(value, index) in movie" :key="index" :first-data="index"
                                        :second-data="value"></TableRow>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="green" variant="flat" text @click="dialog = false">
                        Ok
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import TableRow from './TableRow.vue';
export default {
    components: {
        TableRow
    },
    props: {
        parentData: Object,
    },
    data() {
        return {
            dialog: false,
            movie: {
                yor: "",
                plot: '',
                producer: '',
                actors: "",
                name: "",
                poster: "",
            },
            allGenres: [],
        }
    },
    methods: {
        getMovie() {
            let allActors = "";
            for (let i = 0; i < this.parentData.actors.length; i++) {
                allActors += this.parentData.actors[i].name;
                allActors += ",  ";
            }
            this.movie.producer = this.parentData.producer.name;
            this.movie.yor = this.parentData.yearOfRelease.toString();
            this.movie.plot = this.parentData.plot;
            this.movie.poster = this.parentData.poster;
            this.movie.actors = allActors;
            this.allGenres = this.parentData.genres;
            this.movie.name = this.parentData.name;
        },
    }
}
</script>

<style scoped>
.explore-btn {
    color: blue;
    border: blue 1px solid
}

.movie-information {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px !important;
}

h2 {
    margin: 5px;
    color: black;
}

.chips {
    margin: 0px 3px;
}

.genre-chips {
    margin: 5px;
}

</style>
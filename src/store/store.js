import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router/router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        movieList: [],
        loading:false,
        error:null,
        actorsAvailable:[],
        producersAvailable:[],
        genresAvaliable:[],
        body:null,
        movieId:null,
        setNewActor:null,
        setNewProducer:null,
        today:'',
        favMovieList:[],
        //all variables to make global
    },
    mutations:{
        setMovieList(state,payload){
            state.movieList=payload.movieList;
        },
        setLoader(state,isLoad){
            state.loading=isLoad;
        },
        setError(state,error){
            state.error=error;
        },
        setAvailableActors(state,payload){
            state.actorsAvailable=payload;
        },
        setAvaialbleProducers(state,payload){
            state.producersAvailable=payload;
        },
        setAvaialbleGenres(state,payload){
            state.genresAvaliable=payload;
        },
        setBody(state,payload){
            state.body=payload;
        },
        setMovieId(state,val){
            state.movieId=val;
        },
        setNewActor(state,payload){
            state.setNewActor=payload;
        },
        setNewProducer(state,payload){
            state.setNewProducer=payload;
        },
        setFavMovieList(state,payload){
            state.favMovieList=payload;
        }
    },
    getters:{
        movieList(state){
            return state.movieList;
        },
        loading(state){
            return state.loading;
        },
        actorsAvailable(state){
            return state.actorsAvailable;
        },
        producersAvailable(state){
            return state.producersAvailable;
        },
        genresAvaliable(state){
            return state.genresAvaliable;
        },
        newActor(state){
            return state.setNewActor;
        },
        newProducer(state){
            return state.setNewProducer;
        },
        today() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        favMovieList(state){
            return state.favMovieList;
        }
    },
    actions: {
        addingToFav(context,payload){
            let index=context.state.movieList.indexOf(payload);
            console.log(index);
            context.state.movieList.splice(index,1);
            context.state.favMovieList.push(payload);
        },
        async getAllMovies(context) {
            context.commit('setLoader',true);
            try {
                let res = await axios.get("https://localhost:44368/movies");
                console.log(res);
                context.commit('setMovieList',{movieList:res.data.data});
            } catch (error) {
                context.commit('setError', error);
            } finally {
                context.commit('setLoader',false);
            }
        },
        async deleteMovie(context,payload) {
            context.commit('setLoader',true);
            try {
                console.log(payload.id);
                await axios.delete("https://localhost:44368/movies/"+payload.id);
                let movies=context.state.movieList.filter(movie=>movie.id!==payload.id);
                let favmovies=context.state.favMovieList.filter(movie=>movie.id!==payload.id);
                context.commit("setMovieList",{movieList:movies});
                context.commit("setFavMovieList",favmovies);
            } catch (error) {
                context.commit('setError', error);
            } finally {
                context.commit('setLoader',false);
            }
        },
        async getAllActors(context){
            context.commit('setLoader',true);
            try {
                let res = await axios.get("https://localhost:44368/actors");
                context.commit('setAvailableActors',res.data.data);
            } catch (error) {
                context.commit('setError', error);
            } finally {
                context.commit('setLoader',false);
            }
        },
        async getAllProducers(context) {
            context.commit('setLoader',true);
            try {
                let res = await axios.get("https://localhost:44368/producers");
                context.commit('setAvaialbleProducers',res.data.data);
            } catch (error) {
                context.commit('setError', error);
            } finally {
                context.commit('setLoader',false);
            }
        },
        async getAllGenres(context) {
            context.commit('setLoader',true);
            try {
                let res = await axios.get("https://localhost:44368/genres");
                context.commit('setAvaialbleGenres',res.data.data);
            } catch (error) {
                context.commit('setError', error);
            } finally {
                context.commit('setLoader',false);
            }
        },
        async uploadPoster(context,payload){
            context.commit('setLoader',true);
            try {
                let res = await axios.post("https://localhost:44368/movies/upload", payload.formData);
                payload.body.poster=res.data;
                context.commit("setBody",payload.body);
                context.commit("setMovieId",payload.id);
            } catch (error) {
                context.commit('setError', error);
            } finally {
                context.commit('setLoader',false);
            }
        },
        async saveMovie(context,payload){
            context.commit('setLoader',true);
            try {
                if(!payload.isEdit){//POST
                    let res=await axios.post("https://localhost:44368/movies",context.state.body);
                    context.state.body.id=res.data;
                    console.log(context.state.body);
                    context.state.movieList.push(context.state.body);
                }else{//PUT
                    await axios.put("https://localhost:44368/movies/" + payload.id, payload.body)
                    let updatedMovie=context.state.movieList.find(movie=>movie.id===payload.id);
                    payload.body.id=payload.id;
                    if(updatedMovie==undefined || updatedMovie==null){
                        let index=context.state.favMovieList.findIndex(movie=>movie.id===payload.id)
                        context.state.favMovieList[index]=payload.body;
                    }else{
                        let index=context.state.movieList.findIndex(movie=>movie.id===payload.id);
                        context.state.movieList[index]=payload.body;
                        console.log(index);
                    }
                }
            } catch (error) {
                context.commit('setError', error);
            } finally {
                context.commit('setLoader',false);
                router.push("/movies");
            }
        },
        async addActorProducer(context,payload){
            context.commit('setLoader',true);
            try {
                if(payload.type==='actor'){
                    let res = await axios.post("https://localhost:44368/actors",payload.body);
                    payload.body.id = res.data;
                    context.commit("setNewActor",payload.body);

                }else{
                    let res = await axios.post("https://localhost:44368/producers",payload.body);
                    payload.body.id = res.data;
                    context.commit("setNewProducer",payload.body);
                }
            } catch (error) {
                context.commit('setError', error);
            } finally {
                context.commit('setLoader',false);
            }
        },
    }

})

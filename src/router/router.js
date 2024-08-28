// Requiring module 
import Vue from 'vue'
import VueRouter from 'vue-router'
import ShowMovies from '@/components/ShowMovies.vue'
import AddEditMovie from '@/components/AddEditMovie.vue'
Vue.use(VueRouter) 

const routes = [ 
	{ 
		path: '/movies',
		component: ShowMovies 
	}, 
	{ 
		path: '/movie/add', 
		component: AddEditMovie 

	}, 
    {
        path:'/movie/edit/:id',
		name:'editPage',
        component:AddEditMovie,
		// props:true,
    },
    { 
        // Redirect any undefined routes to Movie component
        path: '*',
		redirect: '/movies',
    }
] 

// Create Vue Router Object 
const router = new VueRouter({ 
	mode: 'history', 
	routes,
	scrollBehavior() {
		return { x: 0, y: 0 }
	}
}) 

export default router
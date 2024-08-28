// Requiring module 
import Vue from 'vue'
import VueRouter from 'vue-router'
import ShowMovies from '@/components/ShowMovies.vue'
import AddEditMovie from '@/components/AddEditMovie.vue'
import NotFound from '@/components/NotFound.vue'
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
        component:NotFound,
      }
	// { 
	// 	path: '/about', 
	// 	name: 'About', 
	// 	// The route level code-splitting 
	// 	// this generates a separate chunk 
	// 	// (about.[hash].js) for this route 
	// 	// which is lazy-loaded when the 
	// 	// route is visited. 
	// 	component:()=> import( 
	// 		/* webpackChunkName: "about" */
	// 		'../views/About.vue'
	// 	) 
	// }, 
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
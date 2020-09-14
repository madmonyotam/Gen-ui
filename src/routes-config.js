import Dashboard from 'plugins/dashboard';
import Login from 'Views/Login';
import Project from 'Views/Project'; 

export default [
	{
		path: '/login',
		component: Login
	},
	{
		path: '/dashboard',
		component: Dashboard,
	}, 
	{
		path: '/project/:id',
		component: Project
	}
];

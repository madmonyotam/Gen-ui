import Dashboard from 'Views/Dashboard';
import Login from 'Views/Login-rev';
import Project from 'Views/Project'; 

export default [
	{
		path: '/login',
		component: Login
	},
	{
		path: '/dashboard',
		component: Dashboard,
		routes: [
			{
				path: '/dashboard/project/:id',
				component: Project
			}
		]
	}, 
];

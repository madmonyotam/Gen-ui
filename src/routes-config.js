import Dashboard from 'plugins/dashboard';
import Project from 'plugins/project';
import OldProjectView from 'Views/Project';
import Login from 'Views/Login';

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
	},
	{
		path: '/old-project/:id',
		component: OldProjectView
	}
];

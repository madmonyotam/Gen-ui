import Dashboard from 'Views/Dashboard';
import Login from 'Views/Login-rev';
import Project from 'Views/Project';
// export {
// 	Dashboard,
// 	Login
// };


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
// {
	//     path: "/dashboard",
	//     component: Dashboard,
	//     routes: [
	//         {
	//             path: "/dashboard/bus",
	//             component: () => <div>bus</div>
	//         },
	//         {
	//             path: "/dashboard/cart",
	//             component: () => <div>cart</div>
	//         }
	//     ]
	// }
];

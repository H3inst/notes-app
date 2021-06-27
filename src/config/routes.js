const ROUTES = {
	root: '/',
	auth: '/auth',
	register: '/register',
	login: '/login',

	get registerRoute() {
		return `${this.auth}${this.register}`;
	},
	get loginRoute() {
		return `${this.auth}${this.login}`;
	},
};

export default Object.freeze(ROUTES);

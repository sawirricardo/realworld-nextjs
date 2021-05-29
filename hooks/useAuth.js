import { useState, useEffect } from 'react';
import axios from 'axios';
export default function useAuth() {
	const [isLogin, setIsLogin] = useState(false);
	const [user, setUser] = useState({ bio: '', username: '', image: '', email: '' });

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			setIsLogin(false);
		}

		axios
			.get(`https://conduit.productionready.io/api/user`, {
				headers: { Authorization: `TOKEN ${localStorage.getItem('token')}` },
			})
			.then((res) => {
				if (res.data.user) {
					setIsLogin(true);
					setUser(res.data.user);
				}
			})
			.catch((err) => {
				setIsLogin(false);
			});
	}, []);

	return [isLogin, user];
}

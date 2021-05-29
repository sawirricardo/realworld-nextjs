import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/layout';
import useAuth from '../hooks/useAuth';
export default function UserEdit() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isLogin, user] = useAuth();
	const [image, setImage] = useState(user.image);
	const [username, setUsername] = useState(user.username);
	const [email, setEmail] = useState(user.email);
	const [bio, setBio] = useState(user.bio);
	const [password, setPassword] = useState(user.password);
	const [errors, setErrors] = useState();
	const [success, setSuccess] = useState();

	const handleSubmit = function (e) {
		e.preventDefault();
		setIsSubmitting(true);
		axios
			.put(`https://conduit.productionready.io/api/user`, { data: { user: { email, username, image, bio, password } } }, { headers: { Authorization: `TOKEN ${user.token}` } })
			.then((res) => {
				setSuccess('Settings saved!');
			})
			.catch((err) => setErrors(err))
			.finally(() => setIsSubmitting(false));
	};
	return (
		<Layout>
			<div class="settings-page">
				<div class="container page">
					<div class="row">
						<div class="col-md-6 offset-md-3 col-xs-12">
							<h1 class="text-xs-center">Your Settings</h1>

							<form onSubmit={handleSubmit}>
								<fieldset>
									<fieldset class="form-group">
										<input
											class="form-control"
											type="text"
											placeholder="URL of profile picture"
											onInput={(e) => {
												setImage(e.target.value);
											}}
										/>
									</fieldset>
									<fieldset class="form-group">
										<input
											class="form-control form-control-lg"
											type="text"
											placeholder="Your Name"
											onInput={(e) => {
												setUsername(e.target.value);
											}}
										/>
									</fieldset>
									<fieldset class="form-group">
										<textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" onInput={(e) => setBio(e.target.value)}></textarea>
									</fieldset>
									<fieldset class="form-group">
										<input class="form-control form-control-lg" type="text" placeholder="Email" onInput={(e) => setEmail(e.target.value)} />
									</fieldset>
									<fieldset class="form-group">
										<input class="form-control form-control-lg" type="password" placeholder="Password" onInput={(e) => setPassword(e.target.value)} />
									</fieldset>
									<button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

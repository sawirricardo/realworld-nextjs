import axios from 'axios';
import Layout from '../components/layout';
import Image from 'next/image';
import ArticlePreview from '../components/article-preview';
import { useState, useEffect } from 'react';
import Link from 'next/link';
export default function UserShow({ user, articles }) {
	const [isLogin, setIsLogin] = useState(false);

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
				}
			})
			.catch((err) => {
				setIsLogin(false);
			});
	}, []);

	return (
		<Layout>
			<div class="profile-page">
				<div class="user-info">
					<div class="container">
						<div class="row">
							<div class="col-xs-12 col-md-10 offset-md-1">
								<img src={user.image} className="user-img" />
								<h4>{user.username}</h4>
								<p>{user.bio}</p>
								{!isLogin && (
									<Link href="/login">
										<button class="btn btn-sm btn-outline-secondary action-btn">Follow {user.username}</button>
									</Link>
								)}
								{isLogin && (
									<button class="btn btn-sm btn-outline-secondary action-btn">
										{!user.following && (
											<>
												<i class="ion-plus-round"></i>
												&nbsp; Follow {user.username}
											</>
										)}
										{user.following && (
											<>
												<i class="ion-minus-round"></i>
												&nbsp; Unfollow {user.username}
											</>
										)}
									</button>
								)}
							</div>
						</div>
					</div>
				</div>

				<div class="container">
					<div class="row">
						<div class="col-xs-12 col-md-10 offset-md-1">
							<div class="articles-toggle">
								<ul class="nav nav-pills outline-active">
									<li class="nav-item">
										<a class="nav-link active" href="">
											My Articles
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" href="">
											Favorited Articles
										</a>
									</li>
								</ul>
							</div>
							{articles.map((article) => (
								<>
									<ArticlePreview article={article} />
								</>
							))}

							{/* <div class="article-preview">
								<div class="article-meta">
									<a href="">
										<img src="http://i.imgur.com/Qr71crq.jpg" />
									</a>
									<div class="info">
										<a href="" class="author">
											Eric Simons
										</a>
										<span class="date">January 20th</span>
									</div>
									<button class="btn btn-outline-primary btn-sm pull-xs-right">
										<i class="ion-heart"></i> 29
									</button>
								</div>
								<a href="" class="preview-link">
									<h1>How to build webapps that scale</h1>
									<p>This is the description for the post.</p>
									<span>Read more...</span>
								</a>
							</div>

							<div class="article-preview">
								<div class="article-meta">
									<a href="">
										<img src="http://i.imgur.com/N4VcUeJ.jpg" />
									</a>
									<div class="info">
										<a href="" class="author">
											Albert Pai
										</a>
										<span class="date">January 20th</span>
									</div>
									<button class="btn btn-outline-primary btn-sm pull-xs-right">
										<i class="ion-heart"></i> 32
									</button>
								</div>
								<a href="" class="preview-link">
									<h1>The song you won't ever stop singing. No matter how hard you try.</h1>
									<p>This is the description for the post.</p>
									<span>Read more...</span>
									<ul class="tag-list">
										<li class="tag-default tag-pill tag-outline">Music</li>
										<li class="tag-default tag-pill tag-outline">Song</li>
									</ul>
								</a>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export async function getStaticPaths() {
	const resArticles = await axios.get(`https://conduit.productionready.io/api/articles`);

	return {
		paths: resArticles.data.articles.map((article) => {
			return { params: { username: article.author.username } };
		}),
		fallback: false, // See the "fallback" section below
	};
}

export async function getStaticProps({ params }) {
	// Call an external API endpoint to get posts.
	// You can use any data fetching library
	const resUser = await axios.get(`https://conduit.productionready.io/api/profiles/${params.username}`);
	const resArticles = await axios.get(`https://conduit.productionready.io/api/articles?author=${params.username}`);
	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			user: resUser.data.profile,
			articles: resArticles.data.articles,
		},
	};
}

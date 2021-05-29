import Layout from '../components/layout';
import Link from 'next/link';
import axios from 'axios';
import ArticlePreview from '../components/article-preview';
export default function Index({ articles, tags }) {
	return (
		<Layout>
			<div class="home-page">
				<div class="banner">
					<div class="container">
						<h1 class="logo-font">conduit x Ricardo Sawir</h1>
						<p>A place to share your knowledge.</p>
					</div>
				</div>

				<div class="container page">
					<div class="row">
						<div class="col-md-9">
							<div class="feed-toggle">
								<ul class="nav nav-pills outline-active">
									<li class="nav-item">
										<a class="nav-link disabled" href="">
											Your Feed
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link active" href="">
											Global Feed
										</a>
									</li>
								</ul>
							</div>

							{articles.map((article) => (
								<ArticlePreview article={article} />
							))}

							<div class="article-preview">
								<div class="article-meta">
									<a href="profile.html">
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
								</a>
							</div>
						</div>

						<div class="col-md-3">
							<div class="sidebar">
								<p>Popular Tags</p>

								<div class="tag-list">
									{tags.map((tag) => (
										<Link href={`/articles?tag=${tag}`}>
											<a className="tag-pill tag-default">{tag}</a>
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export async function getStaticProps() {
	const resTags = await axios.get(`https://conduit.productionready.io/api/tags`);
	const tags = resTags.data.tags;
	const resArticles = await axios.get(`https://conduit.productionready.io/api/articles`);
	const articles = resArticles.data.articles;
	return {
		props: {
			tags,
			articles,
		},
	};
}

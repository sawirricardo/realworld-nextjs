import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import ArticlePreview from '../components/article-preview';
import Link from 'next/link';

export default function ArticleIndex({ tags }) {
	const router = useRouter();
	const [loadingArticle, setLoadingArticle] = useState(true);
	const [articles, setArticles] = useState();
	useEffect(() => {
		if (!router.isReady) return;

		axios
			.get(`https://conduit.productionready.io/api/articles?tag=${router.query.tag}`)
			.then((res) => setArticles(res.data.articles))
			.catch((err) => console.log(err))
			.finally(() => setLoadingArticle(false));
	}, [router.isReady]);
	return (
		<Layout>
			<div class="home-page">
				<div class="banner">
					<div class="container">
						<h1 class="logo-font">{router.query.tag}</h1>
						<p>A place to share your knowledge.</p>
					</div>
				</div>

				<div class="container page">
					<div class="row">
						<div class="col-md-9">
							{loadingArticle && `Loading...`}
							{!loadingArticle && articles.map((article) => <ArticlePreview article={article} />)}
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
	return {
		props: {
			tags,
		},
	};
}

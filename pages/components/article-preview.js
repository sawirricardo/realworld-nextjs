import Link from 'next/link';
export default function ArticlePreview({ article }) {
	return (
		<>
			<div class="article-preview">
				<div class="article-meta">
					<a href="profile.html">
						<img src={article.author.image} />
					</a>
					<div class="info">
						<Link href={`/profile/${article.author.username}`}>
							<a className="author">{article.author.username}</a>
						</Link>
						<span class="date">January 20th</span>
					</div>
					<button class="btn btn-outline-primary btn-sm pull-xs-right">
						<i class="ion-heart"></i> {article.favoritesCount}
					</button>
				</div>
				<Link href={`/articles/${article.slug}`}>
					<a className="preview-link">
						<h1>{article.title}</h1>
						<p>{article.description}</p>
						<span>Read more...</span>
					</a>
				</Link>
			</div>
		</>
	);
}

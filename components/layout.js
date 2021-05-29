import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

export default function Layout({ children }) {
	const router = useRouter();
	const [isLogin, user] = useAuth();

	return (
		<div>
			<nav class="navbar navbar-light">
				<div class="container">
					<Link href="/">
						<a className="navbar-brand">conduit</a>
					</Link>
					<ul class="nav navbar-nav pull-xs-right">
						<li class="nav-item">
							<Link href="/">
								<a className={`nav-link ${router.asPath === '/' && 'active'}`}>Home</a>
							</Link>
						</li>
						{isLogin && (
							<>
								<li class="nav-item">
									<Link href="/">
										<a className={`nav-link ${router.asPath === '/' && 'active'}`}>
											<i class="ion-compose"></i>&nbsp;New Post
										</a>
									</Link>
								</li>
								<li class="nav-item">
									<Link href="/settings">
										<a className={`nav-link ${router.asPath === '/settings' && 'active'}`}>
											<i class="ion-gear-a"></i>&nbsp;Settings
										</a>
									</Link>
								</li>
								<li class="nav-item">
									<a className={`nav-link ${router.asPath === '/settings' && 'active'}`} href="#" onClick={handleLogout}>
										Logout
									</a>
								</li>
							</>
						)}

						<li class="nav-item">
							<Link href="/register">
								<a className={`nav-link ${router.asPath === '/register' && 'active'}`}>Sign up</a>
							</Link>
						</li>
						<li class="nav-item">
							<Link href="/">
								<a className={`nav-link ${router.asPath === '/login' && 'active'}`}>Login</a>
							</Link>
						</li>
					</ul>
				</div>
			</nav>
			{children}
			<footer>
				<div class="container">
					<a href="/" class="logo-font">
						conduit
					</a>
					<span class="attribution">
						An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
					</span>
				</div>
			</footer>
		</div>
	);
}

'use client';
import { signIn } from 'next-auth/react';

const HomePage = () => {
	return (
		<div>
			<h1>HomePage</h1>

			<button
				className="bg-slate-600 px-4 py-2 text-white"
				onClick={() => signIn('github', { callbackUrl: '/' })}
				type="button"
			>
				Sign In With GitHub
			</button>
		</div>
	);
};

export default HomePage;

'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

const HomePage = () => {
	const { data: session } = useSession();
	const [repoName, setRepoName] = useState('');
	const [description, setDescription] = useState('');

	const createRepo = async () => {
		try {
			const response = await fetch('/api/create-repo', {
				method: 'POST',
			});

			if (!response.ok) throw new Error('Failed to create repository');

			const repoData = await response.json();
			console.log('Repository created:', repoData);
		} catch (error) {
			console.error(error);
		}
	};

	const checkAccessToken = () => {
		// Check if accessToken exists in the session and log it
		if (session?.accessToken) {
			console.log('Access Token:', session.accessToken);
			alert(`Access Token: ${session.accessToken}`);
		} else {
			console.log('No Access Token found');
			alert('No Access Token found');
		}
	};

	return (
		<div>
			<h1>HomePage</h1>

			{session ? (
				<div>
					<p>Welcome, {session.user?.name || 'User'}!</p>
					<div>
						<img
							src={session.user?.image || 'image-placeholder-url'}
							width={50}
							alt="User profile"
						/>
					</div>

					<button
						className="bg-slate-600 px-4 py-2 text-white"
						onClick={() => signOut({ callbackUrl: '/' })}
						type="button"
					>
						Sign Out
					</button>

					<div className="mt-4">
						<h2>Create a New Repository</h2>
						<input
							type="text"
							placeholder="Repository Name"
							value={repoName}
							onChange={(e) => setRepoName(e.target.value)}
							className="mb-2 px-2 py-1 border"
						/>
						<textarea
							placeholder="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="mb-2 px-2 py-1 border"
						/>
						{/* <button
							className="bg-green-600 px-4 py-2 text-white"
							onClick={handleCreateRepo}
							type="button"
						>
							Deploy New Repo
						</button> */}
					</div>

					{/* Button to Check Access Token */}
					<div className="mt-4">
						<button
							className="bg-blue-600 px-4 py-2 text-white"
							onClick={checkAccessToken}
							type="button"
						>
							Check Access Token
						</button>
					</div>
					<div>
						<button onClick={createRepo}>Create Repository</button>
					</div>
				</div>
			) : (
				<button
					className="bg-slate-600 px-4 py-2 text-white"
					onClick={() => signIn('github', { callbackUrl: '/' })}
					type="button"
				>
					Sign In With GitHub
				</button>
			)}
		</div>
	);
};

export default HomePage;

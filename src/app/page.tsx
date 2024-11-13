/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Footer } from '@/components/layout/Footer';
import { Github, Loader2 } from 'lucide-react';

const HomePage = () => {
	const { data: session } = useSession();

	const [projectName, setProjectName] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [repoUrl, setRepoUrl] = useState('');

	const handleCreateDapp = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			// Send request to create the GitHub repository
			const response = await fetch('/api/create-repo', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name: projectName }),
			});

			if (!response.ok) throw new Error('Failed to create repository');

			const repoData = await response.json();
			console.log('Repository created:', repoData);

			const username = repoData.githubHandle;
			const actualRepoName = repoData.name;

			if (username && actualRepoName) {
				setRepoUrl(`https://github.com/${username}/${actualRepoName}`);
			} else {
				throw new Error(
					"Couldn't retrieve GitHub username or repository name."
				);
			}
		} catch (error) {
			console.error('Error creating repository:', error);
			alert('Error creating repository');
		} finally {
			// Reset loading state and clear project name
			setIsLoading(false);
			setProjectName('');
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						1-Click Telegram Mini Game
					</CardTitle>
					<CardDescription className="text-gray-500">
						Create your telegram game repository in one click
					</CardDescription>
				</CardHeader>
				{session ? (
					<>
						{repoUrl ? (
							<CardContent>
								<div className="space-y-4">
									<div className="space-y-2">
										<Label
											htmlFor="project-name"
											className="font-bold"
										>
											Your new repository has been
											created!
										</Label>
										<button
											className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
											onClick={() =>
												window.open(repoUrl, '_blank')
											}
											type="button"
										>
											Go to repository
										</button>
									</div>
								</div>
							</CardContent>
						) : (
							<form onSubmit={handleCreateDapp}>
								<CardContent>
									<div className="space-y-4">
										<div className="space-y-2">
											<Label
												htmlFor="project-name"
												className="font-bold"
											>
												Project Name
											</Label>
											<Input
												id="project-name"
												placeholder="Enter your project name"
												value={projectName}
												onChange={(e) =>
													setProjectName(
														e.target.value
													)
												}
												required
											/>
										</div>
									</div>
								</CardContent>
								<CardFooter className="flex-col gap-y-2">
									<Button
										type="submit"
										className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
										disabled={
											isLoading || !projectName.trim()
										}
									>
										{isLoading ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												Creating Dapp...
											</>
										) : (
											<>
												<Github className="mr-2 h-4 w-4" />
												Create Dapp
											</>
										)}
									</Button>
									{/* <button
								className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
								onClick={() => signOut({ callbackUrl: '/' })}
								type="button"
							>
								Sign Out
							</button> */}
								</CardFooter>
							</form>
						)}
					</>
				) : (
					<div className="w-full flex justify-center h-[70px]">
						<Button
							className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out "
							onClick={() =>
								signIn('github', { callbackUrl: '/' })
							}
							type="button"
						>
							Sign In With GitHub
						</Button>
					</div>
				)}
			</Card>
			<Footer />
		</div>
	);
};

export default HomePage;

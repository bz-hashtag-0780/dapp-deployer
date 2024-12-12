import { Octokit } from '@octokit/rest';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { options } from '../auth/[...nextauth]/options'; // adjust this import path based on your setup

export async function POST(request: Request) {
	const session = await getServerSession(options);

	if (!session) {
		return NextResponse.json(
			{ message: 'Not authenticated' },
			{ status: 401 }
		);
	}

	const accessToken = session.accessToken as string;
	const octokit = new Octokit({ auth: accessToken });
	const { name } = await request.json();

	try {
		// Fetch the authenticated user's GitHub handle
		const { data: userData } = await octokit.rest.users.getAuthenticated();
		const githubHandle = userData.login;

		// Attempt to get the repository by name
		let repositoryName = name || `kitty-kombat-lite`;
		let repoExists = false;

		try {
			await octokit.rest.repos.get({
				owner: githubHandle,
				repo: repositoryName,
			});
			repoExists = true;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.status !== 404) {
				throw error; // Throw other errors
			}
			// If 404, repository does not exist, so proceed
		}

		// If repository exists, append a random suffix to make it unique
		if (repoExists) {
			const randomSuffix = Math.random().toString(36).substring(2, 7);
			repositoryName = `${repositoryName}-${randomSuffix}`;
		}

		// Use Octokit to create the repository
		const response = await octokit.request(
			'POST /repos/{template_owner}/{template_repo}/generate',
			{
				template_owner: 'bz-hashtag-0780',
				template_repo: 'kitty-kombat-lite',
				name: repositoryName,
			}
		);

		return NextResponse.json(
			{ ...response.data, githubHandle },
			{ status: 201 }
		);
	} catch (error) {
		console.error('Error creating repository:', error);
		return NextResponse.json(
			{
				message: 'Error creating repository',
				error: (error as Error).message,
			},
			{ status: 500 }
		);
	}
}

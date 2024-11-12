import { Octokit } from '@octokit/rest';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { options } from '../auth/[...nextauth]/options'; // adjust this import path based on your setup

export async function POST(request: Request) {
	// Get the session, which includes the user's GitHub access token
	const session = await getServerSession(options);

	if (!session) {
		return NextResponse.json(
			{ message: 'Not authenticated' },
			{ status: 401 }
		);
	}

	const accessToken = session.accessToken as string;

	// const username = session.user?.name || 'default-username';

	// Initialize Octokit with the user's access token
	const octokit = new Octokit({
		auth: accessToken,
	});

	const { name } = await request.json();

	// Generate a random 5-character alphanumeric suffix
	const randomSuffix = Math.random().toString(36).substring(2, 7);

	// Use the provided name, or generate a default name with a random suffix
	const repositoryName = name || `KittyZenBot-${randomSuffix}`;

	try {
		// Use Octokit to create the repository
		const response = await octokit.request(
			'POST /repos/{template_owner}/{template_repo}/generate',
			{
				template_owner: 'bz-hashtag-0780',
				template_repo: 'KittyZenBot',
				name: repositoryName,
			}
		);

		return NextResponse.json(response.data, { status: 201 });
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

import { Octokit } from '@octokit/rest';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { options } from '../auth/[...nextauth]/options'; // adjust this import path based on your setup

export async function POST() {
	// Get the session, which includes the user's GitHub access token
	const session = await getServerSession(options);

	if (!session) {
		return NextResponse.json(
			{ message: 'Not authenticated' },
			{ status: 401 }
		);
	}

	const accessToken = session.accessToken as string;

	const username = session.user?.name || 'default-username';

	// Initialize Octokit with the user's access token
	const octokit = new Octokit({
		auth: accessToken,
	});

	try {
		// Use Octokit to create the repository
		const response = await octokit.request(
			'POST /repos/{template_owner}/{template_repo}/generate',
			{
				template_owner: 'bz-hashtag-0780',
				template_repo: 'Hello-World',
				name: 'New-World-2',
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

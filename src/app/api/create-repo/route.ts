import { Octokit } from '@octokit/rest';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { options } from '../auth/[...nextauth]/options'; // adjust this import path based on your setup

export async function POST(req: NextRequest) {
	// Get the session, which includes the user's GitHub access token
	const session = await getServerSession(options);

	if (!session) {
		return NextResponse.json(
			{ message: 'Not authenticated' },
			{ status: 401 }
		);
	}

	const accessToken = session.accessToken as string;

	// Initialize Octokit with the user's access token
	const octokit = new Octokit({
		auth: accessToken,
	});

	try {
		// Use Octokit to create the repository
		const response = await octokit.request('POST /user/repos', {
			name: 'Hello-World-2', // Replace with the desired repo name or pass it from the client
			description: 'This is your first repo!',
			homepage: 'https://github.com',
			private: false,
			is_template: true,
			headers: {
				'X-GitHub-Api-Version': '2022-11-28',
			},
		});

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

import GitHubProvider from 'next-auth/providers/github';
import type { AuthOptions } from 'next-auth';

export const options: AuthOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
			authorization: {
				params: {
					scope: 'public_repo', // Adjusted scope
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({ session, token }) {
			// Cast token.accessToken to string | undefined
			session.accessToken = token.accessToken as string | undefined;
			return session;
		},
	},
};

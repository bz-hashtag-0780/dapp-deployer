'use client';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
	session?: Session;
}) {
	return (
		<SessionProvider>
			<html lang="en">
				<body>{children}</body>
			</html>
		</SessionProvider>
	);
}

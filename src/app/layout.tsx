'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import './globals.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SessionProvider>
			<html lang="en">
				<body suppressHydrationWarning={true}>{children}</body>
			</html>
		</SessionProvider>
	);
}

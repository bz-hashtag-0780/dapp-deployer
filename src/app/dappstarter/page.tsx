'use client';

import React from 'react';

const DappStarter: React.FC = () => {
	// const [dappType, setDappType] = useState('');

	const handleInstall = (type: string) => {
		alert(`Starting installation for ${type}`);
	};

	return (
		<div className="flex min-h-screen flex-col bg-background">
			<div className="bg-white p-8 rounded shadow-md">
				<h1 className="text-2xl font-bold text-gray-800">
					DappStarter
				</h1>
				<h2 className="text-lg text-gray-600 mb-4">
					Start building your dapp now!
				</h2>
				<div className="grid grid-cols-3 gap-4">
					<div className="relative flex min-h-[220px] flex-col rounded-lg border border-border bg-muted/50 p-4 hover:bg-muted">
						<h3 className="text-xl font-bold">
							1-Click Telegram Game
						</h3>
						<p className="text-gray-600">
							Description of Telegram Game Dapp
						</p>
						<button
							className="absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded"
							onClick={() => handleInstall('telegram-game')}
						>
							Create Dapp
						</button>
					</div>
					<div className="relative flex min-h-[220px] flex-col rounded-lg border border-border bg-muted/50 p-4 hover:bg-muted">
						<h3 className="text-xl font-bold">
							1-Click NBA Top Shot Dapp
						</h3>
						<p className="text-gray-600">
							Description of NBA Top Shot Dapp
						</p>
						<button
							className="absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded"
							onClick={() => handleInstall('nba-top-shot')}
						>
							Create Dapp
						</button>
					</div>
					<div className="relative flex min-h-[220px] flex-col rounded-lg border border-border bg-muted/50 p-4 hover:bg-muted">
						<h3 className="text-xl font-bold">
							1-Click Another Dapp
						</h3>
						<p className="text-gray-600">
							Description of Another Dapp
						</p>
						<button
							className="absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded"
							onClick={() => handleInstall('another-dapp')}
						>
							Create Dapp
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DappStarter;

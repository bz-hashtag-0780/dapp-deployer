/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	HelpCircle,
	BookOpen,
	FileText,
	KeyRound,
	AlertCircle,
} from 'lucide-react';

export function Footer() {
	return (
		<footer className="fixed bottom-0 w-full px-4 py-2 flex justify-between items-center bg-black/10 backdrop-blur-sm">
			<div className="text-white/80 text-sm">
				Powered by{' '}
				<a
					href="https://flow.com"
					className="font-semibold hover:text-white"
					target="_blank"
				>
					flow.com
				</a>
			</div>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="h-10 w-10 text-white/80 hover:text-white"
					>
						<HelpCircle className="h-5 w-5" />
						<span className="sr-only">Help menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuItem href="https://flow.com" target="_blank">
						<BookOpen className="mr-2 h-4 w-4" />
						Help & FAQ
					</DropdownMenuItem>
					{/* <DropdownMenuItem>
						<FileText className="mr-2 h-4 w-4" />
						Release notes
					</DropdownMenuItem>
					<DropdownMenuItem>
						<KeyRound className="mr-2 h-4 w-4" />
						Keyboard shortcuts
					</DropdownMenuItem>
					<DropdownMenuItem>
						<AlertCircle className="mr-2 h-4 w-4" />
						Report Issue
					</DropdownMenuItem> */}
				</DropdownMenuContent>
			</DropdownMenu>
		</footer>
	);
}

import type { Metadata } from "next"
import "./globals.css"
import { getProjectInfo } from "@/lib/versions"

export const metadata: Metadata = {
	title: getProjectInfo().title,
	description: getProjectInfo().description
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`antialiased min-w-[100vw] min-h-[100vh] p-4`}
			>
				{children}
			</body>
		</html>
	)
}

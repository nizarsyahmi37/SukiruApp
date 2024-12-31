import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"
import type { Metadata } from "next"

import Layout from "@/components/modules/layout"

import "./globals.css"

export const metadata: Metadata = {
	title: "Sukiru",
	description: ""
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`antialiased min-w-[100vw] min-h-[100vh]`}
			>
				<ThemeProvider
					defaultTheme="dark"
				>
					<Layout appId={process.env.PRIVY_APP_ID}>
						{children}
					</Layout>
				</ThemeProvider>
			</body>
		</html>
	)
}

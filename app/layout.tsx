import type { Metadata } from "next"
import "./globals.css"
import Layout from "@/components/modules/layout"

export const metadata: Metadata = {
	title: "Sukiru",
	description: ""
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
				<Layout appId={process.env.PRIVY_APP_ID}>
					{children}
				</Layout>
			</body>
		</html>
	)
}

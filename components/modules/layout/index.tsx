"use client"

import { PrivyProvider } from "@privy-io/react-auth"
import { ReactNode, useEffect, useState } from "react"

export default function Layout({
	children,
	appId
}: {
	children: ReactNode,
	appId: string | undefined
}) {
	const [isAppInitialized, setIsAppInitialized] = useState(false)

	useEffect(() => {
		if (!appId) {
			console.error(
				"Privy app ID is missing. Ensure PRIVY_APP_ID is set in the app environment variables."
			)
		} else {
			setIsAppInitialized(true)
		}
	}, [appId])

	return (
		isAppInitialized ? (
			<PrivyProvider
				appId={appId!}
				config={{
					appearance: {
						theme: "light",
						accentColor: "#676FFF",
						logo: "https://cryptologos.cc/logos/flow-flow-logo.png", // Replace with your logo
					},
					embeddedWallets: {
						createOnLogin: "all-users",
					},
					defaultChain: {
						id: 747,
						name: "Flow",
						network: "flow",
						nativeCurrency: {
							name: "Flow",
							symbol: "FLOW",
							decimals: 18,
						},
						rpcUrls: {
							default: {
								http: [
									"https://mainnet.evm.nodes.onflow.org",
								],
							},
						},
						blockExplorers: {
							default: {
								name: "Flowscan",
								url: "https://evm.flowscan.io/",
							},
						},
					},
					supportedChains: [
						{
							id: 747,
							name: "Flow",
							network: "flow",
							nativeCurrency: {
								name: "Flow",
								symbol: "FLOW",
								decimals: 18,
							},
							rpcUrls: {
								default: {
									http: [
										"https://mainnet.evm.nodes.onflow.org",
									],
								},
							},
							blockExplorers: {
								default: {
									name: "Flowscan",
									url: "https://evm.flowscan.io/",
								},
							},
						},
					],
				}}
			>
				{children}
			</PrivyProvider>
		) : (
			<div>
				<h1>Application Error</h1>
				<p>
					Privy app ID is not set.
				</p>
			</div>
		)
	)
}
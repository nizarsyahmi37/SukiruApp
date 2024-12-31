"use client"

import { PrivyProvider } from "@privy-io/react-auth"
import { ReactNode, useEffect, useState } from "react"
import { AuthContextProvider as FlowProvider} from "@/context/auth/flow"
import { AuthContextProvider as OkxProvider} from "@/context/auth/okx"
import "../../../flow-config"
import Header from "../header"

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
			<OkxProvider>
				<FlowProvider>
				<PrivyProvider
						appId={appId!}
						config={{
							appearance: {
								theme: "#191B28",
								accentColor: "#22273B",
								logo: "/assets/brand/png/sukiru-lettermark-gold.png"
							},
							embeddedWallets: {
								createOnLogin: "all-users",
							},
							defaultChain: {
								id: 545,
								name: "EVM on Flow Testnet",
								network: "flow",
								nativeCurrency: {
									name: "Flow",
									symbol: "FLOW",
									decimals: 18,
								},
								rpcUrls: {
									default: {
										http: [
											"https://testnet.evm.nodes.onflow.org",
										],
									},
								},
								blockExplorers: {
									default: {
										name: "Flowscan",
										url: "https://evm-testnet.flowscan.io/",
									},
								},
							},
							supportedChains: [
								{
									id: 545,
									name: "EVM on Flow Testnet",
									network: "flow",
									nativeCurrency: {
										name: "Flow",
										symbol: "FLOW",
										decimals: 18,
									},
									rpcUrls: {
										default: {
											http: [
												"	https://testnet.evm.nodes.onflow.org",
											],
										},
									},
									blockExplorers: {
										default: {
											name: "Flowscan",
											url: "https://evm-testnet.flowscan.io/",
										},
									},
								},
							],
						}}
					>
						<Header />
						{children}
					</PrivyProvider>
				</FlowProvider>
			</OkxProvider>
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

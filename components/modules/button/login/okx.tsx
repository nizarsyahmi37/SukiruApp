"use client"

import { useAuth } from "@/context/auth/okx"

export default function LoginWithOKX() {
	const { connected, walletAddress, chainId, logIn, logOut } = useAuth()

	return (
		<div className="page-container">
			<div className="card">
				<h1 className="card-title">OKX Wallet Connect</h1>

				{connected ? (
					<div>
						<p className="card-subtitle">
							Thanks for connecting your wallet!
						</p>
						<div className="space-y-4">
							<p className="connected-text">
								Wallet Address:{" "}
								{walletAddress && (
									<span className="connected-username">
										{walletAddress}
									</span>
								)}
							</p>
							{chainId && (
								<p className="connected-text">
									Chain ID:{" "}
									<span className="connected-username">
										{chainId}
									</span>
								</p>
							)}
							<button
								onClick={logOut}
								className="button button-disconnect"
							>
								Disconnect Wallet
							</button>
						</div>
					</div>
				) : (
					<div>
						<button
							onClick={logIn}
							className="button button-connect bg-primary text-white font-semibold w-full py-2 rounded-md hover:bg-foreground hover:text-background transition"
						>
							Connect OKX Wallet
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
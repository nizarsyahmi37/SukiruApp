import { config } from "@onflow/fcl"

config({
	"flow.network": "testnet",
	"accessNode.api": "https://rest-testnet.onflow.org",
	"discovery.wallet": `https://fcl-discovery.onflow.org/testnet/authn`,  
	// "flow.network": "mainnet",
	// "accessNode.api": "https://rest-mainnet.onflow.org",
	// "discovery.wallet": "https://fcl-discovery.onflow.org/authn",
})
import { getProjectInfo } from "@/lib/versions"
import LoginWithPrivy from "@/components/modules/button/login/privy"
import LoginWithFlow from "@/components/modules/button/login/flow"
import LoginWithOKX from "@/components/modules/button/login/okx"

export default function Home() {
	return (
		<div>
			<h1 className="text-8xl font-bold text-center">
				{getProjectInfo().title}
			</h1>
			<LoginWithPrivy />
			<LoginWithFlow />
			<LoginWithOKX />
		</div>
	)
}

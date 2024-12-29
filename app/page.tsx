import { getProjectInfo } from "@/lib/versions"
import LoginWithPrivy from "@/components/modules/login/LoginWithPrivy"

export default function Home() {
	return (
		<div>
			<h1 className="text-8xl font-bold text-center">
				{getProjectInfo().title}
			</h1>
			<LoginWithPrivy />
		</div>
	)
}

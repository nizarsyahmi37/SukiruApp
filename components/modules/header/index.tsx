"use client"

import { useRouter } from "next/navigation"
import Login from "../button/login/profile"
import ImageDynamic from "../image/dynamic"

export default function Header() {
	const router = useRouter()

	return (
		<div className={`grid grid-cols-2 gap-2 border border-transparent border-b-foreground p-4 pb-6`}>
			<div className="grid items-center">
				<ImageDynamic
					title={`Sukiru`}
					className={`cursor-pointer max-w-[150px] hidden md:block hover:scale-[101%]`}
					light={`/assets/brand/svg/sukiru-lettermark-dark.svg`}
					dark={`/assets/brand/svg/sukiru-lettermark-light.svg`}
					width={192}
					height={64}
					useWindowWidth={false}
					useWindowHeight={false}
					onClick={() => router.push("/")}
				/>
				<ImageDynamic
					title={`Sukiru`}
					className={`cursor-pointer max-w-[45px] block md:hidden hover:scale-[101%]`}
					light={`/assets/brand/svg/sukiru-icon-dark.svg`}
					dark={`/assets/brand/svg/sukiru-icon-light.svg`}
					width={150}
					height={138}
					useWindowWidth={false}
					useWindowHeight={false}
					onClick={() => router.push("/")}
				/>
			</div>
			<div className="grid items-center content-end ml-auto">
				<Login />
			</div>
		</div>
	)
}

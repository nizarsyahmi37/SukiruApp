"use client"

// import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { usePrivy } from "@privy-io/react-auth"
import LoginWithFlow from "@/components/modules/button/login/flow"
import LoginWithOKX from "@/components/modules/button/login/okx"
import LoginWithPrivy from "@/components/modules/button/login/privy"
import ProfileDisplay from "./display"
import { Gigs, Skills, Users } from "@/lib/types/database"
import { getGigByApplicant, getGigBySelected, getUserByEmail, getUserByTelegram, getUserByWallets } from "@/lib/helpers/database"
import ProfileCreate from "./create"

export default function ProfileLogin({
	users,
	skills,
	gigs
}: {
	users: Users[]
	skills: Skills[]
	gigs: Gigs[]
}) {  
	const { authenticated, user } = usePrivy()
	
	useEffect(() => {
		const check = async () => {
			if (authenticated && user) {

			}
		}
		check()
	}, [authenticated, user]);

	if (!authenticated && user?.email?.address) {
		const usrEmail = getUserByEmail(users, user?.email?.address)
		const usrTg = getUserByTelegram(users, user?.telegram?.username ? user?.telegram?.username : "")
		const usrWal = getUserByWallets(users, user?.wallet?.address ? [user?.wallet?.address] : [""])
		const usr = usrEmail ? usrEmail : usrTg ? usrTg : usrWal ? usrWal : undefined
		if (usr && usr !== undefined) {
			const applicant = getGigByApplicant(gigs, 2)
			const selected = getGigBySelected(gigs, 2)
			
			return (
				<div>
					<ProfileDisplay
						usr={usr as Users}
						users={users}
						skills={skills}
						applied={applicant}
						selected={selected}
					/>
				</div>
			)
		} else {
			return (
				<div>
					<ProfileCreate
						usr={usr || []}
						email={user?.email}
						telegram={user?.telegram}
						wallet={user?.wallet?.address ? [user?.wallet?.address] : [""]}
					/>
				</div>
			)
		}
	} else {
		return (
			<div>
				<LoginWithPrivy />
				<LoginWithFlow />
				<LoginWithOKX />
			</div>
		)
	}
}

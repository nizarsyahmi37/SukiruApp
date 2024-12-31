import ProfileLogin from "@/components/modules/profile/login"

export default async function Page() {
	const dataUsers = await fetch(`https://sukiruapp.vercel.app/api/users`)
	const dataSkills = await fetch("https://sukiruapp.vercel.app/api/skills")
	const dataGigs = await fetch(`https://sukiruapp.vercel.app/api/gigs`)

	const users = await dataUsers.json()
	const skills = await dataSkills.json()
	const gigs = await dataGigs.json()

	return (
		<div>
			<ProfileLogin
				users={users}
				skills={skills}
				gigs={gigs}
			/>
		</div>
	)
}

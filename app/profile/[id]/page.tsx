import ProfileDisplay from "@/components/modules/profile/display"

export default async function Page({
	params,
}: {
	params: Promise<{ id: number }>
}) {  
	const id = (await params).id
	const dataUsers = await fetch(`https://sukiruapp.vercel.app/api/users`)
	const dataSkills = await fetch("https://sukiruapp.vercel.app/api/skills")
	const dataUser = await fetch(`https://sukiruapp.vercel.app/api/users?id=${id}`)
	const dataSelected = await fetch(`https://sukiruapp.vercel.app/api/gigs?gig_selected=${id}`)
	const dataApplied = await fetch(`https://sukiruapp.vercel.app/api/gigs?gig_applicant=${id}`)

	const users = await dataUsers.json()
	const skills = await dataSkills.json()
	const user = await dataUser.json()
	const selected = await dataSelected.json()
	const applied = await dataApplied.json()

	return (
		<div>
			<ProfileDisplay
				user={user[0]}
				users={users}
				skills={skills}
				applied={applied}
				selected={selected}
			/>
		</div>
	)
}

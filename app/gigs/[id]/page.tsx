import GigsDisplay from "@/components/modules/gigs/display"

export default async function Page({
	params,
}: {
	params: Promise<{ id: number }>
}) {  
	const id = (await params).id
	const dataGigs = await fetch(`https://sukiruapp.vercel.app/api/gigs?id=${id}`)
	const dataUsers = await fetch("https://sukiruapp.vercel.app/api/users")
	const dataSkills = await fetch("https://sukiruapp.vercel.app/api/skills")
	const gigs = await dataGigs.json()
	const users = await dataUsers.json()
	const skills = await dataSkills.json()

	return (
		<div>
			<GigsDisplay
				gigs={gigs}
				users={users}
				skills={skills}
			/>
		</div>
	)
}

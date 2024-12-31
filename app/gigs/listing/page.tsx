import GigsAdd from "@/components/modules/gigs/add"

const db_url = process.env.DATABASE_URL

export default async function Page() {  
	const dataSkills = await fetch("https://sukiruapp.vercel.app/api/skills")
	const dataUsers = await fetch("https://sukiruapp.vercel.app/api/users")
	const skills = await dataSkills.json()
	const users = await dataUsers.json()

	return (
		<div>
			<GigsAdd
				skills={skills}
				users={users}
				database={db_url}
			/>
		</div>
	)
}

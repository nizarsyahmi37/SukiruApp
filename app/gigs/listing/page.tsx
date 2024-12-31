import GigsAdd from "@/components/modules/gigs/add"

// const database = process.env.DATABASE_URL

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
				database={"postgresql://neondb_owner:GJbX0MU8PirI@ep-hidden-scene-a5177c1d.us-east-2.aws.neon.tech/neondb?sslmode=require"}
			/>
		</div>
	)
}

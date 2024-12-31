import GigsListing from "@/components/modules/gigs/listing"

export default async function Page() {
	const dataGigs = await fetch("https://sukiruapp.vercel.app/api/gigs")
	const dataUsers = await fetch("https://sukiruapp.vercel.app/api/users")
	const gigs = await dataGigs.json()
	const users = await dataUsers.json()

	return (
		<div>
			<GigsListing
				gigs={gigs}
				users={users}
			/>
		</div>
	)
}

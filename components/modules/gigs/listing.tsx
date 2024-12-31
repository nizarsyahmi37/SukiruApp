"use client"

import { getUserById } from "@/lib/helpers/database"
import { getDate } from "@/lib/helpers/time"
import { Gigs, Users } from "@/lib/types/database"
import { usePrivy } from "@privy-io/react-auth"
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function GigsListing({
	gigs,
	users
}: {
	gigs: Gigs[]
	users: Users[]
}) {
	const router = useRouter()
	const { authenticated, user } = usePrivy()

	return (
		<div className={`grid grid-cols-1 gap-4 p-4`}>
			<div className={`font-bold text-lg text-foreground border border-transparent border-b-primary pb-2`}>
				Gigs
			</div>
			<div className="grid gap-4">
				{authenticated && user && (
					<div className={`p-4 border border-foreground rounded-lg cursor-pointer duration-150 ease-in-out group bg-primary text-background font-bold hover:scale-[101%] hover:border-primary`} onClick={() => router.push(`/gigs/listing`)}>
						<div className="mx-auto w-fit text-center content-center items-center flex gap-2 group-hover:scale-[101%] group-hover:border-primary">
							<PlusCircle /> Add new gig
						</div>
					</div>
				)}
				{gigs.map((itm: Gigs) => (
					<div key={`listing-${itm.id}`} className={`grid grid-cols-[1fr_auto] p-4 border border-foreground rounded-lg cursor-pointer duration-150 ease-in-out hover:scale-[101%] hover:border-primary`}>
						<div onClick={() => router.push(`/gigs/${itm.id}`)}>
							<div className="font-bold text-lg">
								{itm.gig_name}
							</div>
							<div className="font-light text-sm">
								{getUserById(users, itm.gig_creator)?.username} <span className={`px-2`}>|</span> <span className={`font-bold`}>Due on:</span> {getDate(itm.gig_deadline.toString())}
							</div>
						</div>
						<div className="font-bold text-xl flex items-center content-center">
							$ {itm.gig_reward}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

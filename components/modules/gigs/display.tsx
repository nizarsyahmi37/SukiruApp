"use client"

import { getUser, getSkill } from "@/lib/helpers/database"
import { getDate } from "@/lib/helpers/time"
import { Gigs, Skills, Users } from "@/lib/types/database"
import { useRouter } from "next/navigation"

export default function GigsDisplay({
	gigs,
	users,
	skills
}: {
	gigs: Gigs[]
	users: Users[]
	skills: Skills[]
}) {
	const router = useRouter()

	return (
		<div className={`grid grid-cols-1 gap-2 py-8 px-4`}>
			<div className="font-bold text-2xl">
				{gigs[0].gig_name}
			</div>
			<div className="font-light text-sm">
				{getUser(users, gigs[0].gig_creator)?.username} <span className={`px-2`}>|</span> <span className={`font-bold`}>Due on:</span> {getDate(gigs[0].gig_deadline.toString())}
			</div>
			<div className="border border-primary my-2" />
			<div>
				<h2 className="font-bold italic text-xl mb-2">
					Reward
				</h2>
				<p className="text-xl font-bold">
					$ {gigs[0].gig_reward}
				</p>
			</div>
			<div className="border border-transparent my-2" />
			<div>
				<h2 className="font-bold italic text-xl mb-2">
					Description
				</h2>
				<p>
					{gigs[0].gig_description}
				</p>
			</div>
			<div className="border border-transparent my-2" />
			<div>
				<h2 className="font-bold italic text-xl mb-2">
					Skills required
				</h2>
				<div className="flex gap-4 max-w-full flex-wrap">
					{gigs[0].gig_skills.map((itm: number) => (
						<div key={`skills-${itm}`} className="py-2 px-4 rounded-md border border-primary">
							{getSkill(skills, itm)?.skill_name}
						</div>
					))}
				</div>
			</div>
			<div className="border border-transparent my-2" />
			<div>
				<h2 className="font-bold italic text-xl mb-2">
					Hired talent
				</h2>
				<div className="flex gap-4">
					{gigs[0].gig_selected ? (
						<div className="grid gap-1 py-2 px-4 rounded-md border border-primary">
							<p className="font-bold cursor-pointer text-lg hover:underline" onClick={() => router.push(`/profile/${gigs[0].gig_selected}`)}>
								{getUser(users, gigs[0].gig_selected)?.username}
							</p>
							<a className="hover:bg-primary hover:text-background text-sm w-fit" href={`https://t.me/${getUser(users, gigs[0].gig_selected)?.telegram_username}`} target="_blank" title={getUser(users, gigs[0].gig_selected)?.username}>
								@{getUser(users, gigs[0].gig_selected)?.telegram_username}
							</a>
							<div className="text-sm flex gap-2 my-2">
								{getUser(users, gigs[0].gig_selected)?.skills && getUser(users, gigs[0].gig_selected)?.skills.map((itm: number) => (
									<div key={`skills-${itm}`} className="py-1 px-2 rounded-md border border-primary">
										{getSkill(skills, itm)?.skill_name}
									</div>
								))}
							</div>
						</div>
					) : (
						"No talent was hired for now."
					)}
				</div>
			</div>
			<div className="border border-transparent my-2" />
			<div>
				<h2 className="font-bold italic text-xl mb-2">
					Applicants
				</h2>
				<div className={`grid gap-4 ${gigs[0].gig_applicant ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-4" : "grid-cols-1"} `}>
					{gigs[0].gig_applicant ? (
						gigs[0].gig_applicant.map((itm: number) => (
							<div key={`skills-${itm}`} className="rounded-lg border border-primary">
								<div className="grid gap-1 px-4 py-2">
									<p className="font-bold cursor-pointer text-lg hover:underline" onClick={() => router.push(`/profile/${itm}`)}>
										{getUser(users, itm)?.username}
									</p>
									<a className="hover:bg-primary hover:text-background text-sm w-fit" href={`https://t.me/${getUser(users, itm)?.telegram_username}`} target="_blank" title={getUser(users, itm)?.username}>
										@{getUser(users, itm)?.telegram_username}
									</a>
									<div className="text-sm flex gap-2 my-2">
										{getUser(users, itm)?.skills && getUser(users, itm)?.skills.map((itm: number) => (
											<div key={`skills-${itm}`} className="py-1 px-2 rounded-md border border-primary">
												{getSkill(skills, itm)?.skill_name}
											</div>
										))}
									</div>
								</div>
								{!gigs[0].gig_selected && (
									<div className="text-center items-center content-center bg-primary p-2 cursor-pointer hover:opacity-90">
										Hire this talent
									</div>
								)}
							</div>
						))
					) : (
						"There is no application by any user for now."
					)}
				</div>
			</div>
		</div>
	)
}

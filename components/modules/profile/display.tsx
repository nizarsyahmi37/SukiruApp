"use client"

import { getSkill, getUser } from "@/lib/helpers/database"
import { shortenAddress } from "@/lib/helpers/web3"
import { Gigs, Skills, Users } from "@/lib/types/database"
import { Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { FaTelegramPlane } from "react-icons/fa"

export default function ProfileDisplay({
	users,
	skills,
	user,
	applied,
	selected
}: {
	users: Users[]
	skills: Skills[]
	user: Users
	applied: Gigs[]
	selected: Gigs[]
}) {
	const router = useRouter()

	return (
		<div className={`grid grid-cols-1 gap-2 py-8 px-4`}>
			<div className="font-bold text-2xl flex flex-wrap gap-2 items-end">
				{user.username}
				{user.email && (
					<a href={`mailto:${user.email}`} title={user.email} target="_blank">
						<Mail className="w-4 h-4 mb-1"/>
					</a>
				)}
				{user.telegram_username && (
					<a href={`https://t.me/${user.telegram_username}`} title={user.telegram_username} target="_blank">
						<FaTelegramPlane className="w-4 h-4 mb-1"/>
					</a>
				)}
			</div>
			<div className="border border-primary my-2" />
			<div>
				<h2 className="font-bold italic text-xl mb-2">
					Skills
				</h2>
				<div className="flex gap-4 max-w-full flex-wrap">
					{user.skills ? (
						user.skills.map((itm: number) => (
							<div key={`skills-${itm}`} className="py-2 px-4 rounded-md border border-primary">
								{getSkill(skills, itm)?.skill_name}
							</div>
						))
					) : (
						"Users has no skills"
					)}
				</div>
			</div>
			<div className="border border-transparent my-2" />
			<div>
				<h2 className="font-bold italic text-xl mb-2">
					Connected Wallets
				</h2>
				<div className="flex gap-4 max-w-full flex-wrap">
					{user.wallet_address ? (
						user.wallet_address.map((itm: string, idx: number) => (
							<div key={`wallet-${idx}`} className="py-2 px-4 rounded-md border border-primary">
								{shortenAddress(itm, 6, 36)}
							</div>
						))
					) :(
						"There's no wallet connected yet."
					)}
				</div>
			</div>
			<div className="border border-transparent my-2" />
			<div>
				<h2 className="font-bold italic text-xl mb-2">
					Hired Job
				</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 max-w-full flex-wrap">
					{selected ? (
						selected.map((itm: Gigs) => (
							<div key={`job-${itm.id}`} className="cursor-pointer py-2 px-4 rounded-md border border-primary duration-150 ease-in-out hover:border-foreground hover:scale-[101%]" onClick={() => router.push(`/gigs/${itm.id}`)}>
								<p className="font-bold">
									{itm.gig_name}
								</p>
								<p className="text-sm">
									{getUser(users, itm.gig_creator)?.username}
								</p>
							</div>
						))
					) :(
						"Not hired for any job yet."
					)}
				</div>
			</div>
			<div className="border border-transparent my-2" />
			<div>
				<h2 className="font-bold italic text-xl mb-2">
					Applied Job
				</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 max-w-full flex-wrap">
					{applied ? (
						applied.map((itm: Gigs) => (
							<div key={`job-${itm.id}`} className="cursor-pointer py-2 px-4 rounded-md border border-primary duration-150 ease-in-out hover:border-foreground hover:scale-[101%]" onClick={() => router.push(`/gigs/${itm.id}`)}>
								<p className="font-bold">
									{itm.gig_name}
								</p>
								<p className="text-sm">
									{getUser(users, itm.gig_creator)?.username}
								</p>
							</div>
						))
					) :(
						"Not hired for any job yet."
					)}
				</div>
			</div>
		</div>
	)
}

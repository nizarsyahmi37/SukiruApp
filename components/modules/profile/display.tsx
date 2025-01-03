"use client"

import { getSkillById, getUserById } from "@/lib/helpers/database"
import { shortenAddress } from "@/lib/helpers/web3"
import { Gigs, Skills, Users } from "@/lib/types/database"
import { Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { FaTelegramPlane } from "react-icons/fa"

export default function ProfileDisplay({
	users,
	skills,
	usr,
	applied,
	selected
}: {
	users: Users[]
	skills: Skills[]
	usr: Users
	applied: Gigs[] | undefined
	selected: Gigs[] | undefined
}) {
	const router = useRouter()

	return (
		<div className={`grid grid-cols-1 gap-2 py-8 px-4`}>
			<div className="font-bold text-2xl flex flex-wrap gap-2 items-end">
				{usr && usr.username}
				{usr && usr.email && (
					<a href={`mailto:${usr && usr.email}`} title={usr && usr.email} target="_blank">
						<Mail className="w-4 h-4 mb-1"/>
					</a>
				)}
				{usr && usr.telegram_username && (
					<a href={`https://t.me/${usr && usr.telegram_username}`} title={usr && usr.telegram_username} target="_blank">
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
					{usr && usr.skills ? (
						usr && usr.skills.map((itm: number) => (
							<div key={`skills-${itm}`} className="py-2 px-4 rounded-md border border-primary">
								{getSkillById(skills, itm)?.skill_name}
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
					{usr && usr.wallet_address ? (
						usr && usr.wallet_address.map((itm: string, idx: number) => (
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
					{selected && selected !== undefined && selected.length > 0 ? (
						selected.map((itm: Gigs) => (
							<div key={`job-${itm?.id}`} className="cursor-pointer p-4 rounded-md border border-primary duration-150 ease-in-out hover:border-foreground hover:scale-[101%]" onClick={() => router.push(`/gigs/${itm?.id}`)}>
								<p className="py-1 px-2 text-sm rounded-md bg-foreground text-background w-fit mb-2 font-bold">
									Id: {itm?.id}
								</p>
								<p className="font-bold">
									{itm?.gig_name}
								</p>
								<p className="text-sm">
									{getUserById(users, itm?.gig_creator)?.username}
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
					{applied && applied !== undefined && applied.length > 0 ? (
						applied.map((itm: Gigs) => (
							<div key={`job-${itm?.id}`} className="cursor-pointer p-4 rounded-md border border-primary duration-150 ease-in-out hover:border-foreground hover:scale-[101%]" onClick={() => router.push(`/gigs/${itm?.id}`)}>
								<p className="py-1 px-2 text-sm rounded-md bg-foreground text-background w-fit mb-2 font-bold">
									Id: {itm?.id}
								</p>
								<p className="font-bold">
									{itm?.gig_name}
								</p>
								<p className="text-sm">
									{getUserById(users, itm?.gig_creator)?.username}
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

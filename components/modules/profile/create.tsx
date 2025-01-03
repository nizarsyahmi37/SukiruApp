"use client"

import axios from "axios"
import { Users } from "@/lib/types/database"
import { Email, Telegram, usePrivy, useUpdateAccount } from "@privy-io/react-auth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ProfileCreate({
	usr,
	email,
	telegram,
	wallet
} : {
	usr: Users[]
	email: Email | undefined
	telegram: Telegram | undefined
	wallet: string[]
}) {
	const router = useRouter()

	const { linkTelegram, linkEmail } = usePrivy()
	const {updateEmail} = useUpdateAccount({
		onSuccess: (user, updateMethod, updatedAccount) => {
		  	console.log(user, updateMethod, updatedAccount)
			handleUpdateEmail()
		},
		onError: (error, details) => {
		  	console.log(error, details);
			alert(details)
		}
	})

	const [newUsername, setNewUsername] = useState<string>()
	const [newEmail, setNewEmail] = useState<string>()
	const [newTelegram, setNewTelegram] = useState<string>()

	const handleUpdateEmail = async () => {
        try {
            const response = await axios.post(
				`http://sukiruapp.vercel.app/api/users`,
				{
					type: "update",
					id: usr[0].id,
					email: newEmail === undefined ? email?.address : newEmail
				}
			)
			console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

	const handleAddUser = async () => {
        try {
            const response = await axios.post(
				`http://sukiruapp.vercel.app/api/users`,
				{
					type: "insert",
					username: newUsername,
					email: newEmail === undefined ? email?.address : newEmail,
					telegram_username: newTelegram === undefined ? telegram?.username : newTelegram,
					wallet: wallet[0]
				}
			)
			console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

	useEffect(() => {
		if (newUsername && newUsername !== "") {
			router.refresh()
		}
	}, [router, newUsername])

	return (
		<div className={`grid grid-cols-1 gap-2 py-8 px-4`}>
			<div className="font-bold text-2xl flex flex-wrap gap-2 items-end">
				Create profile
			</div>
			<div className="border border-primary my-2" />
			<div className={`grid grid-cols-[auto_auto_1fr] gap-4`}>
				<div className="font-bold p-2">
					Username*
				</div>
				<div>
					:
				</div>
				<div className="w-full">
					<div className="grid gap-4 grid-cols-[1fr_auto]">
						<input required className="w-full border border-foreground rounded-md p-2" value={newUsername === undefined ? "" : newUsername} onChange={(e) => setNewUsername(e.target.value ? e.target.value : "")}/>
						<div className="flex items-center content-center px-4 py-2 rounded-md cursor-pointer bg-foreground text-background hover:bg-primary hover:text-background" onClick={handleAddUser}>
							{`Update username`}
						</div>
					</div>
					<div className="flex gap-2 mt-2">
						{usr.length > 0 && (
							<div className="px-4 py-2 rounded-md border border-foreground" onClick={() => setNewUsername(usr[0]?.username)}>
								{usr[0]?.username}
							</div>
						)}
					</div>
				</div>
				<div className="font-bold p-2">
					Email*
				</div>
				<div>
					:
				</div>
				<div className="grid gap-4 grid-cols-[1fr_auto]">
					<input required className="w-full border border-foreground rounded-md p-2" value={newEmail === undefined ? email?.address : newEmail} onChange={(e) => setNewEmail(e.target.value ? e.target.value : "")}/>
					<div className="flex items-center content-center px-4 py-2 rounded-md cursor-pointer bg-foreground text-background hover:bg-primary hover:text-background" onClick={email ? updateEmail : linkEmail}>
						{email ? `Update email` : `Link email`}
					</div>
				</div>
				<div className="font-bold p-2">
					Telegram*
				</div>
				<div>
					:
				</div>
				<div className="grid gap-4 grid-cols-[1fr_auto]">
					<input className="w-full border border-foreground rounded-md p-2" value={newTelegram === undefined ? telegram && telegram.username?.toString() : newTelegram} onChange={(e) => setNewTelegram(e.target.value ? e.target.value : "")}/>
					<div className="flex items-center content-center px-4 py-2 rounded-md cursor-pointer bg-foreground text-background hover:bg-primary hover:text-background" onClick={linkTelegram}>
						{telegram ? `Update telegram` : `Link telegram`}
					</div>
				</div>
				<div className="font-bold p-2">
					Wallet*
				</div>
				<div>
					:
				</div>
				<div className="grid gap-4 grid-cols-[1fr_auto]">
					<input readOnly className="w-full border border-foreground rounded-md p-2" value={wallet} />
				</div>
			</div>
		</div>
	)
}

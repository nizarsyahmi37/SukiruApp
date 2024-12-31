"use client"

import { getSkillById, getUserByEmail } from "@/lib/helpers/database"
import { Skills, Users } from "@/lib/types/database"
import { neon } from "@neondatabase/serverless"
import { usePrivy } from "@privy-io/react-auth"
// import axios from "axios"
import { PlusCircle } from "lucide-react"
import { useState } from "react"

export default function GigsAdd({
	skills,
	users,
	database
}: {
	skills: Skills[]
	users: Users[]
	database: string
}) {
	const { user } = usePrivy()

	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [skill, setSkill] = useState<number[]>([])
	const [skl, setSkl] = useState(0)
	const [reward, setReward] = useState(0)
	const date = "2025-03-24"

	const creator = getUserByEmail(users, user?.email ? user?.email?.address : "")
	
	const handleAddGig = async () => {
        try {  
			const sql = neon(database)
			
			await sql`INSERT INTO sukiru_gigs (gig_name, gig_description, gig_skills, gig_creator, gig_deadline, gig_reward) VALUES (${title}, ${description}, ${skill}, ${creator}, ${date}, ${reward})`
            // const response = await axios.post(
			// 	`http://localhost:3000/api/gigs`,
			// 	{
			// 		type: "update",
			// 		gig_name: title, 
			// 		gig_description: description,
			// 		gig_skills: skill,
			// 		gig_creator: creator?.id,
			// 		gig_deadline: date,
			// 		gig_reward: reward
			// 	}
			// )
			// console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

	return (
		<div className={`grid grid-cols-1 gap-4 p-4`}>
			<div className={`font-bold text-lg text-foreground border border-transparent border-b-primary pb-2`}>
				Add Gigs
			</div>
			<div className={`grid grid-cols-[auto_auto_1fr] gap-4`}>
				<div className="font-bold p-2">
					Title*
				</div>
				<div>
					:
				</div>
				<div className="w-full">
					<input required className="w-full border border-foreground rounded-md p-2" value={title} onChange={(e) => setTitle(e.target.value)} />
				</div>
			</div>
			<div className={`grid grid-cols-[auto_auto_1fr] gap-4`}>
				<div className="font-bold p-2">
					Description*
				</div>
				<div>
					:
				</div>
				<div className="w-full">
					<textarea required className="w-full border border-foreground rounded-md p-2" value={description} onChange={(e) => setDescription(e.target.value)} />
				</div>
			</div>
			<div className={`grid grid-cols-[auto_auto_1fr] gap-4`}>
				<div className="font-bold p-2">
					Reward*
				</div>
				<div>
					:
				</div>
				<div className="w-full">
					<input required type="number" className="w-full border border-foreground rounded-md p-2" value={reward} onChange={(e) => setReward(Number(e.target.value))} />
				</div>
			</div>
			<div className={`grid grid-cols-[auto_auto_1fr] gap-4`}>
				<div className="font-bold p-2">
					Skills*
				</div>
				<div>
					:
				</div>
				<div className="w-full grid gap-2">
					<div className="grid grid-cols-[1fr_auto] gap-2 items-center">
						<select className="px-4 py-2 rounded-md border border-foreground" name="skills" id="skills" onChange={(e) => setSkl(Number(e.target.value))} defaultValue={1}>
							{skills.map((itm) => (
								<option key={`skill-${itm.id}`} value={itm.id}>{itm.skill_name}</option>
							))}
						</select>
						<div className="rounded-md bg-foreground text-background px-4 py-2 cursor-pointer" onClick={() => skl && !skill.includes(skl) && setSkill([...skill, skl])}>
							Add skill
						</div>
					</div>
					<div className="flex gap-2">
						{skill.map((itm, idx) => (
							<div key={idx} className="px-4 py-2 rounded-md border border-primary">
								{getSkillById(skills, itm)?.skill_name}
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="grid gap-4">
				<div className={`p-4 border border-foreground rounded-lg cursor-pointer duration-150 ease-in-out group bg-primary text-background font-bold hover:scale-[101%] hover:border-primary`} onClick={handleAddGig}>
					<div className="mx-auto w-fit text-center content-center items-center flex gap-2 group-hover:scale-[101%] group-hover:border-primary">
						<PlusCircle /> Add gig
					</div>
				</div>
			</div>
		</div>
	)
}

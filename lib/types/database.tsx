export type Gigs = {
	id: number
	gig_name: string
	gig_description: string
	gig_skills: number[]
	gig_creator: number
	gig_deadline: Date
	gig_applicant: number[]
	gig_selected: number
	gig_reward: number
}

export type Users = {
	id: number
	username: string
	email: string
	telegram_username: string
	wallet_address: string[]
	skills: number[]
}

export type Skills = {
	id: number
	skill_name: string
	total_users: bigint
}

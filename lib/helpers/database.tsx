import { Users, Skills, Gigs } from "../types/database"

export function getUserById(users: Users[], id: number) {
	const user = users.find(user => user.id === id)
	
	return (user)
}

export function getUserByEmail(users: Users[], email: string) {
	const user = users.find(user => user.email === email)
	
	return (user)
}

export function getUserByTelegram(users: Users[], telegram_username: string) {
	const user = users.find(user => user.telegram_username === telegram_username)
	
	return (user)
}

export function getUserByWallets(users: Users[], wallet_address: string[]) {
	const user = users.find(user => user.wallet_address === wallet_address)
	
	return (user)
}

export function getSkillById(skills: Skills[], id: number) {
	const skill = skills.find(skill => skill.id === id)
	
	return (skill)
}

export function getGigBySelected(gigs: Gigs[], id: number) {
	const gig = gigs.find(gig => gig.gig_selected === id)
	
	return (gig)
}

export function getGigByApplicant(gigs: Gigs[], id: number) {
	const gig = gigs.find(gig => gig.gig_applicant.includes(id))
	
	return (gig)
}
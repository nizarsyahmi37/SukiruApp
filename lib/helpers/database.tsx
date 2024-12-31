import { Users, Skills } from "../types/database"

export function getUser(users: Users[], id: number) {
	const user = users.find(user => user.id === id)
	
	return (user)
}

export function getSkill(skills: Skills[], id: number) {
	const skill = skills.find(skill => skill.id === id)
	
	return (skill)
}
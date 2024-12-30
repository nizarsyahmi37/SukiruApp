export const runtime = "edge"

import { neon } from "@neondatabase/serverless"

export async function GET(request: Request) {
	if (!process.env.DATABASE_URL) return new Response(null, { status: 500 })
  
	const sql = neon(process.env.DATABASE_URL)
	const url = new URL(request.url)
	const id = url.searchParams.get("id")
	const skill_name = url.searchParams.get("skill_name")
	const total_users = url.searchParams.get("total_users")
  
	let query
	if (skill_name) {
		query = sql`SELECT * FROM sukiru_skills WHERE skill_name = ${skill_name}`
	} else if (total_users) {
		query = sql`SELECT * FROM sukiru_skills WHERE total_users = ${total_users}`
	} else if (id) {
		query = sql`SELECT * FROM sukiru_skills WHERE id = ${id}`
	} else {
		query = sql`SELECT * FROM sukiru_skills`
	}
  
	const response = await query
  
	return new Response(JSON.stringify(response), {
		headers: { "Content-Type": "application/json" }
	})
}

export async function POST(request: Request) {
	if (!process.env.DATABASE_URL) return new Response(null, { status: 500 })
  
	const sql = neon(process.env.DATABASE_URL)
	const url = new URL(request.url)
	const skill_name = url.searchParams.get("skill_name")
  
	let response

	if (skill_name) {
		try {
		  	// Check if skill exists
			const existingSkill = await sql`SELECT 1 FROM sukiru_skills WHERE skill_name = ${skill_name} LIMIT 1`
		
			if (existingSkill.length > 0) {
				response = {
					success: false,
					message: "Skill name already exists"
				}
			} else {
				// Insert new skill
				await sql`INSERT INTO sukiru_skills (skill_name) VALUES (${skill_name})`
				response = {
					success: true,
					message: "Skill added successfully"
				}
			}
		} catch (err) {
			console.error(err)
			response = {
				success: false,
				message: "An error occurred while adding the skill"
			}
		}
	} else {
		response = {
			success: false,
			message: "Skill name is missing",
		}
	}
	
	return new Response(JSON.stringify(response), {
		headers: { "Content-Type": "application/json" }
	})
}

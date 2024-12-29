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
  
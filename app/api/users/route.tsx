export const runtime = "edge"

import { neon } from "@neondatabase/serverless"

export async function GET(request: Request) {
	if (!process.env.DATABASE_URL) return new Response(null, { status: 500 })
  
	const sql = neon(process.env.DATABASE_URL)
	const url = new URL(request.url)
	const id = url.searchParams.get("id")
	const email = url.searchParams.get("email")
	const username = url.searchParams.get("username")
  
	let query
	if (email && username) {
		query = sql`SELECT * FROM sukiru_users WHERE email = ${email} AND username = ${username}`
	} else if (email) {
			query = sql`SELECT * FROM sukiru_users WHERE email = ${email}`
	} else if (username) {
		query = sql`SELECT * FROM sukiru_users WHERE username = ${username}`
	} else if (id) {
		query = sql`SELECT * FROM sukiru_users WHERE id = ${id}`
	} else {
		query = sql`SELECT * FROM sukiru_users`
	}
  
	const response = await query
  
	return new Response(JSON.stringify(response), {
		headers: { "Content-Type": "application/json" }
	})
  }
  
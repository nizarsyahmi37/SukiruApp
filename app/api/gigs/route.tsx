export const runtime = "edge"

import { neon } from "@neondatabase/serverless"

export async function GET(request: Request) {
	if (!process.env.DATABASE_URL) return new Response(null, { status: 500 })
  
	const sql = neon(process.env.DATABASE_URL)
	const url = new URL(request.url)
	const id = url.searchParams.get("id")
	const gig_name = url.searchParams.get("gig_name")
	const gig_description = url.searchParams.get("gig_description")
	const gig_skills = url.searchParams.get("gig_skills")
	const gig_creator = url.searchParams.get("gig_description")
	const gig_deadline = url.searchParams.get("gig_description")
  
	let query
	if (gig_name) {
		query = sql`SELECT * FROM sukiru_gigs WHERE gig_name = ${gig_name}`
	} else if (gig_description) {
		query = sql`SELECT * FROM sukiru_gigs WHERE gig_description = ${gig_description}`
	} else if (gig_skills) {
		query = sql`SELECT * FROM sukiru_gigs WHERE gig_skills = ${gig_skills}`
	} else if (gig_creator) {
		query = sql`SELECT * FROM sukiru_gigs WHERE gig_creator = ${gig_creator}`
	} else if (gig_deadline) {
		query = sql`SELECT * FROM sukiru_gigs WHERE gig_deadline = ${gig_deadline}`
	} else if (id) {
		query = sql`SELECT * FROM sukiru_gigs WHERE id = ${id}`
	} else {
		query = sql`SELECT * FROM sukiru_gigs`
	}
  
	const response = await query
  
	return new Response(JSON.stringify(response), {
		headers: { "Content-Type": "application/json" }
	})
  }
  
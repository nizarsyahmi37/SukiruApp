export const runtime = "edge"

import { neon } from "@neondatabase/serverless"

export async function GET(request: Request) {
	if (!process.env.DATABASE_URL) return new Response(null, { status: 500 })
  
	const sql = neon(process.env.DATABASE_URL)
	const url = new URL(request.url)
	const id = url.searchParams.get("id")
	const gig_name = url.searchParams.get("gig_name")
	const gig_description = url.searchParams.get("gig_description")
	const gig_skills = url.searchParams.get("gig_skills")?.split(',').map(Number)
	const gig_creator = url.searchParams.get("gig_creator")
	const gig_deadline = url.searchParams.get("gig_deadline")
  
	let query
	if (gig_name) {
		query = sql`SELECT * FROM sukiru_gigs WHERE gig_name = ${gig_name}`
	} else if (gig_description) {
		query = sql`SELECT * FROM sukiru_gigs WHERE gig_description = ${gig_description}`
	} else if (gig_skills && gig_skills.length > 0) {
		query = sql`SELECT * FROM sukiru_gigs WHERE gig_skills && ${gig_skills}::integer[]`
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

export async function POST(request: Request) {
	if (!process.env.DATABASE_URL) return new Response(null, { status: 500 })
  
	const sql = neon(process.env.DATABASE_URL)
	const url = new URL(request.url)
	const gig_name = url.searchParams.get("gig_name")
	const gig_description = url.searchParams.get("gig_description")
	const gig_skills = url.searchParams.get("gig_skills")?.split(',').map(Number)
	const gig_creator = url.searchParams.get("gig_creator")
	const gig_deadline = url.searchParams.get("gig_deadline")
  
	let response

	if (gig_name && gig_description && gig_skills && gig_skills.length > 0 && gig_creator && gig_deadline) {
		try {
			// Insert new gig
			await sql`INSERT INTO sukiru_gigs (gig_name, gig_description, gig_skills, gig_creator, gig_deadline) VALUES (${gig_name}, ${gig_description}, ${gig_skills}, ${gig_creator}, ${gig_deadline})`
			response = {
				success: true,
				message: "Gig added successfully"
			}
		} catch (err) {
			console.error(err)
			response = {
				success: false,
				message: "An error occurred while adding the gig"
			}
		}
	} else {
		response = {
			success: false,
			message: "Required gig information is missing",
		}
	}
	
	return new Response(JSON.stringify(response), {
		headers: { "Content-Type": "application/json" }
	})
}

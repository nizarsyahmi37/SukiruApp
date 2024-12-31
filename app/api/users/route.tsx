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

export async function POST(request: Request) {
	if (!process.env.DATABASE_URL) return new Response(null, { status: 500 })
  
	const sql = neon(process.env.DATABASE_URL)
	const url = new URL(request.url)
	const email = url.searchParams.get("email")
	const username = url.searchParams.get("username")
	const id = url.searchParams.get("id")
	const telegram_username = url.searchParams.get("telegram_username")
	const wallet_address = url.searchParams.get("wallet_address")
	const type = url.searchParams.get("type")
  
	let response

	if (type === "insert" && username && email && telegram_username && wallet_address) {
		await sql`INSERT INTO sukiru_users (username, email, telegram_username, wallet_address) VALUES (${username}, ${email}, ${telegram_username}, ${wallet_address})`
	} else if (type === "update" && id && email) {
		await sql`UPDATE sukiru_users SET email = ${email} WHERE id=${id}`
	} else if (email && username) {
		try {
		  	// Check if email and username exists
			const existingUsername = await sql`SELECT 1 FROM sukiru_users WHERE username = ${username} LIMIT 1`
			const existingEmail = await sql`SELECT 1 FROM sukiru_users WHERE email = ${email} LIMIT 1`
		
			if (existingUsername.length > 0 && existingEmail.length > 0) {
				response = {
					success: false,
					message: "Username and email already exist"
				}
			} else if (existingUsername.length > 0) {
				response = {
					success: false,
					message: "Username already exists"
				}
			} else if (existingEmail.length > 0) {
				response = {
					success: false,
					message: "Email already exists"
				}
			} else {
				// Insert new user
				await sql`INSERT INTO sukiru_users (username, email) VALUES (${username}, ${email})`
				response = {
					success: true,
					message: "User added successfully"
				}
			}
		} catch (err) {
			console.error(err)
			response = {
				success: false,
				message: "An error occurred while adding the user"
			}
		}
	} else {
		response = {
			success: false,
			message: "Username and/or email are missing",
		}
	}
	
	return new Response(JSON.stringify(response), {
		headers: { "Content-Type": "application/json" }
	})
}

"use client"

import { UserCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Login() {
	const router = useRouter()

	return (
		<UserCircle2 className="cursor-pointer rounded-md bg-primary text-background p-1 w-10 h-10 hover:scale-105" onClick={() => router.push("/profile")}/>
	)
}
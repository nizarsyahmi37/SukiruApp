import { execSync } from "child_process"
import pkg from "@/package.json"

export const getProjectInfo = () => {
	return {
		name: pkg.name,
		title: pkg.title,
		year: pkg.year,
		description: pkg.description,
		version: pkg.version,
		repository: pkg.repository,
		license: pkg.license
	}
}

export const getCommit = () => {
	const hash: string = execSync("git log --pretty=format:'%h' -n1").toString()

	const trimmedHash: string = hash.trim()

	return {
		hash: hash,
        trimmedHash
	}
}

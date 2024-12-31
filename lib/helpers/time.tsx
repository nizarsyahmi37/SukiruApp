import { format } from "date-fns"

export function getDate(dateString: string) {
	const date = new Date(dateString)
	const formattedDate = format(date, "dd MMM yyyy - HH:mm a")
    
	return (formattedDate)
}

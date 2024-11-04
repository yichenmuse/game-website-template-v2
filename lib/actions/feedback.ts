// import prisma from "@repo/web/l@repo/db";
import { redirectWithValidate } from "@repo/web/lib/utils/actions"

export async function handleSubmit(state: unknown, data: any) {
	if (!data || !data?.email?.length) {
		return {
			message: "form data error!",
		}
	}

	// await prisma.feedback.create({
	//     data,
	// });

	redirectWithValidate("/")
}

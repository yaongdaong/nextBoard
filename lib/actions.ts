"use server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
export async function createPost(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    // DB에 데이터 저장(Prisma)
    await db.post.create({
        data: { title, content },
    });
    // 작성 완료 후 목록 페이지로 이동
    redirect("/board");
}

import { PrismaClient } from "@prisma/client";
// lib/db.ts (리모컨): 이제 설정이 끝났으니, 우리가 코드 어디서든 DB에 데이터를 넣거나 뺄 때 가져다 쓰는 리모컨입니다.

// 1. 이미 생성된 PrismaClient가 있는지 확인합니다.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
// 2. 있으면 그걸 쓰고, 없으면 새로 만듭니다.
export const db =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query"],
    });
// 3. 개발 모드일 때는 전역 변수에 저장해둡니다.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

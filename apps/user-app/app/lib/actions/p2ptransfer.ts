"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;

  if (!from) {
    return {
      message: "Sender Not Found",
    };
  }

  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return { message: "Receiver Not Found" };
  }

  prisma.$transaction(async (px) => {
    await prisma.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${Number(from)} FOR UPDATE`;
    const fromBalance = await px.balance.findUnique({
      where: {
        userId: Number(from),
      },
    });

    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error("Insufficient balance");
    }

    await px.balance.update({
      where: {
        userId: Number(from),
      },
      data: {
        amount: { decrement: amount },
      },
    });

    await px.balance.update({
      where: {
        userId: toUser.id,
      },
      data: {
        amount: { increment: amount },
      },
    });
    console.log(toUser.number);
    await px.p2pTransfer.create({
      data: {
        fromUserId: Number(from),
        toUserId: toUser.id,
        amount: amount,
        timestamp: new Date(),
        toUserNumber: toUser.number,
      },
    });
  });
}

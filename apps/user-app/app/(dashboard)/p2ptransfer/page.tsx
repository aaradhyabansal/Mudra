import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { P2pTransfer } from "../../../components/p2pTransferCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getp2pTransactions() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(userId),
    },
  });

  return txns.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    toUser: t.toUserNumber,
  }));
}

export default async function () {
  const transactions = await getp2pTransactions();
  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transactions
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div className="col-span-1">
          <SendCard />
        </div>
        <div className="pt-4 col-span-1">
          <P2pTransfer transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

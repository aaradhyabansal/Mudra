import { Card } from "@repo/ui/card";

export function P2pTransfer({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    toUser: string;
  }[];
}) {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent Transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="justify-between grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-1">
              <div className="text-sm">Sent INR</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col col-span-1 justify-center">
              - Rs. {t.amount / 100}
            </div>

            <div className="col-span-1">
              <div className="grid grid-cols-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4 col-span-1 w-10 "
                >
                  <path d="M8.5 4.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 13c.552 0 1.01-.452.9-.994a5.002 5.002 0 0 0-9.802 0c-.109.542.35.994.902.994h8ZM10.75 5.25a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z" />
                </svg>{" "}
                {t.toUser}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

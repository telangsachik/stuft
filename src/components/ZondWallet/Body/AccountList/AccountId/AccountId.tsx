import { observer } from "mobx-react-lite";

type AccountIdType = {
  account: string;
};

const AccountId = observer(({ account }: AccountIdType) => {
  const splitLength = 5;
  const prefix = account.substring(0, 2);
  const idSplit: string[] = [];
  for (let i = 2; i < account.length; i += splitLength) {
    idSplit.push(account.substring(i, i + splitLength));
  }

  return (
    <div className="flex gap-2">
      <div>{prefix}</div>
      <div className="flex flex-wrap gap-1">
        {idSplit.map((part) => (
          <div key={part}>{part}</div>
        ))}
      </div>
    </div>
  );
});

export default AccountId;

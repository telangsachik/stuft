type AccountProps = {
  account: string;
};

export const Account = ({ account }: AccountProps) => {
  const splitLength = 5;
  const prefix = account.substring(0, 2);
  const idSplit = [];
  for (let i = 2; i < account.length; i += splitLength) {
    idSplit.push(account.substring(i, i + splitLength));
  }

  return (
    <div className="flex cursor-pointer gap-2 rounded-xl border-2 border-secondary p-2 font-bold transition-colors delay-75">
      <div>{prefix}</div>
      <div className="flex flex-wrap gap-1">
        {idSplit.map((part) => (
          <div key={part}>{part}</div>
        ))}
      </div>
    </div>
  );
};

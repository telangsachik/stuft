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
    <div className="flex cursor-pointer gap-1 rounded-xl border-2 border-secondary bg-primary p-2 font-bold text-secondary transition-colors delay-75 hover:bg-secondary hover:text-primary">
      <div>{prefix}</div>
      <div className="flex flex-wrap gap-1">
        {idSplit.map((part) => (
          <div key={part}>{part}</div>
        ))}
      </div>
    </div>
  );
};

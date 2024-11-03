type AccountProps = {
  account: string;
};

export const Account = ({ account }: AccountProps) => {
  const splitLength = 20;
  const idSplit = [account.substring(0, 2)];
  for (let i = 2; i < account.length; i += splitLength) {
    idSplit.push(account.substring(i, i + splitLength));
  }
  return (
    <div className="cursor-pointer rounded-xl border-2 border-secondary bg-primary p-4 font-bold text-secondary transition-colors delay-75 hover:bg-secondary hover:text-primary">
      {idSplit.map((part) => (
        <div key={part}>{part}</div>
      ))}
    </div>
  );
};

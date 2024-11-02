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
    <div className="font-bold p-4 border-secondary border-2 rounded-xl">
      {idSplit.map((part) => (
        <div key={part}>{part}</div>
      ))}
    </div>
  );
};

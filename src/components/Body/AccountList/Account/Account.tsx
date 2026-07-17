import { Button } from "@/components/UI/Button";
import { cva } from "class-variance-authority";
import { ArrowRight, Copy } from "lucide-react";
import { useState } from "react";

const hoverClasses = cva("", {
  variants: {
    isHovered: {
      true: ["opacity-100"],
      false: ["opacity-0"],
    },
  },
  defaultVariants: {
    isHovered: false,
  },
});

type AccountProps = {
  account: string;
  accountStatus: "active" | "other";
  buttonVariant: "outline" | "ghost";
  onClickHandler: () => void;
};

export const Account = ({
  account,
  accountStatus,
  buttonVariant,
  onClickHandler,
}: AccountProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const splitLength = 5;
  const prefix = account.substring(0, 2);
  const idSplit = [];
  for (let i = 2; i < account.length; i += splitLength) {
    idSplit.push(account.substring(i, i + splitLength));
  }

  return (
    <Button
      variant={buttonVariant}
      onClick={onClickHandler}
      className="flex h-min gap-2 px-4 py-2 text-foreground"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-2">
        <div className={hoverClasses({ isHovered })}>{prefix}</div>
        <div className="flex flex-wrap gap-1">
          {idSplit.map((part) => (
            <div key={part}>{part}</div>
          ))}
        </div>
      </div>
      <span className={hoverClasses({ isHovered })}>
        {accountStatus === "active" ? (
          <Copy className="text-secondary" size="18" />
        ) : (
          <ArrowRight className="text-secondary" size="18" />
        )}
      </span>
    </Button>
  );
};

import { Button } from "@/components/UI/Button";
import { Card } from "@/components/UI/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu";
import { ZOND_PROVIDER } from "@/configuration/zondConfig";
import { useStore } from "@/stores/store";
import { cva } from "class-variance-authority";
import { Check, ChevronDown, HardDrive, Network, Workflow } from "lucide-react";
import { observer } from "mobx-react-lite";

const networkStatusClasses = cva("h-2 w-2 rounded-full", {
  variants: {
    networkStatus: {
      true: ["bg-constructive"],
      false: ["bg-destructive"],
    },
  },
  defaultVariants: {
    networkStatus: false,
  },
});

const blockchainSelectionClasses = cva("cursor-pointer ", {
  variants: {
    isSelected: {
      true: ["text-constructive focus:text-constructive"],
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});

const ConnectionBadge = observer(() => {
  const { zondStore } = useStore();
  const { zondConnection, selectBlockchain } = zondStore;
  const { isConnected, zondNetworkName } = zondConnection;

  const { DEV, TEST_NET, MAIN_NET } = ZOND_PROVIDER;
  const [isDevNetwork, isTestNetwork, isMainNetwork] = [
    DEV.name === zondNetworkName,
    TEST_NET.name === zondNetworkName,
    MAIN_NET.name === zondNetworkName,
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex w-min gap-2 rounded-full">
          <Card
            className={networkStatusClasses({
              networkStatus: isConnected,
            })}
          />
          {zondNetworkName}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Blockchain network</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className={blockchainSelectionClasses({
              isSelected: isDevNetwork,
            })}
            onClick={() => selectBlockchain(DEV.id)}
          >
            <HardDrive className="mr-2 h-4 w-4" />
            <span>{DEV.name}</span>
            {isDevNetwork && (
              <DropdownMenuShortcut>
                <Check className="h-4 w-4" />
              </DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            className={blockchainSelectionClasses({
              isSelected: isTestNetwork,
            })}
            onClick={() => selectBlockchain(TEST_NET.id)}
          >
            <Workflow className="mr-2 h-4 w-4" />
            <span>{TEST_NET.name}</span>
            {isTestNetwork && (
              <DropdownMenuShortcut>
                <Check className="h-4 w-4" />
              </DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            className={blockchainSelectionClasses({
              isSelected: isMainNetwork,
            })}
            onClick={() => selectBlockchain(MAIN_NET.id)}
          >
            <Network className="mr-2 h-4 w-4" />
            <span>{MAIN_NET.name}</span>
            {isMainNetwork && (
              <DropdownMenuShortcut>
                <Check className="h-4 w-4" />
              </DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default ConnectionBadge;

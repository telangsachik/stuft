import { Label } from "@/components/UI/Label";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex w-min cursor-pointer items-center gap-2 pb-4 transition-all hover:-ml-1 hover:text-secondary"
      onClick={() => navigate(-1)}
    >
      <MoveLeft />
      <Label className="cursor-pointer text-lg">Back</Label>
    </div>
  );
};

export default BackButton;

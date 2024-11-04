import { useMainContext } from "@/contexts/main.context";
import { Loader, LoaderCircle } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import "./full-screen-loading.component.scss";

export default function FullScreenLoading() {
  const { loading } = useMainContext();
  if (loading)
    return (
      <div className="full-screen-loading-container">
        <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />
      </div>
    );
}

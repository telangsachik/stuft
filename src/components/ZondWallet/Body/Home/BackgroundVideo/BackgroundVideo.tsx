import { useStore } from "@/stores/store";
import { cva } from "class-variance-authority";
import { observer } from "mobx-react-lite";

const backgroundVideoClasses = cva("absolute z-0 overflow-hidden", {
  variants: {
    isDarkMode: {
      true: ["top-0 -left-24 scale-150"],
      false: ["-top-44 -left-4"],
    },
  },
  defaultVariants: {
    isDarkMode: false,
  },
});

export const BackgroundVideo = observer(() => {
  const { settingsStore } = useStore();
  const { isDarkMode, theme } = settingsStore;

  const backgroundVideoSource = "qrl-video-".concat(theme).concat(".mp4");

  return (
    <video
      autoPlay
      muted
      loop
      className={backgroundVideoClasses({ isDarkMode })}
    >
      <source src={backgroundVideoSource} type="video/mp4" />
    </video>
  );
});

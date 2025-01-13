import { Theme } from "@/styles";
import { TextAndBoxStyleConfig } from "@/types/global";

export const getBoxFillStyle = (config: TextAndBoxStyleConfig, theme: Theme) => {
  const { isCurrent, isBusinessDay, variant } = config;
  if (variant === "yearView")
    return isCurrent ? "#cbc8ba" : theme.colors.secondary; //theme.colors.tertiary : theme.colors.gridBackground;
  if (isCurrent) return "#cbc8ba" // theme.colors.secondary;
  if (!isBusinessDay) return theme.colors.secondary;

  return theme.colors.secondary;
};

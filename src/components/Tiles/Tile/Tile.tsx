import { FC } from "react";
import { useTheme } from "styled-components";
import { useCalendar } from "@/context/CalendarProvider";
import { getDatesRange } from "@/utils/getDatesRange";
import { getTileProperties } from "@/utils/getTileProperties";
import { getTileTextColor } from "@/utils/getTileTextColor";
import {
  // StyledDescription,
  StyledStickyWrapper,
  // StyledText,
  StyledTextWrapper,
  StyledTileWrapper
} from "./styles";
import { TileProps } from "./types";

const Tile: FC<TileProps> = ({ row, data, zoom, onTileClick }) => {
  const { date } = useCalendar();
  const datesRange = getDatesRange(date, zoom);
  const { y, x, width } = getTileProperties(
    row,
    datesRange.startDate,
    datesRange.endDate,
    data.startDate,
    data.endDate,
    zoom
  );
  const { colors } = useTheme();
  const isApproved = data.status === "approved";

  return (
    <StyledTileWrapper
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width - 6}px`,
        marginLeft: "3px",
        borderRadius: "30px",
        // background: `repeating-linear-gradient(-45deg, ${data.bgColor}, ${data.bgColor} 1px, #EAE7DC 5px, #EAE7DC 5px)`,
        // opacity: isApproved ? 10 : 0.5,
        backgroundColor: isApproved ? (data.bgColor ?? colors.defaultTile) : 'transparent',
        border: `3px solid ${data.bgColor ?? colors.defaultTile}`,
        color: isApproved
          ? getTileTextColor(data.bgColor ?? "")
          : getTileTextColor(data.bgColor ?? "")
      }}
      onClick={() => onTileClick?.(data)}>
      <StyledTextWrapper>
        <StyledStickyWrapper>
          {/* <StyledText bold>{data.title}</StyledText>
          <StyledText>{data.subtitle}</StyledText>
          <StyledDescription>{data.description}</StyledDescription> */}
        </StyledStickyWrapper>
      </StyledTextWrapper>
    </StyledTileWrapper>
  );
};

export default Tile;

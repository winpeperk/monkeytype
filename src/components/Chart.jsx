import { Box, Text, Flex, useTheme } from "@chakra-ui/react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Scatter,
  Label,
  Area,
} from "recharts";
import { FaCat } from "react-icons/fa";
import styled from "styled-components";
import { useContext } from "react";
import ResizeContext from "./ResizeContext";

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  svg:focus {
    outline: none;
  }
`

const interval = (time, width) => {
  if(time == 15) {
    return width < 768 ? 1 : 0
  } else if(time == 30) {
    return width < 992 ? (width < 768 ? 4 : 2) : 1
  } else if(time == 60) {
    return width < 992 ? (width < 768 ? 9 : 4) : 3
  } 
  return width < 992 ? (width < 768 ? 16 :  9) : 6
}

const Chart = ({ time, errors, wpm, raw }) => {
  const theme = useTheme()

  const colors = {
    wpm: theme.colors.text_secondary,
    raw: theme.colors.text_primary,
    errors: theme.colors.errors
  };

  const dataLine = Array.from({ length: time }, (_, index) => ({
    time: index + 1,
    wpm: wpm[index],
    raw: raw[index],
    errors: errors[index],
  }));

  const { width } = useContext(ResizeContext)

  const handleDots =
    (name) =>
    ({ cx, cy, payload }) => {
      if (name === "errors" && payload.errors === 0) return null;
      return <circle cx={cx} cy={cy} fill={colors[name]} r={4} />;
    };

  const handleTooltip = ({ payload, label, active }) =>
    active ? (
      <Box
        bg={theme.colors.opacity_tooltip_bg}
        color={theme.colors.bg}
        borderRadius="md"
        p="2"
      >
        <Text>{label}</Text>
        {payload.map(({ name, value }, index) =>
          name !== "time" ? (
            <Flex
              key={index}
              direction="row"
              align="center"
              justify="flex-start"
              gap="1"
            >
              <FaCat color={colors[name]} />
              <Text>
                {name}: {value}
              </Text>
            </Flex>
          ) : null,
        )}
      </Box>
    ) : null;

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={dataLine} margin={{ top: 15 }}>
          <CartesianGrid yAxisId="left" stroke={theme.colors.tooltip_bg} />
          <XAxis
            dataKey="time"
            stroke={theme.colors.tooltip_bg}
            tick={{ fill: theme.colors.text_primary }}
            interval={interval(time, width)}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            type="number"
            stroke={theme.colors.tooltip_bg}
            tick={{ fill: theme.colors.text_primary }}
          >
            <Label
              value="words per minute"
              position="center"
              angle={-90}
              dx={-20}
            />
          </YAxis>
          <YAxis
            yAxisId="right"
            orientation="right"
            allowDecimals={false}
            type="number"
            domain={[0, "dataMax"]}
            stroke={theme.colors.tooltip_bg}
            tick={{ fill: theme.colors.text_primary }}
          >
            <Label
              value="errors"
              position="insideRight"
              angle={90}
              dy={30}
              dx={-7}
            />
          </YAxis>
          <Tooltip cursor={false} content={handleTooltip} />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="raw"
            fill={theme.colors.area_raw}
            stroke={colors.raw}
            strokeWidth={3}
            activeDot={handleDots("raw")}
            isAnimationActive={false}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="wpm"
            fill={theme.colors.area_wpm}
            stroke={colors.wpm}
            strokeWidth={3}
            activeDot={handleDots("wpm")}
            isAnimationActive={false}
          />
          <Scatter
            yAxisId="right"
            name="errors"
            dataKey="errors"
            shape={handleDots("errors")}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default Chart;

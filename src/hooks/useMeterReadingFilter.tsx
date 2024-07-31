import React, { useEffect, useState } from "react";
import database from "@react-native-firebase/database";
import _ from "lodash";
import {
  getCurrentDateInFormat,
  getMonthAndYear,
  getMonthOfYear,
  getWeekOfYear,
  isTimeInCurrentHour,
} from "@/utils";

export interface ItodayStats {
  amount: number;
  volume: number;
}

interface Imaxmin {
  max: number;
  min: number;
}

const useMeterReadingFilter = ({
  meterId,
  filter,
}: {
  meterId: string;
  filter?: string;
}) => {
  const [data, setData] = useState([]);
  const [maxmin, setMaxMin] = useState<Imaxmin>({
    max: 0,
    min: 0,
  });
  const [graphMax, setGraphMax] = useState<number>();
  const [todaysStats, setTodaysStats] = useState<ItodayStats>({
    amount: 0,
    volume: 0,
  });

  /* The `useEffect` hook you provided is responsible for calculating and setting the `graphMax` value
based on the `maxmin` values and the `filter` dependency. Here's a breakdown of what it does: */
  // useEffect(() => {
  //   const range = maxmin.max - maxmin.min;
  //   const intervalSize = range / 4;
  //   const adjustedMaxValue =
  //   Math.ceil(maxmin.max / Math.ceil(intervalSize)) * Math.ceil(intervalSize);
  //   setGraphMax(adjustedMaxValue);
  // }, [filter, maxmin]);

  const calculateMaxMin = (readings: any[]) => {
    const max = _.maxBy(readings, "value") || 0;
    const min = _.minBy(readings, "value") || 0;
    // return {
    //   max: Number(max?.value),
    //   min: Number(min?.value),
    // };
    const range = max - min;
    const intervalSize = range / 4;
    const adjustedMaxValue =
      Math.ceil(max / Math.ceil(intervalSize)) * Math.ceil(intervalSize);
    setGraphMax(adjustedMaxValue);
  };

  useEffect(() => {
    const PRICE_PER_GAL = 0.104;
    const readings = database().ref(`/readings/${meterId}`);

    const onValueChange = readings.on("value", (snapshot) => {
      const d = snapshot.val();
      if (!d) return;

      const rawData = Object.values(d).map(
        (r: { value: string; timeStamp: string }) => {
          const value = parseFloat(r.value);
          const timeStamp = new Date(Number(r.timeStamp) * 1000).toISOString();
          return { value, timeStamp };
        }
      );

      const formattedData = _.sortBy(rawData, ["timeStamp"]);
      const dayReadings = _.groupBy(
        formattedData,
        (t) => t.timeStamp.split("T")[0]
      );

      const finalReturn = (splitOut: any) =>
        Object.keys(splitOut).map((d) => ({
          d,
          readings: dayReadings[d],
        }));

      setData(finalReturn(dayReadings));

      const todaysReadings = finalReturn(dayReadings).find(
        (e) => e.d === getCurrentDateInFormat()
      );
      const totals: ItodayStats = todaysReadings?.readings?.reduce(
        (acc: { amount: number; volume: any }, e: { value: number }) => {
          if (!isNaN(e.value)) {
            acc.amount += e.value * PRICE_PER_GAL;
            acc.volume += e.value;
          }
          return acc;
        },
        { amount: 0, volume: 0 }
      );

      setTodaysStats(totals);

      switch (filter) {
        case "H":
          const thisHourReadings = todaysReadings?.readings?.filter(
            (e: { timeStamp: string }) => isTimeInCurrentHour(e.timeStamp)
          );
          setData(
            thisHourReadings?.map((e: any) => ({
              value: e.value,
              time: e.timeStamp.split("T")[1].split(":").slice(0, 2).join(":"),
            })) || []
          );
          calculateMaxMin(thisHourReadings);
          break;

        case "D":
          const groupByHours = _.groupBy(todaysReadings?.readings, (i) => {
            const date = new Date(i.timeStamp);
            const year = date.getUTCFullYear();
            const month = date.getUTCMonth() + 1;
            const day = date.getUTCDate();
            const hour = date.getUTCHours();
            return `${year}-${String(month).padStart(2, "0")}-${String(
              day
            ).padStart(2, "0")}T${String(hour).padStart(2, "0")}:00:00.000Z`;
          });

          const hoursAndReadings = Object.keys(groupByHours).map((e) => {
            let total = 0;
            groupByHours[e].forEach((i) => {
              total += i.value;
            });
            return {
              time: e.split("T")[1].split(":").slice(0, 2).join(":"),
              value: total,
            };
          });

          setData(hoursAndReadings);

          calculateMaxMin(hoursAndReadings);
          break;

        case "W":
          const groupedData: { [week: string]: number } = {};

          formattedData.forEach((reading: any) => {
            const date = new Date(reading.timeStamp);
            const week = `W${getWeekOfYear(date)}`;
            if (!groupedData[week]) {
              groupedData[week] = 0;
            }

            groupedData[week] += Number(reading.value);
          });

          Object.keys(groupedData).map((week) => ({
            week,
            totalConsumption: groupedData[week],
          }));
          const weekValue = Object.keys(groupedData).map((e) => {
            return {
              time: e,
              value: groupedData[e],
            };
          });
          setData(weekValue);
          calculateMaxMin(weekValue);
          break;

        case "M":
          const groupedMonthData: { [month: string]: number } = {};
          formattedData.forEach((reading: any) => {
            const date = new Date(reading.timeStamp);
            const month = `${getMonthOfYear(date)}`;
            if (!groupedMonthData[month]) {
              groupedMonthData[month] = 0;
            }

            groupedMonthData[month] += Number(reading.value);
          });
          const monthValues = Object.keys(groupedMonthData).map((e) => {
            return {
              time: e,
              value: groupedMonthData[e],
            };
          });
          setData(monthValues);
          calculateMaxMin(monthValues);
          break;
      }
    });
    return () => {
      readings.off("value", onValueChange);
    };
  }, [filter, meterId]);

  return { data, todaysStats, maxmin, graphMax };
};

export default useMeterReadingFilter;

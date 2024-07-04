import React, { useEffect, useState } from "react";
import database from "@react-native-firebase/database";
import _ from "lodash";
import { getCurrentDateInFormat, isTimeInCurrentHour } from "@/utils";
interface ItodayStats {
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
  useEffect(() => {
    // TO-BE-CHANGED
    const PRICE_PER_GAL = 0.104;

    const readings = database().ref(`/readings/${meterId}`);
    const onValueChange = readings?.on("value", (snapshot) => {
      const d = snapshot.val();
      if (!d) return;
      if (d) {
        const rawData = Object.values(d).map(
          (r: { value: string; timeStamp: string }) => {
            const value = parseFloat(r?.value);
            const timeStamp = new Date(r?.timeStamp).toISOString();
            return {
              value,
              timeStamp,
            };
          }
        );
        const formattedData = _.sortBy(rawData, ["timeStamp"]);
        let dayReadings = _.groupBy(
          formattedData,
          (t) => t.timeStamp.split("T")[0]
        );

        function finalReturn(splitOut: any): any[] {
          return Object.keys(splitOut).map((d) => ({
            d,
            readings: dayReadings[d],
          }));
        }

        setData(finalReturn(dayReadings));
        const todaysReadings = finalReturn(dayReadings)?.find((e) => {
          return e?.d == getCurrentDateInFormat();
        });

        const totals: ItodayStats = todaysReadings.readings.reduce(
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

        // to calculate graph
        const range = maxmin.max - maxmin.min!;
        const intervalSize = range / 4;
        const adjustedMaxValue =
          Math.ceil(maxmin.max / Math.ceil(intervalSize)) *
          Math.ceil(intervalSize);
        setGraphMax(adjustedMaxValue);
        switch (filter) {
          case "H":
            const thisHourReadings = todaysReadings?.["readings"]?.filter(
              (e: { timeStamp: string }) => {
                return isTimeInCurrentHour(e?.timeStamp);
              }
            );
            setData((_) => {
              return thisHourReadings?.map((e: any) => {
                return {
                  value: e?.value,
                  time: e?.timeStamp
                    ?.split("T")?.[1]
                    ?.split(":")
                    ?.slice(0, 2)
                    ?.join(":"),
                };
              });
            });
            const max: any = _.maxBy(thisHourReadings, "value") || 0;
            const min: any = _.minBy(thisHourReadings, "value") || 0;
            setMaxMin({
              max: Number(max?.value),
              min: Number(min?.value),
            });
        }
      } else {
      }
    });

    return () => {
      readings.off("value", onValueChange);
    };
  }, [filter]);

  return { data, todaysStats, maxmin, graphMax };
};

export default useMeterReadingFilter;

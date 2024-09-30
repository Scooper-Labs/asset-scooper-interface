import React, { useState, useEffect, useRef } from "react";
import localforage from "localforage";
import { MoralisAssetClass } from "@/utils/classes";
import { Box, Text } from "@chakra-ui/react";

const TokenPercentageDifference = ({
  data,
  cacheKey = "scooper-sum-cache",
  cacheDuration = 3600000,
  sum,
}: {
  data: MoralisAssetClass[];
  cacheKey?: string;
  cacheDuration?: number;
  sum: number;
}) => {
  const [currentSum, setCurrentSum] = useState(sum);
  const [cachedSum, setCachedSum] = useState(null);
  const [percentageChange, setPercentageChange] = useState(null);
  const cachedSumRef = useRef(0);

  useEffect(() => {
    // const calculateTotalSum = (_data: MoralisAssetClass[]) =>
    //   _data.reduce((sum, item) => sum + item.quoteUSD, 0);

    const loadCachedSum = async () => {
      const cachedData = await localforage.getItem(cacheKey);
      const lastUpdated = await localforage.getItem(`${cacheKey}-lastUpdated`);
      const currentTime = new Date().getTime();

      if (cachedData === null && lastUpdated === null) {
        // create a new cache
        await localforage.setItem(cacheKey, sum);
        await localforage.setItem(`${cacheKey}-lastUpdated`, currentTime);
      }

      // If the cache exists and hasn't expired
      //   const sum = calculateTotalSum(data);
      if (cachedData && lastUpdated) {
        const cachedData = await localforage.getItem(cacheKey);
        const lastUpdated = await localforage.getItem(
          `${cacheKey}-lastUpdated`
        );
        const timeDifference = currentTime - lastUpdated;
        console.log(
          "Cache and lastUpdated exists",
          currentTime,
          lastUpdated,
          currentTime - lastUpdated,
          timeDifference,
          cacheDuration
        );
        if (timeDifference < cacheDuration) {
          console.log("Time to update cache");
        } else {
          console.log("Not time to update cache");
          console.log(
            "Time to Read from cache instead",
            cachedSum,
            cachedData,
            currentSum
          );
          setCachedSum(cachedData);
          cachedSumRef.current = cachedData;
        }
        // if (currentTime - lastUpdated < cacheDuration) {
        // }
        // if (currentTime - lastUpdated < cacheDuration) {
        //   setCachedSum(cachedData);
        //   console.log("In if condition");
        // } else {
        //   // If the cache has expired, update the cache with the current sum
        //   setCachedSum(sum);
        //   await localforage.setItem(cacheKey, sum);
        //   await localforage.setItem(`${cacheKey}-lastUpdated`, currentTime);
        //   console.log("In else condition");
        // }
      } else {
      }
    };

    // Calculate current sum
    // const sum = calculateTotalSum(data);
    setCurrentSum(sum);

    // Load cached sum from localForage
    loadCachedSum();

    // Calculate percentage change if cached sum is available
    if (cachedSum !== null) {
      const percentage = ((sum - cachedSum) / cachedSum) * 100;
      setPercentageChange(percentage);
      console.log(percentage, typeof percentage);
    }
  }, [data, cacheKey, cacheDuration, cachedSum, sum]);

  return (
    <Box
      background={
        percentageChange !== null && percentageChange > 0
          ? "#00BA8233"
          : "#FFDFE3"
      }
      color={
        percentageChange !== null && percentageChange > 0
          ? "#00976A"
          : "#E2001B"
      }
      py="5px"
      px="10px"
      borderRadius="28.5px"
    >
      {/* <h2>Cached Sum Component</h2>
      <p>Current Sum: {currentSum}</p>
      <p>Cached Sum: {cachedSum !== null ? cachedSum : "No cached data"}</p>
      <p>
        Cached Sum:{" "}
        {cachedSumRef.current !== null
          ? cachedSumRef.current
          : "No cached ref data"}
      </p>
      <p>
        Percentage Change:{" "}
        {percentageChange !== null
          ? `${percentageChange.toFixed(2)}%`
          : "No comparison yet"}
      </p> */}
      <Text fontSize="12px" lineHeight="14.4px">
        {percentageChange !== null && percentageChange > 0 ? "+" : "-"}
        {percentageChange !== null && `${percentageChange.toFixed(2)}%`}
      </Text>
    </Box>
  );
};

export default TokenPercentageDifference;

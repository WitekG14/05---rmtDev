import { useEffect, useState } from "react";
import { JobItem } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
}

export function useActiveJobItem() {
  const activeId = useActiveId();
  const { jobItem, isLoading } = useJobItem(activeId);
  return { jobItem, isLoading } as const;
}

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}

const fetchJobItem = async (id: number) => {
  const res = await fetch(`${BASE_API_URL}/${id}`);
  const data = await res.json();
  return data;
};

export function useJobItem(id: number | null) {
  // const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   if (!id) return;
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     const res = await fetch(`${BASE_API_URL}/${id}`);
  //     const data = await res.json();
  //     setIsLoading(false);
  //     setJobItem(data.jobItem);
  //   };
  //   fetchData();
  // }, [id]);
  // return { jobItem, isLoading } as const;

  const { data, isLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
      onError: () => {},
    },
  );

  const jobItem = data?.jobItem;
  // console.log(id, jobItem, isLoading);
  return { jobItem, isLoading } as const;
}

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalNumberOfResults = jobItems.length;
  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
      const data = await res.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };

    fetchData();
  }, [searchText]);

  return { jobItemsSliced, isLoading, totalNumberOfResults } as const;

  // const { data, isLoading } = useQuery(
  //   ["job-items", searchText],
  //   async () => {
  //     if (!searchText) return;
  //     const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
  //     const data = await res.json();
  //     return data;
  //   },
  //   {
  //     staleTime: 1000 * 60 * 60, // 1 hour
  //     refetchOnWindowFocus: false,
  //     retry: false,
  //     enabled: !!searchText,
  //     onError: () => {},
  //   },
  // );

  // const jobItems: JobItem[] = data?.jobItems;
  // console.log("data", data, data?.jobItems);
  // console.log(searchText, jobItems, isLoading);
  // return { jobItems, isLoading } as const;
}

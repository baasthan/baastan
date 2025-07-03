"use client";
import { useState } from "react";

interface UseServiceProps<T extends (...args: any[]) => any> {
  callback: T;
}

//TODO: Implement this hook to perform network transactions on the client side.
const useService = <T extends (...args: any[]) => any>({
  callback,
}: UseServiceProps<T>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const execute = async (...args: any) => {
    console.log("Execute called");
    setIsLoading(true);
    setError(null);
    setIsSuccess(null);
    try {
      const result = await callback(...args);
      setData(result);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const resetService = () => {
    setIsLoading(false);
    setData(null);
    setError(null);
    setIsSuccess(null);
  };

  return { isLoading, data, error, isSuccess, execute, resetService };
};

export default useService;

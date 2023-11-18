import { createContext, useContext } from "react";

interface CacheKeysValue {
  postKey: string;
}

export const CacheKeysContext = createContext<CacheKeysValue>({
  postKey: "/api/posts",
});

export const useCacheKeys = () => useContext(CacheKeysContext);

"use client";
import { atom, RecoilRoot } from "recoil";
import { recoilPersist } from "recoil-persist";

let persistAtom = null;

if (typeof window !== "undefined") {
  const { persistAtom: persistedAtom } = recoilPersist({
    key: "recoil-persist",
    storage: window.localStorage,
  });
  persistAtom = persistedAtom;
}

export const userAtom = atom({
  key: "user",
  default: () => {
    if (typeof window !== "undefined") {
      const storedToken = window.localStorage.getItem("token");
      return storedToken ? JSON.parse(storedToken) : null;
    }
    return null;
  },
  effects_UNSTABLE: persistAtom ? [persistAtom] : [],
});

export default function UserRecoil({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

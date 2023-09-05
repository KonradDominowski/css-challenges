import { signOut } from "next-auth/react";

export default function customSignOut() {
  localStorage.removeItem("accessToken");
  signOut();
}

"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [token, setToken] = useState(() => getCookie("token"));

  useEffect(() => {
    if (token) {
      console.log("Token still exists:", token);
    } else {
      console.log("Token does not exist");
    }
  }, [token]);

  const handleLogout = () => {
    deleteCookie("token");
    setToken(undefined);
    router.refresh();
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout}>
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </Button>
  );
}

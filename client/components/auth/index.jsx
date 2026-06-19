import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Auth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  v;

  const publicPaths = ["/login", "/register"];
  const privatePaths = ["/products", "/categories", "/cart", "/wishlist"];

  if (loading && privatePaths.includes(pathname)) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

import React, { createContext, useEffect, useState } from "react";

export const RouteContext = createContext({ pathname: "" });

function Router({ children }: { children: React.ReactNode }) {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);

    window.addEventListener("popstate", (e) => {
      setPathname(window.location.pathname);
    });
  }, []);

  return (
    <RouteContext.Provider value={{ pathname }}>
      {children}
    </RouteContext.Provider>
  );
}

export default Router;

import React, { useContext } from "react";
import { RouteContext } from "./Router";

function Route({
  path,
  component,
}: {
  path: string;
  component: React.ReactNode;
}) {
  const route = useContext(RouteContext);

  if (route.pathname === path) return component;
  return null;
}

export default Route;

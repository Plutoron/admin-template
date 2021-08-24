import React, { ReactElement } from "react";

interface RouterItem {
  title: string,
  path: string,
  component: ReactElement
}

declare const routers: [RouterItem];
export default routers;

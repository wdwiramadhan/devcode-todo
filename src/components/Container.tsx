import * as React from "react";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto px-5 lg:px-0 max-w-[1000px]">{children}</div>;
}

export default Container;

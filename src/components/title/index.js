import React from "react";

import { TitleProps } from "@pankod/refine-core";

export const Title = ({ collapsed }) => (
  <a href="/">
    {collapsed ? (
      <img
        src={"/refine-collapsed.svg"}
        alt="Refine"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 24px",
        }}
      />
    ) : (
      <img
        src={"/logo.png"}
        alt="Concordal"
        style={{
          width: "200px",
          padding: "12px 24px",
        }}
      />
    )}
  </a>
);

import AppFunctional from "./AppFunctional";

import { render, screen, waitFor } from "@testing-library/react";

import React from "react";

test("sanity", () => {
  expect(true).toBe(true);
});

test("renders without errors", () => {
  render(<AppFunctional />);
});
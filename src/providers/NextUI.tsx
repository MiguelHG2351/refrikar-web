'use client';
import * as React from "react";

// 1. import `NextUIProvider` component
import {NextUIProvider as Provider} from "@nextui-org/react";

export default function NextUIProvider({ children }: { children: React.ReactNode }) {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <Provider>
      {children}
    </Provider>
  );
}
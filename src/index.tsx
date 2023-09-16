import * as React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NextUIProvider } from "@nextui-org/system";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <React.StrictMode>
        <NextUIProvider>
            <main className="text-foreground bg-background">
                <App />
            </main>
        </NextUIProvider>
    </React.StrictMode>,
);


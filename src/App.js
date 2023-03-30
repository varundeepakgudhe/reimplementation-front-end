import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./components/Layout/Home";
import RootLayout from "./components/Layout/Root";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout/>,
            children: [
                {index: true, element: <Home/>},
            ],
        },
    ]);

    return <RouterProvider router={router}/>;
}

export default App;

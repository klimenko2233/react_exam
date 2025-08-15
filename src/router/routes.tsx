import {createBrowserRouter} from "react-router-dom";
import {MovieDetailsPage} from "../pages/MovieDetailsPage.tsx";
import {MainLayout} from "../layouts/MainLayout.tsx";
import {MoviesPage} from "../pages/MoviesPage.tsx";

export const routes = createBrowserRouter([
    {path:"/",element:<MainLayout/>,children:[
            {index:true,element:<MoviesPage/>},
            {path:"movie/:id",element:<MovieDetailsPage/>}
        ]}
])
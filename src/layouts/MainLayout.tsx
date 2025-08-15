import {Outlet} from "react-router-dom";
import {Header} from "../components/Header.tsx";

export const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header/>
            <main className="flex-1 container mx-auto px-4 py-6">
                <Outlet />
            </main>
            <footer className="py-6 text-center text-sm text-gray-500 border-t">
                © The Movies App
            </footer>
        </div>
    );
};
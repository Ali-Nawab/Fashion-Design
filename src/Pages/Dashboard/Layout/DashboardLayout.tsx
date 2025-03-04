import { Outlet } from "react-router-dom"
import Sidebar from "../Sidebar"
import Header from "../Header"

const DashboardLayout  = () => {
    return (
        <div className="grid grid-cols-[300px_1fr] min-h-screen">
            <aside className="bg-slate-200 shadow-sm"><Sidebar /></aside>
            <div>
                <header><Header /></header>
                <main> <Outlet /> </main>
            </div>
        </div>
    )
}

export default DashboardLayout
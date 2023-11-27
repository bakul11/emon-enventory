"use client"
import Login from "@/components/authentication/Login";
import Header from "@/components/header/Header";
import SlideBar from "@/components/slidebar/SlideBar";
import useActiveUser from "@/hook/useActiveUser";

export default function Layout({ children }) {
    const [user] = useActiveUser();

    return (
        <>
            {
                user?.email ?
                    <div className="main-body">
                        < Header />
                        <div className="flex flex-row min-h-screen overflow-hidden gap-5">
                            <div className="slidebar pt-[80px]">
                                <SlideBar />
                            </div>
                            <div className="children mt-28 px-12 overflow-hidden">
                                {children}
                            </div>
                        </div>

                    </div >
                    :
                    <div className="auth">
                        <Login />
                    </div>
            }
            {/* <div className="main-body">
                < Header />
                <div className="flex flex-row min-h-screen w-full overflow-hidden gap-5">
                    <div className="slidebar pt-[80px]">
                        <SlideBar />
                    </div>
                    <div className="children mt-28 px-12 overflow-hidden">
                        {children}
                    </div>
                </div>

            </div > */}
        </>
    )
}
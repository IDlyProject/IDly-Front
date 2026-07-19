import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

function MainLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1 overflow-y-auto pb-[calc(72px+env(safe-area-inset-bottom))]">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

export default MainLayout;

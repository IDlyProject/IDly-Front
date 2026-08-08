import logo from "@/assets/ic_typo_logo.svg";

function AppHeader() {
  return (
    <div className="flex items-center justify-between px-1 py-3">
      <img src={logo} alt="IDly" className="h-13.5 w-auto" />
    </div>
  );
}

export default AppHeader;

import {Separator} from "@radix-ui/react-separator";
import {useLocation} from "react-router-dom";

import {SidebarTrigger} from "../ui/sidebar";
import {ModeToggle} from "./mode-toggle";

const Header = () => {
  const location = useLocation();

  const currentPath = location.pathname.replace(/^\/|\/$/g, "");

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 ">
      <SidebarTrigger className="-ml-1" />
      <div className="hidden sm:block">
        <h1>{currentPath}</h1>
      </div>
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="ml-auto"></div>

      <ModeToggle />
    </header>
  );
};

export default Header;

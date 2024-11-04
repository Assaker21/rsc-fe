import { useState } from "react";
import AuthDialog from "../AuthDialog/auth-dialog.component";
import "./navbar.component.scss";
import { Link, useNavigate } from "react-router-dom";
import { useMainContext } from "../../contexts/main.context";
import authenticationService from "../../services/authentication.service";
import {
  IconButton,
  Popover,
  MenuItem,
  Menu,
  Paper,
  MenuList,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Calendar, Library, Rss, Telescope } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Navbar() {
  const { authenticated } = useMainContext();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      name: (
        <>
          <Telescope className="h-4 w-4" />
          Who we are
        </>
      ),
      onClick: () => {
        navigate("/who-we-are");
      },
    },
    {
      name: (
        <>
          <Rss className="h-4 w-4" />
          Forums
        </>
      ),
      onClick: () => {
        navigate("/forums");
      },
    },
    {
      name: (
        <>
          <Calendar className="h-4 w-4" />
          Events
        </>
      ),
      onClick: () => {
        navigate("/events");
      },
    },
    {
      name: (
        <>
          <Library className="h-4 w-4" />
          Learn
        </>
      ),
      onClick: () => {
        navigate("/");
      },
    },
  ];

  return (
    <>
      <AuthDialog open={open} setOpen={setOpen} />
      <section className="navbar-section">
        <div className="navbar-container">
          <h1
            className="navbar-title"
            onClick={() => {
              navigate("/");
            }}
          >
            Roumieh Space Club
          </h1>
          <div className="navbar-menu">
            {/*<span
                className="navbar-menu-item"
                key={`Navbar-menu-item-${index}`}
                onClick={item.onClick}
              >
                {item.name}
              </span> */}
            {menuItems.map((item, index) => (
              <Button
                size="sm"
                variant="ghost"
                key={`Navbar-menu-item-${index}`}
                style={{ display: "flex", flexDirection: "row", gap: "0.4rem" }}
                onClick={item.onClick}
              >
                {item.name}
              </Button>
            ))}

            {authenticated ? (
              <MenuUser />
            ) : (
              <Button
                size="sm"
                variant="ghost"
                style={{ display: "flex", flexDirection: "row", gap: "0.4rem" }}
                onClick={() => {
                  setOpen(true);
                }}
              >
                Login or register
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function MenuUser() {
  const { user, updateAuthentication } = useMainContext();
  const [loading, setLoading] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);

  async function handleLogout() {
    setLoading(true);
    const [ok, data] = await authenticationService.logout();
    setLoading(false);
    if (ok) {
      updateAuthentication(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <img
            src={user.image || ""}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            handleLogout();
          }}
        >
          {loading && (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </>
          )}
          {!loading && "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

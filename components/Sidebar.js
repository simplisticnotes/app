import React from "react";
import NavItem from "./items/NavItem";
import {
  HomeIcon,
  BookOpenIcon,
  FolderIcon,
  TrashIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

function Sidebar() {
  return (
    <div className="w-48 bg-secondary h-screen flex flex-col">
      <div className="border-b-2 pt-2 pb-3 border-white">
        <img
          src="/logo.svg"
          alt="Simplistic Notes Logo"
          className="w-6 block mx-auto"
        />
      </div>

      <div className="px-4 mt-8 grow">
        <NavItem href="/app" Icon={HomeIcon}>
          Dashboard
        </NavItem>
        <NavItem href="/app/notes" Icon={BookOpenIcon}>
          Notes
        </NavItem>
        <NavItem href="/app/folders" Icon={FolderIcon}>
          Folders
        </NavItem>
        <NavItem href="/app/trash" Icon={TrashIcon}>
          Trash
        </NavItem>
      </div>

      <div className="px-4">
        <NavItem Icon={ArrowLeftOnRectangleIcon} button>
          Logout
        </NavItem>
      </div>
    </div>
  );
}

export default Sidebar;

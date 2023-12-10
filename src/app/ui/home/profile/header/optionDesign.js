'use client';

import {Listbox, ListboxItem} from "@nextui-org/react";
import Link from "next/link";
import { useDisclosure } from "@nextui-org/react";
import DeleteDesign from "./delete/deleteDesign";

export default function App() {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const items = [
    {
      key: "configuration",
      label: "Configuration",
      path: "/home/profile/configuration",
    },
  ];

  return (
    <div className="w-full max-w-[260px] p-1 rounded-xl dark bg-gray-800">
      <Listbox
        items={items}
        aria-label="Dynamic Actions"
      >
        <ListboxItem textValue="configuration">
            <Link href="/home/profile/configuration">Configuration</Link>
        </ListboxItem>

        <ListboxItem
          textValue="Delete account"
          className="text-red-600"
          >
            <button 
              onClick={(e) => {
                e.preventDefault();
                onOpen();
              }}
              >
                Delete account
            </button>
            <DeleteDesign isOpen={isOpen} onOpenChange={onOpenChange}/>
        </ListboxItem>

      </Listbox>
    </div>
  );
}

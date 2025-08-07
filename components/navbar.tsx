"use client"

import Link from "next/link";
import { itemsNavbar } from "@/data";
import { MotionTransition } from "./transition-component";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <MotionTransition position="right" className="fixed z-50 flex flex-col items-center justify-center w-full mt-auto h-max bottom-2 md:bottom-4">
      <nav>
        <div className="flex items-center justify-center gap-2 px-4 py-1 rounded-full glass-morphism border border-gray-700/50 backdrop-blur-xl">
          {itemsNavbar.map((item) => (
            <Link 
              key={item.id} 
              href={item.link}
              prefetch={true}
              className={`px-3 py-2 transition-all duration-200 rounded-full cursor-pointer hover:bg-primary focus:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                pathname === item.link && 'bg-primary'
              }`}
              title={item.title}
              aria-label={item.title}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </nav>
    </MotionTransition>
  );
};

export default Navbar;

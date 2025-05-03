import React from "react";
import Link from "next/link";
import { Home, LogIn, LogOut, Sprout } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { stackServerApp } from "@/stack";
import { UserButton } from "@stackframe/stack";
import { getUserDetails } from "../../actions/user.actions";

const Navbar = async () => {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  const userProfile = await getUserDetails(user?.id);
  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-primary font-mono tracking-wider"
            >
              🌱 Plantventory
            </Link>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className="flex items-center gap-2" variant="ghost" asChild>
              <Link href="/plants">
                <Sprout className="w-4 h-4" />
                <span className="hidden lg:inline">Plants</span>
              </Link>
            </Button>

            <Button className="flex items-center gap-2" variant="ghost" asChild>
              <Link href="/">
                <Home className="w-4 h-4" />
                <span className="hidden lg:inline">Home</span>
              </Link>
            </Button>
            <ModeToggle />

            <div className="flex items-center space-x-2">
              {userProfile?.name && (
                <span className="text-[14px] text-gray-600 dark:text-gray-300">
                  {`Hello, ${userProfile?.name.split(" ")[0]}`}
                </span>
              )}
              <UserButton />
            </div>

            {user ? (
              <>
                {/* Sign Out Button */}
                <Button
                  className="flex items-center gap-2"
                  variant="ghost"
                  asChild
                >
                  <Link href={app.signIn}>
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">Log Out</span>
                  </Link>
                </Button>
              </>
            ) : (
              <>
                {" "}
                {/* Sign In Button */}
                <Button
                  className="flex items-center gap-2"
                  variant="ghost"
                  asChild
                >
                  <Link href={app.signIn}>
                    <LogIn className="w-4 h-4" />
                    <span className="hidden lg:inline">Sign In</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

"use client"
import { GoSignOut } from "react-icons/go"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogOverlay, DialogTrigger } from "../ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Button } from "../ui/button"
import { FC } from "react"
import { logout } from "../_lib/auth"


export const Logout = () => {
  return (
    <TooltipProvider>
        <Tooltip>
        <Dialog >
        <DialogTrigger asChild>
            <TooltipTrigger>
            <div className="item flex flex-row items-center p-1 text-inherit justify-center">
                <GoSignOut color='grey' size={32}/>
            </div>
            </TooltipTrigger>
        </DialogTrigger>
        <DialogOverlay/>
        <DialogContent>
        <DialogHeader>
            Are you sure?
        </DialogHeader>
            <div>
                <Button onClick={async () => {
                    await logout();
                    console.log("Log out should have happened");
                }}>Log out</Button>
                <DialogClose asChild>
                    <Button type="button" variant={"secondary"}>
                    Cancel
                    </Button>
                </DialogClose>
            </div>
        </DialogContent>
        </Dialog>
        <TooltipContent side="right">
            <p>Log out</p>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

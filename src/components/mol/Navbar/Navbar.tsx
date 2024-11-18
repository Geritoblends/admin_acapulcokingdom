import styles from "./Navbar.module.css"
import Link from 'next/link'
import { RoviaSvg } from '@/components/ui/RoviaSvg'
import { GoCalendar, GoGear, GoGraph, GoHome, GoInbox, GoKey, GoLog, GoNoEntry, GoOrganization, GoPeople, GoPlus, GoSignOut } from 'react-icons/go'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useUserStore } from '@/store/user'
import useElementSize from "@/hooks/useElementSize"
import { cookies } from 'next/headers'
import { deleteSession } from '@/components/_lib/session'
import { FC } from "react"
import { Logout } from "../Logout"
 
interface LeftNavbarProps {
  current: "home" | "reservations" | "calendars" | "properties" | "config" | "guests" | "box cut" | "insights" | "users and permissions" | "none"
}

export const LeftNavbar: FC<LeftNavbarProps> = ({current}) => {
  return (
    <aside style={{height: "100%", paddingTop: 45, color: "#38B2AC", padding: "45px 1rem", borderRight: "solid 1px lightgray"}}>
        <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: 14, fontWeight: "600" }}>
          <div className="grid">
            <div className={styles.item}>
            <RoviaSvg ratio={1} fill='black'/>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link href='/home' className={styles.item}><GoHome size={32} fill={current === "home" ? 'black' : "grey"}/></Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Home</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link href='/reservations' className={styles.item}><GoLog size={32} fill={current === "reservations" ? 'black' : "grey"}/></Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Reservations</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                <Link href="/calendars" className={styles.item}><GoCalendar fill={current === "calendars" ? 'black' : "grey"} size={32}/></Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Calendars</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                <Link href="/hotels" className={styles.item}><GoOrganization fill={current === "properties" ? 'black' : "grey"} size={32}/></Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Properties</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                <Link href="/" className={styles.item}><GoPeople fill={current === "guests" ? 'black' : "grey"} size={32}/></Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Guests</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {current === "box cut" &&
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                  <Link href="/" className={styles.item}><GoInbox fill={"black"} size={32}/></Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Box Cut</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            } 
          </div>
          <div className='grid'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                <Link href="/" className={styles.item}><GoGear fill={current === "config" ? 'black' : "grey"} size={32}/></Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Configuration</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Logout/>
            
          </div>
        </div>
    </aside>
  )
}

export const useBottomNavbarSize = () => {
  return useElementSize("footer")
}

export const BottomNavbar: React.FC<LeftNavbarProps> = ({current}) => {

  return (
    <footer id='footer' style={{position: "relative", width: "100%", backgroundColor: "white", padding: "1.75rem 0", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.05)"}}>
      <div style={{display: "flex", justifyContent: "space-evenly"}}>
        <Link href='/home' className={styles.item}><GoHome size={32} fill={current === "home" ? 'black' : "grey"}/></Link>
        <Link href='/reservations' className={styles.item}><GoLog size={32} fill={current === "reservations" ? 'black' : "grey"}/></Link>
        <Link href="/calendars" className={styles.item}><GoCalendar fill={current === "calendars" ? 'black' : "grey"} size={32}/></Link>
        <Link href="/guests" className={styles.item}><GoPeople fill={current === "guests" ? 'black' : "grey"} size={32}/></Link>
        <Link href="/config" className={styles.item}><GoGear fill={current === "config" ? 'black' : "grey"} size={32}/></Link>
      </div>
    </footer>
  )
}

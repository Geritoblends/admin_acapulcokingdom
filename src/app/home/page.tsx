import { Layout } from "@/components/mol/Layout";
import { HomeTabsContainer } from "@/components/mol/Home/HomeTabsContainer";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { GoPlusCircle } from "react-icons/go";
import ReservationForm from "@/components/mol/ReservationForm";

export default function Page() {
  return (
    <Layout current="home">
      <header className="border-b border-gray-200 mb-5 pb-5 mt-5">
        <p style={{opacity: 0.5}}>
                Acapulco Kingdom
            </p>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    
                    <p className="text-4xl">
                        Hola, Isaac
                    </p>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "0.75rem"}}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <ReservationForm />
                          {/* <Link href={"/new-reservation"}><GoPlusCircle size={32} fill='gray'/></Link> */}
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          Nueva reservación
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </header>
        <HomeTabsContainer />
    </Layout>
  );
}

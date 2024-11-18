import ClientList from "@/components/mol/clients/ClientList";
import { Layout } from "@/components/mol/Layout";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { GoPlusCircle } from "react-icons/go";

export default function Page() {
  return (
    <Layout current="guests">
        <header className="border-b border-gray-200 mb-5 pb-5 mt-5">
        <p style={{opacity: 0.5}}>
                Acapulco Kingdom
            </p>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    
                    <p style={{fontSize: 32}}>
                        Huéspedes
                    </p>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "0.75rem"}}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href={"/new-guest"}><GoPlusCircle size={32} fill='gray'/></Link>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          Nuevo huesped
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </header>
        <ClientList />
    </Layout>
  )
}

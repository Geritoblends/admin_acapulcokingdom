import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PMSDashboard } from "./PmsDashboard"

export const HomeTabsContainer = () => {
  return (
    <>
        <Tabs defaultValue="dashboard">
            <TabsList className="grid w-full grid-cols-3 mb-4 md:w-[400px]">
                <TabsTrigger value="dashboard">Panel</TabsTrigger>
                <TabsTrigger value="box cut">Corte de caja</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
                <PMSDashboard />
            </TabsContent>
            <TabsContent value="box cut">

            </TabsContent>
            <TabsContent value="analytics">

            </TabsContent>
        </Tabs>
    </>
  )
}

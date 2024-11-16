import { VoucherForm } from "@/components/mol/GenerateVoucher";
import { Layout } from "@/components/mol/Layout";

export default function Page() {
  return (
    <Layout current="reservations">
        <header className="border-b border-gray-200 mb-5 pb-5 mt-5">
            <p className="opacity-50 m-0">
                Acapulco Kingdom
            </p>
            <p className="text-4xl m-0">New reservation</p>
        </header>
        <main>
            <VoucherForm />
        </main>
        <footer className="w-[200px]">

        </footer>
    </Layout>
  )
}

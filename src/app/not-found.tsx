import { Layout } from "@/components/mol/Layout";
import { redirect } from 'next/navigation';
import { decrypt } from '@/components/_lib/session';
import { cookies } from 'next/headers';

export default async function NotFound() {

    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
    redirect('/login');
    }
  return (
    <Layout current="none">
        <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
            <div className="relative">
                <h1 className="text-9xl font-extrabold tracking-widest text-gray-200">404</h1>
                <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                <p className="text-xl font-semibold tracking-tight">Página no encontrada</p>
                </div>
            </div>
            <p className="text-base mt-8 mb-8 max-w-md text-center text-gray-600">
                La página solicitada aún no existe.
            </p>
            
        </div>
    </Layout>
  )
}
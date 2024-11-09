import { Layout } from "@/components/mol/Layout";

export default function Home() {
  return (
    <Layout current="home">
      <div className="h-full w-full flex justify-center items-center text-center">
        <div>
          <p className="text-xs text-gray-500 bold">Hello cat!</p>
          <p className="text-3xl">ᓚᘏᗢ</p>
        </div>
      </div>
    </Layout>
  );
}

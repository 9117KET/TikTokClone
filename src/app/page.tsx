import DatabaseTest from "@/components/firestore";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
    <Navbar />
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to PopReel</h1>
      <p className="text-gray-600">
        Share your favorite moments with the world
      </p>
      <DatabaseTest />
    </main>
    </>
  );
}

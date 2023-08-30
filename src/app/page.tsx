import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GenerateWorkoutForm from "@/components/GenerateWorkoutForm";
import { Redis } from "@upstash/redis";
import { nFormatter } from "@/lib/utils";

const redis = Redis.fromEnv();

export const revalidate = 60;

const Home = async () => {
  const gymWorkoutsGeneratedCount = await redis.dbsize();

  return (
    <>
      <Header />

      <main className="px-4 sm:px-0 flex min-h-[calc(100vh-4rem-6.25rem)] max-w-[36rem] mx-auto py-8 justify-center">
        <section className="space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-5xl font-extrabold">
              Generate your next gym workout using chatGPT
            </h2>

            <p className="font-medium text-gray-500">
              {nFormatter(gymWorkoutsGeneratedCount)} gym workouts generated so
              far.
            </p>
          </div>

          <GenerateWorkoutForm />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;

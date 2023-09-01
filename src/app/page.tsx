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

      <main className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-[36rem] justify-center px-4 py-8 sm:px-0">
        <section className="space-y-10">
          <div className="space-y-3 text-center">
            <h2 className="text-4xl font-extrabold sm:text-5xl">
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

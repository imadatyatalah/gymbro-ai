import { Redis } from "@upstash/redis";
import { nFormatter } from "@/lib/utils";

const redis = Redis.fromEnv();

export const revalidate = 0;

const GymWorkoutsGeneratedCount = async () => {
  const gymWorkoutsGeneratedCount = await redis.dbsize();

  return (
    <p className="font-medium text-gray-500">
      {nFormatter(gymWorkoutsGeneratedCount)} gym workouts generated so far.
    </p>
  );
};

export default GymWorkoutsGeneratedCount;

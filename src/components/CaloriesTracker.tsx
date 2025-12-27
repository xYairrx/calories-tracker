import { useMemo } from "react";
import type { Activity } from "../types";
import CalorieDisplay from "./CalorieDisplay";

interface CaloriesTrackerProps {
  activities: Activity[];
}

export default function CaloriesTracker({ activities }: CaloriesTrackerProps) {
  // contadores
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const totalCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [activities]
  );

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de calorías
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-4">
        <CalorieDisplay calories={caloriesConsumed} text="consumidas" />
        <CalorieDisplay calories={caloriesBurned} text="quemadas" />
        <CalorieDisplay calories={totalCalories} text="diferencia" />
      </div>
    </>
  );
}

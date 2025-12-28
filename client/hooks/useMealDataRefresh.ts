import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/store";
import { fetchMeals } from "@/src/store/mealSlice";
import { queryClient } from "@/src/services/queryClient";

export const useMealDataRefresh = () => {
  const dispatch = useDispatch<AppDispatch>();

  const invalidateAllMealQueries = useCallback(async () => {
    console.log("🔄 Invalidating meal queries...");

    queryClient.invalidateQueries({ queryKey: ["meals"] });
    queryClient.invalidateQueries({ queryKey: ["dailyStats"] });
    queryClient.invalidateQueries({ queryKey: ["recent-meals"] });

    console.log("✅ Meal queries invalidated");
  }, []);

  const refreshAllMealData = useCallback(async () => {
    try {
      console.log("🔄 Refreshing data...");

      await dispatch(fetchMeals()).unwrap();

      const today = new Date().toISOString().split("T")[0];

      queryClient.invalidateQueries({ queryKey: ["meals"] });
      queryClient.invalidateQueries({ queryKey: ["dailyStats", today] });
      queryClient.invalidateQueries({ queryKey: ["recent-meals"] });

      console.log("✅ Data refreshed");
    } catch (error) {
      console.error("❌ Error refreshing data:", error);
      throw error;
    }
  }, [dispatch]);

  const refreshMealData = useCallback(async () => {
    try {
      console.log("🔄 Refreshing meals...");

      await dispatch(fetchMeals()).unwrap();

      queryClient.invalidateQueries({ queryKey: ["meals"] });
      queryClient.invalidateQueries({ queryKey: ["recent-meals"] });

      console.log("✅ Meals refreshed");
    } catch (error) {
      console.error("❌ Error refreshing meals:", error);
      throw error;
    }
  }, [dispatch]);

  const immediateRefresh = useCallback(async () => {
    try {
      console.log("⚡ Quick refresh...");

      const today = new Date().toISOString().split("T")[0];

      queryClient.invalidateQueries({ queryKey: ["meals"] });
      queryClient.invalidateQueries({ queryKey: ["dailyStats", today] });

      console.log("⚡ Refresh completed");
    } catch (error) {
      console.error("❌ Error in refresh:", error);
      throw error;
    }
  }, []);

  return {
    refreshAllMealData,
    refreshMealData,
    immediateRefresh,
    invalidateAllMealQueries,
  };
};

import type { Activity } from "../types";

export type ActivityActions = {
  type: "save-activity";
  payload: { newActivity: Activity };
};

interface ActivityState {
  activities: Activity[];
}

export const InitialState: ActivityState = {
  activities: [],
};

export const activityReducer = (
  state: ActivityState = InitialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    return {
      ...state,
      activities: [...state.activities, action.payload.newActivity],
    };
  }

  return state;
};

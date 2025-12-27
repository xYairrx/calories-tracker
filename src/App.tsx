import { useEffect, useMemo, useReducer } from "react";
import Form from "./components/Form";
import { activityReducer, InitialState } from "./reducers/activityReducer";
import ActivityList from "./components/ActivityList";
import CaloriesTracker from "./components/CaloriesTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, InitialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state]);

  const canRestart = () =>
    useMemo(() => state.activities.length, [state.activities]);

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-medium uppercase text-white">
            Contador de calorías
          </h1>

          <button
            onClick={() => dispatch({ type: "restart-app" })}
            disabled={!canRestart()}
            className="disabled:opacity-10 bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer text-sm"
          >
            Reiniciar
          </button>
        </div>
      </header>

      <section className="py-20 px-5 bg-lime-500">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="bg-gray-800 py-10 ">
        <div className="max-w-4xl mx-auto">
          <CaloriesTracker activities={state.activities} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;

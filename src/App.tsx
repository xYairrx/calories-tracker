import { useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, InitialState } from "./reducers/activityReducer";
import ActivityList from "./components/ActivityList";


function App() {

  const [state, dispatch] = useReducer(activityReducer, InitialState);

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between ">
          <h1 className="text-lg font-medium uppercase text-white">Contador de calorías</h1>


        </div>
      </header>

      <section className="py-20 px-5 bg-lime-500">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
        />
      </section>
    </>
  )
}

export default App

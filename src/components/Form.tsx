import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
} from "react";
import { v4 as uuid } from "uuid";

import { categories } from "../data/Categories";
import type { Activity } from "../types";
import {
  InitialState,
  type ActivityActions,
  type ActivityState,
} from "../reducers/activityReducer";

interface FormProps {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
}

export default function Form({ dispatch, state }: FormProps) {
  const [formData, setFormData] = useState<Activity>({
    id: uuid(),
    category: 0,
    activity: "",
    calories: 0,
  });

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (activityState) => activityState.id === state.activeId
      )[0];

      setFormData(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setFormData({
      ...formData,
      [e.target.name]: isNumberField ? Number(e.target.value) : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { category, activity, calories } = formData;
    return category > 0 && activity.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "save-activity",
      payload: { newActivity: formData },
    });

    setFormData({
      ...formData,
      id: uuid(),
      category: 0,
      activity: "",
      calories: 0,
    });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="text-base font-medium">
          Categoría
        </label>
        <select
          name="category"
          id="category"
          className="border border-slate-300 p-2 rounded w-full bg-white"
          value={formData.category}
          onChange={handleChange}
        >
          <option value={0} disabled selected>
            Seleccione una categoria
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="activity" className="text-base font-medium">
          Actividad
        </label>
        <input
          value={formData.activity}
          type="text"
          name="activity"
          id="activity"
          className="border border-slate-300 p-2 rounded w-full bg-white"
          placeholder="Ej. comida, jugo de naranja, ensalada, ejercicio, pesas, bicicleta, etc..."
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="text-base font-medium">
          Calorias
        </label>
        <input
          value={formData.calories}
          type="number"
          name="calories"
          id="calories"
          className="border border-slate-300 p-2 rounded w-full bg-white"
          placeholder="Ej. 200 o 400"
          onChange={handleChange}
        />
      </div>

      <input
        disabled={!isValidActivity()}
        type="submit"
        value={formData.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        className="bg-gray-800 hover:bg-gray-900 text-white p-2 rounded w-full font-bold uppercase cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed"
      />
    </form>
  );
}

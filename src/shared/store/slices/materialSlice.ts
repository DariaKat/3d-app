import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "app/firebase";
import { RootState } from "../store";

export interface IMaterial {
  key: string;
  name: string;
  bulk_mass_dry_condition: string;
  thermal_conductivity: string;
  heat_capacity: string;
  reduced_radiation_coefficient: string;
  blackness: string;
}

export interface IMaterialSelect {
  value: string;
  label: string;
}

export interface IInfo {
  materials: Array<IMaterial>;
  select: Array<IMaterialSelect>;
}

export interface MaterialState {
  loading: boolean;
  info: IInfo;
  error: string | null;
}

const initialState: MaterialState = {
  loading: false,
  info: {
    materials: [],
    select: [],
  },
  error: null,
};

export const fetchMaterials = createAsyncThunk(
  "materials/fetchMaterials",
  async () => {
    let array: any = [];
    let select: any = [];
    const querySnapshot = await getDocs(collection(db, "material"));
    querySnapshot.forEach((doc: any) => {
      array.push(doc.data());
      select.push({ value: doc.data().key, label: doc.data().name });
    });

    return { materials: array, select: select };
  }
);

export const materialSlice = createSlice({
  name: "material",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMaterials.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchMaterials.fulfilled,
      (state, action: PayloadAction<IInfo>) => {
        state.loading = false;
        state.info = action.payload;
      }
    );
    builder.addCase(fetchMaterials.rejected, (state, action) => {
      state.loading = false;
      state.info = {
        materials: [],
        select: [],
      };
      state.error = action.error.message;
    });
  },
  reducers: {
    setMaterial: (state, action: PayloadAction<IMaterial>) => {
      state.info.materials.push(action.payload);
    },
  },
});

export const { setMaterial } = materialSlice.actions;
export const materialSelector = (state: RootState) => state.materialReducer;
export default materialSlice.reducer;

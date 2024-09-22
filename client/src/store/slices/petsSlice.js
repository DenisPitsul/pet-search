import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createPet,
  deletePetById,
  getPetById,
  getPets,
  getPetTypes,
  updatePetById,
} from '../../api';
import CONSTANTS from '../../constants';

const PET_SLICE_NAME = 'pets';

const initialState = {
  pets: [],
  page: 1,
  totalPages: 0,
  petTypes: [],
  pet: null,
  isFetching: false,
  error: null,
  filter: {
    petType: 'all',
    city: 'all',
    isFound: 'all',
  },
  sort: 'newest',
  status: CONSTANTS.STATUS.IDLE,
};

export const getPetTypesThunk = createAsyncThunk(
  `${PET_SLICE_NAME}/get/petTypes`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await getPetTypes();
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const createPetThunk = createAsyncThunk(
  `${PET_SLICE_NAME}/create`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await createPet(payload);
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const getPetsThunk = createAsyncThunk(
  `${PET_SLICE_NAME}/get`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await getPets(payload);
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const getPetByIdThunk = createAsyncThunk(
  `${PET_SLICE_NAME}/getById`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await getPetById(payload);
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const updatePetByIdThunk = createAsyncThunk(
  `${PET_SLICE_NAME}/updateById`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await updatePetById(payload.id, payload.data);
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const deletePetByIdThunk = createAsyncThunk(
  `${PET_SLICE_NAME}/deleteById`,
  async (payload, { rejectWithValue }) => {
    try {
      await deletePetById(payload);
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

const petsSlice = createSlice({
  name: PET_SLICE_NAME,
  initialState,
  reducers: {
    changePetTypeFilter: (state, { payload }) => {
      state.filter.petType = payload;
    },
    changeCityFilter: (state, { payload }) => {
      state.filter.city = payload;
    },
    changeIsFoundFilter: (state, { payload }) => {
      state.filter.isFound = payload;
    },
    changeSort: (state, { payload }) => {
      state.sort = payload;
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    changeStatus: (state, { payload }) => {
      state.status = payload;
    },
    clearError: state => {
      state.error = null;
    },
    resetFilters: state => {
      state.filter = {
        petType: 'all',
        city: 'all',
        isFound: 'all',
      };
      state.sort = 'newest';
    },
  },
  extraReducers: builder => {
    builder.addCase(getPetTypesThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getPetTypesThunk.fulfilled, (state, { payload }) => {
      state.petTypes = [...payload];
      state.isFetching = false;
    });
    builder.addCase(getPetTypesThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

    builder.addCase(createPetThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(createPetThunk.fulfilled, (state, { payload }) => {
      state.pets.push(payload);
      state.isFetching = false;
      state.status = CONSTANTS.STATUS.SUCCESS;
    });
    builder.addCase(createPetThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
      state.status = CONSTANTS.STATUS.ERROR;
    });

    builder.addCase(getPetsThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getPetsThunk.fulfilled, (state, { payload }) => {
      state.pets = [...payload.data];
      state.page = payload.page;
      state.totalPages = payload.totalPages;
      state.isFetching = false;
    });
    builder.addCase(getPetsThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

    builder.addCase(getPetByIdThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getPetByIdThunk.fulfilled, (state, { payload }) => {
      state.pet = payload;
      state.isFetching = false;
    });
    builder.addCase(getPetByIdThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

    builder.addCase(updatePetByIdThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(updatePetByIdThunk.fulfilled, (state, { payload }) => {
      state.pet = payload;
      state.isFetching = false;
      state.status = CONSTANTS.STATUS.SUCCESS;
    });
    builder.addCase(updatePetByIdThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
      state.status = CONSTANTS.STATUS.ERROR;
    });

    builder.addCase(deletePetByIdThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(deletePetByIdThunk.fulfilled, state => {
      state.isFetching = false;
      state.status = CONSTANTS.STATUS.SUCCESS;
    });
    builder.addCase(deletePetByIdThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
      state.status = CONSTANTS.STATUS.ERROR;
    });
  },
});

const { reducer, actions } = petsSlice;

export const {
  changePetTypeFilter,
  changeCityFilter,
  changeIsFoundFilter,
  changeSort,
  changePage,
  changeStatus,
  clearError,
  resetFilters,
} = actions;

export default reducer;

import { createSlice } from '@reduxjs/toolkit'

const defaultValue = {
    id: -1,
    name: 'guest',
    email: '',
    image: '',
    isAuthed: false,
    role: 'guest'
}


export const userSlice = createSlice({
    name: 'user',
    initialState: defaultValue,
    reducers: {
        toggleAuth: (state) => {
            state.isAuthed = !state.isAuthed;
        },
        setUserData: (state, action) => {
            state.id = action.payload.id || defaultValue.id;
            state.name = action.payload.name || defaultValue.name;
            state.email = action.payload.email || defaultValue.email;
            state.image = action.payload.image || defaultValue.image;
            state.role = action.payload.role || defaultValue.role;
        },
        setDefaultUser: (state) => {
            state = {...defaultValue};
        }
    },
})

// Action creators are generated for each case reducer function
export const { toggleAuth, setUserData, setDefaultUser } = userSlice.actions

export default userSlice.reducer
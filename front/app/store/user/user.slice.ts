import { createSlice } from '@reduxjs/toolkit'

import { checkAuth, login, logout, register } from '@/store/user/user.actions'

import { IInitialState } from './user.interface'

const initialState: IInitialState = {
	user: null,
	isLoading: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.user = payload.user
				state.isLoading = false
			})
			.addCase(register.rejected, (state) => {
				state.isLoading = false
				state.user = null
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.user = payload.user
				state.isLoading = false
			})
			.addCase(login.rejected, (state) => {
				state.isLoading = false
				state.user = null
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null
				state.isLoading = false
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user
			})
	},
})

export const { reducer } = userSlice

export const { setUser } = userSlice.actions

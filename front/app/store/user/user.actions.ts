import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastr } from 'react-redux-toastr'

import { errorCatch } from '@/api/api.helpers'

import { AuthService } from '@/services/auth/auth.service'

import { getStoreLocal } from '@/utils/local-storage'
import { toastError } from '@/utils/toast-error'

import { setUser } from '@/store/user/user.slice'

import { IAuthResponse, IEmailPassword } from './user.interface'

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/register',
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.register(email, password)

			toastr.success('Registration', 'Complete successfully')

			return response.data
		} catch (error) {
			toastError(error)

			return thunkApi.rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/login',
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.login(email, password)

			toastr.success('Login', 'Complete successfully')

			return response.data
		} catch (error) {
			toastError(error)

			return thunkApi.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
	await AuthService.logout()
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/check-auth',
	async (_, thunkApi) => {
		thunkApi.dispatch(setUser(getStoreLocal('user')))
		try {
			const response = await AuthService.getNewTokens()

			return response.data
		} catch (error) {
			if (errorCatch(error) === 'jwt expired') {
				toastr.error(
					'Logout',
					'Your authorization is finished, plz sign in again'
				)
				thunkApi.dispatch(logout())
			}

			return thunkApi.rejectWithValue(error)
		}
	}
)

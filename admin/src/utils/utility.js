import ApiManager from './ApiManager'
export const LoginFunc = async body => {
	let res
	try {
		res = await new ApiManager().LoginFun(body)
		if (res.success) {
			localStorage.setItem('email', res.email)
			localStorage.setItem('uid', res.uid)
			localStorage.setItem('role', res.role)
			window.location = '/admin/tyres'
		} else {
			alert('Invalid Credentials or the user does not exist')
		}
	} catch (error) {
		alert('Something went wrong.')
	}
}

export const isLogin = async (uid, email, role, redirect = undefined) => {
	let res
	try {
		res = await new ApiManager().isLogin()
		if (res.success) {
			console.log('get current logged in user', res)
			if (
				uid !== res.user.uid &&
				email !== res.user.email &&
				role !== res.user.role
			) {
				await logout()
				window.location = '/'
			}
		} else {
			if (redirect != undefined) {
				window.location = redirect
			}
			console.log('error not logged in', res)
		}
	} catch (error) {}
}

export const logout = async () => {
	let res
	try {
		res = await new ApiManager().logout()
		console.log(res)
		window.location = '/'
	} catch (error) {
		console.log('Something went wrong')
	}
}

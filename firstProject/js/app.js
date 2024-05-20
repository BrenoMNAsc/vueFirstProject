const { createApp, reactive, computed } = Vue

const DEAFULT_STATE = {
	state: true,
	inputName: '',
	names: [],
	error: '',
	showError: false,
	result: '',
}

createApp({
	setup() {
		const data = reactive(DEAFULT_STATE)

		const isReady = computed(() => {
			return data.names.length > 1
		})

		const showResults = () => {
			data.state = false
		}

		/// methods
		const addNameToList = () => {
			const userName = data.inputName

			if (validate(userName)) {
				data.names.push(userName)
				data.inputName = ''
				data.showError = false
			} else {
				data.showError = true
			}
		}

		const validate = value => {
			data.error = ''
			if (value === '') {
				data.error = 'Name is required'
				return false
			}
			if (data.names.includes(value)) {
				data.error = 'Name is repeated'
				return false
			}
			return true
		}

		const removeName = index => {
			data.names.splice(index, 1)
		}

		return {
			data,
			addNameToList,
			removeName,
			isReady,
			showResults,
		}
	},
}).mount('#app')

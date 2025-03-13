import { JigeFieldCore } from './field'
import { fieldContext } from './field/context'
import { JigeFormCore as Core, createForm } from './form'
import { formContext } from './form/context'

export const FormCore = Object.assign(Core, {
	Field: JigeFieldCore,
	createForm,
	useField: fieldContext.useContext,
	useForm: formContext.useContext,
})

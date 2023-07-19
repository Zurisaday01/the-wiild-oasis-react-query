import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

/*
NOTE: Because we are using this component to create and edit
sometimes I won't have onCloseModal as prop
that the reason of 
() => onCloseModal?.()
*/
function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { id: editId, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(editId);

	const { isCreating, createCabin } = useCreateCabin();
	const { isEditing, editCabin } = useEditCabin();

	//NOTE: disable you are either creating or editing
	const isWorking = isCreating || isEditing;

	// NOTE: register each input
	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});

	// NOTE: the errors come from the fromState to show feedback
	const { errors } = formState;

	// NOTE: data = values of inputs
	function onSubmit(data) {
		// NOTE: if the image is a string then it comes from supabase and it there is an image file then it comes from the input
		const image = typeof data.image === 'string' ? data.image : data.image[0];

		// NOTE: id comes from cabinToEdit
		if (isEditSession)
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		else
			createCabin(
				{ ...data, image: image },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
	}

	function onError(errors) {
		console.log(errors);
		// console.log(getValues());
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? 'modal' : 'regular'}>
			<FormRow label='Cabin name' error={errors?.name?.message}>
				<Input
					type='text'
					id='name'
					disabled={isWorking}
					{...register('name', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Maximum capacity' error={errors?.max_capacity?.message}>
				<Input
					type='number'
					id='maxCapacity'
					disabled={isWorking}
					{...register('max_capacity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity shoud be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Regular price' error={errors?.regular_price?.message}>
				<Input
					type='number'
					id='regularPrice'
					disabled={isWorking}
					{...register('regular_price', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Regular price shoud be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Discount' error={errors?.discount?.message}>
				<Input
					type='number'
					id='discount'
					defaultValue={0}
					disabled={isWorking}
					{...register('discount', {
						required: 'This field is required',
						validate: value =>
							value <= +getValues('regular_price') ||
							'Discount should be less than regular price',
					})}
				/>
			</FormRow>

			<FormRow
				label='Description for website'
				error={errors?.description?.message}>
				<Textarea
					type='number'
					id='description'
					defaultValue=''
					disabled={isWorking}
					{...register('description', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Cabin photo'>
				<FileInput
					id='image'
					accept='image/*'
					{...register('image', {
						required: isEditSession ? false : 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* NOTE: resets all inputs to their initial values */}
				<Button
					variation='secondary'
					type='reset'
					onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? 'Edit value' : 'Create new cabin'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;

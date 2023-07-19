import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
	let { data, error } = await supabase.from('cabins').select('*');

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be loaded');
	}

	return data;
}

export async function createOrEditCabin(newCabin, id) {
	console.log(newCabin, id);
	// NOTE: in case you are editing, there is an image
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

	// NOTE this is the imagePath to store in the bucket
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		'/',
		''
	);

	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// STEP 1 : Create cabin
	let query = supabase.from('cabins');

	// CREATE
	// NOTE: there is no cabin to edit
	if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

	// EDIT
	if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be created');
	}

	// STEP 2: Upload image

	// NOTE: this is to prevent uploading the image there is a path to supabase in the image, which means that in this case you are copying the cabin
	if (hasImagePath) return data;

	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image);

	// STEP 3: Delete the created cabin if there was an error uplating the image
	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id);

		console.error(error);
		throw new Error(
			'Cabins image could not be uploaded and the cabin was not created'
		);
	}

	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from('cabins').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be deleted');
	}

	return data;
}

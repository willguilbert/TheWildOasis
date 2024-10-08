import supabase from './supabase'
import { supabaseUrl } from './supabase'
export async function getCabins() {
  let { data, error } = await supabase.from('Cabins').select('*')
  if (error) {
    throw new Error('Cabins could not be loaded')
  }
  return data
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('Cabins').delete().eq('id', id)
  if (error) {
    throw new Error('Cabin could not be deleted')
  }
}

// export async function createEditCabin(cabin, id) {
//   console.log(cabin, id)
//   const hasImagePath = cabin.image?.startsWith?.(supabaseUrl)
//   const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll('/', '')
//   const imagePath = hasImagePath
//     ? cabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
//   // 1. create cabin
//   let query = supabase.from('cabins')
//   // Create
//   if (!id) query = query.insert([{ ...cabin, image: imagePath }])

//   if (id) query = query.update({ ...cabin, image: imagePath }).eq('id', id)
//   const { data, error } = await query.select().single()

//   if (error) {
//     throw new Error('Cabin could not be added')
//   }
//   // 2. upload img
//   const { error: storageError } = await supabase.storage
//     .from('cabin-images')
//     .upload(imageName, cabin.image)
//   //3 delete cabin if error uploading image
//   if (storageError) {
//     await supabase.from('Cabins').delete().eq('id', data.id)

//     console.error(storageError)
//     throw new Error(
//       'The cabin image could not be uploaded and the cabin was not created.',
//     )
//   }
// }

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id)
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    '',
  )
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // 1. Create/edit cabin
  let query = supabase.from('Cabins')

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }])

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id)

  const { data, error } = await query.select().single()

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be created')
  }

  // 2. Upload image
  if (hasImagePath) return data

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id)
    console.error(storageError)
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created',
    )
  }

  return data
}

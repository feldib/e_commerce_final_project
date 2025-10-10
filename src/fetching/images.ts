import axiosConfigured from "@/utils/axiosConfigured";
import { ADMIN_URL, SERVER_URL } from "@/utils/constants";

// ===================
// Files/Images
// ===================

export const addNewOtherPictures = (
  artwork_id: number,
  other_pictures: Blob[]
): Promise<void[]> => {
  return Promise.all(
    other_pictures.map((picture) => addNewOtherPicture(artwork_id, picture))
  );
};

export const addNewOtherPicture = async (
  artwork_id: number,
  picture: Blob
): Promise<void> => {
  const formData = new FormData();
  formData.append("picture", picture);
  await axiosConfigured.post(
    `${SERVER_URL}/${ADMIN_URL}/artworks/${artwork_id}/images?type=picture`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const removePicture = async (
  artwork_id: number,
  file_name: string
): Promise<void> => {
  await axiosConfigured.delete(
    `${SERVER_URL}/${ADMIN_URL}/artworks/${artwork_id}/images/${file_name}`
  );
};

export const replaceThumbnail = async (
  artwork_id: number,
  thumbnail: Blob
): Promise<void> => {
  const formData = new FormData();
  formData.append("thumbnail", thumbnail);
  await axiosConfigured.put(
    `${SERVER_URL}/${ADMIN_URL}/artworks/${artwork_id}/images`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

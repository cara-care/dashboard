import { EPostFormData } from './PrescriptionEpostService';

export const formatFormData = (formData: EPostFormData) => {
  const ePostFormData = new FormData();
  ePostFormData.append('pdf_file', formData.pdfFile);
  ePostFormData.append('address_line_one', formData.addressLineOne);
  ePostFormData.append('address_line_two', formData.addressLineTwo);
  ePostFormData.append('post_code', formData.postCode);
  ePostFormData.append('city', formData.city);
  ePostFormData.append(
    'sender_address_line_one',
    formData.senderAddressLineOne
  );
  ePostFormData.append('sender_street', formData.senderAddressLineTwo);
  ePostFormData.append('sender_zip_code', formData.senderPostCode);
  ePostFormData.append('sender_city', formData.senderCity);
  return ePostFormData;
};

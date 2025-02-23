export const getCloudinaryUrl = (publicId: string, options: {
  resourceType?: string;
  secure?: boolean;
} = {}) => {
  const {
    resourceType = 'image',
  } = options;

  const cloudName = 'ddsq7yryf';
  
  // Use the specific URL format with quality and format parameters
  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/f_auto:video,q_auto/${publicId}`;
};
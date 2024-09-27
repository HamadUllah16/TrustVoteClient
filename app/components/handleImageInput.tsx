export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    formik: any
) => {
    const fileInput = event.currentTarget;
    const file = fileInput.files?.[0];

    if (file) {
        const validTypes = ['image/jpeg', 'image/png'];

        // Check the file type
        if (!validTypes.includes(file.type)) {
            // Set custom error for invalid file format
            formik.setFieldError(fieldName, 'Only JPG and PNG files are allowed.');
            formik.setFieldTouched(fieldName, true, true);
            console.error('Only JPG and PNG files are allowed.');

            // Clear the file input
            fileInput.value = '';
            return;
        }

        try {
            const base64File = await fileToBase64(file);

            // Clear previous errors for the field
            formik.setFieldError(fieldName, '');

            // Set the file value to base64 string
            formik.setFieldValue(fieldName, base64File);
        } catch (error) {
            console.error('Error converting file to base64:', error);
        }
    } else {
        // Handle required validation if no file is selected
        formik.setFieldError(fieldName, 'Party symbol is required');
        formik.setFieldTouched(fieldName, true);
    }
};



export default handleFileChange;

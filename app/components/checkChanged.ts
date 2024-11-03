export default function checkChanged(formik: any, values: any) {
    type FormValues = typeof formik.initialValues;
    let updatedFields: Partial<FormValues> = {};

    Object.keys(values).forEach((key) => {
        const typedKey = key as keyof FormValues;

        // Check if the key is either a string or a number
        if (typeof typedKey === 'string' || typeof typedKey === 'number') {
            if (values[typedKey] !== formik.initialValues[typedKey]) {
                updatedFields[typedKey] = values[typedKey];
            }
        }
    });

    return updatedFields;
}

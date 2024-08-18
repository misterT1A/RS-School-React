const convertToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (): void => resolve(reader.result as string);
    reader.onerror = (error): void => reject(error);
  });

export default convertToBase64;

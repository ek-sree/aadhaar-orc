import Tesseract from "tesseract.js"

export const extractTextFromImage = async (buffer)=>{
    try {
        const {data: {text}} = await Tesseract.recognize(
            buffer,
            'eng',
            // {
            //     logger: info=>console.log(info)
            // }
        )
        return text;
    } catch (error) {
        console.error('Error during OCR:', error);
        throw error;
    }
}
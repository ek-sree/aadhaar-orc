# Project Overview
This is a MERN stack web application that performs Optical Character Recognition (OCR) on Aadhaar card images.
Users can upload images of both the front and back of an Aadhaar card, 
which are then processed using an OCR library to extract the relevant details from the images.

![Screenshot (290)](https://github.com/user-attachments/assets/553956b3-712a-4f34-9b44-20f423e7de5a)


# Technologies Used
Frontend: React.js

Backend: Express.js (Node.js)

OCR Processing: Tesseract.js

Styling: Tailwind CSS


# Features
Image Upload: Users can upload both the front and back of an Aadhaar card.

Image Display: Uploaded images are displayed on the frontend.

OCR Processing: The uploaded images are processed using Tesseract.js to extract information.

Data Display: Extracted Aadhaar card information is displayed in a clean, organized format.

# OCR Processing
The application uses Tesseract.js for processing Aadhaar card images. This happens on the backend,
where the images are sent via API calls to the Express server, processed using Tesseract.js, and the extracted information is returned to the frontend.

# Security Considerations
File Type Validation:- Only image files are accepted for upload to ensure no harmful files are processed.

Rate Limiting:- To prevent abuse, the application limits each IP to 1000 requests every 15 minutes using express-rate-limit.

HTTP Header Security:- The application uses helmet to protect against well-known vulnerabilities such as XSS, content sniffing, and clickjacking by setting secure HTTP headers.

# Project Structure
The project is divided into two main directories:

client/: Contains the React frontend for user interaction and image uploads.

server/: Contains the Express.js backend responsible for handling image uploads and performing OCR using Tesseract.js.

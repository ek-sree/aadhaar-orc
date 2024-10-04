import React, { useRef, useState } from "react";
import uploadImg from "../assets/OIP (1).jpeg";
import { aadharApi } from "../api/endpoints";
import { toast, Toaster } from "sonner";

const Landing = () => {
  const [frontImg, setFrontImg] = useState<string | ArrayBuffer | null>(null);
  const [backImg, setBackImg] = useState<string | ArrayBuffer | null>(null);
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [parsedData, setParsedData] = useState({
    aadhaarNumber: "",
    name: "",
    dob: "",
    gender: "",
    address: "",
  });

  const fileInputRefFront = useRef<HTMLInputElement>(null);
  const fileInputRefBack = useRef<HTMLInputElement>(null);

  const handleImageFront = () => {
    if (fileInputRefFront.current) {
      fileInputRefFront.current.click();
    }
  };

  const handleImageBack = () => {
    if (fileInputRefBack.current) {
      fileInputRefBack.current.click();
    }
  };

  const handleImageFrontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setFrontFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFrontImg(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Only image files are allowed!");
      }
    }
  };

  const handleImageBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxFileSize = 30 * 1024 * 1024; 
  
      if (file.size > maxFileSize) {
        toast.error("File size should not exceed 30 MB!");
        return;
      }

      if (file.type.startsWith("image/")) {
        setBackFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setBackImg(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Only image files are allowed!");
      }
    }
  };
  

  
  const handleSubmit = async () => {
    try {
      if (!frontFile || !backFile) {
        toast.error("Add both front side and back side of aadhaar");
      } else {
        setLoading(true);
        const formData = new FormData();
        formData.append("frontImage", frontFile);
        formData.append("backImage", backFile);
        const response = await aadharApi(formData);
        if (response?.data.status) {
          setParsedData({
            aadhaarNumber: response.data.data.aadhaarNumber || "",
            name: response.data.data.name || "",
            dob: response.data.data.dob || "",
            gender: response.data.data.gender || "",
            address: response.data.data.address || "",
          });
          toast.success("Aadhaar parsed successfully");
        }
      }
    } catch (error) {
      console.log("Error occured while submitting", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 w-full min-h-screen flex flex-col lg:flex-row items-center lg:items-start p-4 lg:p-24">
      <Toaster position="top-center" expand={false} richColors />
      <div className="flex-1 space-y-10 w-full lg:w-auto">
        <div>
          <h2 className="font-medium pl-2 pb-3">Aadhaar Front</h2>
          <div
            className="bg-white w-full lg:w-96 h-auto p-4 text-center cursor-pointer rounded-md shadow-shadowAll"
            onClick={handleImageFront}
          >
            {frontImg ? (
              <img
                src={frontImg as string}
                alt="frontImg"
                className="h-36 rounded-md mx-auto"
              />
            ) : (
              <img src={uploadImg} alt="upload" className="mx-auto w-10 h-8" />
            )}
            {frontImg ? (
              <p className="text-blue-500 bg-slate-200 hover:bg-slate-300 rounded-xl mt-4">
                Change image
              </p>
            ) : (
              <p className="text-blue-500 mt-2">click here to Upload/Capture</p>
            )}
            <input
              type="file"
              className="hidden"
              ref={fileInputRefFront}
              onChange={handleImageFrontChange}
            />
          </div>
        </div>
        <div className="mt-10">
          <h2 className="font-medium pl-2 pb-3">Aadhaar Back</h2>
          <div
            className="bg-white w-full lg:w-96 h-auto p-4 text-center cursor-pointer rounded-md shadow-shadowAll"
            onClick={handleImageBack}
          >
            {backImg ? (
              <img
                src={backImg as string}
                alt="backimg"
                className="h-36 rounded-md mx-auto"
              />
            ) : (
              <img src={uploadImg} alt="upload" className="mx-auto w-10 h-8" />
            )}
            {backImg ? (
              <p className="text-blue-500 bg-slate-200 hover:bg-slate-300 rounded-xl mt-4">
                Change image
              </p>
            ) : (
              <p className="text-blue-500 mt-2">click here to Upload/Capture</p>
            )}
            <input
              type="file"
              className="hidden"
              ref={fileInputRefBack}
              onChange={handleImageBackChange}
            />
          </div>
        </div>
        <div  onClick={handleSubmit} className="flex bg-blue-400 mt-5 p-2 w-full lg:w-96 rounded-xl cursor-pointer hover:bg-blue-500">
        {!loading ? (
            <button
              className="mx-auto font-semibold text-white"
            >
              PARSE AADHAAR
            </button>
          ) : (
            <ul className="max-w-md space-y-2 text-white list-inside dark:text-white mx-auto cursor-not-allowed">
              <li className="flex items-center mx-auto">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 me-2 text-white animate-spin dark:text-white fill-blue-600 mx-auto"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2915 88.181 35.8757C89.083 38.264 91.5423 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only mx-auto">Loading...</span>
                </div>
                <span>Parsing Aadhaar</span>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="flex-1 w-full lg:w-auto mt-10 lg:mt-10 shadow-shadowAll p-5">
        <h3 className="font-medium underline flex justify-center">Response</h3>
        <form className="max-w-md mx-auto p-7 space-y-6">
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"

                name="floating_first_name"
                value={parsedData.aadhaarNumber}
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Aadhaar Number
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"

                name="floating_last_name"
                value={parsedData.name}
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Aadhaar Name
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"

                name="floating_phone"
                value={parsedData.dob}
                id="floating_phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Date of Birth
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"

                name="floating_company"
                value={parsedData.gender}
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Gender
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_email"
              value={parsedData.address}
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Landing;

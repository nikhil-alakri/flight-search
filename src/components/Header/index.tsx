"use client";

import Image from "next/image";
import Link from "next/link";
import Toast from "../Snackbar";
import useToast from "../useToast";

const Header = () => {
  const { toast, addToast, removeToast } = useToast();

  const handleShowToast = () => {
    addToast("We will add this feature soon!", "warning");
  };
  return (
    <header className="bg-gray-900 text-violet-50 px-4 py-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Skyscanner_Logo_LockupHorizontal_SkyBlue_RGB.svg/720px-Skyscanner_Logo_LockupHorizontal_SkyBlue_RGB.svg.png"
            alt="Sky Scanner"
            width={200}
            height={200}
          />
        </Link>
        <div className="flex items-center relative">
          <button
            className="bg-transparent hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-4  rounded"
            type="button"
            // onClick={() => alert("first button clicked")}
            onClick={handleShowToast}
          >
            Log in
          </button>
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={removeToast}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

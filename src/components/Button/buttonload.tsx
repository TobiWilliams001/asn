// import { TailSpin } from "react-loader-spinner";
export const SecondButtonLoader = () => {
  return (
    <div 
      className="inline-block h-[21px] w-[21px] animate-spin rounded-full border-2 border-solid border-white border-r-transparent"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const PageButtonLoader = () => {
  return (
    <div 
      className="inline-block h-[60px] w-[60px] animate-spin rounded-full border-4 border-solid border-[#CC2630] border-r-transparent"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
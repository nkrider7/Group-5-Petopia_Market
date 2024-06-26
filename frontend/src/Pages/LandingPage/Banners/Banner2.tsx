import { useEffect, useState } from "react";

const mobile = "https://pawsindia.com/cdn/shop/files/Collars-With-tags-Banner-Mobile-Version.jpg?v=1713878541"
const desktop = "https://pawsindia.com/cdn/shop/files/Collars-With-tags-Banner_1920x.jpg?v=1713878509"
export default function Banner2() {

    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
      };
  
      handleResize(); // Initial check
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <>
    <div className="flex justify-center items-center h-fit">
      {isMobile ? (
        <img src={mobile} alt="Mobile Image" loading="lazy" className="max-w-full max-h-full" />
      ) : (
        <img src={desktop} alt="Desktop Image" loading="lazy" className="max-w-full max-h-full rounded-xl" />
      )}
    </div>
    </>
  )
}

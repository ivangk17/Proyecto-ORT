import Image from "next/image";

export default function BackgroundImage() {
  return (
    <div className="lg:w-3/4 md:w-2/4 sm:block hidden relative">
      <div className="w-full h-full">
        <Image
          src="/img/eduwave_login.jpg" 
          className="w-full h-full object-cover"
          layout="fill"
          priority
          style={{ filter: "opacity(0.7)" }}
        />
      </div>
    </div>
  );
}
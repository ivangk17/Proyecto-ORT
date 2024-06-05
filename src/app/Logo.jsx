import Link from "next/link";
import Image from "next/image";

export default function Logo(){
    return (
        <Link className="block text-teal-600 dark:text-teal-300"  href="/">
            <Image
              src="/img/logo_edu_wave.png"
              alt="Eduwave Logo"
              className="rounded-full"
              width={50}
              height={50}
              priority
            />
        </Link>
        
    );
}
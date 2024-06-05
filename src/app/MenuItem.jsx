import Link from "next/link";

export default function MenuItem(props){
    return (
            <li>
                <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href={props.url}
                >
                {props.texto}
                </Link>
            </li>
    );
}
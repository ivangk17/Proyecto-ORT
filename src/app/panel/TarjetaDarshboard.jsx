import Link from "next/link";

export default function TarjetaDashboard(props) {
  return (
    <div className={props.clase}>
      <Link href={props.link}>
        <p className="text-4xl font-bold text-center text-white">
          {props.datos}
        </p>
        <p className="text-4xl text-center text-white">{props.titulo}</p>
      </Link>
    </div>
  );
}

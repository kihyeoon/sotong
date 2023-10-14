import dynamic from "next/dynamic";

const GridLodaer = dynamic(
  () => import("react-spinners").then((lib) => lib.GridLoader),
  {
    ssr: false,
  }
);

interface Props {
  color?: string;
}

export default function GridSpinner({ color = "red" }: Props) {
  return <GridLodaer color={color} />;
}

import iconMap from "@/lib/const/iconMap";

interface IconProps {
  name: string;
}

export default function Icon({ name }: IconProps) {
  return <>{iconMap[name] ?? null}</>;
}

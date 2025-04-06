// icons.ts
import {
    HomeIcon,
    Cog6ToothIcon,
    UserGroupIcon,
  } from "@heroicons/react/24/outline";
  
  export const icons = {
    dashboard: HomeIcon,
    configuracion: Cog6ToothIcon,
    administrador: UserGroupIcon,
  };
  
  export type IconType = (props: React.SVGProps<SVGSVGElement> | undefined) => JSX.Element;
  
  
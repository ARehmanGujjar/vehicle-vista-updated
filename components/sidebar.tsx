// import { logout } from '@/store/admin/auth/AuthReducer';
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { push } = useRouter();
  const router = useRouter();
  const isActive = (href: any) => pathname === href;
  // const handleLogout = () => {
  //   dispatch(logout());

  //   // Redirect to login page
  //   push('/flic-administrator/login');
  // };

  return (
    <aside>
      <h2 className="border-1 mb-4 border-b border-dashed border-[#1C1C21] px-5 py-4 text-lg font-semibold">
        <img alt="Logo" src="/img/default-dark.svg" className="h-11 w-11" />
      </h2>
      <h3 className="active block rounded px-6 pb-1 pt-8 text-xs tracking-widest text-[#99A1B7]">
        ADMIN
      </h3>
      <ul className="space-y-2 px-4 pt-2 text-sm">
        <li>
          <Link
            href="/flic-administrator"
            className={`flex items-center rounded px-3 py-2 ${
              isActive("/flic-administrator")
                ? "bg-[#1C1C21] text-white"
                : "text-[#99A1B7] hover:text-white"
            }`}
          >
            <Icon
              icon="streamline-interface-dashboard-layout-square-app-application-dashboard-home-layout-square"
              className=""
              width="18"
              height="18"
            />
            <span className="px-2"></span>
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/flic-administrator/users"
            className={`flex items-center rounded px-3 py-2 ${
              isActive("/flic-administrator/users")
                ? "bg-[#1C1C21] text-white"
                : "text-[#99A1B7] hover:text-white"
            }`}
          >
            <Icon icon="uil-users-alt" className="" width="18" height="18" />
            <span className="px-2"></span>
            Flic Users
          </Link>
        </li>
        <li>
          <Link
            href="/flic-administrator/error-logs"
            className={`flex items-center rounded px-3 py-2 ${
              isActive("/flic-administrator/error-logs")
                ? "bg-[#1C1C21] text-white"
                : "text-[#99A1B7] hover:text-white"
            }`}
          >
            <Icon
              icon="solar-calendar-bold-duotone"
              className=""
              width="18"
              height="18"
            />
            <span className="px-2"></span>
            Error Logs
          </Link>
        </li>
        <li>
          <Link
            href="/flic-administrator/influencers"
            className={`flex items-center rounded px-3 py-2 ${
              isActive("/flic-administrator/influencers")
                ? "bg-[#1C1C21] text-white"
                : "text-[#99A1B7] hover:text-white"
            }`}
          >
            <Icon
              icon="hugeicons:user-star-01"
              className=""
              width="18"
              height="18"
            />
            <span className="px-2"></span>
            Influencers
          </Link>
        </li>
      </ul>
      <h3 className="block rounded px-6 pb-1 pt-8 text-xs tracking-widest text-[#99A1B7]">
        PROFILE
      </h3>
      <ul className="space-y-2 px-4 pt-2 text-sm">
        <li>
          <a
            // onClick={handleLogout}
            className="flex cursor-pointer items-center rounded px-3 py-2 text-white hover:text-white"
          >
            <Icon
              icon="clarity-sign-out-solid"
              className="text-[#868789]"
              width="18"
              height="18"
            />
            <span className="px-2"></span>
            Sign Out
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

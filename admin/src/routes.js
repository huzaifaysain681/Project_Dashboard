import VehicleTypes from "./pages/VehicleTypes";
import Services from "./pages/Services";
import Vehicles from "./pages/Vehicles";
import Drivers from "./pages/Drivers";
import Bookings from "./pages/Bookings";
// import TyreOrder from "./pages/TyreOrder";
// import Users from "./pages/Users";
// import Technicians from "./pages/Technicians";
// import ServiceHistory from "./pages/ServiceHistory";
// import ManageRoles from "./pages/ManageRoles";
import Login from "./pages/Login";
// import Services from "./pages/Services";

var routes = [
  {
    path: "/bookings",
    name: "Bookings",
    icon: "ni ni-single-02 text-yellow",
    component: Bookings,
    layout: "/admin",
  },
  {
    path: "/vehicle-types",
    name: "Vehicle Types",
    icon: "ni ni-single-02 text-yellow",
    component: VehicleTypes,
    layout: "/admin",
  },
  {
    path: "/services",
    name: "Services",
    icon: "ni ni-single-02 text-yellow",
    component: Services,
    layout: "/admin",
  },
  {
    path: "/vehicles",
    name: "Vehicles",
    icon: "ni ni-single-02 text-yellow",
    component: Vehicles,
    layout: "/admin",
  },
  {
    path: "/drivers",
    name: "Drivers",
    icon: "ni ni-single-02 text-yellow",
    component: Drivers,
    layout: "/admin",
  },
  // {
  //   path: "/tyre-orders",
  //   name: "Tyre Orders",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: TyreOrder,
  //   layout: "/admin",
  // },
  // {
  //   path: "/users",
  //   name: "Users",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Users,
  //   layout: "/admin",
  // },
  // {
  //   path: "/technician",
  //   name: "Technicians",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Technicians,
  //   layout: "/admin",
  // },
  // {
  //   path: "/service-history",
  //   name: "Service History",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: ServiceHistory,
  //   layout: "/admin",
  // },
  // {
  //   path: "/services",
  //   name: "Services",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Services,
  //   layout: "/admin",
  // },
  // {
  //   path: "/manage-roles",
  //   name: "Manage Roles",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: ManageRoles,
  //   layout: "/admin",
  // },
  {
    path: "/login",
    name: "Logout",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
];
export default routes;

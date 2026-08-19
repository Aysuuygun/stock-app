import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("orders", "routes/orders.tsx"),
  route("suppliers", "routes/suppliers.tsx"),
  route("reports", "routes/reports.tsx"),
] satisfies RouteConfig;
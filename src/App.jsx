import { MotionConfig } from "framer-motion";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <BrowserRouter   future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {/* honours the visitor's "reduce motion" setting for every animation */}
      <MotionConfig reducedMotion="user">
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </MotionConfig>
    </BrowserRouter>
  );
}

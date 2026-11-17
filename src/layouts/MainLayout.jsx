import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CompareBar from "../components/CompareBar/CompareBar";
import BackToTop from "../components/common/BackToTop";
import ScrollToTop from "../components/common/ScrollToTop";
import Toast from "../components/common/Toast";
import LoginModal from "../components/Modals/LoginModal";
import ConsultModal from "../components/Modals/ConsultModal";
import { useApp } from "../context/AppContext";

function PageLoader() {
  return <div className="container" style={{ minHeight: "60vh" }} aria-busy="true" />;
}

/** Shared chrome for every page: header, footer, overlays and page transitions. */
export default function MainLayout() {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const { modal, closeModal } = useApp();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        {/* opacity-only transition: no transform, so fixed overlays inside pages keep working */}
        <motion.main
          id="main"
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Suspense fallback={<PageLoader />}>{outlet}</Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <CompareBar />
      <BackToTop />
      <Toast />
      <LoginModal open={modal === "login"} onClose={closeModal} />
      <ConsultModal open={modal === "consult"} onClose={closeModal} />
    </>
  );
}

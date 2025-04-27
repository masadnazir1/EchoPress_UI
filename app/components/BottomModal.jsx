"use client";

import { motion, AnimatePresence } from "framer-motion";
import styles from "../Styles/BottomModal.module.css";

export default function BottomModal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={styles.modal}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Drag Handle */}
            <div className={styles.handle} />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

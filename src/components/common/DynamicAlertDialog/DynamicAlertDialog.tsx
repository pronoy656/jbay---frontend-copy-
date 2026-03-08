"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";

interface DynamicAlertDialogProps {
  /** Icon that will be shown inside the trigger button (e.g. <Trash2 />) */
  triggerIcon: ReactNode;
  /** Dialog title */
  title: string;
  /** Dialog description */
  description: string;
  /** Confirm button text */
  confirmLabel?: string;
  /** Cancel button text */
  cancelLabel?: string;
  /** Callback when the user clicks Confirm */
  onConfirm?: () => void;
}

/* ---------- Glass-style trigger ---------- */
function GlassTrigger({ children }: { children: ReactNode }) {
  return (
    <AlertDialogTrigger asChild>
      <div
        className={`
          cursor-pointer p-2.5
          rounded-lg
          bg-white/5 backdrop-blur-sm
          border border-white/20
          hover:bg-white/10
          transition-all duration-200
          shadow-sm
        `}
      >
        {children}
      </div>
    </AlertDialogTrigger>
  );
}

/* ---------- Main component ---------- */
export default function DynamicAlertDialog({
  triggerIcon,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
}: DynamicAlertDialogProps) {
  return (
    <AlertDialog>
      {/* ---- Glass trigger ---- */}
      <GlassTrigger>{triggerIcon}</GlassTrigger>

      {/* ---- Glass dialog ---- */}
      <AlertDialogContent
        className={`
          max-w-md
          bg-white/10 dark:bg-black/10
          backdrop-blur-md
          border border-white/20
          rounded-xl
          shadow-xl
          p-6
        `}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-white/80">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="bg-white/10 hover:bg-white/20 text-white border-white/20">
            {cancelLabel}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive/80 hover:bg-destructive text-white"
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

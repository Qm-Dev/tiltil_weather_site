import { parseISO } from "date-fns";

const LOCALE = "es-CL";

// dd-mm-yyyy
export const formatDate = (date) =>
    date
        ? parseISO(date)
        : null;

// dd-mm-yyyy, hh:mm
export const formatDateTime = (date) =>
    date
        ? parseISO(date).toLocaleDateString(LOCALE, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
        : null;

// hh:mm
export const formatTime = (date) =>
    date
        ? parseISO(date).toLocaleTimeString(LOCALE, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
        : null;
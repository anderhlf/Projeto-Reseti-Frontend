import Swal from "sweetalert2";

export const notify = (titulo, texto, tipo = "success") => {
    const isDark = true; 

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: isDark ? "#1e293b" : "#fff", 
        color: isDark ? "#fff" : "#000",
        didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    Toast.fire({
        icon: tipo, // 'success', 'error', 'warning', 'info'
        title: titulo,
        text: texto,
        iconColor: tipo === "success" ? "#10b981" : "#ef4444", 
    });
};

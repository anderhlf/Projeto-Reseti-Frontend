import Swal from "sweetalert2";

export const notify = (titulo, texto, tipo = "success") => {
    const isDark = true;

    if (tipo === 'warning') {
        return Swal.fire({
            title: titulo,
            text: texto,
            icon: tipo,
            showCancelButton: true,
            confirmButtonColor: "#2563eb", 
            cancelButtonColor: "#64748b",
            confirmButtonText: "Sim, confirmar",
            cancelButtonText: "Não",
            background: isDark ? "#1e293b" : "#fff",
            color: isDark ? "#fff" : "#000",
        });
    }

    // Configuração do Toast para Sucesso/Erro
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

    return Toast.fire({
        icon: tipo,
        title: titulo,
        text: texto,
        iconColor: tipo === "success" ? "#10b981" : "#ef4444",
    });
};
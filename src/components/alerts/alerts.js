import Swal from "sweetalert2";

export const errorAlert = (msg) => {
  Swal.fire({
    toast: true,
    title: msg,
    icon: 'error',
    timer: 4000,
    position: "bottom-right",
    showConfirmButton: false,
  })
};

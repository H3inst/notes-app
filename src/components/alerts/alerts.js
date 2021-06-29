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

export const successAlert = (msg) => {
  Swal.fire({
    toast: true,
    title: msg,
    icon: 'success',
    timer: 4000,
    position: 'bottom-right',
    showConfirmButton: false,
  })
}

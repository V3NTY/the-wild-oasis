import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: () => logoutAPI(),
    onSuccess: () => {
      // Manualne wyrzucenie danych z cache React Query
      queryClient.removeQueries();
      navigate("/login", { replace: true });
      toast("Good Bye 🖐");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("An error occured during logout");
    },
  });

  return { logout, isLoading };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      // Manualne wrzucenie danych w cache React Query, żeby nie zaczytywało użytkownika od nowa po każdy
      console.log(user);
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
      toast("Hello there 🤝");
    },
    onError: (err) => {
      toast.error(`${err}`);
    },
  });

  return { login, isLoading };
}

import { useMutation } from "react-query";

export const useMutationHook = (fnCallBack) => {
    const mutation = useMutation({
        mutationFn: fnCallBack
    })
    return mutation;
}
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { updatePlayerField, PlayerData } from "../features/player/playerSlice";
import { useUpdatePlayerProfileMutation } from "../features/cv/cvApi";
import { toast } from "sonner";

export const usePlayer = () => {
  const dispatch = useAppDispatch();
  const playerData = useAppSelector((state) => state.player);
  const [updatePlayerProfile] = useUpdatePlayerProfileMutation();

  const handleUpdate = async (field: string, value: any) => {
    // Optimistic update in Redux
    dispatch(updatePlayerField({ field, value }));

    try {
      // API call
      await updatePlayerProfile({ id: "current-player", data: { [field]: value } }).unwrap();
      toast.success(`${field} updated successfully`);
    } catch (error) {
      // Rollback if necessary or just show error
      // toast.error(`Failed to update ${field}`);
      console.error(error);
    }
  };

  return {
    playerData,
    handleUpdate,
  };
};

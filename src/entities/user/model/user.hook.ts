import {useQuery} from "@tanstack/react-query";
import {userService} from '../index'

export const useGetUsers = () =>{
  return useQuery({
    queryKey:['users'],
    queryFn: userService.getUsers,
  })
}

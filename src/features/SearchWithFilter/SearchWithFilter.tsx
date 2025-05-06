import type { InputExFieldProps } from '@admiral-ds/react-ui';
import {Search} from "../index";

export const SearchWithFilter = ({
  ...props
}: InputExFieldProps )   =>{



  return (
    <Search {...props}/>
  )
}

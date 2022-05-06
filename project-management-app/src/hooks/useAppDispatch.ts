import { useDispatch } from 'react-redux';
import { AppDispatchType } from '../modules/types';

export const useAppDispatch = () => useDispatch<AppDispatchType>();

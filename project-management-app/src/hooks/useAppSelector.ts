import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootStateType } from '../modules/types';

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

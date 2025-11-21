import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
    isTradingSettingsOpen: boolean;
    isOrderTrackersOpen: boolean;
    isNotificationsOpen: boolean;
    isThemeOpen: boolean;
}

const initialState: UiState = {
    isTradingSettingsOpen: false,
    isOrderTrackersOpen: false,
    isNotificationsOpen: false,
    isThemeOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setTradingSettingsOpen: (state, action: PayloadAction<boolean>) => {
            state.isTradingSettingsOpen = action.payload;
        },
        setOrderTrackersOpen: (state, action: PayloadAction<boolean>) => {
            state.isOrderTrackersOpen = action.payload;
        },
        setNotificationsOpen: (state, action: PayloadAction<boolean>) => {
            state.isNotificationsOpen = action.payload;
        },
        setThemeOpen: (state, action: PayloadAction<boolean>) => {
            state.isThemeOpen = action.payload;
        },
        closeAllModals: (state) => {
            state.isTradingSettingsOpen = false;
            state.isOrderTrackersOpen = false;
            state.isNotificationsOpen = false;
            state.isThemeOpen = false;
        }
    },
});

export const {
    setTradingSettingsOpen,
    setOrderTrackersOpen,
    setNotificationsOpen,
    setThemeOpen,
    closeAllModals
} = uiSlice.actions;

export default uiSlice.reducer;

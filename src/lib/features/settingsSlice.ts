import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type QuickBuySize = 'small' | 'large' | 'mega' | 'ultra';
export type MetricsSize = 'small' | 'large';
export type QuickBuyBehavior = 'nothing' | 'openPage' | 'openNewTab';

interface SettingsState {
    // Top Section
    metricsSize: MetricsSize;
    quickBuySize: QuickBuySize;

    // Layout Tab
    showSearchBar: boolean;
    noDecimals: boolean;
    showHiddenTokens: boolean;
    unhideOnMigrated: boolean;
    circleImages: boolean;
    progressBar: boolean;

    // Row Tab
    colorRow: boolean;

    // Extras Tab
    tableLayout: 'newPairs' | 'finalStretch' | 'migrated';
    quickBuyBehavior: QuickBuyBehavior;
}

const initialState: SettingsState = {
    metricsSize: 'large',
    quickBuySize: 'small',

    showSearchBar: true,
    noDecimals: false,
    showHiddenTokens: false,
    unhideOnMigrated: true,
    circleImages: false,
    progressBar: false,

    colorRow: true,

    tableLayout: 'newPairs',
    quickBuyBehavior: 'nothing',
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setMetricsSize: (state, action: PayloadAction<MetricsSize>) => {
            state.metricsSize = action.payload;
        },
        setQuickBuySize: (state, action: PayloadAction<QuickBuySize>) => {
            state.quickBuySize = action.payload;
        },
        toggleShowSearchBar: (state) => {
            state.showSearchBar = !state.showSearchBar;
        },
        toggleNoDecimals: (state) => {
            state.noDecimals = !state.noDecimals;
        },
        toggleShowHiddenTokens: (state) => {
            state.showHiddenTokens = !state.showHiddenTokens;
        },
        toggleUnhideOnMigrated: (state) => {
            state.unhideOnMigrated = !state.unhideOnMigrated;
        },
        toggleCircleImages: (state) => {
            state.circleImages = !state.circleImages;
        },
        toggleProgressBar: (state) => {
            state.progressBar = !state.progressBar;
        },
        toggleColorRow: (state) => {
            state.colorRow = !state.colorRow;
        },
        setTableLayout: (state, action: PayloadAction<'newPairs' | 'finalStretch' | 'migrated'>) => {
            state.tableLayout = action.payload;
        },
        setQuickBuyBehavior: (state, action: PayloadAction<QuickBuyBehavior>) => {
            state.quickBuyBehavior = action.payload;
        },
    },
});

export const {
    setMetricsSize,
    setQuickBuySize,
    toggleShowSearchBar,
    toggleNoDecimals,
    toggleShowHiddenTokens,
    toggleUnhideOnMigrated,
    toggleCircleImages,
    toggleProgressBar,
    toggleColorRow,
    setTableLayout,
    setQuickBuyBehavior,
} = settingsSlice.actions;

export default settingsSlice.reducer;

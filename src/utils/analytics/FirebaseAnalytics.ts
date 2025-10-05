import analytics, { FirebaseAnalyticsTypes } from '@react-native-firebase/analytics';

// 🔹 Initialize the analytics instance once
export const analyticsInstance: FirebaseAnalyticsTypes.Module = analytics();

/**
 * Generic event logger
 */
export const logEvent = async (
    eventName: string,
    params?: Record<string, any>
): Promise<void> => {
    try {
        await analyticsInstance.logEvent(eventName, params);
        if (__DEV__) {
            console.log(`[Analytics] Event logged: ${eventName}`, params || {});
        }
    } catch (error) {
        console.error(`[Analytics] Failed to log event: ${eventName}`, error);
    }
};

/**
 * Screen view tracker
 */
export const logScreenView = async (screenName: string): Promise<void> => {
    try {
        await analyticsInstance.logScreenView({
            screen_name: screenName,
            screen_class: screenName,
        });
        if (__DEV__) {
            console.log(`[Analytics] Screen view: ${screenName}`);
        }
    } catch (error) {
        console.error(`[Analytics] Failed to log screen: ${screenName}`, error);
    }
};

/* -------------------------------------------------------------------------- */
/* 🎯 Predefined Event Loggers                                                */
/* -------------------------------------------------------------------------- */

/**
 * When user taps the microphone to start voice recognition
 */
export const logMicTapped = async (): Promise<void> => {
    await logEvent('mic_tapped');
};

/**
 * When speech-to-text transcription succeeds
 */
export const logTranscriptionSuccess = async (transcript_text?: string): Promise<void> => {
    await logEvent('transcription_success', {
        transcript_text: transcript_text ?? 'empty',
    });
};

/**
 * When transcription fails
 */
export const logTranscriptionFailed = async (errorMessage?: string): Promise<void> => {
    await logEvent('transcription_failed', {
        error_message: errorMessage ?? 'unknown_error',
    });
};

/**
 * When product search/query returns results
 */
export const logQuerySuccess = async (query: string, resultCount: number): Promise<void> => {
    await logEvent('query_success', {
        query,
        result_count: resultCount,
    });
};

/**
 * When a query has no results
 */
export const logQueryNoResults = async (query: string): Promise<void> => {
    await logEvent('query_no_results', {
        query,
    });
};

/**
 * When user clicks a product from search results
 */
export const logProductClicked = async (productId: string, productName?: string): Promise<void> => {
    await logEvent('product_clicked', {
        product_id: productId,
        product_name: productName ?? 'unknown',
    });
};

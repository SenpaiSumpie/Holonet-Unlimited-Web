interface Window {
    kofiWidgetOverlay?: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        draw: (widgetId: string, options: Record<string, any>) => void;
    };
}

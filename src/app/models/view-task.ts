export interface ViewTask {
    id: string;
    userId: string;
    title: string;
    description: string;
    startAt: string;
    endAt: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
}

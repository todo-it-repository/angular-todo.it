export interface Task {
    title: string;
    description: string;
    startAt: Date;
    endAt: Date;
    priority: "LOW" | "MEDIUM" | "HIGH";
}

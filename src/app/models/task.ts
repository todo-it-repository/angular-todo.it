export interface Task {
    id?: string;
    title: string;
    description: string;
    startAt: Date;
    endAt: Date;
    priority: "LOW" | "MEDIUM" | "HIGH";
}

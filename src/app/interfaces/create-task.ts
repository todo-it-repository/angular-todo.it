export interface CreateTask {
    title: string;
    description: string;
    startAt: string;
    endAt: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

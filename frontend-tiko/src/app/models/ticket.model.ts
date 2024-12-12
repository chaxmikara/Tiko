export interface Ticket {
    id: number;
    title: string;
    description: string;
    price: number;
    returnedImg: string;
    userId: number | null;
}
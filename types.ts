export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export interface ServiceItem {
    title: string;
    description: string;
    icon: string;
}

export interface ReviewItem {
    author: string;
    content: string;
    rating: number;
    date: string;
}

export interface Estimate {
    id: number;
    name: string;
    phone: string;
    location: string;
    message: string;
    date: string;
}
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  session_id?: string;
}

export interface ChatResponse {
  response: string;
  session_id: string;
  sources: DocumentSource[];
  language: string;
}

export interface DocumentSource {
  content: string;
  metadata: {
    source?: string;
    page?: number;
    [key: string]: any;
  };
}

export interface SystemStatus {
  initialized: boolean;
  error?: string;
  build_progress?: {
    current: number;
    total: number;
    file: string;
    completed: boolean;
  };
}
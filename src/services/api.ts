const API_URL = '/api';

interface ChatResponse {
  id: number;
  message: string;
  response: string;
  created_at: string;
}

export const sendMessage = async (message: string): Promise<ChatResponse> => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getMessageHistory = async (): Promise<ChatResponse[]> => {
  try {
    const response = await fetch(`${API_URL}/posts`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching message history:', error);
    throw error;
  }
}; 
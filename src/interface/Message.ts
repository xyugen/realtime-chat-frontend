interface Message {
  id: number,
  createdAt: string,
  updatedAt: string,
  deletedAt?: string,
  conversationId: number
  senderId: number,
  sender?: User
  content?: string,
}
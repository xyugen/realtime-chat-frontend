interface Conversation {
    id: number,
    createdAt: string,
    updatedAt: string,
    deletedAt?: string,
    user1Id: number,
    user2Id: number,
}
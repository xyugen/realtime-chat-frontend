interface Conversation {
    id: number,
    createdAt: string,
    updatedAt: string,
    deletedAt?: string,
    user1Id: number,
    user1?: User,
    user2Id: number,
    user2?: User
}
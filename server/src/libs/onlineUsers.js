// utils/onlineUsers.js
export const onlineUsers = new Map();

/**
 * Add a user to the online users map
 * @param {string} userId - Supabase profile/user id
 * @param {string} socketId - Socket.io connection id
 */
export function addOnlineUser(userId, socketId) {
    onlineUsers.set(userId, socketId);
}

/**
 * Remove a user from the online users map
 * @param {string} userId - Supabase profile/user id
 */
export function removeOnlineUser(userId) {
    onlineUsers.delete(userId);
}

/**
 * Get socketId of a given online user
 * @param {string} userId - Supabase profile/user id
 * @returns {string|undefined} - Socket.io connection id
 */
export function getSocketId(userId) {
    return onlineUsers.get(userId);
}

/**
 * Get all currently online users (array of userIds)
 * @returns {string[]}
 */
export function getAllOnlineUsers() {
    return Array.from(onlineUsers.keys());
}

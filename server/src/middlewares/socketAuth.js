import supabase from '../libs/supabase.js';

function socketAuth(io) {
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split('Bearer ')[1];
            if (!token) {
                return next(new Error('No token provided'));
            }

            const { data: { user }, error } = await supabase.auth.getUser(token);
            if (error || !user) {
                return next(new Error('Unauthorized'));
            }

            // Attach the supabase user id to the socket
            socket.userId = user.id;

            next();
        } catch (err) {
            next(new Error('Auth error'));
        }
    });
}

export default socketAuth;

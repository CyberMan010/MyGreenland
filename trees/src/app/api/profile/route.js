import { authMiddleware } from '../../../middlewares/auth';
import connectDB from '../../../lib/mongodb';
import Users from '../../../models/users';

const handler = async (req) => {
    if (req.method === 'GET') {
        await connectDB();
        try {
            const user = await Users.findById(req.userId).select('-password');
            if (!user) {
                return new Response(JSON.stringify({ message: 'User not found' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            return new Response(JSON.stringify(user), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return new Response(JSON.stringify({ message: 'Internal server error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } else if (req.method === 'PUT') {
        await connectDB();
        try {
            const { name, email } = await req.json();
            const user = await Users.findById(req.userId);
            if (!user) {
                return new Response(JSON.stringify({ message: 'User not found' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            if (name) user.name = name;
            if (email) user.email = email;
            await user.save();
            return new Response(JSON.stringify(user), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            console.error('Error updating user profile:', error);
            return new Response(JSON.stringify({ message: 'Internal server error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } else {
        return new Response(JSON.stringify({ message: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

export const GET = authMiddleware(handler);
export const PUT = authMiddleware(handler);
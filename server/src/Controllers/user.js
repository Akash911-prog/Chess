import supabase from "../libs/supabase.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function register(req, res) {
    const { email, password } = await req.body;

    console.log("Starting registration process...");
    console.log("Received email:", email);

    try {
        console.log("Attempting to register...");
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            console.error("Error during registration:", error);
            return res.status(400).json({ error, success: false });
        }

        console.log("User registered successfully:");
        return res.status(201).json({ data, success: true });
    } catch (err) {
        console.error("Unexpected error during registration:", err);
        return res.status(500).json({ error: err.message, success: false });
    }
}

export async function login(req, res) {
    const { email, password } = await req.body;

    console.log("Starting login process...");
    console.log("Received email:", email);

    try {
        console.log("Attempting to log in...");
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            console.error("Error during login:", error);
            return res.status(400).json({ error, success: false });
        }

        console.log("User logged in successfully:");
        return res.status(200).json({ data, success: true });
    } catch (err) {
        console.error("Unexpected error during login:", err);
        return res.status(500).json({ error: err.message, success: false });
    }
}

export async function OauthLogin(req, res) {
    const provider = req.query.provider;

    if (!provider) {
        return res.status(400).json({ error: "No provider specified", success: false });
    }

    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: "http://localhost:3000/", // replace with your frontend URL
            },
        });

        if (error) {
            return res.status(400).json({ error, success: false });
        }

        // Send redirect URL to the frontend
        return res.status(200).json({ url: data?.url, success: true });
    } catch (err) {
        console.error("Unexpected error during OAuth login:", err);
        return res.status(500).json({ error: err.message, success: false });
    }
}


export async function logout(req, res) {
    console.log("Logging out of Supabase...");
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Error logging out of Supabase:", error);
        return res.status(400).json({ error, success: false });
    }

    console.log("Logged out of Supabase successfully.");
    return res.status(200).json({ success: true });
}

export async function updateUser(req, res) {
    const { email, password, dataToUpdate } = await req.body;
    const user = req.user;

    console.log("Updating user...");

    if (!user) {
        console.error("User not found");
        return res.status(404).json({ success: false, error: "User not found" });
    }

    if (email) {
        console.log("Updating user email...");
        const { error: updateEmailError } = await supabase.auth.updateUser({ email });
        if (updateEmailError) {
            console.error("Error updating user email:", updateEmailError);
            return res.status(400).json({ error: updateEmailError, success: false });
        }
    }

    if (password) {
        console.log("Updating user password...");
        const { error: updatePasswordError } = await supabase.auth.updateUser({ password });
        if (updatePasswordError) {
            console.error("Error updating user password:", updatePasswordError);
            return res.status(400).json({ error: updatePasswordError, success: false });
        }
    }

    if (!dataToUpdate) {
        console.error("No data to update");
        return res.status(400).json({ success: false, error: "No data to update" });
    }

    console.log("Updating user data...");
    const { data, error: updateDataError } = await supabase.auth.updateUser({
        data: { dataToUpdate }
    });

    if (updateDataError) {
        console.error("Error updating user data:", updateDataError);
        return res.status(400).json({ error: updateDataError, success: false });
    }

    console.log("User updated successfully.");
    return res.status(200).json({ data, success: true });
}

export async function deleteUser(req, res) {
    console.log("Attempting to delete user...");
    const { user } = req.user;

    console.log("user fetched");

    if (!user) {
        console.error("User not found.");
        return res.status(404).json({ success: false, error: "User not found" });
    }

    const { error } = await supabase.auth.deleteUser();

    if (error) {
        console.error("Error deleting user:", error);
        return res.status(400).json({ error, success: false });
    }

    console.log("User deleted successfully.");
    return res.status(200).json({ user, success: true });
}

export async function getOneUser(req, res) {
    console.log("Getting current user...");
    const user = req.user;

    if (!user) {
        console.error("User not found");
        return res.status(404).json({ success: false, error: "User not found" });
    }

    console.log("User fetched successfully.");
    return res.status(200).json({ user, success: true });
}

export async function updateUsername(req, res) {
    try {
        console.log("Updating username...");
        const user = req.user;

        console.log(req.user);

        if (!user) {
            console.error("User not found");
            return res.status(404).json({ success: false, error: "User not found" });
        }

        console.log("Updating user in database...");
        const updatedUser = await prisma.profile.update({
            where: { id: user.id },
            data: { username: req.body.username }
        });

        console.log("User updated successfully.");
        return res.status(200).json({ user: updatedUser, success: true });

    } catch (error) {
        console.error("Error updating username:", error);
        return res.status(500).json({ error, success: false });
    }
}


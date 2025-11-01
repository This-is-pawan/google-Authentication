import UserModel from "../models/UserModel.js";

export const googleAuthCallback = async (profile, done) => {
  try {
    const existingUser = await UserModel.findOne({ googleId: profile.id });
    if (existingUser) return done(null, existingUser);

    const newUser = await UserModel.create({
      googleId: profile.id,
      displayName: profile.displayName,
      email: profile.emails?.[0]?.value,
      photo: profile.photos?.[0]?.value,
    });

    return done(null, newUser);
  } catch (error) {
    return done(error, null);
  }
};
